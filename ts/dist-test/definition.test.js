"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "catalog",
        "accessor": "Catalog",
        "op": "list",
        "method": "GET",
        "path": "/api/catalog/v1",
        "action": "v1",
        "args": [],
        "select": {
            "agency": "v1",
            "category": "v1",
            "limit": "v1",
            "offset": "v1",
            "q": "v1",
            "sort": "v1"
        },
        "headers": [],
        "query": [
            "q",
            "agency",
            "category",
            "limit",
            "offset",
            "sort"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "resultSetSize": 1,
            "results": [
                {
                    "resource": {
                        "agency": "x",
                        "category": "x",
                        "columns": [
                            {
                                "dataTypeName": "x",
                                "description": "x",
                                "fieldName": "x"
                            }
                        ],
                        "createdAt": "2026-01-01T00:00:00Z",
                        "description": "x",
                        "downloadCount": 1,
                        "id": "x",
                        "name": "x",
                        "permalink": "x",
                        "type": "x",
                        "updatedAt": "2026-01-01T00:00:00Z",
                        "viewCount": 1
                    }
                }
            ]
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map