

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"catalog","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"agency","orig":"agency","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"category","orig":"category","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":10,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":2},{"active":true,"example":0,"kind":"query","name":"offset","orig":"offset","reqd":false,"type":"`$INTEGER`","index$":3},{"active":true,"kind":"query","name":"q","orig":"q","reqd":false,"type":"`$STRING`","index$":4},{"active":true,"example":"relevance","kind":"query","name":"sort","orig":"sort","reqd":false,"type":"`$STRING`","index$":5}]},"contract":{"id":"GET /api/catalog/v1","json":"{\"operationId\":\"searchDatasets\",\"parameters\":[{\"description\":\"Search query to filter datasets\",\"in\":\"query\",\"name\":\"q\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter datasets by NYC agency\",\"in\":\"query\",\"name\":\"agency\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter datasets by category (e.g., Business, Education, Environment)\",\"in\":\"query\",\"name\":\"category\",\"required\":false,\"schema\":{\"enum\":[\"Business\",\"Education\",\"Environment\",\"Health\",\"Transportation\",\"Public Safety\",\"Recreation\",\"Social Services\"],\"type\":\"string\"}},{\"description\":\"Number of results to return\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":10,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Number of results to skip for pagination\",\"in\":\"query\",\"name\":\"offset\",\"required\":false,\"schema\":{\"default\":0,\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"Sort order for results\",\"in\":\"query\",\"name\":\"sort\",\"required\":false,\"schema\":{\"default\":\"relevance\",\"enum\":[\"relevance\",\"newest\",\"popular\",\"alphabetical\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"resultSetSize\":{\"description\":\"Total number of results matching the query\",\"type\":\"integer\"},\"results\":{\"items\":{\"properties\":{\"resource\":{\"properties\":{\"agency\":{\"description\":\"NYC agency that published the dataset\",\"type\":\"string\"},\"category\":{\"description\":\"Category classification\",\"type\":\"string\"},\"columns\":{\"description\":\"List of columns/fields in the dataset\",\"items\":{\"properties\":{\"dataTypeName\":{\"type\":\"string\"},\"description\":{\"type\":\"string\"},\"fieldName\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"createdAt\":{\"description\":\"Date and time the dataset was created\",\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"description\":\"Detailed description of the dataset\",\"type\":\"string\"},\"downloadCount\":{\"description\":\"Number of downloads for this dataset\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the dataset\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the dataset\",\"type\":\"string\"},\"permalink\":{\"description\":\"Permanent link to the dataset\",\"format\":\"uri\",\"type\":\"string\"},\"type\":{\"description\":\"Type of resource (e.g., dataset, chart, map)\",\"type\":\"string\"},\"updatedAt\":{\"description\":\"Date and time the dataset was last updated\",\"format\":\"date-time\",\"type\":\"string\"},\"viewCount\":{\"description\":\"Number of views for this dataset\",\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with list of datasets\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Rate limit error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Too many requests - rate limit exceeded\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/catalog/v1","segments":[{"lit":"api"},{"lit":"catalog"},{"lit":"v1"}],"select":{"$action":"v1","exist":["agency","category","limit","offset","q","sort"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"catalog","name__orig":"catalog","Name":"Catalog","name_":"catalog","name-":"catalog","NAME":"CATALOG","index$":0}, {"active":true,"entity":"catalog","key$":"BasicCatalogFlow","kind":"basic","name":"BasicCatalogFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"catalog_ref01"}}],"index$":0}]}, 'Catalog')
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
  
