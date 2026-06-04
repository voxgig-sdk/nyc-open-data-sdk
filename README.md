# NycOpenData SDK

Query thousands of New York City government datasets through the Socrata-powered NYC Open Data portal

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About NYC Open Data

[NYC Open Data](https://opendata.cityofnewyork.us/) is the City of New York's public catalogue of datasets published by City agencies and partners. It is operated by the City of New York and hosted on the [Socrata Open Data API (SODA)](https://dev.socrata.com/) platform at `https://data.cityofnewyork.us`.

The portal exposes datasets covering subjects such as 311 service requests, business, education, environment, transportation, and public safety. Each dataset is addressable as a resource at `https://data.cityofnewyork.us/resource/{dataset-id}.json` (for example, 311 Service Requests at `/resource/erm2-nwe9.json`).

Because the platform is built on Socrata, datasets can typically be queried using SoQL (the Socrata Query Language) with parameters such as `$select`, `$where`, `$order`, `$limit`, and `$offset`. Datasets are also discoverable via the catalog by agency, category, publication date, and popularity.

Anonymous requests are allowed; heavier use is generally expected to register and send a Socrata app token. Consult the Socrata documentation for current authentication and throttling guidance.

## Try it

**TypeScript**
```bash
npm install nyc-open-data
```

**Python**
```bash
pip install nyc-open-data-sdk
```

**PHP**
```bash
composer require voxgig/nyc-open-data-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/nyc-open-data-sdk/go
```

**Ruby**
```bash
gem install nyc-open-data-sdk
```

**Lua**
```bash
luarocks install nyc-open-data-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { NycOpenDataSDK } from 'nyc-open-data'

const client = new NycOpenDataSDK({})

// List all catalogs
const catalogs = await client.Catalog().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o nyc-open-data-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "nyc-open-data": {
      "command": "/abs/path/to/nyc-open-data-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Catalog** | The dataset catalog exposed by the NYC Open Data Socrata portal; individual datasets are fetched as JSON resources at `https://data.cityofnewyork.us/resource/{dataset-id}.json`. | `/api/catalog/v1` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from nycopendata_sdk import NycOpenDataSDK

client = NycOpenDataSDK({})

# List all catalogs
catalogs, err = client.Catalog(None).list(None, None)
```

### PHP

```php
<?php
require_once 'nycopendata_sdk.php';

$client = new NycOpenDataSDK([]);

// List all catalogs
[$catalogs, $err] = $client->Catalog(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/nyc-open-data-sdk/go"

client := sdk.NewNycOpenDataSDK(map[string]any{})

// List all catalogs
catalogs, err := client.Catalog(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "NycOpenData_sdk"

client = NycOpenDataSDK.new({})

# List all catalogs
catalogs, err = client.Catalog(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("nyc-open-data_sdk")

local client = sdk.new({})

-- List all catalogs
local catalogs, err = client:Catalog(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = NycOpenDataSDK.test()
const result = await client.Catalog().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = NycOpenDataSDK.test(None, None)
result, err = client.Catalog(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = NycOpenDataSDK::test(null, null);
[$result, $err] = $client->Catalog(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Catalog(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = NycOpenDataSDK.test(nil, nil)
result, err = client.Catalog(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Catalog(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the NYC Open Data

- Upstream: [https://opendata.cityofnewyork.us/](https://opendata.cityofnewyork.us/)
- API docs: [https://dev.socrata.com/](https://dev.socrata.com/)

---

Generated from the NYC Open Data OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
