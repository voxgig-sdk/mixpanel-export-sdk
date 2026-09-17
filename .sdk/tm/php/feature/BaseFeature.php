<?php
declare(strict_types=1);

// MixpanelExport SDK base feature

class MixpanelExportBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(MixpanelExportContext $ctx, array $options): void {}
    public function PostConstruct(MixpanelExportContext $ctx): void {}
    public function PostConstructEntity(MixpanelExportContext $ctx): void {}
    public function SetData(MixpanelExportContext $ctx): void {}
    public function GetData(MixpanelExportContext $ctx): void {}
    public function GetMatch(MixpanelExportContext $ctx): void {}
    public function SetMatch(MixpanelExportContext $ctx): void {}
    public function PrePoint(MixpanelExportContext $ctx): void {}
    public function PreSpec(MixpanelExportContext $ctx): void {}
    public function PreRequest(MixpanelExportContext $ctx): void {}
    public function PreResponse(MixpanelExportContext $ctx): void {}
    public function PreResult(MixpanelExportContext $ctx): void {}
    public function PreDone(MixpanelExportContext $ctx): void {}
    public function PreUnexpected(MixpanelExportContext $ctx): void {}
}
