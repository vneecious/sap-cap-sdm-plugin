"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncARepositoryApi = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'SyncARepositoryApi'.
 * This API is part of the 'AdminAPI' service.
 */
exports.SyncARepositoryApi = {
    /**
     * A successful  response to the GET request, you can sync the metadata of a repository as an administrator with Document Management, integration option.
     * @param id - Repository id
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    getRestV2RepositoriesSyncById: (id) => new openapi_1.OpenApiRequestBuilder('get', '/rest/v2/repositories/sync/{id}', {
        pathParameters: { id }
    })
};
//# sourceMappingURL=sync-a-repository-api.js.map