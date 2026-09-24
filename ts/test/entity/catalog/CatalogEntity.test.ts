

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { NycOpenDataSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('CatalogEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NYC_OPEN_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('NYC_OPEN_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NycOpenDataSDK.test()
    const ent = testsdk.Catalog()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NYC_OPEN_DATA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'catalog.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"catalog","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/catalog/v1","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"agency","or":"agency","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"category","or":"category","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"q","or":"q","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":"relevance","k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":5}]},"k":"http","m":"GET","o":"/api/catalog/v1","q":{"$action":"v1","exist":["agency","category","limit","offset","q","sort"]},"r":{},"s":[{"lit":"api"},{"lit":"catalog"},{"lit":"v1"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"catalog","name__orig":"catalog","Name":"Catalog","name_":"catalog","name-":"catalog","NAME":"CATALOG","index$":0}, {"active":true,"entity":"catalog","key$":"BasicCatalogFlow","kind":"basic","name":"BasicCatalogFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"catalog_ref01"}}],"index$":0}]}, 'Catalog', {"GET /api/catalog/v1":{"protocol":"http","operationId":"searchDatasets","responses":{"200":{"description":"Successful response with list of datasets","content":{"application/json":{"schema":{"type":"object","properties":{"resultSetSize":{"description":"Total number of results matching the query","key$":"resultSetSize","type":"integer"},"results":{"items":{"properties":{"resource":{"properties":{"agency":{"description":"NYC agency that published the dataset","type":"string"},"category":{"description":"Category classification","type":"string"},"columns":{"description":"List of columns/fields in the dataset","items":{"properties":{"dataTypeName":{"type":"string"},"description":{"type":"string"},"fieldName":{"type":"string"}},"type":"object"},"type":"array"},"createdAt":{"description":"Date and time the dataset was created","format":"date-time","type":"string"},"description":{"description":"Detailed description of the dataset","type":"string"},"downloadCount":{"description":"Number of downloads for this dataset","type":"integer"},"id":{"description":"Unique identifier for the dataset","type":"string"},"name":{"description":"Name of the dataset","type":"string"},"permalink":{"description":"Permanent link to the dataset","format":"uri","type":"string"},"type":{"description":"Type of resource (e.g., dataset, chart, map)","type":"string"},"updatedAt":{"description":"Date and time the dataset was last updated","format":"date-time","type":"string"},"viewCount":{"description":"Number of views for this dataset","type":"integer"}},"type":"object"}},"type":"object"},"key$":"results","type":"array"}}}}}},"400":{"description":"Bad request - invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"code":{"type":"string","description":"Error code"}}}}}},"429":{"description":"Too many requests - rate limit exceeded","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Rate limit error message"}}}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}}}}}}},"parameters":[{"name":"q","in":"query","description":"Search query to filter datasets","required":false,"schema":{"type":"string"},"index$":0},{"name":"agency","in":"query","description":"Filter datasets by NYC agency","required":false,"schema":{"type":"string"},"index$":1},{"name":"category","in":"query","description":"Filter datasets by category (e.g., Business, Education, Environment)","required":false,"schema":{"type":"string","enum":["Business","Education","Environment","Health","Transportation","Public Safety","Recreation","Social Services"]},"index$":2},{"name":"limit","in":"query","description":"Number of results to return","required":false,"schema":{"type":"integer","default":10,"minimum":1,"maximum":100},"index$":3},{"name":"offset","in":"query","description":"Number of results to skip for pagination","required":false,"schema":{"type":"integer","default":0,"minimum":0},"index$":4},{"name":"sort","in":"query","description":"Sort order for results","required":false,"schema":{"type":"string","enum":["relevance","newest","popular","alphabetical"],"default":"relevance"},"index$":5}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let catalog_ref01_data = Object.values(setup.data.existing.catalog)[0] as any

    // LIST
    const catalog_ref01_ent = client.Catalog()
    const catalog_ref01_match: any = {}

    const catalog_ref01_list = (await catalog_ref01_ent.list(catalog_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/catalog/CatalogTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = NycOpenDataSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['catalog01','catalog02','catalog03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NYC_OPEN_DATA_TEST_CATALOG_ENTID': idmap,
    'NYC_OPEN_DATA_TEST_LIVE': 'FALSE',
    'NYC_OPEN_DATA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['NYC_OPEN_DATA_TEST_CATALOG_ENTID']

  const live = 'TRUE' === env.NYC_OPEN_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NYC_OPEN_DATA_TEST_CATALOG_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new NycOpenDataSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
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
    explain: 'TRUE' === env.NYC_OPEN_DATA_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
