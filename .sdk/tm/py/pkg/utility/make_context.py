# MixpanelExport SDK utility: make_context

from projectname_sdk.core.context import MixpanelExportContext


def make_context_util(ctxmap, basectx):
    return MixpanelExportContext(ctxmap, basectx)
