"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDocumentApi = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'CreateDocumentApi'.
 * This API is part of the 'CreateDocumentApi' service.
 */
exports.CreateDocumentApi = {
    /**
     * It creates a document object of the speciﬁed type (given by the cmis:objectTypeId property) in the root folder.
     * @param repositoryId - The repository to be used is identified using repository id
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    createBrowserRootByRepositoryId: (repositoryId, body) => new openapi_1.OpenApiRequestBuilder('post', '/browser/{repositoryId}/root', {
        pathParameters: { repositoryId },
        body
    }),
    /**
     * It creates a document object of the speciﬁed type (given by the cmis:objectTypeId property) in the speciﬁed location.
     * @param repositoryId - The repository to be used is identified using repository id
     * @param directoryPath - The folder path to create the document object.
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    createBrowserRootByRepositoryIdAndDirectoryPath: (repositoryId, directoryPath, body) => new openapi_1.OpenApiRequestBuilder('post', '/browser/{repositoryId}/root/{directoryPath}', {
        pathParameters: { repositoryId, directoryPath },
        body
    })
};
//# sourceMappingURL=create-document-api.js.map