# frozen_string_literal: true

# Typed models for the NycOpenData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Catalog entity data model.
#
# @!attribute [rw] resource
#   @return [Hash, nil]
Catalog = Struct.new(
  :resource,
  keyword_init: true
)

# Request payload for Catalog#list.
#
# @!attribute [rw] resource
#   @return [Hash, nil]
CatalogListMatch = Struct.new(
  :resource,
  keyword_init: true
)

