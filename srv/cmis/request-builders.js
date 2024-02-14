const { OpenApiRequestBuilder } = require('@sap-cloud-sdk/openapi');

class CmisRequestBuilder extends OpenApiRequestBuilder {
  constructor(method, pathPattern, parameters) {
    super(method, pathPattern, parameters);
  }

  /**
   * The original getPath encodeURIComponent for all path parameters.
   * In this case, we want to keep the directoryPath as is.
   */
  getPath() {
    const pathParameters = this.parameters?.pathParameters || {};
    const placeholders = this.pathPattern.match(/{[^/?#{}]+}/g) || [];
    return placeholders.reduce((path, placeholder) => {
      const strippedPlaceholder = placeholder.slice(1, -1);
      const parameterValue = pathParameters[strippedPlaceholder];

      // keep directoryPath as is
      const encodedValue =
        strippedPlaceholder === 'directoryPath'
          ? parameterValue
          : encodeURIComponent(parameterValue);

      return path.replace(placeholder, encodedValue);
    }, this.pathPattern);
  }
}

/**
 * GET from repository root
 * @param {*} repositoryId
 * @param {*} queryParameters
 * @returns
 */
const getBrowserRootByRepositoryId = (repositoryId, queryParameters) =>
  new CmisRequestBuilder('get', '/browser/{repositoryId}/root', {
    pathParameters: { repositoryId },
    queryParameters,
  });

/**
 * GET from repository root + directory path
 * @param {*} repositoryId
 * @param {*} queryParameters
 * @returns
 */
const getBrowserRootByRepositoryIdAndDirectoryPath = (
  repositoryId,
  directoryPath,
  queryParameters,
) =>
  new CmisRequestBuilder(
    'get',
    '/browser/{repositoryId}/root/{directoryPath}',
    {
      pathParameters: { repositoryId, directoryPath },
      queryParameters,
    },
  );

const getBrowserByRepositoryId = (repositoryId, queryParameters) =>
  new CmisRequestBuilder('get', '/browser/{repositoryId}', {
    pathParameters: { repositoryId },
    queryParameters,
  });

/**
 * POST to repository root
 * @param {*} repositoryId
 * @param {*} queryParameters
 * @returns
 */
const createBrowserRootByRepositoryId = (repositoryId, body) =>
  new CmisRequestBuilder('post', '/browser/{repositoryId}/root', {
    pathParameters: { repositoryId },
    body,
  });

/**
 * POST to repository root + directory path
 * @param {*} repositoryId
 * @param {*} queryParameters
 * @returns
 */
const createBrowserRootByRepositoryIdAndDirectoryPath = (
  repositoryId,
  directoryPath,
  body,
) =>
  new CmisRequestBuilder(
    'post',
    '/browser/{repositoryId}/root/{directoryPath}',
    {
      pathParameters: { repositoryId, directoryPath },
      body,
    },
  );

module.exports = {
  getBrowserRootByRepositoryId,
  getBrowserRootByRepositoryIdAndDirectoryPath,
  getBrowserByRepositoryId,
  createBrowserRootByRepositoryId,
  createBrowserRootByRepositoryIdAndDirectoryPath,
};
