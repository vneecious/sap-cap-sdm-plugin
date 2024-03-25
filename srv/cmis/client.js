const cds = require('@sap/cds');
const convertObjectToCmisProperties = require('./converters/object-to-cmis-document');
const convertObjectToQueryArrayParams = require('./converters/object-to-query-array-params');
const builder = require('./request-builders');
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

  fetchRepository() {
    const request = builder.getBrowser();
    return this._buildRequest(request, {});
  }

  /**
   * It adds a list of  Access Control Entries(ACE) to the Access Control List(ACL) of an object with permissions
   * that can be of cmis:read, cmis:write, all."
   *
   * @param {string} repositoryId - Repository ID
   * @param {string} objectId - Identifier of the object.
   * @param {Array<{ addACEPrincipal: string, addACEPermission: Array<'cmis:read'|'cmis:write'|'all'>}>} addACEs - The list of ACEs to be added.
   * @param {BaseCmisOptions & { ACLPropagation?: 'objectonly' | 'propagate' | 'repositorydetermined'; }} options
   * @property options.ACLPropagation - Specifies how ACEs should be applied.
   * - "objectonly": Apply ACEs only to the object without changing the ACLs of other objects.
   * - "propagate": Apply ACEs by propagating the changes to all inheriting objects.
   * - "repositorydetermined": (default) Let the repository determine the behavior.
   * @returns {OpenApiRequestBuilder}
   */
  addACLProperty(repositoryId, objectId, addACEs, options = {}) {
    const { config = {}, ...optionalParameters } = options || {};

    const formattedAddACEs = convertObjectToQueryArrayParams(addACEs);

    const requestBody = {
      cmisaction: 'applyAcl',
      objectId,
      ...formattedAddACEs,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const request = builder.createBrowserRootByRepositoryId(
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
   * It removes a list of  Access Control Entries(ACE) from the Access Control List(ACL) of an object with permissions
   *
   * @param {string} repositoryId - Repository ID
   * @param {string} objectId - Identifier of the object.
   * @param {Array<{ removeACEPrincipal: string, removeACEPermission: Array<'cmis:read'|'cmis:write'|'all'>}>} removeACEs - The list of ACEs to be removed.
   * @param {BaseCmisOptions & { ACLPropagation?: 'objectonly' | 'propagate' | 'repositorydetermined'; }} options
   * @property options.ACLPropagation - Specifies how ACEs should be applied.
   * - "objectonly": Apply ACEs only to the object without changing the ACLs of other objects.
   * - "propagate": Apply ACEs by propagating the changes to all inheriting objects.
   * - "repositorydetermined": (default) Let the repository determine the behavior.
   * @returns {OpenApiRequestBuilder}
   */
  removeACLProperty(repositoryId, objectId, removeACEs, options = {}) {
    const { config = {}, ...optionalParameters } = options || {};

    const formattedRemoveACEs = convertObjectToQueryArrayParams(removeACEs);

    const requestBody = {
      cmisaction: 'applyAcl',
      objectId,
      ...formattedRemoveACEs,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const request = builder.createBrowserRootByRepositoryId(
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
   * Retrieves the Access Control List (ACL) applied to the specified object.
   * The result can be expressed using only CMIS-defined permissions,
   * or it may also include repository-specific permissions.
   *
   * @param {string} objectId - Identifier of the object for which the ACL should be fetched.
   * @param {BaseCmisOptions & { filter?: string, includeAllowableActions?: boolean, redintionFilter?: string }} options - Configuration options for the request.
   * @property {string} [options.filter] - List of property query names to return (e.g., 'cmis:name,amount'). For secondary type properties, use the pattern <secondaryTypeQueryName>.<propertyQueryName>.
   * @property {boolean} [options.includeAllowableActions] - Indicates if allowable actions should be included.
   * @property {boolean} [options.includeACL] - Indicates if the ACL should be included.
   * @property {string} [options.renditionFilter] - Defines which renditions to include. Examples:
   *   - `*`: All renditions.
   *   - `cmis:thumbnail`: Only thumbnails.
   *   - `image/*`: All image renditions.
   *   - `application/pdf,application/x-shockwave-flash`: Web ready renditions.
   *   - `cmis:none`: No renditions (Default).
   *
   * @returns {OpenApiRequestBuilder}
   */
  getACLProperty(
    repositoryId,
    objectId,
    options = {
      filter: '*',
      includeAllowableActions: true,
      includeACL: true,
      redintionFilter: 'cmis:none',
    },
  ) {
    const { config = {}, ...optionalParameters } = options;

    const requestBody = {
      objectId,
      cmisselector: 'object',
      ...this.globalParameters,
      ...optionalParameters,
      includeACL: true,
    };

    const request = builder.getBrowserRootByRepositoryId(
      repositoryId,
      requestBody,
    );

    return this._buildRequest(request, config);
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

    let request;
    if (!options?.folderPath) {
      request = builder.createBrowserRootByRepositoryId(
        repositoryId,
        requestBody,
      );
    } else {
      request = builder.createBrowserRootByRepositoryIdAndDirectoryPath(
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

    let request;
    if (!options?.folderPath) {
      request = builder.createBrowserRootByRepositoryId(
        repositoryId,
        requestBody,
      );
    } else {
      request = builder.createBrowserRootByRepositoryIdAndDirectoryPath(
        repositoryId,
        options.folderPath,
        requestBody,
      );
    }

    return this._buildRequest(request, config);
  }

  /**
   * Creates a copy of a document from the source folder into a targeted folder without changing any properties of the document.
   *
   * @param {string} repositoryId - The Repository ID.
   * @param {string} sourceId - The Object ID that will be copied.
   * @param {string} targetFolderId - The Folder ID where the new object will be created.
   * @param {WriteOptions} options - Options for document creation.
   *
   * @returns {OpenApiRequestBuilder}
   */
  createDocumentFromSource(
    repositoryId,
    sourceId,
    targetFolderId,
    options = {},
  ) {
    const { config = {}, ...optionalParameters } = options;

    const bodyData = {
      cmisaction: 'createDocumentFromSource',
      objectId: targetFolderId,
      sourceId,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const requestBody = jsonToFormdata(bodyData);

    let request;
    request = builder.createBrowserRootByRepositoryId(
      repositoryId,
      requestBody,
    );

    return this._buildRequest(request, config);
  }

  /**
   * Retrieves the version details of a specified object within the CMIS repository.
   *
   * @param {string} repositoryId - Repository ID
   * @param {string} objectId - Identifier of the object.
   * @property {boolean} [options.includeAllowableActions] - Whether to include allowable actions for each child.
   * @returns {OpenApiRequestBuilder}
   */
  getAllVersions(
    repositoryId,
    objectId,
    options = {
      includeAllowableActions: true,
    },
  ) {
    const { config = {}, ...optionalParameters } = options;

    const requestBody = {
      objectId,
      cmisselector: 'versions',
      ...this.globalParameters,
      ...optionalParameters,
    };

    const request = builder.getBrowserRootByRepositoryId(
      repositoryId,
      requestBody,
    );

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

    const request = builder.getBrowserRootByRepositoryId(
      repositoryId,
      requestBody,
    );

    return this._buildRequest(request, config);
  }

  /**
   * Sets a content stream to the content stream of the document and refreshes this object afterwards.
   * If the repository created a new version, this new document is returned. Otherwise, the current document is returned.
   *
   * @param {string} repositoryId - Repository ID
   * @param {string} objectId - The ID of the document.
   * @param {string} filename - The name of the file (e.g., filename.json).
   * @param {any} contentStream - The content stream to be appended to the existing content.
   * @param {BaseCmisOptions & { overwriteFlag?: boolean }} options - Optional parameters to modify the append behavior.
   * @property options.overwriteFlag - Indicates whether content should be overwritten. Defaults to `true`.
   *
   * @returns {OpenApiRequestBuilder}
   */
  setContentStream(
    repositoryId,
    objectId,
    filename,
    contentStream,
    options = {
      overwriteFlag: true,
    },
  ) {
    const { config = {}, ...optionalParameters } = options;

    const bodyData = {
      cmisaction: 'setContent',
      objectId,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const requestBody = jsonToFormdata(bodyData);
    if (contentStream) requestBody.append('content', contentStream, filename);

    const request = builder.createBrowserRootByRepositoryId(
      repositoryId,
      requestBody,
    );

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

    const request = builder.createBrowserRootByRepositoryId(
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
      q: statement,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const request = builder.getBrowserByRepositoryId(repositoryId, parameters);

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

    const request = builder.getBrowserRootByRepositoryId(
      repositoryId,
      requestBody,
    );

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

    const request = builder.createBrowserRootByRepositoryId(
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
   * Create a private working copy (PWC) of the document.
   * @param {string} repositoryId - Repository ID
   * @param {string} objectId - The identiﬁer for the document version object that should be checked out.
   * @param {{includeAllowableActions?: boolean;} & BaseCmisOptions} options - Options for the check-out operation.
   * @returns {OpenApiRequestBuilder}
   */
  checkOut(repositoryId, objectId, options) {
    const { config = {}, ...optionalParameters } = options || {};

    const requestBody = {
      cmisaction: 'checkOut',
      objectId,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const request = builder.createBrowserRootByRepositoryId(
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
   * Checks in the document that was checked out as a private working copy (PWC).
   *
   * @param {string} repositoryId - Repository ID
   * @param {string} objectId The identifier for the Private Working Copy.
   * @param { { major?: boolean; checkinComment?: string; } & WriteOptions } options - Options for the check-in operation.
   * @property options.major If `true` (default), the checked-in document object will be a major version. If `false`, the checked-in document object will be a minor version.
   * @property options.checkinComment Textual comment associated with the given version. Defaults to "not set" if not provided.
   * @returns {OpenApiRequestBuilder}
   */
  checkIn(
    repositoryId,
    objectId,
    options = {
      major: true,
      checkinComment: 'no comments',
    },
  ) {
    const { cmisProperties, config = {}, ...optionalParameters } = options;
    const allCmisProperties = {
      ...convertObjectToCmisProperties(cmisProperties || {}),
    };

    const requestBody = {
      cmisaction: 'checkIn',
      objectId,
      ...allCmisProperties,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const request = builder.createBrowserRootByRepositoryId(
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
   * Reverses the eﬀect of a check-out
   * Removes the Private Working Copy of the checked-out document, allowing other documents in the version series to be checked out again.
   * If the private working copy has been created by createDocument, cancelCheckOut will delete the created document.
   *
   * @param {string} repositoryId - Repository ID
   * @param {string} objectId - The identiﬁer of the Private Working Copy.
   * @param {BaseCmisOptions} options - Additional options.
   * @returns {OpenApiRequestBuilder}
   */
  cancelCheckOut(repositoryId, objectId, options) {
    const { config = {}, ...optionalParameters } = options || {};

    const requestBody = {
      cmisaction: 'cancelCheckOut',
      objectId,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const request = builder.createBrowserRootByRepositoryId(
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
   * Updates properties and secondary types of the specified object.
   * All properties passed to updateProperties be updated to their new values.
   * Properties that are passed without a value will be set to their default value or un-set if no default value is defined.
   * All others property values remain untouched.
   *
   * @param {string} repositoryId - Repository ID
   * @param {string} objectId - Object that should be updated
   * @param {WriteOptions} options
   * @returns {OpenApiRequestBuilder}
   */
  updateProperties(repositoryId, objectId, options) {
    const {
      cmisProperties,
      config = {},
      ...optionalParameters
    } = options || {};
    const allCmisProperties = {
      ...convertObjectToCmisProperties(cmisProperties || {}),
    };

    const requestBody = {
      cmisaction: 'update',
      objectId,
      ...allCmisProperties,
      ...this.globalParameters,
      ...optionalParameters,
    };

    const request = builder.createBrowserRootByRepositoryId(
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
