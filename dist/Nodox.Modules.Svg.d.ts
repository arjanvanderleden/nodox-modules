import { IRunningContext, INodoxModule, NodeValues } from 'nodox-core';
import { NodoxModule } from "./Nodox.Modules.NodoxModule";
import * as SVG from 'svg.js';
export interface ISvgRunningContext extends IRunningContext {
    svg: any;
}
export declare class Svg extends NodoxModule {
    merge(otherModule: INodoxModule): INodoxModule;
    constructor();
    protected processColor(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number): void;
    protected processHsvColor(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number): void;
    protected processPoint(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number): void;
    protected processCircle(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number): void;
    protected processRectangle(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number): void;
    protected processDeltaPoint(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number): void;
    protected processEllipse(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number): void;
    protected processPolygon(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number): void;
    protected processText(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number): void;
    protected processSetStroke(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number): void;
    protected processSetFill(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number): void;
    protected processGroup(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number): void;
    protected postprocessGroup(context: ISvgRunningContext, nodeValues: NodeValues): void;
    protected processCombine(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number): void;
    protected postprocessCombine(context: ISvgRunningContext, nodeValues: NodeValues): void;
    protected applyMatrix(element: SVG.Element, matrix: SVG.Matrix): void;
    protected processTransform(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number): void;
    protected processRotate(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number): void;
    protected processScale(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number): void;
    protected processTranslate(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number): void;
    protected processCreatePattern(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number): void;
    protected processSetPattern(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number): void;
    protected processRadialGrid(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number): void;
    protected processGrid(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number): void;
    protected postprocessGrid(context: ISvgRunningContext, nodeValues: NodeValues): void;
    protected preprocess(context: ISvgRunningContext): void;
}
