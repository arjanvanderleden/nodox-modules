import { SvgRunningContext } from './Nodox.Modules.Svg';
import { NodoxNodeDefinition, NodoxModuleBase } from 'nodox-core';
export declare class SvgExtra extends NodoxModuleBase {
    name: string;
    description: string;
    namespace: string;
    definitions: NodoxNodeDefinition[];
    constructor();
    private processSun;
    protected preprocess(context: SvgRunningContext): void;
}
