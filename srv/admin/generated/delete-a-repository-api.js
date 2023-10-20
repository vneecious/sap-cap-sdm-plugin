"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteARepositoryApi = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'DeleteARepositoryApi'.
 * This API is part of the 'AdminAPI' service.
 */
exports.DeleteARepositoryApi = {
    /**
     * A successful response to the DELETE request removes the onboard repository with an unique ID.
     * @param id - Repository id
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    deleteRestV2RepositoriesById: (id) => new openapi_1.OpenApiRequestBuilder('delete', '/rest/v2/repositories/{id}', {
        pathParameters: { id }
    })
};
//# sourceMappingURL=delete-a-repository-api.js.map