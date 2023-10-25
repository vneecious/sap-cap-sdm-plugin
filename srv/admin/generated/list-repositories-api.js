"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListRepositoriesApi = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'ListRepositoriesApi'.
 * This API is part of the 'AdminAPI' service.
 */
exports.ListRepositoriesApi = {
    /**
     * Retrieve all onboarded repositories. When only one repository is onboarded, the response will be an object and when there are 2 or more repositories, the response will be an array.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    getRestV2Repositories: () => new openapi_1.OpenApiRequestBuilder('get', '/rest/v2/repositories')
};
//# sourceMappingURL=list-repositories-api.js.map