"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CMISQueryApi = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'CMISQueryApi'.
 * This API is part of the 'CMISQueryApi' service.
 */
exports.CMISQueryApi = {
  /**
   * It provides a type-based query service for discovering objects that match speciﬁed criteria, by deﬁning a read-only projection of the CMIS data model into a relational view Through this relational view, queries may be performed via a simpliﬁed SQL SELECT statement.
   * @param repositoryId - The repository to be used is identified using repository id
   * @param queryParameters - Object containing the following keys: cmisSelector, q.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getBrowserByRepositoryId: (repositoryId, queryParameters) =>
    new openapi_1.OpenApiRequestBuilder("get", "/browser/{repositoryId}", {
      pathParameters: { repositoryId },
      queryParameters,
    }),
};
