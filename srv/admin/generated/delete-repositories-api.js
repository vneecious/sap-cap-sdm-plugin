"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRepositoriesApi = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'DeleteRepositoriesApi'.
 * This API is part of the 'AdminAPI' service.
 */
exports.DeleteRepositoriesApi = {
    /**
     * A successful response to the DELETE request removes all onboard repositories.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    deleteRestV2Repositories: () => new openapi_1.OpenApiRequestBuilder('delete', '/rest/v2/repositories')
};
//# sourceMappingURL=delete-repositories-api.js.map