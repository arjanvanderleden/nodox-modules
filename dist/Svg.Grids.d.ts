import { Svg, ISvgRunningContext } from './Nodox.Modules.Svg';
import { INodoxModule, NodeValues } from 'nodox-core';
export declare class SvgGrids extends Svg {
    merge(otherModule: INodoxModule): INodoxModule;
    constructor();
    protected processHexGrid(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number): void;
}
