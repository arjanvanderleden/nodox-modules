import { Svg, SvgRunningContext } from './Nodox.Modules.Svg';
import { NodoxModule, Lookup } from 'nodox-core';
export declare class SvgGrids extends Svg {
    merge(otherModule: NodoxModule): NodoxModule;
    constructor();
    protected processHexGrid(context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
}
