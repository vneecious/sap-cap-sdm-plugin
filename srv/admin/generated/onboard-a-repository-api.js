"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardARepositoryApi = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'OnboardARepositoryApi'.
 * This API is part of the 'AdminAPI' service.
 */
exports.OnboardARepositoryApi = {
    /**
     * Connect your Document Management, integration option instance with Document Management, repository option for the file storage.
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    createRestV2Repositories: (body) => new openapi_1.OpenApiRequestBuilder('post', '/rest/v2/repositories', {
        body
    })
};
//# sourceMappingURL=onboard-a-repository-api.js.map