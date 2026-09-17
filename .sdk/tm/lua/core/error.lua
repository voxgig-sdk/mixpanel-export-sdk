-- MixpanelExport SDK error

local MixpanelExportError = {}
MixpanelExportError.__index = MixpanelExportError


function MixpanelExportError.new(code, msg, ctx)
  local self = setmetatable({}, MixpanelExportError)
  self.is_sdk_error = true
  self.sdk = "MixpanelExport"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function MixpanelExportError:error()
  return self.msg
end


function MixpanelExportError:__tostring()
  return self.msg
end


return MixpanelExportError
