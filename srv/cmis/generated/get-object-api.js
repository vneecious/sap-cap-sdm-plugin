"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetObjectApi = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'GetObjectApi'.
 * This API is part of the 'GetObjectApi' service.
 */
exports.GetObjectApi = {
  /**
   * It provides the information for the specified object in the root folder of repository where the object can be of folder, link, document type.
   * @param repositoryId - The repository to be used is identified using repository id
   * @param queryParameters - Object containing the following keys: cmisselector, objectId, filter, maxItems, skipCount, includeAllowableActions, includeRelationships, renditionFilter, succinct, includePolicyIds, includeACL.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getBrowserRootByRepositoryId: (repositoryId, queryParameters) =>
    new openapi_1.OpenApiRequestBuilder("get", "/browser/{repositoryId}/root", {
      pathParameters: { repositoryId },
      queryParameters,
    }),
  /**
   * It provides the information for the specified object where the object can be of folder, link, document type.
   * @param repositoryId - The repository to be used is identified using repository id
   * @param directoryPath - The folder path to get the object.
   * @param queryParameters - Object containing the following keys: cmisselector, objectId, filter, maxItems, skipCount, includeAllowableActions, includeRelationships, renditionFilter, succinct, includePolicyIds, includeACL.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getBrowserRootByRepositoryIdAndDirectoryPath: (
    repositoryId,
    directoryPath,
    queryParameters
  ) =>
    new openapi_1.OpenApiRequestBuilder(
      "get",
      "/browser/{repositoryId}/root/{directoryPath}",
      {
        pathParameters: { repositoryId, directoryPath },
        queryParameters,
      }
    ),
};
