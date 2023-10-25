"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchARepositoryApi = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'FetchARepositoryApi'.
 * This API is part of the 'AdminAPI' service.
 */
exports.FetchARepositoryApi = {
    /**
     * A successful response to the GET request for a given repository ID returns the details of that particular repository.
     * @param id - Repository id
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    getRestV2RepositoriesById: (id) => new openapi_1.OpenApiRequestBuilder('get', '/rest/v2/repositories/{id}', {
        pathParameters: { id }
    })
};
//# sourceMappingURL=fetch-a-repository-api.js.map