<?php
declare(strict_types=1);

// NycOpenData SDK utility: result_body

class NycOpenDataResultBody
{
    public static function call(NycOpenDataContext $ctx): ?NycOpenDataResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
