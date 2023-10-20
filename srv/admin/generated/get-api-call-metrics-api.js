"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAPICallMetricsApi = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'GetAPICallMetricsApi'.
 * This API is part of the 'AdminAPI' service.
 */
exports.GetAPICallMetricsApi = {
    /**
     * A successful response to the GET request returns the number of API calls made by the service instance. By default, you see the API calls that are made in the current month by each tenant that consumes the service instance.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    getRestV2UsageApi: () => new openapi_1.OpenApiRequestBuilder('get', '/rest/v2/usage/api')
};
//# sourceMappingURL=get-api-call-metrics-api.js.map