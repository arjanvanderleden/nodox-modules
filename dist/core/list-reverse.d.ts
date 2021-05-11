import { NodoxRunningContext, NodeValues, Lookup } from "nodox-core";
export declare const listReverse: {
    name: string;
    description: string;
    processFunction: (context: NodoxRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) => void;
    postprocessFunction: (context: NodoxRunningContext, nodeValues: NodeValues<any>) => void;
    inputs: {
        name: string;
        description: string;
        dataType: string;
        defaultValue: null;
    }[];
    outputs: {
        name: string;
        description: string;
        dataType: string;
    }[];
    icon: string;
    fullName: string;
};
