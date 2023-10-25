"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteObjectApi = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'DeleteObjectApi'.
 * This API is part of the 'DeleteObjectApi' service.
 */
exports.DeleteObjectApi = {
  /**
   * It deletes the specified objects and all of it's properties present in a repository
   * @param repositoryId - The repository to be used is identified using repository id
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  createBrowserRootByRepositoryId: (repositoryId, body) =>
    new openapi_1.OpenApiRequestBuilder(
      "post",
      "/browser/{repositoryId}/root",
      {
        pathParameters: { repositoryId },
        body,
      }
    ),
};
