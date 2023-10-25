"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetConfigsApi = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'GetConfigsApi'.
 * This API is part of the 'AdminAPI' service.
 */
exports.GetConfigsApi = {
    /**
     * A successful response to the GET request returns all Configs.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    getRestV2Configs: () => new openapi_1.OpenApiRequestBuilder('get', '/rest/v2/configs')
};
//# sourceMappingURL=get-configs-api.js.map