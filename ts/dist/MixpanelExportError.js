"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MixpanelExportError = void 0;
class MixpanelExportError extends Error {
    isMixpanelExportError = true;
    sdk = 'MixpanelExport';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.MixpanelExportError = MixpanelExportError;
//# sourceMappingURL=MixpanelExportError.js.map