import { NodoxRunningContext, NodoxModule, NodeValues, Lookup } from 'nodox-core';
import { NodoxModuleBase } from "./Nodox.Modules.NodoxModule";
export interface ISvgRunningContext extends NodoxRunningContext {
    svg: any;
}
export declare class Svg extends NodoxModuleBase {
    merge(otherModule: NodoxModule): NodoxModule;
    constructor();
    protected processColor(context: ISvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processHsvColor(context: ISvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processPoint(context: ISvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processCircle(context: ISvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processRectangle(context: ISvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processDeltaPoint(context: ISvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processEllipse(context: ISvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processPolygon(context: ISvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processText(context: ISvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processSetStroke(context: ISvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processSetFill(context: ISvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processGroup(context: ISvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected postprocessGroup(context: ISvgRunningContext, nodeValues: NodeValues<any>): void;
    protected processCombine(context: ISvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected postprocessCombine(context: ISvgRunningContext, nodeValues: NodeValues<any>): void;
    protected applyMatrix(element: any, matrix: any): void;
    protected processTransform(context: ISvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processRotate(context: ISvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processScale(context: ISvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processTranslate(context: ISvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processCreatePattern(context: ISvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processSetPattern(context: ISvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processRadialGrid(context: ISvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processGrid(context: ISvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected postprocessGrid(context: ISvgRunningContext, nodeValues: NodeValues<any>): void;
    protected preprocess(context: ISvgRunningContext): void;
}
