
const { test, describe } = require('node:test')
const { equal } = require('node:assert')


const { MixpanelExportSDK } = require('..')


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await MixpanelExportSDK.test()
    equal(null !== testsdk, true)
  })

})
