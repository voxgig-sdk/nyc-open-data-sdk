<?php
declare(strict_types=1);

// NycOpenData SDK utility: result_headers

class NycOpenDataResultHeaders
{
    public static function call(NycOpenDataContext $ctx): ?NycOpenDataResult
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
