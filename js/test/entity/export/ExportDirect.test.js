
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')


const { MixpanelExportSDK } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
} = require('../../utility')


describe('ExportDirect', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MIXPANEL_EXPORT_TEST_LIVE=TRUE.
  afterEach(liveDelay('MIXPANEL_EXPORT_TEST_LIVE'))

  test('direct-exists', async () => {
    const sdk = new MixpanelExportSDK({
      // Concrete base: a live construction must satisfy any server
      // variables a templated base URL declares; overriding base with a
      // literal (as the direct flow tests do) sidesteps the requirement.
      base: 'http://localhost:8080',
      system: { fetch: async () => ({}) }
    })
    assert('function' === typeof sdk.direct)
    assert('function' === typeof sdk.prepare)
  })


  test('direct-load-export', async (t) => {
    if (liveScenariosActive()) { t.skip('Covered by live operation scenarios'); return }
    const setup = directSetup({ id: 'direct01' })
    const { client, calls } = setup

    const params = {}
    if (!setup.live) {

    }

    const result = await client.direct({
      path: 'export',
      method: 'GET',
      params,
    })

    assert(result.ok === true)
    assert(setup.live ? result.status >= 200 && result.status < 300 : result.status === 200)
    assert(null != result.data)

    if (!setup.live) {
      assert(result.data.id === 'direct01')
      assert(calls.length === 1)
      assert(calls[0].init.method === 'GET')
    }
  })

})



function liveScenariosActive() { return false && process.env.MIXPANEL_EXPORT_TEST_LIVE === 'TRUE' }
function directSetup(mockres) {
  const calls = []

  const env = envOverride({
    'MIXPANEL_EXPORT_TEST_EXPORT_ENTID': {},
    'MIXPANEL_EXPORT_TEST_LIVE': 'FALSE',
    'MIXPANEL_EXPORT_APIKEY': '',
    'MIXPANEL_EXPORT_SERVER_SERVER': "data",
  })

  const live = 'TRUE' === env.MIXPANEL_EXPORT_TEST_LIVE

  if (live) {
    // Merged so the generated fields win: sdk-test-control.json's
    // test.client.options adds to the live client, it does not redirect it.
    const client = new MixpanelExportSDK(
      Object.assign({}, liveClientOptions(), {
      apikey: env.MIXPANEL_EXPORT_APIKEY,
      server: {
        server: env.MIXPANEL_EXPORT_SERVER_SERVER,
      },
      }))

    let idmap = env['MIXPANEL_EXPORT_TEST_EXPORT_ENTID']
    if ('string' === typeof idmap && idmap.startsWith('{')) {
      idmap = JSON.parse(idmap)
    }

    return { client, calls, live, idmap }
  }

  const mockFetch = async (url, init) => {
    calls.push({ url, init })
    return {
      status: 200,
      statusText: 'OK',
      headers: {},
      json: async () => (null != mockres ? mockres : { id: 'direct01' }),
    }
  }

  const client = new MixpanelExportSDK({
    base: 'http://localhost:8080',
    system: { fetch: mockFetch },
  })

  return { client, calls, live, idmap: {} }
}
  
