package = "voxgig-sdk-nyc-open-data"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/nyc-open-data-sdk.git"
}
description = {
  summary = "NycOpenData SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["nyc-open-data_sdk"] = "nyc-open-data_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
