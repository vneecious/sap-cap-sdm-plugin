"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConfigApi = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'UpdateConfigApi'.
 * This API is part of the 'AdminAPI' service.
 */
exports.UpdateConfigApi = {
    /**
     * A successful response to the PUT request reflects the updated parameters for your Config.
     * @param id - Config Id
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    updateRestV2ConfigsById: (id, body) => new openapi_1.OpenApiRequestBuilder('put', '/rest/v2/configs/{id}', {
        pathParameters: { id },
        body
    })
};
//# sourceMappingURL=update-config-api.js.map