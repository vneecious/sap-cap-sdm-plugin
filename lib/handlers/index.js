const { randomUUID } = require('crypto');
const {
  getColumnsMapping,
  deriveFolderNameFromNavigation,
} = require('../util');
const cmis = require('../cmis-client');
const {
  convertODataQueryToCMIS,
  convertCMISDocumentToOData,
} = require('../converters');
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
  const { $skip, $top } = req._query || {};

  const options = {
    ...(typeof $skip !== 'undefined' && { skipCount: Number($skip) }),
    ...(typeof $top !== 'undefined' && { maxItems: Number($top) }),
  };

  const folderName = deriveFolderNameFromNavigation(req);

  let keys = req.cmisDocument;
  if (folderName) {
    const { results: queryResults } = await cmis.client.cmisQuery(
      `select * from cmis:folder where cmis:name = '${folderName}'`,
    );
    if (queryResults.length) {
      const objectId = queryResults[0].succinctProperties['cmis:objectId'];
      keys = { ...keys, 'sap:parentIds': [objectId] };
    }
  }

  const odataQueryOptions = req._queryOptions
    ? Object.entries(req._queryOptions)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    : undefined;

  const query = convertODataQueryToCMIS(
    odataQueryOptions,
    req.target.elements,
    keys,
    folderName,
  );

  const { results } = await cmis.client.cmisQuery(query, options);
  if (req.query._streaming) {
    return onReadStream(req, results[0]?.succinctProperties);
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
  const content = await cmis.client
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
  const folderName = deriveFolderNameFromNavigation(req);

  await onCreateFolder(req, folderName);

  const { cmisDocument } = req;
  if (!cmisDocument['cmis:name']) {
    cmisDocument['cmis:name'] = randomUUID();
  }
  const cmisResults = await cmis.client
    .withRequest(req.req)
    .createDocument(cmisDocument['cmis:name'], null, {
      folderPath: folderName,
    });
  return convertCMISDocumentToOData(cmisResults, req.target.elements);
};

const onUpdate = async req => {
  const { data } = req;
  if (data.content) {
    return onUpdateContentStream(req);
  }
};

/**
 * Tries to create a specified folder. If the folder already exists, no action is taken.
 * @param {Object} req - The request object.
 * @param {string} folderName - The name of the folder to create.
 */
const onCreateFolder = async (req, folderName) => {
  try {
    await cmis.client.withRequest(req.req).createFolder(folderName);
  } catch (err) {
    const { exception } = err?.response?.data || {};

    const NAME_CONSTRAINT_VIOLATION = 'nameConstraintViolation';
    if (exception !== NAME_CONSTRAINT_VIOLATION) {
      throw err;
    }
    // if folder already exists due to a 'nameConstraintViolation' exception, do nothing.
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
  const { data, cmisDocument } = req;

  const document = await cmis.client.getObject(cmisDocument['cmis:objectId']);
  const { 'cmis:objectId': documentId, 'cmis:name': filename } =
    document.succinctProperties;

  // TODO: must consider versioned repositories
  // check in / check out

  await cmis.client
    .withRequest(req.req)
    .appendContentStream(documentId, filename, data.content);

  // TODO: generate thumbnail
  // await cmis.client.generateThumbnail(CMISObjectId);

  return convertCMISDocumentToOData(document, req.target.elements);
};

/**
 * Handles the deletion of an object within a CMIS repository.
 *
 * @param {Object} req - The CAP request object.
 * @throws {Error} Throws an error if deleting the object fails.
 */
const onDelete = async req => {
  const { cmisDocument } = req;

  await cmis.client
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
