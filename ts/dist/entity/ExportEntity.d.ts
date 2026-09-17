import { MixpanelExportEntityBase } from '../MixpanelExportEntityBase';
import type { MixpanelExportSDK } from '../MixpanelExportSDK';
import type { Control } from '../types';
import type { Export, ExportLoadMatch } from '../MixpanelExportTypes';
declare class ExportEntity extends MixpanelExportEntityBase<Export> {
    constructor(client: MixpanelExportSDK, entopts: any);
    make(this: ExportEntity): ExportEntity;
    load(this: any, reqmatch?: ExportLoadMatch, ctrl?: Control): Promise<ExportEntity>;
}
export { ExportEntity };
