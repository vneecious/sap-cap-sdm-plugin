const { OpenApiRequestBuilder } = require('@sap-cloud-sdk/openapi');

module.exports = class SdmAdmin extends cds.Service {
  constructor(args) {
    super(args);
  }

  /**
   * Retrieve all onboarded repositories. When only one repository is onboarded, the response will be an object and when there are 2 or more repositories, the response will be an array.
   * @returns {OpenApiRequestBuilder} - The request builder, use the `execute()` method to trigger the request.
   */
  listRepositories() {
    return new OpenApiRequestBuilder('get', '/rest/v2/repositories');
  }

  /**
   * Connect your Document Management, integration option instance with Document Management, repository option for the file storage.
   * @param {Object} body - Request body.
   * @returns {OpenApiRequestBuilder} - The request builder, use the `execute()` method to trigger the request.
   */
  onboardARepository(body) {
    return new OpenApiRequestBuilder('post', '/rest/v2/repositories', {
      body,
    });
  }

  /**
   * A successful response to the DELETE request removes all onboard repositories.
   * @returns {OpenApiRequestBuilder} - The request builder, use the `execute()` method to trigger the request.
   */
  deleteRepositories() {
    return new OpenApiRequestBuilder('delete', '/rest/v2/repositories');
  }

  /**
   * A successful response to the PUT request that reflects the updated parameters for your repository.
   * @param {string} id - Repository id
   * @param {Object} body - Request body.
   * @param {Object} body.repository - Repository object.
   * @param {string} body.repository.description - Description of the repository.
   * @param {boolean} body.repository.isVirusScanEnabled - Flag indicating whether virus scanning is enabled.
   * @param {boolean} body.repository.skipVirusScanForLargeFile - Flag indicating whether to skip virus scanning for large files.
   * @returns {OpenApiRequestBuilder} The request builder, use the `execute()` method to trigger the request.
   */

  updateARepository(id, body) {
    return new OpenApiRequestBuilder('put', '/rest/v2/repositories/{id}', {
      pathParameters: { id },
      body,
    });
  }

  /**
   * A successful response to the GET request for a given repository ID returns the details of that particular repository.
   * @param id - Repository id
   * @returns {OpenApiRequestBuilder} - The request builder, use the `execute()` method to trigger the request.
   */
  fetchARepository(id) {
    return new OpenApiRequestBuilder('get', '/rest/v2/repositories/{id}', {
      pathParameters: { id },
    });
  }

  /**
   * A successful response to the DELETE request removes the onboard repository with an unique ID.
   * @param {string} id - Repository id
   * @returns {OpenApiRequestBuilder} - The request builder, use the `execute()` method to trigger the request.
   */
  deleteARepository(id) {
    return new OpenApiRequestBuilder('delete', '/rest/v2/repositories/{id}', {
      pathParameters: { id },
    });
  }

  /**
   * A successful  response to the GET request, you can sync the metadata of the repositories as an administrator with Document Management, integration option.
   * @returns {OpenApiRequestBuilder} - The request builder, use the `execute()` method to trigger the request.
   */
  syncRepositories() {
    return new OpenApiRequestBuilder('get', '/rest/v2/repositories/sync');
  }

  /**
   * A successful  response to the GET request, you can sync the metadata of a repository as an administrator with Document Management, integration option.
   * @param id - Repository id
   * @returns {OpenApiRequestBuilder} - The request builder, use the `execute()` method to trigger the request.
   */
  syncARepository(id) {
    return new OpenApiRequestBuilder('get', '/rest/v2/repositories/sync/{id}', {
      pathParameters: { id },
    });
  }

  /**
   * A successful response to the GET request returns the number of all repositories you've added.
   * @returns {OpenApiRequestBuilder} - The request builder, use the `execute()` method to trigger the request.
   */
  countRepositories() {
    return new OpenApiRequestBuilder('get', '/rest/v2/repositories/count');
  }
  /**
   * A successful response to the GET request returns the number of API calls made by the service instance. By default, you see the API calls that are made in the current month by each tenant that consumes the service instance.
   * @returns {OpenApiRequestBuilder} - The request builder, use the `execute()` method to trigger the request.
   */
  getAPICallMetrics() {
    return new OpenApiRequestBuilder('get', '/rest/v2/usage/api');
  }

  /**
   * A successful response to the GET request  returns the bytes that are consumed by the service instance. By default, you see the bytes consumed by each repository of the consuming tenants of the service instance, in the current month.
   * @param {string} unit
   * @param {string} fromMonth
   * @param {string} fromYear
   * @returns {OpenApiRequestBuilder} - The request builder, use the `execute()` method to trigger the request.
   */
  getStorageMetrics(unit, fromMonth, fromYear) {
    return new OpenApiRequestBuilder('get', '/rest/v2/usage/storage', {
      unit,
      fromMonth,
      fromYear,
    });
  }

  /**
   * A successful response to the POST request returns the repository off-board recorded.
   * @param id - Repository id
   * @returns {OpenApiRequestBuilder} - The request builder, use the `execute()` method to trigger the request.
   */
  repositoryOffBoard(id) {
    return new OpenApiRequestBuilder(
      'post',
      '/rest/v2/repositoryOffBoard/{id}?cmisaction=repositoryOffBoard',
      {
        pathParameters: { id },
      },
    );
  }

  /**
   * A successful response to the GET request for repository off-board status.
   * @param id - Repository id
   * @returns {OpenApiRequestBuilder} - The request builder, use the `execute()` method to trigger the request.
   */
  repositoryOffBoardStatus(id) {
    return new OpenApiRequestBuilder(
      'get',
      '/rest/v2/repositoryOffBoard/{id}?cmisselector=repositoryStatus',
      {
        pathParameters: { id },
      },
    );
  }

  /**
   * A successful response to the GET request to download the off-boarded repository.
   * @param {string} id
   * @returns {OpenApiRequestBuilder} - The request builder, use the `execute()` method to trigger the request.
   */
  downloadOffBoardedRepository(id) {
    return new OpenApiRequestBuilder(
      'get',
      '/rest/v2/repositoryOffBoard/{id}?cmisaction=getRepositoryDocument',
      {
        pathParameters: { id },
      },
    );
  }

  /**
   * A successful response to the POST request creates a Config based on the sending parameters.
   * @param {Object} body - Request body.
   * @param {string} body.configName - The name of the config.
   * @param {string} body.configValue - The value of the config.
   * @returns {OpenApiRequestBuilder} - The request builder, use the `execute()` method to trigger the request.
   */
  createConfig(body) {
    return new OpenApiRequestBuilder('post', '/rest/v2/configs', {
      body,
    });
  }

  /**
   * A successful response to the GET request returns all Configs.
   * @returns {OpenApiRequestBuilder} - The request builder, use the `execute()` method to trigger the request.
   */
  getConfigs() {
    return new OpenApiRequestBuilder('get', '/rest/v2/configs');
  }

  /**
   * A successful response to the PUT request reflects the updated parameters for your Config.
   * @param {string} id - Config Id
   * @param {Object} body - Request body.
   * @param {string} body.id - Config Id.
   * @param {string} body.configName - The name of the config.
   * @param {string} body.configValue - The value of the config.
   * @param {string} body.serviceInstanceId - Service instance id.
   * @returns {OpenApiRequestBuilder} The request builder; use the `execute()` method to trigger the request.
   */
  updateConfig(id, body) {
    return new OpenApiRequestBuilder('put', '/rest/v2/configs/{id}', {
      pathParameters: { id },
      body,
    });
  }

  /**
   * A successful response to the DELETE request removes the Config.
   * @param {string} id - Config Id
   * @returns {OpenApiRequestBuilder} - The request builder, use the `execute()` method to trigger the request.
   */
  deleteConfig(id) {
    return new OpenApiRequestBuilder('delete', '/rest/v2/configs/{id}', {
      pathParameters: { id },
    });
  }
};
