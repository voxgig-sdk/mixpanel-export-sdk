<?php
declare(strict_types=1);

// MixpanelExport SDK exists test

require_once __DIR__ . '/../mixpanelexport_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = MixpanelExportSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
