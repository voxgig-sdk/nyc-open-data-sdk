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
            "limit": 10,
            "offset": 0,
            "q": "v1",
            "sort": "relevance"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "q",
            "agency",
            "category",
            "limit",
            "offset",
            "sort"
        ],
        "queryArgs": [
            {
                "name": "agency",
                "wire": "agency"
            },
            {
                "name": "category",
                "wire": "category"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "offset",
                "wire": "offset"
            },
            {
                "name": "q",
                "wire": "q"
            },
            {
                "name": "sort",
                "wire": "sort"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "resultSetSize": 1,
            "results": [
                {
                    "resource": {
                        "id": "x",
                        "name": "x",
                        "description": "x",
                        "type": "x",
                        "category": "x",
                        "agency": "x",
                        "createdAt": "2026-01-01T00:00:00Z",
                        "updatedAt": "2026-01-01T00:00:00Z",
                        "viewCount": 1,
                        "downloadCount": 1,
                        "permalink": "x",
                        "columns": [
                            {
                                "fieldName": "x",
                                "dataTypeName": "x",
                                "description": "x"
                            }
                        ]
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