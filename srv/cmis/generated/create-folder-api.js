"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFolderApi = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'CreateFolderApi'.
 * This API is part of the 'CreateFolderApi' service.
 */
exports.CreateFolderApi = {
    /**
     * It creates a folder object of the speciﬁed type in the repository's root folder. It should not have repetitive folder names and properties that must be applied to the newly created folder should be present
     * @param repositoryId - The repository to be used is identified using repository id
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    createBrowserRootByRepositoryId: (repositoryId, body) => new openapi_1.OpenApiRequestBuilder('post', '/browser/{repositoryId}/root', {
        pathParameters: { repositoryId },
        body
    }),
    /**
     * It creates a folder object of the speciﬁed type in the speciﬁed location. It should not have repetitive folder names and properties that must be applied to the newly created folder should be present
     * @param repositoryId - The repository to be used is identified using repository id
     * @param directoryPath - Path to create the folder.
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    createBrowserRootByRepositoryIdAndDirectoryPath: (repositoryId, directoryPath, body) => new openapi_1.OpenApiRequestBuilder('post', '/browser/{repositoryId}/root/{directoryPath}', {
        pathParameters: { repositoryId, directoryPath },
        body
    })
};
//# sourceMappingURL=create-folder-api.js.map