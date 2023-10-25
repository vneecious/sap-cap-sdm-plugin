"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppendContentStreamApi = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'AppendContentStreamApi'.
 * This API is part of the 'AppendContentStreamApi' service.
 */
exports.AppendContentStreamApi = {
    /**
     * Appends a content stream to the content stream of the document and refreshes this object afterwards. If the repository created a new version, this new document is returned. Otherwise the current document is returned
     * @param repositoryId - The repository to be used is identified using repository id
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    createBrowserRootByRepositoryId: (repositoryId, body) => new openapi_1.OpenApiRequestBuilder('post', '/browser/{repositoryId}/root/', {
        pathParameters: { repositoryId },
        body
    })
};
//# sourceMappingURL=append-content-stream-api.js.map