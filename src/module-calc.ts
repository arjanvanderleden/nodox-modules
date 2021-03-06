import { NodoxNodeDefinition, NodoxRunningContext, Lookup, NodoxModuleBase, NodeProcessingMode, CORE_MODULE_NAMESPACE } from '@avdl/nodox-core';

export class Calc extends NodoxModuleBase {
    name: string;
    description: string;
    namespace: string;
    definitions: NodoxNodeDefinition[];
    constructor () {
      super();
      this.name = 'Calc';
      this.description = 'Definitions for math functions';
      this.namespace = 'nodox.module.calc';
      this.dependencies = [CORE_MODULE_NAMESPACE];
      this.dataTypes = [];
      this.definitions = [
        {
          name: 'Square',
          description: 'calculates square of two numbers',
          processFunction: this.processSquare,
          processingMode: NodeProcessingMode.wrap,
          inputs: [{
            name: 'a',
            description: 'First number',
            dataType: `${CORE_MODULE_NAMESPACE}.number`
          }
          ],
          outputs: [{
            name: 'square',
            description: 'Square of a',
            dataType: `${CORE_MODULE_NAMESPACE}.number`
          }],
          icon: 'action:ic_3d_rotation',
          fullName: this.namespace + '.square'
        },
        {
          name: 'Square root',
          description: 'calculates square of two numbers',
          processFunction: this.processSquare,
          processingMode: NodeProcessingMode.wrap,
          inputs: [{
            name: 'a',
            description: 'First number',
            dataType: 'nodox.module.core.number'
          }
          ],
          outputs: [{
            name: 'squareroot',
            description: 'Squareroot of a',
            dataType: `${CORE_MODULE_NAMESPACE}.number`
          }],
          icon: 'action:ic_3d_rotation',
          fullName: this.namespace + '.squareroot'
        },
        {
          name: 'Math constant',
          description: 'Provides a math constant like Pi',
          processFunction: this.processConstant,
          processingMode: NodeProcessingMode.wrap,
          inputs: [{
            name: 'name',
            description: 'A string that can be translated into a mathematical constant like pi, PI, Pi',
            dataType: 'nodox.module.core.string',
            editorType: 'select',
            valueOptions: ['PI', 'E'],
            defaultValue: 'PI'
          }
          ],
          outputs: [{
            name: 'value',
            description: 'Value of constant',
            dataType: `${CORE_MODULE_NAMESPACE}.number`
          }],
          icon: 'nodox:math_constant',
          fullName: this.namespace + '.constant'
        }
      ];
    }

    private processSquare (context: NodoxRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
      const processResult = {};
      return processResult;
    }

    private processSquareRoot (context: NodoxRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
      const processResult = {};
      return processResult;
    }

    private processConstant (context: NodoxRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
      result.value = result.value ?? [];
      let constantValue = 0;
      switch ((<string>inputParams.name).toUpperCase()) {
        case 'PI': constantValue = Math.PI; break;
        case 'E': constantValue = Math.E; break;
      }
      result.value.push(constantValue);
    }
}
