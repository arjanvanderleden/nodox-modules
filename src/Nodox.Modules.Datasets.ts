import { NodeValues, InputDefinition, NodoxNodeDefinition, DataType, NodoxRunningContext, OutputDefinition, Lookup } from "nodox-core";
import { NodoxModuleBase } from "./Nodox.Modules.NodoxModule";

export class Datasets extends NodoxModuleBase {
    constructor() {
        super();
        this.name = "Datasets";
        this.description = "Definitions to manipulate datasets in Nodox";
        this.namespace = "nodox.modules.datasets";
        this.dependencies = new Array<string>();
        this.dataTypes = <DataType[]>[
            {
                name: "number",
                description: "javascript type nummber",
                accepts: []
            },
            {
                name: "string",
                description: "javascript type string",
                accepts: ["*"]
            }
        ];
        this.definitions = <NodoxNodeDefinition[]>[
            {
                name: "Load",
                description: "loads a dataset",
                processFunction: this.processAdd,
                inputs: <Array<InputDefinition>>[
                    {
                        name: "name",
                        description: "First number",
                        dataType: "number"
                    }],
                outputs: <Array<OutputDefinition>>[],
                fullName: this.namespace + ".min"
            },
            {
                name: "Join",
                description: "Join two datasets",
                processFunction: this.processMax,
                inputs: <Array<InputDefinition>>[],
                outputs: <Array<OutputDefinition>>[],
                fullName: this.namespace + ".join"
            },
            {
                name: "Map",
                description: "Maps a dataset",
                processFunction: this.processMin,
                inputs: <Array<InputDefinition>>[],
                outputs: <Array<OutputDefinition>>[],
                fullName: this.namespace + ".map"
            },
            {
                name: "Filter",
                description: "Filters a dataset",
                processFunction: this.processMin,
                inputs: <Array<InputDefinition>>[],
                outputs: <Array<OutputDefinition>>[],
                fullName: this.namespace + ".filter"
            },
            {
                name: "Address lookup",
                description: "Resolves addresses",
                processFunction: this.processMin,
                inputs: <Array<InputDefinition>>[],
                outputs: <Array<OutputDefinition>>[],
                fullName: this.namespace + ".addressLookup"
            },
            {
                name: "Export",
                description: "Exports a dataset",
                processFunction: this.processMin,
                inputs: <Array<InputDefinition>>[],
                outputs: <Array<OutputDefinition>>[],
                fullName: this.namespace + ".export"
            }
        ];
    }

    private processAdd(context: NodoxRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
      const a = inputParams["a"];
      const b = inputParams["b"];
        result["sum"].push(a + b);
    }

    private processMax(context: NodoxRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
      const a = inputParams["a"];
      const b = inputParams["b"];
        result["sum"].push(a + b);
    }

    private processMin(context: NodoxRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
      const a = inputParams["a"];
      const b = inputParams["b"];
        result["sum"].push(a + b);
    }


}


