# MixpanelExport SDK utility: make_context

from mixpanelexport_sdk.core.context import MixpanelExportContext


def make_context_util(ctxmap, basectx):
    return MixpanelExportContext(ctxmap, basectx)
