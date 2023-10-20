"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateConfigApi = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'CreateConfigApi'.
 * This API is part of the 'AdminAPI' service.
 */
exports.CreateConfigApi = {
    /**
     * A successful response to the POST request creates a Config based on the sending parameters.
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    createRestV2Configs: (body) => new openapi_1.OpenApiRequestBuilder('post', '/rest/v2/configs', {
        body
    })
};
//# sourceMappingURL=create-config-api.js.map