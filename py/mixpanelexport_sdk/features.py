# MixpanelExport SDK feature factory

from mixpanelexport_sdk.feature.base_feature import MixpanelExportBaseFeature
from mixpanelexport_sdk.feature.debug_feature import MixpanelExportDebugFeature
from mixpanelexport_sdk.feature.idempotency_feature import MixpanelExportIdempotencyFeature
from mixpanelexport_sdk.feature.metrics_feature import MixpanelExportMetricsFeature
from mixpanelexport_sdk.feature.paging_feature import MixpanelExportPagingFeature
from mixpanelexport_sdk.feature.ratelimit_feature import MixpanelExportRatelimitFeature
from mixpanelexport_sdk.feature.retry_feature import MixpanelExportRetryFeature
from mixpanelexport_sdk.feature.test_feature import MixpanelExportTestFeature
from mixpanelexport_sdk.feature.timeout_feature import MixpanelExportTimeoutFeature


_FEATURES = {
    "base": lambda: MixpanelExportBaseFeature(),
    "debug": lambda: MixpanelExportDebugFeature(),
    "idempotency": lambda: MixpanelExportIdempotencyFeature(),
    "metrics": lambda: MixpanelExportMetricsFeature(),
    "paging": lambda: MixpanelExportPagingFeature(),
    "ratelimit": lambda: MixpanelExportRatelimitFeature(),
    "retry": lambda: MixpanelExportRetryFeature(),
    "test": lambda: MixpanelExportTestFeature(),
    "timeout": lambda: MixpanelExportTimeoutFeature(),
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
