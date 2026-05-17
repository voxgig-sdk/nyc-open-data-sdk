package voxgignycopendatasdk

import (
	"github.com/voxgig-sdk/nyc-open-data-sdk/go/core"
	"github.com/voxgig-sdk/nyc-open-data-sdk/go/entity"
	"github.com/voxgig-sdk/nyc-open-data-sdk/go/feature"
	_ "github.com/voxgig-sdk/nyc-open-data-sdk/go/utility"
)

// Type aliases preserve external API.
type NycOpenDataSDK = core.NycOpenDataSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type NycOpenDataEntity = core.NycOpenDataEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type NycOpenDataError = core.NycOpenDataError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCatalogEntityFunc = func(client *core.NycOpenDataSDK, entopts map[string]any) core.NycOpenDataEntity {
		return entity.NewCatalogEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewNycOpenDataSDK = core.NewNycOpenDataSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
