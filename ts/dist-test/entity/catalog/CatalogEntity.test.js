"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('CatalogEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when NYC_OPEN_DATA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('NYC_OPEN_DATA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.NycOpenDataSDK.test();
        const ent = testsdk.Catalog();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.NYC_OPEN_DATA_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'catalog.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "catalog", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/catalog/v1", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "agency", "or": "agency", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "category", "or": "category", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": 10, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "k": "query", "n": "q", "or": "q", "r": false, "t": "`$STRING`", "index$": 4 }, { "a": true, "ex": "relevance", "k": "query", "n": "sort", "or": "sort", "r": false, "t": "`$STRING`", "index$": 5 }] }, "k": "http", "m": "GET", "o": "/api/catalog/v1", "q": { "$action": "v1", "exist": ["agency", "category", "limit", "offset", "q", "sort"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "catalog" }, { "lit": "v1" }], "t": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "catalog", "name__orig": "catalog", "Name": "Catalog", "name_": "catalog", "name-": "catalog", "NAME": "CATALOG", "index$": 0 }, { "active": true, "entity": "catalog", "key$": "BasicCatalogFlow", "kind": "basic", "name": "BasicCatalogFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "catalog_ref01" } }], "index$": 0 }] }, 'Catalog', { "GET /api/catalog/v1": { "protocol": "http", "parameters": [{ "name": "q", "in": "query", "description": "Search query to filter datasets", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "agency", "in": "query", "description": "Filter datasets by NYC agency", "required": false, "schema": { "type": "string" }, "index$": 1 }, { "name": "category", "in": "query", "description": "Filter datasets by category (e.g., Business, Education, Environment)", "required": false, "schema": { "type": "string", "enum": ["Business", "Education", "Environment", "Health", "Transportation", "Public Safety", "Recreation", "Social Services"] }, "index$": 2 }, { "name": "limit", "in": "query", "description": "Number of results to return", "required": false, "schema": { "type": "integer", "default": 10, "minimum": 1, "maximum": 100 }, "index$": 3 }, { "name": "offset", "in": "query", "description": "Number of results to skip for pagination", "required": false, "schema": { "type": "integer", "default": 0, "minimum": 0 }, "index$": 4 }, { "name": "sort", "in": "query", "description": "Sort order for results", "required": false, "schema": { "type": "string", "enum": ["relevance", "newest", "popular", "alphabetical"], "default": "relevance" }, "index$": 5 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let catalog_ref01_data = Object.values(setup.data.existing.catalog)[0];
        // LIST
        const catalog_ref01_ent = client.Catalog();
        const catalog_ref01_match = {};
        const catalog_ref01_list = (await catalog_ref01_ent.list(catalog_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/catalog/CatalogTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.NycOpenDataSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['catalog01', 'catalog02', 'catalog03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'NYC_OPEN_DATA_TEST_CATALOG_ENTID': idmap,
        'NYC_OPEN_DATA_TEST_LIVE': 'FALSE',
        'NYC_OPEN_DATA_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['NYC_OPEN_DATA_TEST_CATALOG_ENTID'];
    const live = 'TRUE' === env.NYC_OPEN_DATA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['NYC_OPEN_DATA_TEST_CATALOG_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.NycOpenDataSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.NYC_OPEN_DATA_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=CatalogEntity.test.js.map