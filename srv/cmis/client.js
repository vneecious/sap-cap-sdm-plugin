const cds = require('@sap/cds');
const convertObjectToCmisProperties = require('./converters/object-to-cmis-document');
const { CreateFolderApi } = require('./generated/create-folder-api');
const { CreateDocumentApi } = require('./generated/create-document-api');
const { GetObjectApi } = require('./generated/get-object-api');
const {
  AppendContentStreamApi,
} = require('./generated/append-content-stream-api');
const { CMISQueryApi } = require('./generated/cmis-query-api');
const { DownloadAFileApi } = require('./generated/download-a-file-api');
const { DeleteObjectApi } = require('./generated/delete-object-api');
const middlewares = require('./middlewares');
const jsonToFormdata = require('./converters/json-to-formdata');

/**
 * @typedef {import('./types').BaseCmisOptions} BaseCmisOptions
 * @typedef {import('./types').WriteOptions} WriteOptions
 * @typedef {import('./types').OptionsConfig} OptionsConfig
 * @typedef {import('@sap-cloud-sdk/openapi').OpenApiRequestBuilder} OpenApiRequestBuilder
 */

module.exports = class CmisClient extends cds.Service {
  constructor(args) {
    super(args);

    this.globalParameters = {
      _charset: 'UTF-8',
      succinct: true,
    };
  }

  /**
   * Creates a folder object of the speciﬁed type in the speciﬁed location (options.folderPath).
   * If no folderPath is given, then creates it in the root folder
   * @param {string} repositoryId - Repository ID
   * @param {string} name - Folder name
   * @param {WriteOptions & {folderPath?: string}} options - Options for the folder creation.
   * @param options - Configuration and settings for the document creation from the source.
   * @property options.folderPath - The path within the repository where the copied document will be placed. If `targetFolderId` is not provided, this path will be used. If neither are provided, the default location may be used.
   * @returns
   */
  createFolder(repositoryId, name, options) {
    const {
      cmisProperties,
      config = {},
      ...optionalParameters
    } = options || {};

    const allCmisProperties = convertObjectToCmisProperties({
      'cmis:name': name,
      'cmis:objectTypeId': 'cmis:folder',
      ...(cmisProperties || {}),
    });

    const requestBody = {
      cmisaction: 'createFolder',
      ...allCmisProperties,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CreateFolderApi;

    let request;
    if (!options?.folderPath) {
      request = api.createBrowserRootByRepositoryId(repositoryId, requestBody);
    } else {
      request = api.createBrowserRootByRepositoryIdAndDirectoryPath(
        repositoryId,
        options.folderPath,
        requestBody,
      );
    }

    config.middleware = [
      ...[].concat(config?.middleware || []).flat(),
      middlewares.jsonToFormData,
    ];

    return this._buildRequest(request, config);
  }

  /**
   * Creates a new document object within the specified location in the repository.
   *
   * This method allows for the creation of a document object based on a given type, typically specified by the cmis:objectTypeId property.
   *
   * @param {string} repositoryId - Repository ID
   * @param {string} name - The name that will be assigned to the document object.
   * @param {any} content - The actual content/data of the document to be stored.
   * @param {WriteOptions & { folderPath?: string; versioningState?: 'none' | 'checkedout' | 'major' | 'minor'; }} options - Options for document creation.
   * @property options.folderPath - The path within the repository where the document will be created. If not provided, the default location may be used.
   *
   * @returns Promise resolving to the created document object with its metadata and other relevant details.
   */
  createDocument(
    repositoryId,
    name,
    content,
    options = { versioningState: 'major' },
  ) {
    const { cmisProperties, config = {}, ...optionalParameters } = options;

    const allCmisProperties = convertObjectToCmisProperties({
      'cmis:name': name,
      'cmis:objectTypeId': 'cmis:document',
      ...(cmisProperties || {}),
    });

    const bodyData = {
      cmisaction: 'createDocument',
      ...allCmisProperties,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const requestBody = jsonToFormdata(bodyData);
    if (content) requestBody.append('content', content, name);

    const api = CreateDocumentApi;

    let request;
    if (!options?.folderPath) {
      request = api.createBrowserRootByRepositoryId(repositoryId, requestBody);
    } else {
      request = api.createBrowserRootByRepositoryIdAndDirectoryPath(
        repositoryId,
        options.folderPath,
        requestBody,
      );
    }

    return this._buildRequest(request, config);
  }

  /**
   * Retrieves the details of a specified object within the CMIS repository.
   *
   * @param {string} repositoryId - Repository ID
   * @param {string} objectId - Identifier of the object.
   * @param { { filter?: string;maxItems?: number;skipCount?: number;orderBy?: string;includeAllowableActions?: boolean;includePathSegment?: boolean;includeRelationships?: 'none' | 'source' | 'target' | 'both';renditionFilter?: string;includePolicyIds?: boolean; } & BaseCmisOptions} options - Configuration options for the request.
   * @property {string} [options.filter] - List of property query names to return (e.g., 'cmis:name,description').
   *                                       For secondary type properties, follow the format: <secondaryTypeQueryName>.<propertyQueryName>.
   * @property {number} [options.maxItems] - Maximum number of children to return.
   * @property {number} [options.skipCount] - Number of initial results to skip.
   * @property {string} [options.orderBy] - A comma-separated list of query names and an optional ascending modiﬁer "ASC" or descending modiﬁer "DESC" for each query name.
   *                                        If the modiﬁer is not stated, "ASC" is assumed
   * @property {boolean} [options.includeAllowableActions] - Whether to include allowable actions for each child.
   * @property {boolean} [options.includePathSegment] - Whether to include the path segment for each child.
   * @property {"none" | "source" | "target" | "both"} [options.includeRelationships] - Scope of the relationships to include.
   * @property {string} [options.renditionFilter] - Defines the renditions to be included in the response.
   *                                               Examples for `renditionFilter`:
   *                                               - `*`: Include all renditions.
   *                                               - `cmis:thumbnail`: Include only thumbnails.
   *                                               - `image/*`: Include all image renditions.
   *                                               - `application/pdf,application/x-shockwave-flash`: Include web ready renditions.
   *                                               - `cmis:none`: Exclude all renditions (Default).
   * @property {boolean} [options.includePolicyIds] - Indicates whether the repository should return the IDs of policies applied to the object. If set to `true`, the repository is required to return these IDs.
   * @returns {OpenApiRequestBuilder}
   */
  getObject(
    repositoryId,
    objectId,
    options = {
      filter: '*',
      includeAllowableActions: false,
      includePathSegment: false,
      includeRelationships: 'none',
      includePolicyIds: false,
    },
  ) {
    const { config = {}, ...optionalParameters } = options;

    const requestBody = {
      objectId,
      cmisselector: 'object',
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = GetObjectApi;
    const request = api.getBrowserRootByRepositoryId(repositoryId, requestBody);

    return this._buildRequest(request, config);
  }

  /**
   * Appends a content stream to the content stream of the document and refreshes this object afterwards.
   * If the repository created a new version, this new document is returned. Otherwise, the current document is returned.
   *
   * @param {string} repositoryId - Repository ID
   * @param {string} objectId - The ID of the document.
   * @param {string} filename - The name of the file (e.g., filename.json).
   * @param {any} contentStream - The content stream to be appended to the existing content.
   * @param {BaseCmisOptions & { isLastChunk?: boolean }} options - Optional parameters to modify the append behavior.
   * @property options.isLastChunk - Indicates whether this is the last chunk of content. If `true`, this is the last chunk, and no additional chunks are expected. Defaults to `false`.
   *
   * @returns {OpenApiRequestBuilder}
   */
  appendContentStream(
    repositoryId,
    objectId,
    filename,
    contentStream,
    options = {
      isLastChunk: false,
    },
  ) {
    const { config = {}, ...optionalParameters } = options;

    const bodyData = {
      cmisaction: 'appendContent',
      objectId,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const requestBody = jsonToFormdata(bodyData);
    if (contentStream) requestBody.append('content', contentStream, filename);

    const api = AppendContentStreamApi;
    const request = api.createBrowserRootByRepositoryId(
      repositoryId,
      requestBody,
    );

    return this._buildRequest(request, config);
  }

  /**
   * Provides a type-based query service for discovering objects that match specified criteria.
   * Through this relational view, queries may be performed via a simplified SQL SELECT statement.
   *
   * @param {string} repositoryId - Repository ID
   * @param {string} statement - CMIS query to be executed.
   * @param { BaseCmisOptions & { searchAllVersions?: boolean; includeRelationships?: 'none' | 'source' | 'target' | 'both'; renditionFilter?: string; includeAllowableActions?: boolean; maxItems?: number; skipCount?: number; } } options - Additional query options.
   * @property {boolean} [options.searchAllVersions] - If TRUE, the repository MUST include both the latest and non-latest versions of document objects in the query search scope. Default is FALSE.
   * @property {"none"|"source"|"target"|"both"} [options.includeRelationships] - Determines which relationships of the returned objects should be returned. If the SELECT clause contains properties from multiple tables, this MUST be "none". Defaults to "none".
   * @property {string} [options.renditionFilter] - Defines the renditions to be included. If the SELECT clause contains properties from more than one table, this value MUST not be set.
   *
   * Examples for `renditionFilter`:
   * - `*`: Include all renditions.
   * - `cmis:thumbnail`: Include only thumbnails.
   * - `image/*`: Include all image renditions.
   * - `application/pdf,application/x-shockwave-flash`: Include web ready renditions.
   * - `cmis:none`: Exclude all renditions (Default).
   *
   * @property {boolean} [options.includeAllowableActions] - If TRUE, the repository MUST return the available actions for each object in the result set. If the SELECT clause contains properties from more than one table, this MUST be FALSE. Defaults to FALSE.
   * @property {number} [options.maxItems] - The maximum number of items to return in a response.
   * @property {number} [options.skipCount] - The number of potential results the repository should skip. Defaults to 0.
   *
   * @returns {OpenApiRequestBuilder}.
   */
  cmisQuery(
    repositoryId,
    statement,
    options = {
      searchAllVersions: false,
    },
  ) {
    const { config = {}, ...optionalParameters } = options;

    const parameters = {
      cmisSelector: 'query',
      q: encodeURIComponent(statement),
      ...this.globalParameters,
      ...optionalParameters,
    };

    const api = CMISQueryApi;
    const request = api.getBrowserByRepositoryId(repositoryId, parameters);

    return this._buildRequest(request, config);
  }

  /**
   * Initiates the download of a specified document. Either directly returns the document content or redirects to a URL for download.
   *
   * @param {string} repositoryId - Repository ID
   * @param {string} objectId - Unique identifier for the desired document object.
   * @param { { filename?: string; download?: 'attachment' | 'inline'; } & BaseOptions } options - Configuration options for the download.
   * @property options.filename - The desired name for the downloaded file. If not provided, the original name will be used.
   * @property options.download - Specifies the content disposition. "attachment" results in a download prompt, whereas "inline" attempts to display the content within the browser, if possible.
   *
   * @returns {OpenApiRequestBuilder}.
   */
  downloadFile(
    repositoryId,
    objectId,
    options = {
      download: 'attachment',
    },
  ) {
    const { config = {}, ...optionalParameters } = options;

    const requestBody = {
      cmisselector: 'content',
      download: optionalParameters.download,
      filename: optionalParameters.filename,
      objectId,
    };

    const api = DownloadAFileApi;

    const request = api.getBrowserRootByRepositoryId(repositoryId, requestBody);

    return this._buildRequest(request, config);
  }

  /**
   * Deletes the specified object from the repository.
   *
   * Note: If the object being deleted is a Private Working Copy (PWC), the checkout associated with it will be discarded.
   *
   * @param {string} repositoryId - Repository ID
   * @param {string} objectId - Identifier of the object to be deleted.
   * @param { { allVersions?: boolean; } & BaseOptions } options - Configuration settings for the deletion.
   *
   * @property options.allVersions - Determines if all versions of a document should be deleted.
   *                                 If set to TRUE (default), all versions of the document are deleted.
   *                                 If set to FALSE, only the specified document object is deleted.
   *                                 This property is disregarded when the service is invoked on non-document
   *                                 objects or non-versionable document objects.
   *
   * @returns {OpenApiRequestBuilder}
   */
  deleteObject(repositoryId, objectId, options = { allVersions: true }) {
    const { config = {}, ...optionalParameters } = options;

    const requestBody = {
      cmisaction: 'delete',
      objectId,
      ...optionalParameters,
    };

    const api = DeleteObjectApi;
    const request = api.createBrowserRootByRepositoryId(
      repositoryId,
      requestBody,
    );

    config.middleware = [
      ...[].concat(config?.middleware || []).flat(),
      middlewares.jsonToFormData,
    ];

    return this._buildRequest(request, config);
  }

  /**
   * Incorporates the provided configuration options into the specified request object.
   *
   * @param {OpenApiRequestBuilder} request
   * @param {OptionsConfig} config
   * @returns {OpenApiRequestBuilder}
   */
  _buildRequest(request, config) {
    if (config?.customHeaders) {
      request = request.addCustomHeaders(config.customHeaders);
    }

    if (config?.customRequestConfiguration) {
      request = request.addCustomRequestConfiguration(
        config?.customRequestConfiguration,
      );
    }

    if (config?.middleware) {
      request = request.middleware(config.middleware);
    }

    return request;
  }
};
