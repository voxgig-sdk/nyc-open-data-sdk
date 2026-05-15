<?php
declare(strict_types=1);

// NycOpenData SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

NycOpenDataUtility::setRegistrar(function (NycOpenDataUtility $u): void {
    $u->clean = [NycOpenDataClean::class, 'call'];
    $u->done = [NycOpenDataDone::class, 'call'];
    $u->make_error = [NycOpenDataMakeError::class, 'call'];
    $u->feature_add = [NycOpenDataFeatureAdd::class, 'call'];
    $u->feature_hook = [NycOpenDataFeatureHook::class, 'call'];
    $u->feature_init = [NycOpenDataFeatureInit::class, 'call'];
    $u->fetcher = [NycOpenDataFetcher::class, 'call'];
    $u->make_fetch_def = [NycOpenDataMakeFetchDef::class, 'call'];
    $u->make_context = [NycOpenDataMakeContext::class, 'call'];
    $u->make_options = [NycOpenDataMakeOptions::class, 'call'];
    $u->make_request = [NycOpenDataMakeRequest::class, 'call'];
    $u->make_response = [NycOpenDataMakeResponse::class, 'call'];
    $u->make_result = [NycOpenDataMakeResult::class, 'call'];
    $u->make_point = [NycOpenDataMakePoint::class, 'call'];
    $u->make_spec = [NycOpenDataMakeSpec::class, 'call'];
    $u->make_url = [NycOpenDataMakeUrl::class, 'call'];
    $u->param = [NycOpenDataParam::class, 'call'];
    $u->prepare_auth = [NycOpenDataPrepareAuth::class, 'call'];
    $u->prepare_body = [NycOpenDataPrepareBody::class, 'call'];
    $u->prepare_headers = [NycOpenDataPrepareHeaders::class, 'call'];
    $u->prepare_method = [NycOpenDataPrepareMethod::class, 'call'];
    $u->prepare_params = [NycOpenDataPrepareParams::class, 'call'];
    $u->prepare_path = [NycOpenDataPreparePath::class, 'call'];
    $u->prepare_query = [NycOpenDataPrepareQuery::class, 'call'];
    $u->result_basic = [NycOpenDataResultBasic::class, 'call'];
    $u->result_body = [NycOpenDataResultBody::class, 'call'];
    $u->result_headers = [NycOpenDataResultHeaders::class, 'call'];
    $u->transform_request = [NycOpenDataTransformRequest::class, 'call'];
    $u->transform_response = [NycOpenDataTransformResponse::class, 'call'];
});
