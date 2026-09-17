<?php
declare(strict_types=1);

// MixpanelExport SDK utility: result_body

class MixpanelExportResultBody
{
    public static function call(MixpanelExportContext $ctx): ?MixpanelExportResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
