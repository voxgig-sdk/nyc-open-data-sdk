# NycOpenData SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

NycOpenDataUtility.registrar = ->(u) {
  u.clean = NycOpenDataUtilities::Clean
  u.done = NycOpenDataUtilities::Done
  u.make_error = NycOpenDataUtilities::MakeError
  u.feature_add = NycOpenDataUtilities::FeatureAdd
  u.feature_hook = NycOpenDataUtilities::FeatureHook
  u.feature_init = NycOpenDataUtilities::FeatureInit
  u.fetcher = NycOpenDataUtilities::Fetcher
  u.make_fetch_def = NycOpenDataUtilities::MakeFetchDef
  u.make_context = NycOpenDataUtilities::MakeContext
  u.make_options = NycOpenDataUtilities::MakeOptions
  u.make_request = NycOpenDataUtilities::MakeRequest
  u.make_response = NycOpenDataUtilities::MakeResponse
  u.make_result = NycOpenDataUtilities::MakeResult
  u.make_point = NycOpenDataUtilities::MakePoint
  u.make_spec = NycOpenDataUtilities::MakeSpec
  u.make_url = NycOpenDataUtilities::MakeUrl
  u.param = NycOpenDataUtilities::Param
  u.prepare_auth = NycOpenDataUtilities::PrepareAuth
  u.prepare_body = NycOpenDataUtilities::PrepareBody
  u.prepare_headers = NycOpenDataUtilities::PrepareHeaders
  u.prepare_method = NycOpenDataUtilities::PrepareMethod
  u.prepare_params = NycOpenDataUtilities::PrepareParams
  u.prepare_path = NycOpenDataUtilities::PreparePath
  u.prepare_query = NycOpenDataUtilities::PrepareQuery
  u.result_basic = NycOpenDataUtilities::ResultBasic
  u.result_body = NycOpenDataUtilities::ResultBody
  u.result_headers = NycOpenDataUtilities::ResultHeaders
  u.transform_request = NycOpenDataUtilities::TransformRequest
  u.transform_response = NycOpenDataUtilities::TransformResponse
}
