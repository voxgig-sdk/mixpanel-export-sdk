# MixpanelExport SDK exists test

import pytest
from mixpanelexport_sdk import MixpanelExportSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = MixpanelExportSDK.test(None, None)
        assert testsdk is not None
