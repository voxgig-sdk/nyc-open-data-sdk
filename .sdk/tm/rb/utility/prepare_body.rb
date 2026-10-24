# NycOpenData SDK utility: prepare_body
require_relative 'media'
module NycOpenDataUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return NycOpenDataUtilities.raw_body(ctx.reqdata) if NycOpenDataUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
