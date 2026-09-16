# NycOpenData SDK feature factory

from nycopendata_sdk.feature.base_feature import NycOpenDataBaseFeature
from nycopendata_sdk.feature.ratelimit_feature import NycOpenDataRatelimitFeature
from nycopendata_sdk.feature.retry_feature import NycOpenDataRetryFeature
from nycopendata_sdk.feature.test_feature import NycOpenDataTestFeature
from nycopendata_sdk.feature.timeout_feature import NycOpenDataTimeoutFeature


_FEATURES = {
    "base": lambda: NycOpenDataBaseFeature(),
    "ratelimit": lambda: NycOpenDataRatelimitFeature(),
    "retry": lambda: NycOpenDataRetryFeature(),
    "test": lambda: NycOpenDataTestFeature(),
    "timeout": lambda: NycOpenDataTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
