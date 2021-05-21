import { NodoxNodeDefinition, NodoxModuleBase } from '@avdl/nodox-core';
export declare class Datasets extends NodoxModuleBase {
    name: string;
    description: string;
    namespace: string;
    definitions: NodoxNodeDefinition[];
    constructor();
    private processAdd;
    private processMax;
    private processMin;
}
