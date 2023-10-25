"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryOffBoardApi = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'RepositoryOffBoardApi'.
 * This API is part of the 'AdminAPI' service.
 */
exports.RepositoryOffBoardApi = {
    /**
     * A successful response to the POST request returns the repository off-board recorded.
     * @param id - Repository id
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    createRestV2RepositoryOffBoardIdCmisactionRepositoryOffBoard: (id) => new openapi_1.OpenApiRequestBuilder('post', '/rest/v2/repositoryOffBoard/{id}?cmisaction=repositoryOffBoard', {
        pathParameters: { id }
    })
};
//# sourceMappingURL=repository-off-board-api.js.map