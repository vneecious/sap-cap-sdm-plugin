'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __exportStar =
  (this && this.__exportStar) ||
  function (m, exports) {
    for (var p in m)
      if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p))
        __createBinding(exports, m, p);
  };
Object.defineProperty(exports, '__esModule', { value: true });
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
__exportStar(require('./list-repositories-api'), exports);
__exportStar(require('./onboard-a-repository-api'), exports);
__exportStar(require('./delete-repositories-api'), exports);
__exportStar(require('./fetch-a-repository-api'), exports);
__exportStar(require('./update-a-repository-api'), exports);
__exportStar(require('./delete-a-repository-api'), exports);
__exportStar(require('./sync-repositories-api'), exports);
__exportStar(require('./sync-a-repository-api'), exports);
__exportStar(require('./count-repositories-api'), exports);
__exportStar(require('./get-api-call-metrics-api'), exports);
__exportStar(require('./get-storage-metrics-api'), exports);
__exportStar(require('./repository-off-board-api'), exports);
__exportStar(require('./repository-off-board-status-api'), exports);
__exportStar(require('./download-off-boarded-repository-api'), exports);
__exportStar(require('./get-configs-api'), exports);
__exportStar(require('./create-config-api'), exports);
__exportStar(require('./update-config-api'), exports);
__exportStar(require('./delete-config-api'), exports);
// __exportStar(require("./_schema"), exports);
