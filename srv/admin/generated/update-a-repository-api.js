"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateARepositoryApi = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'UpdateARepositoryApi'.
 * This API is part of the 'AdminAPI' service.
 */
exports.UpdateARepositoryApi = {
    /**
     * A successful response to the PUT request that reflects the updated parameters for your repository.
     * @param id - Repository id
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    updateRestV2RepositoriesById: (id, body) => new openapi_1.OpenApiRequestBuilder('put', '/rest/v2/repositories/{id}', {
        pathParameters: { id },
        body
    })
};
//# sourceMappingURL=update-a-repository-api.js.map