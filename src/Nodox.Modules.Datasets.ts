import { NodoxNodeDefinition, NodoxRunningContext, Lookup, NodoxModuleBase, NodeProcessingMode } from 'nodox-core';

export class Datasets extends NodoxModuleBase {
    name: string;
    description: string;
    namespace: string;
    definitions: NodoxNodeDefinition[];
    constructor () {
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
          processingMode: NodeProcessingMode.wrap,
          inputs: [
            {
              name: 'name',
              description: 'First number',
              dataType: 'number'
            }],
          outputs: [],
          fullName: this.namespace + '.min'
        },
        {
          name: 'Join',
          description: 'Join two datasets',
          processFunction: this.processMax,
          processingMode: NodeProcessingMode.wrap,
          inputs: [],
          outputs: [],
          fullName: this.namespace + '.join'
        },
        {
          name: 'Map',
          description: 'Maps a dataset',
          processFunction: this.processMin,
          processingMode: NodeProcessingMode.wrap,
          inputs: [],
          outputs: [],
          fullName: this.namespace + '.map'
        },
        {
          name: 'Filter',
          description: 'Filters a dataset',
          processFunction: this.processMin,
          processingMode: NodeProcessingMode.wrap,
          inputs: [],
          outputs: [],
          fullName: this.namespace + '.filter'
        },
        {
          name: 'Address lookup',
          description: 'Resolves addresses',
          processFunction: this.processMin,
          processingMode: NodeProcessingMode.wrap,
          inputs: [],
          outputs: [],
          fullName: this.namespace + '.addressLookup'
        },
        {
          name: 'Export',
          description: 'Exports a dataset',
          processFunction: this.processMin,
          processingMode: NodeProcessingMode.wrap,
          inputs: [],
          outputs: [],
          fullName: this.namespace + '.export'
        }
      ];
    }

    private processAdd (context: NodoxRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
      const a = inputParams.a;
      const b = inputParams.b;
      result.sum.push(a + b);
    }

    private processMax (context: NodoxRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
      const a = inputParams.a;
      const b = inputParams.b;
      result.sum.push(a + b);
    }

    private processMin (context: NodoxRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
      const a = inputParams.a;
      const b = inputParams.b;
      result.sum.push(a + b);
    }
}
