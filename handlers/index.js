const { randomUUID } = require('crypto');
const { getColumnsMapping } = require('../util');
const CMISClientManager = require('../util/CMISClientManager');
const convertODataQueryToCMIS = require('../converters/ConvertODataQueryToCMIS');
const convertCMISDocumentToOData = require('../converters/ConvertCMISDocumentToOData');
const { getType } = require('mime');

/**
 * Transforms the request data to match the CMIS document structure.
 *
 * @param {Object} req - The request object containing data and target elements.
 * @returns {void} Modifies the `data` property of the request object in place.
 */
const beforeAll = req => {
  const columnsMapping = getColumnsMapping(req.target.elements);

  const { data } = req;
  const cmisDocument = Object.entries(data).reduce((acc, [key, value]) => {
    if (columnsMapping[key]) {
      acc[columnsMapping[key].path] = value;
    }
    return acc;
  }, {});
  req.cmisDocument = cmisDocument;
};

/**
 * Handles read operations, converting OData to CMIS and vice versa as needed.
 * @param {Object} req - The request object.
 * @returns {Promise<Array|Object>} The results of the read operation.
 */
const onRead = async req => {
  const cmisClient = CMISClientManager.getClient();

  const odataQuery = req._queryOptions
    ? Object.entries(req._queryOptions)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    : undefined;

  let query = convertODataQueryToCMIS(
    odataQuery,
    req.target.elements,
    req.cmisDocument,
  );

  const options = {};
  if (req?._query?.$skip) {
    options.skipCount = Number(req._query.$skip);
  }
  if (req?._query?.$top) {
    options.maxItems = Number(req._query.$top);
  }

  const { results } = await cmisClient.cmisQuery(query, options);

  if (req.query?._streaming) {
    return onReadStream(req, results[0].succinctProperties);
  }

  return convertCMISDocumentToOData(results, req.target.elements);
};

/**
 * Handles the streaming read operation based on the provided CMIS document.
 *
 * @param {Object} req - The request object containing context and headers.
 * @param {Object} cmisDocument - The CMIS document object with metadata for downloading.
 * @returns {Promise<Object>} An object representing the stream and its associated metadata.
 */
const onReadStream = async (req, cmisDocument) => {
  const cmisClient = CMISClientManager.getClient();

  const content = await cmisClient
    .withRequest(req.req)
    .downloadFile(cmisDocument['cmis:objectId'], {
      download: 'inline',
      config: {
        customRequestConfiguration: {
          responseType: 'stream',
        },
        customHeaders: {
          Cookie: req.headers.cookie,
        },
      },
    });

  return {
    value: content,
    $mediaContentType: getType(cmisDocument['cmis:name']),
    $mediaContentDispositionFilename: cmisDocument['cmis:name'],
    $mediaContentDispositionType: 'inline',
  };
};

/**
 * Handles create operations.
 * @param {Object} req - The request object.
 * @returns {Promise<void>}
 */
const onCreate = async req => {
  const cmisClient = CMISClientManager.getClient();

  const { cmisDocument } = req;
  if (!cmisDocument['cmis:name']) {
    cmisDocument['cmis:name'] = randomUUID();
  }
  const cmisResults = await cmisClient
    .withRequest(req.req)
    .createDocument(cmisDocument['cmis:name']);
  return convertCMISDocumentToOData(cmisResults, req.target.elements);
};

const onUpdate = async req => {
  const { data } = req;
  if (data.content) {
    return onUpdateContentStream(req);
  }
};

/**
 * Handles the update of a content stream within a CMIS repository.
 *
 * @param {Object} req - The CAP request object.
 * @returns {Promise<Object>} Returns the converted CMIS document to OData format.
 * @throws {Error} Throws an error if updating the content stream fails.
 * @todo Consider versioned repositories and implement check in/check out logic.
 * @todo Consider thumbnail active repositories and implement thumbnail generation.
 */
const onUpdateContentStream = async req => {
  const cmisClient = CMISClientManager.getClient();
  const { data, cmisDocument } = req;

  const document = await cmisClient.getObject(cmisDocument['cmis:objectId']);
  const { 'cmis:objectId': documentId, 'cmis:name': filename } =
    document.succinctProperties;

  // TODO: must consider versioned repositories
  // check in / check out

  await cmisClient
    .withRequest(req.req)
    .appendContentStream(documentId, filename, data.content);

  // TODO: generate thumbnail
  // await cmisClient.generateThumbnail(CMISObjectId);

  return convertCMISDocumentToOData(document, req.target.elements);
};

/**
 * Handles the deletion of an object within a CMIS repository.
 *
 * @param {Object} req - The CAP request object.
 * @throws {Error} Throws an error if deleting the object fails.
 */
const onDelete = async req => {
  const cmisClient = CMISClientManager.getClient();
  const { cmisDocument } = req;

  await cmisClient
    .withRequest(req.req)
    .deleteObject(cmisDocument['cmis:objectId']);
};

module.exports = {
  beforeAll,
  onCreate,
  onRead,
  onUpdate,
  onDelete,
};
