import { Svg, ISvgRunningContext } from './Nodox.Modules.Svg';
import { NodoxModule, Lookup } from 'nodox-core';
export declare class SvgGrids extends Svg {
    merge(otherModule: NodoxModule): NodoxModule;
    constructor();
    protected processHexGrid(context: ISvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
}
