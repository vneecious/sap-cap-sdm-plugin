'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FetchRepositoryApi = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require('@sap-cloud-sdk/openapi');
/**
 * Representation of the 'FetchRepositoryApi'.
 * This API is part of the 'ServiceAPI' service.
 */
exports.FetchRepositoryApi = {
  /**
   * Provides detailed information of all the Content Management Interoperability Services(CMIS) repositories linked to an instance with all the necessary information for connecting to them. Response is an object with key as repoID and value will be an object with all necessary information of the repo.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getBrowser: () => new openapi_1.OpenApiRequestBuilder('get', '/browser'),
};
//# sourceMappingURL=fetch-repository-api.js.map
