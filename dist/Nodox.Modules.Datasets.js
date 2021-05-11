"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Datasets = void 0;
const Nodox_Modules_NodoxModule_1 = require("./Nodox.Modules.NodoxModule");
class Datasets extends Nodox_Modules_NodoxModule_1.NodoxModuleBase {
    constructor() {
        super();
        this.name = "Datasets";
        this.description = "Definitions to manipulate datasets in Nodox";
        this.namespace = "nodox.modules.datasets";
        this.dependencies = new Array();
        this.dataTypes = [
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
        this.definitions = [
            {
                name: "Load",
                description: "loads a dataset",
                processFunction: this.processAdd,
                inputs: [
                    {
                        name: "name",
                        description: "First number",
                        dataType: "number"
                    }
                ],
                outputs: [],
                fullName: this.namespace + ".min"
            },
            {
                name: "Join",
                description: "Join two datasets",
                processFunction: this.processMax,
                inputs: [],
                outputs: [],
                fullName: this.namespace + ".join"
            },
            {
                name: "Map",
                description: "Maps a dataset",
                processFunction: this.processMin,
                inputs: [],
                outputs: [],
                fullName: this.namespace + ".map"
            },
            {
                name: "Filter",
                description: "Filters a dataset",
                processFunction: this.processMin,
                inputs: [],
                outputs: [],
                fullName: this.namespace + ".filter"
            },
            {
                name: "Address lookup",
                description: "Resolves addresses",
                processFunction: this.processMin,
                inputs: [],
                outputs: [],
                fullName: this.namespace + ".addressLookup"
            },
            {
                name: "Export",
                description: "Exports a dataset",
                processFunction: this.processMin,
                inputs: [],
                outputs: [],
                fullName: this.namespace + ".export"
            }
        ];
    }
    processAdd(context, result, inputParams, index) {
        const a = inputParams["a"];
        const b = inputParams["b"];
        result["sum"].push(a + b);
    }
    processMax(context, result, inputParams, index) {
        const a = inputParams["a"];
        const b = inputParams["b"];
        result["sum"].push(a + b);
    }
    processMin(context, result, inputParams, index) {
        const a = inputParams["a"];
        const b = inputParams["b"];
        result["sum"].push(a + b);
    }
}
exports.Datasets = Datasets;
