// Typed models for the NycOpenData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Catalog {
  resource?: Record<string, any>
}

export interface CatalogListMatch {
  agency?: string
  category?: string
  limit?: number
  offset?: number
  q?: string
  sort?: string

  // Selects a custom action instead of the plain list:
  //   'v1'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

