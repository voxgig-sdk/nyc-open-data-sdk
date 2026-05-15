<?php
declare(strict_types=1);

// NycOpenData SDK utility: prepare_body

class NycOpenDataPrepareBody
{
    public static function call(NycOpenDataContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
