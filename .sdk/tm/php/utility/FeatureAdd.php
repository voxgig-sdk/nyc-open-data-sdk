<?php
declare(strict_types=1);

// NycOpenData SDK utility: feature_add

class NycOpenDataFeatureAdd
{
    public static function call(NycOpenDataContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
