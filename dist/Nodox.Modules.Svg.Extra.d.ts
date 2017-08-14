import { ISvgRunningContext } from "./Nodox.Modules.Svg";
import { NodoxModule } from "./Nodox.Modules.NodoxModule";
export declare class SvgExtra extends NodoxModule {
    constructor();
    private processSun(context, result, inputParams, index);
    protected preprocess(context: ISvgRunningContext): void;
}
