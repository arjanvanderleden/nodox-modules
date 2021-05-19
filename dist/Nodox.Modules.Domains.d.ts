import { NodoxNodeDefinition, NodoxModuleBase } from 'nodox-core';
export declare class Domains extends NodoxModuleBase {
    name: string;
    description: string;
    namespace: string;
    definitions: NodoxNodeDefinition[];
    constructor();
    private processLinearDomain;
    private processExponentialDomain;
    private processRange;
}
