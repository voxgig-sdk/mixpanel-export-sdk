<?php
declare(strict_types=1);

// Typed models for the MixpanelExport SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Export entity data model. */
class Export
{
}

/** Request payload for Export#load. */
class ExportLoadMatch
{
    public ?string $event = null;
    public string $from_date;
    public ?int $limit = null;
    public ?int $project_id = null;
    public ?bool $time_in_m = null;
    public string $to_date;
    public ?string $where = null;
}

