# NycOpenData SDK utility: make_context

from core.context import NycOpenDataContext


def make_context_util(ctxmap, basectx):
    return NycOpenDataContext(ctxmap, basectx)
