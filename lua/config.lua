-- NycOpenData SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "NycOpenData",
      slug = "nyc-open-data",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://data.cityofnewyork.us",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["catalog"] = {},
      },
    },
    entity = {
      ["catalog"] = {
        ["fields"] = {
          {
            ["name"] = "resource",
            ["type"] = "`$OBJECT`",
          },
        },
        ["name"] = "catalog",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "agency",
                      ["orig"] = "agency",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "category",
                      ["orig"] = "category",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 10,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 0,
                      ["kind"] = "query",
                      ["name"] = "offset",
                      ["orig"] = "offset",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "relevance",
                      ["kind"] = "query",
                      ["name"] = "sort",
                      ["orig"] = "sort",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/catalog/v1",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "catalog",
                  },
                  {
                    ["lit"] = "v1",
                  },
                },
                ["select"] = {
                  ["$action"] = "v1",
                  ["exist"] = {
                    "agency",
                    "category",
                    "limit",
                    "offset",
                    "q",
                    "sort",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.results`",
                },
                ["parts"] = {
                  "api",
                  "catalog",
                  "v1",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
