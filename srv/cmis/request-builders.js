const { OpenApiRequestBuilder } = require('@sap-cloud-sdk/openapi');

/**
 * GET from repository root
 * @param {*} repositoryId
 * @param {*} queryParameters
 * @returns
 */
const getBrowserRootByRepositoryId = (repositoryId, queryParameters) =>
  new OpenApiRequestBuilder('get', '/browser/{repositoryId}/root', {
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
  new OpenApiRequestBuilder(
    'get',
    '/browser/{repositoryId}/root/{directoryPath}',
    {
      pathParameters: { repositoryId, directoryPath },
      queryParameters,
    },
  );

const getBrowserByRepositoryId = (repositoryId, queryParameters) =>
  new OpenApiRequestBuilder('get', '/browser/{repositoryId}', {
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
  new OpenApiRequestBuilder('post', '/browser/{repositoryId}/root', {
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
  new OpenApiRequestBuilder(
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
