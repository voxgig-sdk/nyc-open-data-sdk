
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { NycOpenDataSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = NycOpenDataSDK.test()
    equal(testsdk instanceof NycOpenDataSDK, true,
      'NycOpenDataSDK.test() must return a client synchronously')
  })

})
