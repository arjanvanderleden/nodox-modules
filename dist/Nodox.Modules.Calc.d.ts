import { NodoxNodeDefinition, NodoxModuleBase } from 'nodox-core';
export declare class Calc extends NodoxModuleBase {
    name: string;
    description: string;
    namespace: string;
    definitions: NodoxNodeDefinition[];
    constructor();
    private processSquare;
    private processSquareRoot;
    private processConstant;
}
