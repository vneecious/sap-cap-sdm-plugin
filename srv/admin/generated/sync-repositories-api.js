"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncRepositoriesApi = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'SyncRepositoriesApi'.
 * This API is part of the 'AdminAPI' service.
 */
exports.SyncRepositoriesApi = {
    /**
     * A successful  response to the GET request, you can sync the metadata of the repositories as an administrator with Document Management, integration option.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    getRestV2RepositoriesSync: () => new openapi_1.OpenApiRequestBuilder('get', '/rest/v2/repositories/sync')
};
//# sourceMappingURL=sync-repositories-api.js.map