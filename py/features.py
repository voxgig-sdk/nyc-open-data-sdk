# NycOpenData SDK feature factory

from feature.base_feature import NycOpenDataBaseFeature
from feature.test_feature import NycOpenDataTestFeature


def _make_feature(name):
    features = {
        "base": lambda: NycOpenDataBaseFeature(),
        "test": lambda: NycOpenDataTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
