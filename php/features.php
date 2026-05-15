<?php
declare(strict_types=1);

// NycOpenData SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class NycOpenDataFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new NycOpenDataBaseFeature();
            case "test":
                return new NycOpenDataTestFeature();
            default:
                return new NycOpenDataBaseFeature();
        }
    }
}
