import { Svg, SvgRunningContext } from './module-svg';
import { NodoxModule, Lookup } from '@avdl/nodox-core';
export declare class SvgGrids extends Svg {
    merge(otherModule: NodoxModule): NodoxModule;
    constructor();
    protected processHexGrid(context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
}
