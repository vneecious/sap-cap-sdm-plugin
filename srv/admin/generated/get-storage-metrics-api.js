"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStorageMetricsApi = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'GetStorageMetricsApi'.
 * This API is part of the 'AdminAPI' service.
 */
exports.GetStorageMetricsApi = {
    /**
     * A successful response to the GET request  returns the bytes that are consumed by the service instance. By default, you see the bytes consumed by each repository of the consuming tenants of the service instance, in the current month.
     * @param queryParameters - Object containing the following keys: unit, fromMonth, fromYear.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    getRestV2UsageStorage: (queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/rest/v2/usage/storage', {
        queryParameters
    })
};
//# sourceMappingURL=get-storage-metrics-api.js.map