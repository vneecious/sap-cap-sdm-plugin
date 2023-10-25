"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadAFileApi = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'DownloadAFileApi'.
 * This API is part of the 'DownloadFileApi' service.
 */
exports.DownloadAFileApi = {
  /**
   * This request helps in downloading a file. It returns requested document content directly or redirects to a URL that provides the document content.
   * @param repositoryId - The repository to be used is identified using repository id
   * @param queryParameters - Object containing the following keys: cmisselector, download, filename, objectId.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getBrowserRootByRepositoryId: (repositoryId, queryParameters) =>
    new openapi_1.OpenApiRequestBuilder("get", "/browser/{repositoryId}/root", {
      pathParameters: { repositoryId },
      queryParameters,
    }),
};
