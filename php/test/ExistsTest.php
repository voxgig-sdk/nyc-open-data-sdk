<?php
declare(strict_types=1);

// NycOpenData SDK exists test

require_once __DIR__ . '/../nycopendata_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = NycOpenDataSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
