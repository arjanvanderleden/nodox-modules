"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Datasets = void 0;
const nodox_core_1 = require("@avdl/nodox-core");
class Datasets extends nodox_core_1.NodoxModuleBase {
    constructor() {
        super();
        this.name = 'Datasets';
        this.description = 'Definitions to manipulate datasets in Nodox';
        this.namespace = 'nodox.modules.datasets';
        this.dependencies = [];
        this.dataTypes = [
            {
                name: 'number',
                description: 'javascript type nummber',
                accepts: []
            },
            {
                name: 'string',
                description: 'javascript type string',
                accepts: ['*']
            }
        ];
        this.definitions = [
            {
                name: 'Load',
                description: 'loads a dataset',
                processFunction: this.processAdd,
                processingMode: nodox_core_1.NodeProcessingMode.wrap,
                inputs: [
                    {
                        name: 'name',
                        description: 'First number',
                        dataType: 'number'
                    }
                ],
                outputs: [],
                fullName: this.namespace + '.min'
            },
            {
                name: 'Join',
                description: 'Join two datasets',
                processFunction: this.processMax,
                processingMode: nodox_core_1.NodeProcessingMode.wrap,
                inputs: [],
                outputs: [],
                fullName: this.namespace + '.join'
            },
            {
                name: 'Map',
                description: 'Maps a dataset',
                processFunction: this.processMin,
                processingMode: nodox_core_1.NodeProcessingMode.wrap,
                inputs: [],
                outputs: [],
                fullName: this.namespace + '.map'
            },
            {
                name: 'Filter',
                description: 'Filters a dataset',
                processFunction: this.processMin,
                processingMode: nodox_core_1.NodeProcessingMode.wrap,
                inputs: [],
                outputs: [],
                fullName: this.namespace + '.filter'
            },
            {
                name: 'Address lookup',
                description: 'Resolves addresses',
                processFunction: this.processMin,
                processingMode: nodox_core_1.NodeProcessingMode.wrap,
                inputs: [],
                outputs: [],
                fullName: this.namespace + '.addressLookup'
            },
            {
                name: 'Export',
                description: 'Exports a dataset',
                processFunction: this.processMin,
                processingMode: nodox_core_1.NodeProcessingMode.wrap,
                inputs: [],
                outputs: [],
                fullName: this.namespace + '.export'
            }
        ];
    }
    processAdd(context, result, inputParams, index) {
        const a = inputParams.a;
        const b = inputParams.b;
        result.sum.push(a + b);
    }
    processMax(context, result, inputParams, index) {
        const a = inputParams.a;
        const b = inputParams.b;
        result.sum.push(a + b);
    }
    processMin(context, result, inputParams, index) {
        const a = inputParams.a;
        const b = inputParams.b;
        result.sum.push(a + b);
    }
}
exports.Datasets = Datasets;
