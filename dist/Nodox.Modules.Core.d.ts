import { NodoxModule } from "./Nodox.Modules.NodoxModule";
export declare class Core extends NodoxModule {
    constructor();
    private processRandom(context, result, inputParams, index);
    private processAdd(context, result, inputParams, index);
    private processMax(context, result, inputParams, index);
    private processMin(context, result, inputParams, index);
    private processList(context, result, inputParams, index);
    private postprocessSort(context, nodeValues);
    private postprocessShuffle(context, nodeValues);
    private postprocessReverse(context, nodeValues);
}
