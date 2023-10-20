"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadOffBoardedRepositoryApi = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'DownloadOffBoardedRepositoryApi'.
 * This API is part of the 'AdminAPI' service.
 */
exports.DownloadOffBoardedRepositoryApi = {
    /**
     * A successful response to the GET request to download the off-boarded repository.
     * @param id - Repository id
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    getRestV2RepositoryOffBoardIdCmisactionGetRepositoryDocument: (id) => new openapi_1.OpenApiRequestBuilder('get', '/rest/v2/repositoryOffBoard/{id}?cmisaction=getRepositoryDocument', {
        pathParameters: { id }
    })
};
//# sourceMappingURL=download-off-boarded-repository-api.js.map