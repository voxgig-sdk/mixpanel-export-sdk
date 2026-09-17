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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ExportEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MIXPANEL_EXPORT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MIXPANEL_EXPORT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MixpanelExportSDK.test();
        const ent = testsdk.Export();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MIXPANEL_EXPORT_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'export.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [], "name": "export", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "header": [{ "active": true, "kind": "header", "name": "accept_encoding", "orig": "accept_encoding", "reqd": false, "type": "`$STRING`" }], "query": [{ "active": true, "example": "[\"signup\",\"purchase\"]", "kind": "query", "name": "event", "orig": "event", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "from_date", "orig": "from_date", "reqd": true, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "limit", "orig": "limit", "reqd": false, "type": "`$INTEGER`", "index$": 2 }, { "active": true, "kind": "query", "name": "project_id", "orig": "project_id", "reqd": false, "type": "`$INTEGER`", "index$": 3 }, { "active": true, "kind": "query", "name": "time_in_m", "orig": "time_in_m", "reqd": false, "type": "`$BOOLEAN`", "index$": 4 }, { "active": true, "kind": "query", "name": "to_date", "orig": "to_date", "reqd": true, "type": "`$STRING`", "index$": 5 }, { "active": true, "kind": "query", "name": "where", "orig": "where", "reqd": false, "type": "`$STRING`", "index$": 6 }] }, "contract": { "id": "GET /export", "json": "{\"operationId\":\"raw-event-export\",\"parameters\":[{\"description\":\"Required if using service account to authenticate request.\",\"in\":\"query\",\"name\":\"project_id\",\"schema\":{\"type\":\"integer\"}},{\"description\":\"The date in yyyy-mm-dd format to begin querying from. This date is inclusive and interpreted as UTC timezone for projects created after 1 January 2023 and current project timezone for projects created before 11 January 2023.\",\"in\":\"query\",\"name\":\"from_date\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The date in yyyy-mm-dd format to query to. This date is inclusive and interpreted as UTC timezone for projects created after 1 January 2023 and current project timezone for projects created before 11 January 2023.\",\"in\":\"query\",\"name\":\"to_date\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Use this parameter if you want to limit the max number of events to be returned. Value cannot be over 100000.\",\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"type\":\"integer\"}},{\"description\":\"The event or events that you wish to get data for, encoded as a JSON array (for example, `[\\\"signup\\\",\\\"purchase\\\"]`).\",\"in\":\"query\",\"name\":\"event\",\"schema\":{\"example\":\"[\\\"signup\\\",\\\"purchase\\\"]\",\"type\":\"string\"}},{\"description\":\"An expression to filter events by. More info on expression sequence structure can be found [here](/reference/segmentation-expressions)\",\"in\":\"query\",\"name\":\"where\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Defaults to `false` which will export event timestamps with second-precision.\\nSet to `true` to export event timestamps with millisecond-precision.\",\"in\":\"query\",\"name\":\"time_in_ms\",\"schema\":{\"type\":\"boolean\"}},{\"description\":\"If set to `gzip` and the response body is > 1400 bytes, the response will be compressed with gzip, and `Content-Encoding` will be set to `gzip`.\",\"in\":\"header\",\"name\":\"Accept-Encoding\",\"schema\":{\"enum\":[\"gzip\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"text/plain\":{\"schema\":{\"description\":\"Newline delimited JSON ([JSONL](http://jsonlines.org))\",\"example\":\"{\\\"event\\\":\\\"Signed up\\\",\\\"properties\\\":{\\\"time\\\":1602611311,\\\"$insert_id\\\":\\\"hpuDqcvpltpCjBsebtxwadtEBDnFAdycabFb\\\",\\\"mp_processing_time_ms\\\":1602625711874}}\\n{\\\"event\\\":\\\"Signed up\\\",\\\"properties\\\":{\\\"time\\\":1602787121,\\\"$insert_id\\\":\\\"jajcebutltmvhbbholfhxtCcycwnBjDtndha\\\",\\\"mp_processing_time_ms\\\":1602801521561}}\\n\",\"type\":\"string\"}}},\"description\":\"Success. The returned format is one event per line where each line is a valid JSON object, but the full return itself is JSONL.\"}},\"security\":[{\"ProjectSecret\":[]}],\"securitySchemes\":{\"OAuthToken\":{\"description\":\"OAuth Token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"ProjectSecret\":{\"description\":\"Project Secret\",\"scheme\":\"basic\",\"type\":\"http\"},\"ServiceAccount\":{\"description\":\"Service Account\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/export", "segments": [{ "lit": "export" }], "select": { "exist": ["accept_encoding", "event", "from_date", "limit", "project_id", "time_in_m", "to_date", "where"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "export", "name__orig": "export", "Name": "Export", "name_": "export", "name-": "export", "NAME": "EXPORT", "index$": 0 }, { "active": true, "entity": "export", "key$": "BasicExportFlow", "kind": "basic", "name": "BasicExportFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "export_ref01", "srcdatavar": "export_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-export_ref01" } }], "index$": 0 }] }, 'Export');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let export_ref01_data = Object.values(setup.data.existing.export)[0];
        // LOAD
        const export_ref01_ent = client.Export();
        const export_ref01_match_dt0 = {};
        const export_ref01_data_dt0 = (await export_ref01_ent.load(export_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != export_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/export/ExportTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MixpanelExportSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['export01', 'export02', 'export03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MIXPANEL_EXPORT_TEST_EXPORT_ENTID': idmap,
        'MIXPANEL_EXPORT_TEST_LIVE': 'FALSE',
        'MIXPANEL_EXPORT_TEST_EXPLAIN': 'FALSE',
        'MIXPANEL_EXPORT_APIKEY': '',
        'MIXPANEL_EXPORT_SECRET': '',
        'MIXPANEL_EXPORT_SERVER_SERVER': "data",
    });
    idmap = env['MIXPANEL_EXPORT_TEST_EXPORT_ENTID'];
    const live = 'TRUE' === env.MIXPANEL_EXPORT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MIXPANEL_EXPORT_TEST_EXPORT_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.MixpanelExportSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.MIXPANEL_EXPORT_APIKEY,
                secret: env.MIXPANEL_EXPORT_SECRET,
                server: {
                    server: env.MIXPANEL_EXPORT_SERVER_SERVER,
                },
            },
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
        explain: 'TRUE' === env.MIXPANEL_EXPORT_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ExportEntity.test.js.map