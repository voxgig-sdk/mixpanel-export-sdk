
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MixpanelExportSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = MixpanelExportSDK.test()
    equal(testsdk instanceof MixpanelExportSDK, true,
      'MixpanelExportSDK.test() must return a client synchronously')
  })

})
