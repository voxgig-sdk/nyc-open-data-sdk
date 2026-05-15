# NycOpenData SDK utility: make_context
require_relative '../core/context'
module NycOpenDataUtilities
  MakeContext = ->(ctxmap, basectx) {
    NycOpenDataContext.new(ctxmap, basectx)
  }
end
