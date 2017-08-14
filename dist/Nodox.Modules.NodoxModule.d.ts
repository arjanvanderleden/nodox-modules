import { INodoxModule, INodeDefinition, IDataType } from 'nodox-core';
export declare abstract class NodoxModule implements INodoxModule {
    name: string;
    description: string;
    namespace: string;
    dependencies: string[];
    dataTypes: IDataType[];
    definitions: Array<INodeDefinition>;
    cloneFunctions: {};
    merge(otherModule: INodoxModule): INodoxModule;
}
