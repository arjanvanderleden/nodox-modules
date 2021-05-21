import { NodoxNodeDefinition, DataType, NodoxRunningContext, Lookup, NodoxModuleBase, NodeProcessingMode, CORE_MODULE_NAMESPACE } from '@avdl/nodox-core';

export class Domains extends NodoxModuleBase {
        name: string;
        description: string;
        namespace: string;
        definitions: NodoxNodeDefinition[];
        constructor () {
          super();
          this.name = 'Domains';
          this.description = 'Nodes for translating values from one domain into the other';
          this.namespace = 'nodox.module.domains';
          this.dependencies = [
            'nodox.module.core',
            'nodox.module.calc'];
          this.dataTypes = <DataType[]>[
          ];
          this.definitions = [
            {
              name: 'Range',
              description: 'Creates an array of numbers',
              processFunction: this.processRange,
              processingMode: NodeProcessingMode.wrap,
              inputs: [
                {
                  name: 'from',
                  description: 'From number',
                  dataType: `${CORE_MODULE_NAMESPACE}.number`,
                  defaultValue: 0
                }, {
                  name: 'to',
                  description: 'to number',
                  dataType: `${CORE_MODULE_NAMESPACE}.number`,
                  defaultValue: 0
                },
                {
                  name: 'count',
                  description: 'number of elements',
                  dataType: `${CORE_MODULE_NAMESPACE}.number`,
                  defaultValue: 0
                }
              ],
              outputs: [{
                name: 'value',
                description: 'An array of numbers',
                dataType: `${CORE_MODULE_NAMESPACE}.number`
              }],
              icon: 'nodox:range',
              fullName: this.namespace + '.range'
            }, {
              name: 'Linear',
              description: 'Calculates values in a range',
              processFunction: this.processLinearDomain,
              processingMode: NodeProcessingMode.wrap,
              inputs: [
                {
                  name: 'fromStart',
                  description: 'Second number',
                  dataType: `${CORE_MODULE_NAMESPACE}.number`,
                  defaultValue: 0
                }, {
                  name: 'fromEnd',
                  description: 'First number',
                  dataType: `${CORE_MODULE_NAMESPACE}.number`,
                  defaultValue: 0
                },
                {
                  name: 'toStart',
                  description: 'Second number',
                  dataType: `${CORE_MODULE_NAMESPACE}.number`,
                  defaultValue: 0
                }, {
                  name: 'toEnd',
                  description: 'First number',
                  dataType: `${CORE_MODULE_NAMESPACE}.number`,
                  defaultValue: 0
                },
                {
                  name: 'value',
                  description: 'First number',
                  dataType: `${CORE_MODULE_NAMESPACE}.number`,
                  defaultValue: 0
                }
              ],
              outputs: [{
                name: 'value',
                description: 'The calculated value in teh output domain',
                dataType: `${CORE_MODULE_NAMESPACE}.number`
              }],
              icon: 'nodox:domain_linear',
              fullName: this.namespace + '.linear'
            },
            {
              name: 'Exponential',
              description: 'Calculates values in an exponential range',
              processFunction: this.processExponentialDomain,
              processingMode: NodeProcessingMode.wrap,
              inputs: [
                {
                  name: 'fromStart',
                  description: 'Second number',
                  dataType: `${CORE_MODULE_NAMESPACE}.number`,
                  defaultValue: 0
                }, {
                  name: 'fromEnd',
                  description: 'First number',
                  dataType: `${CORE_MODULE_NAMESPACE}.number`,
                  defaultValue: 0
                },
                {
                  name: 'toStart',
                  description: 'Second number',
                  dataType: `${CORE_MODULE_NAMESPACE}.number`,
                  defaultValue: 0
                }, {
                  name: 'toEnd',
                  description: 'First number',
                  dataType: `${CORE_MODULE_NAMESPACE}.number`,
                  defaultValue: 0
                },
                {
                  name: 'value',
                  description: 'First number',
                  dataType: `${CORE_MODULE_NAMESPACE}.number`,
                  defaultValue: 0
                }
              ],
              outputs: [{
                name: 'value',
                description: 'the new value mapped in the new domain',
                dataType: `${CORE_MODULE_NAMESPACE}.number`
              }],
              icon: 'nodox:domain_exponential',
              fullName: this.namespace + '.exponential'
            }
          ];
        }

        private processLinearDomain (context: NodoxRunningContext, result:Lookup<any>, inputParams: Lookup<any>, index:number) {
          result.value = result.value ?? [];
          const a = +inputParams.fromStart;
          const b = +inputParams.fromEnd;
          const c = +inputParams.toStart;
          const d = +inputParams.toEnd;
          const value = +inputParams.value;
          result.value.push(value * (d - c) / (b - a));
        }

        private processExponentialDomain (context: NodoxRunningContext, result:Lookup<any>, inputParams: Lookup<any>, index:number) {
          const a = inputParams.a;
          const b = inputParams.b;
          result.sum.push(a + b);
        }

        private processRange (context: NodoxRunningContext, result:Lookup<any>, inputParams: Lookup<any>, index:number) {
          result.value = result.value ?? [];
          const from = +inputParams.from;
          const to = +inputParams.to;
          const count = +inputParams.count;
          const values = Array.from(new Array(count), (v, k: number) => from + k * (to - from) / (count - 1));
          result.value.push(...values);
        }
}
