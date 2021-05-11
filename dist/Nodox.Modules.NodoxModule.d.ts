import { NodoxModule, NodoxNodeDefinition, DataType, Lookup } from 'nodox-core';
export declare abstract class NodoxModuleBase implements NodoxModule {
    name: string;
    description: string;
    namespace: string;
    dependencies: string[];
    dataTypes: DataType[];
    definitions: NodoxNodeDefinition[];
    cloneFunctions: Lookup<any>;
    merge(otherModule: NodoxModule): NodoxModule;
}
