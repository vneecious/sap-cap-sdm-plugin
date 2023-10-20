"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryOffBoardStatusApi = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'RepositoryOffBoardStatusApi'.
 * This API is part of the 'AdminAPI' service.
 */
exports.RepositoryOffBoardStatusApi = {
    /**
     * A successful response to the GET request for repository off-board status.
     * @param id - Repository id
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    getRestV2RepositoryOffBoardIdCmisselectorRepositoryStatus: (id) => new openapi_1.OpenApiRequestBuilder('get', '/rest/v2/repositoryOffBoard/{id}?cmisselector=repositoryStatus', {
        pathParameters: { id }
    })
};
//# sourceMappingURL=repository-off-board-status-api.js.map