import { NodeValues, IInputDescriptor, INodeDefinition, IDataType, IRunningContext, IOutputDescriptor } from "nodox-core";
import { NodoxModule } from "./Nodox.Modules.NodoxModule";

export class Datasets extends NodoxModule {
    constructor() {
        super();
        this.name = "Datasets";
        this.description = "Definitions to manipulate datasets in Nodox";
        this.namespace = "nodox.modules.datasets";
        this.dependencies = new Array<string>();
        this.dataTypes = <IDataType[]>[
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
        this.definitions = <INodeDefinition[]>[
            {
                name: "Load",
                description: "loads a dataset",
                processFunction: this.processAdd,
                inputs: <Array<IInputDescriptor>>[
                    {
                        name: "name",
                        description: "First number",
                        dataType: "number"
                    }],
                outputs: <Array<IOutputDescriptor>>[],
                fullName: this.namespace + ".min"
            },
            {
                name: "Join",
                description: "Join two datasets",
                processFunction: this.processMax,
                inputs: <Array<IInputDescriptor>>[],
                outputs: <Array<IOutputDescriptor>>[],
                fullName: this.namespace + ".join"
            },
            {
                name: "Map",
                description: "Maps a dataset",
                processFunction: this.processMin,
                inputs: <Array<IInputDescriptor>>[],
                outputs: <Array<IOutputDescriptor>>[],
                fullName: this.namespace + ".map"
            },
            {
                name: "Filter",
                description: "Filters a dataset",
                processFunction: this.processMin,
                inputs: <Array<IInputDescriptor>>[],
                outputs: <Array<IOutputDescriptor>>[],
                fullName: this.namespace + ".filter"
            },
            {
                name: "Address lookup",
                description: "Resolves addresses",
                processFunction: this.processMin,
                inputs: <Array<IInputDescriptor>>[],
                outputs: <Array<IOutputDescriptor>>[],
                fullName: this.namespace + ".addressLookup"
            },
            {
                name: "Export",
                description: "Exports a dataset",
                processFunction: this.processMin,
                inputs: <Array<IInputDescriptor>>[],
                outputs: <Array<IOutputDescriptor>>[],
                fullName: this.namespace + ".export"
            }
        ];
    }

    private processAdd(context: IRunningContext, result: NodeValues, inputParams: Object, index: number) {
        var a = inputParams["a"];
        var b = inputParams["b"];
        result["sum"].push(a + b);
    }

    private processMax(context: IRunningContext, result: NodeValues, inputParams: Object, index: number) {
        var a = inputParams["a"];
        var b = inputParams["b"];
        result["sum"].push(a + b);
    }

    private processMin(context: IRunningContext, result: NodeValues, inputParams: Object, index: number) {
        var a = inputParams["a"];
        var b = inputParams["b"];
        result["sum"].push(a + b);
    }


}


