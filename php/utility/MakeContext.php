<?php
declare(strict_types=1);

// MixpanelExport SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class MixpanelExportMakeContext
{
    public static function call(array $ctxmap, ?MixpanelExportContext $basectx): MixpanelExportContext
    {
        return new MixpanelExportContext($ctxmap, $basectx);
    }
}
