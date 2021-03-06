import { SvgRunningContext } from './module-svg';
import { NodoxNodeDefinition, NodoxModuleBase } from '@avdl/nodox-core';
export declare class SvgExtra extends NodoxModuleBase {
    name: string;
    description: string;
    namespace: string;
    definitions: NodoxNodeDefinition[];
    constructor();
    private processSun;
    protected preprocess(context: SvgRunningContext): void;
}
