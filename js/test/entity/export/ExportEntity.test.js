
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const { createLiveTransport } = require('../../live-runner')
const { runLiveEntity } = require('../../live-entity')


const { MixpanelExportSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('ExportEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MIXPANEL_EXPORT_TEST_LIVE=TRUE.
  afterEach(liveDelay('MIXPANEL_EXPORT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MixpanelExportSDK.test()
    const ent = testsdk.Export()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"export","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"header":[{"active":true,"kind":"header","name":"accept_encoding","orig":"accept_encoding","reqd":false,"type":"`$STRING`"}],"query":[{"active":true,"example":"[\"signup\",\"purchase\"]","kind":"query","name":"event","orig":"event","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"from_date","orig":"from_date","reqd":true,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":2},{"active":true,"kind":"query","name":"project_id","orig":"project_id","reqd":false,"type":"`$INTEGER`","index$":3},{"active":true,"kind":"query","name":"time_in_m","orig":"time_in_m","reqd":false,"type":"`$BOOLEAN`","index$":4},{"active":true,"kind":"query","name":"to_date","orig":"to_date","reqd":true,"type":"`$STRING`","index$":5},{"active":true,"kind":"query","name":"where","orig":"where","reqd":false,"type":"`$STRING`","index$":6}]},"contract":{"id":"GET /export","json":"{\"operationId\":\"raw-event-export\",\"parameters\":[{\"description\":\"Required if using service account to authenticate request.\",\"in\":\"query\",\"name\":\"project_id\",\"schema\":{\"type\":\"integer\"}},{\"description\":\"The date in yyyy-mm-dd format to begin querying from. This date is inclusive and interpreted as UTC timezone for projects created after 1 January 2023 and current project timezone for projects created before 11 January 2023.\",\"in\":\"query\",\"name\":\"from_date\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The date in yyyy-mm-dd format to query to. This date is inclusive and interpreted as UTC timezone for projects created after 1 January 2023 and current project timezone for projects created before 11 January 2023.\",\"in\":\"query\",\"name\":\"to_date\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Use this parameter if you want to limit the max number of events to be returned. Value cannot be over 100000.\",\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"type\":\"integer\"}},{\"description\":\"The event or events that you wish to get data for, encoded as a JSON array (for example, `[\\\"signup\\\",\\\"purchase\\\"]`).\",\"in\":\"query\",\"name\":\"event\",\"schema\":{\"example\":\"[\\\"signup\\\",\\\"purchase\\\"]\",\"type\":\"string\"}},{\"description\":\"An expression to filter events by. More info on expression sequence structure can be found [here](/reference/segmentation-expressions)\",\"in\":\"query\",\"name\":\"where\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Defaults to `false` which will export event timestamps with second-precision.\\nSet to `true` to export event timestamps with millisecond-precision.\",\"in\":\"query\",\"name\":\"time_in_ms\",\"schema\":{\"type\":\"boolean\"}},{\"description\":\"If set to `gzip` and the response body is > 1400 bytes, the response will be compressed with gzip, and `Content-Encoding` will be set to `gzip`.\",\"in\":\"header\",\"name\":\"Accept-Encoding\",\"schema\":{\"enum\":[\"gzip\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"text/plain\":{\"schema\":{\"description\":\"Newline delimited JSON ([JSONL](http://jsonlines.org))\",\"example\":\"{\\\"event\\\":\\\"Signed up\\\",\\\"properties\\\":{\\\"time\\\":1602611311,\\\"$insert_id\\\":\\\"hpuDqcvpltpCjBsebtxwadtEBDnFAdycabFb\\\",\\\"mp_processing_time_ms\\\":1602625711874}}\\n{\\\"event\\\":\\\"Signed up\\\",\\\"properties\\\":{\\\"time\\\":1602787121,\\\"$insert_id\\\":\\\"jajcebutltmvhbbholfhxtCcycwnBjDtndha\\\",\\\"mp_processing_time_ms\\\":1602801521561}}\\n\",\"type\":\"string\"}}},\"description\":\"Success. The returned format is one event per line where each line is a valid JSON object, but the full return itself is JSONL.\"}},\"security\":[{\"ProjectSecret\":[]}],\"securitySchemes\":{\"OAuthToken\":{\"description\":\"OAuth Token\",\"scheme\":\"bearer\",\"type\":\"http\"},\"ProjectSecret\":{\"description\":\"Project Secret\",\"scheme\":\"basic\",\"type\":\"http\"},\"ServiceAccount\":{\"description\":\"Service Account\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/export","segments":[{"lit":"export"}],"select":{"exist":["accept_encoding","event","from_date","limit","project_id","time_in_m","to_date","where"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"export","name__orig":"export","Name":"Export","name_":"export","name-":"export","NAME":"EXPORT","index$":0}, {"active":true,"entity":"export","key$":"BasicExportFlow","kind":"basic","name":"BasicExportFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"export_ref01","srcdatavar":"export_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-export_ref01"}}],"index$":0}]}, 'Export')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let export_ref01_data = Object.values(setup.data.existing.export)[0]

    // LOAD
    const export_ref01_ent = client.Export()
    const export_ref01_match_dt0 = {}
    const export_ref01_data_dt0 = (await export_ref01_ent.load(export_ref01_match_dt0)).data()
    assert(null != export_ref01_data_dt0)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/export/ExportTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = MixpanelExportSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['export01','export02','export03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MIXPANEL_EXPORT_TEST_EXPORT_ENTID': idmap,
    'MIXPANEL_EXPORT_TEST_LIVE': 'FALSE',
    'MIXPANEL_EXPORT_TEST_EXPLAIN': 'FALSE',
    'MIXPANEL_EXPORT_APIKEY': '',
    'MIXPANEL_EXPORT_SERVER_SERVER': "data",
  })

  idmap = env['MIXPANEL_EXPORT_TEST_EXPORT_ENTID']

  const live = 'TRUE' === env.MIXPANEL_EXPORT_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MIXPANEL_EXPORT_TEST_EXPORT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new MixpanelExportSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.MIXPANEL_EXPORT_APIKEY,
        server: {
          server: env.MIXPANEL_EXPORT_SERVER_SERVER,
        },
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when
      // the last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey and
      // server values above and handed the SDK undefined.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
