<?php
declare(strict_types=1);

// NycOpenData SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class NycOpenDataMakeContext
{
    public static function call(array $ctxmap, ?NycOpenDataContext $basectx): NycOpenDataContext
    {
        return new NycOpenDataContext($ctxmap, $basectx);
    }
}
