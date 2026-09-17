// Typed models for the MixpanelExport SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Export {
}

export interface ExportLoadMatch {
  event?: string
  from_date: string
  limit?: number
  project_id?: number
  time_in_m?: boolean
  to_date: string
  where?: string
}

