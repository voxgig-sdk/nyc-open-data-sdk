# ProjectName SDK exists test

import pytest
from nycopendata_sdk import NycOpenDataSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = NycOpenDataSDK.test(None, None)
        assert testsdk is not None
