<?php
declare(strict_types=1);

// MixpanelExport SDK utility: result_headers

class MixpanelExportResultHeaders
{
    public static function call(MixpanelExportContext $ctx): ?MixpanelExportResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
