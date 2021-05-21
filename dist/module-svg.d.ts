import { NodoxRunningContext, NodoxModule, Lookup, NodoxModuleBase, NodoxNodeDefinition } from '@avdl/nodox-core';
export interface SvgRunningContext extends NodoxRunningContext {
    svg: any;
}
export declare class Svg extends NodoxModuleBase {
    name: string;
    description: string;
    namespace: string;
    definitions: NodoxNodeDefinition[];
    merge(otherModule: NodoxModule): NodoxModule;
    constructor();
    protected processColor(context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processHsvColor(context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processPoint(context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processCircle(context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processRectangle(context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processDeltaPoint(context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processEllipse(context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processPolygon(context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processText(context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processSetStroke(context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processSetFill(context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processGroup(context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected postprocessGroup(context: SvgRunningContext, nodeValues: Lookup<any>): void;
    protected processCombine(context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected postprocessCombine(context: SvgRunningContext, nodeValues: Lookup<any>): void;
    protected applyMatrix(element: any, matrix: any): void;
    protected processTransform(context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processRotate(context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processScale(context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processTranslate(context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processCreatePattern(context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processSetPattern(context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processRadialGrid(context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected processGrid(context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number): void;
    protected postprocessGrid(context: SvgRunningContext, nodeValues: Lookup<any>): void;
    protected preprocess(context: SvgRunningContext): void;
}
