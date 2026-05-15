-- NycOpenData SDK error

local NycOpenDataError = {}
NycOpenDataError.__index = NycOpenDataError


function NycOpenDataError.new(code, msg, ctx)
  local self = setmetatable({}, NycOpenDataError)
  self.is_sdk_error = true
  self.sdk = "NycOpenData"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function NycOpenDataError:error()
  return self.msg
end


function NycOpenDataError:__tostring()
  return self.msg
end


return NycOpenDataError
