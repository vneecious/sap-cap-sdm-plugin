"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteConfigApi = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'DeleteConfigApi'.
 * This API is part of the 'AdminAPI' service.
 */
exports.DeleteConfigApi = {
    /**
     * A successful response to the DELETE request removes the Config.
     * @param id - Config Id
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    deleteRestV2ConfigsById: (id) => new openapi_1.OpenApiRequestBuilder('delete', '/rest/v2/configs/{id}', {
        pathParameters: { id }
    })
};
//# sourceMappingURL=delete-config-api.js.map