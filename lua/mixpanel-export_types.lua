-- Typed models for the MixpanelExport SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Export

---@class ExportLoadMatch
---@field event? string
---@field from_date string
---@field limit? number
---@field project_id? number
---@field time_in_m? boolean
---@field to_date string
---@field where? string

local M = {}

return M
