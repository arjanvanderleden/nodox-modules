import { NodeValues, IInputDescriptor, INodeDefinition, IDataType, IRunningContext, IOutputDescriptor } from "nodox-core";
import { NodoxModule } from "./Nodox.Modules.NodoxModule";

export class Domains extends NodoxModule {
        constructor() {
            super();
            this.name = "Domains";
            this.description = "Nodes for translating values from one domain into the other";
            this.namespace = "nodox.modules.domains";
            this.dependencies = [
                "nodox.modules.core",
                "nodox.modules.calc"];
            this.dataTypes = <IDataType[]>[
            ];
            this.definitions = <INodeDefinition[]>[
              {
                  name: "Range",
                  description: "Creates an array of numbers",
                  processFunction: this.processRange,
                  inputs: <Array<IInputDescriptor>>[
                      {
                          name: "from",
                          description: "From number",
                          dataType: "nodox.modules.core.number",
                          defaultValue: 0
                      }, {
                          name: "to",
                          description: "to number",
                          dataType: "nodox.modules.core.number",
                          defaultValue: 0
                      },
                      {
                          name: "count",
                          description: "number of elements",
                          dataType: "nodox.modules.core.number",
                          defaultValue: 0
                      }
                      ],
                  outputs: <Array<IOutputDescriptor>>[{
                      name: "value",
                      description: "An array of numbers",
                      dataType: "nodox.modules.core.number"
                  }],
                  icon: "nodox:range",
                  fullName: this.namespace + ".range"
              },{
                    name: "Linear",
                    description: "Calculates values in a range",
                    processFunction: this.processLinearDomain,
                    inputs: <Array<IInputDescriptor>>[
                        {
                            name: "fromStart",
                            description: "Second number",
                            dataType: "nodox.modules.core.number",
                            defaultValue: 0
                        }, {
                            name: "fromEnd",
                            description: "First number",
                            dataType: "nodox.modules.core.number",
                            defaultValue: 0
                        },
                        {
                            name: "toStart",
                            description: "Second number",
                            dataType: "nodox.modules.core.number",
                            defaultValue: 0
                        }, {
                            name: "toEnd",
                            description: "First number",
                            dataType: "nodox.modules.core.number",
                            defaultValue: 0
                        },
                        {
                            name: "value",
                            description: "First number",
                            dataType: "nodox.modules.core.number",
                            defaultValue: 0
                        }
                        ],
                    outputs: <Array<IOutputDescriptor>>[{
                        name: "value",
                        description: "The calculated value in teh output domain",
                        dataType: "nodox.modules.core.number"
                    }],
                    icon: "nodox:domain_linear",
                    fullName: this.namespace + ".linear"
                },
                {
                    name: "Exponential",
                    description: "Calculates values in an exponential range",
                    processFunction: this.processExponentialDomain,
                    inputs: <Array<IInputDescriptor>>[
                        {
                            name: "fromStart",
                            description: "Second number",
                            dataType: this.namespace + ".number",
                            defaultValue: 0
                        }, {
                            name: "fromEnd",
                            description: "First number",
                            dataType: this.namespace + ".number",
                            defaultValue: 0
                        },
                        {
                            name: "toStart",
                            description: "Second number",
                            dataType: this.namespace + ".number",
                            defaultValue: 0
                        }, {
                            name: "toEnd",
                            description: "First number",
                            dataType: this.namespace + ".number",
                            defaultValue: 0
                        },
                        {
                            name: "value",
                            description: "First number",
                            dataType: this.namespace + ".number",
                            defaultValue: 0
                        }
                    ],
                    outputs: <Array<IOutputDescriptor>>[{
                        name: "value",
                        description: "the new value mapped in the new domain",
                        dataType: this.namespace + ".number"
                    }],
                    icon: "nodox:domain_exponential",
                    fullName: this.namespace + ".exponential"
                }
            ];

        }

        private processLinearDomain(context: IRunningContext, result:NodeValues, inputParams: Object, index:number) {
          result["value"] = result["value"] || new Array<number>();
          var a = +inputParams["fromStart"];
          var b = +inputParams["fromEnd"];
          var c = +inputParams["toStart"];
          var d = +inputParams["toEnd"];
          var value = +inputParams["value"];
          result["value"].push(value * (d-c)/(b-a));
        }

        private processExponentialDomain(context: IRunningContext, result:NodeValues, inputParams: Object, index:number) {
          var a = inputParams["a"];
          var b = inputParams["b"];
          result["sum"].push( a + b );
        }

        private processRange(context: IRunningContext, result:NodeValues, inputParams: Object, index:number) {
          result["value"] = result["value"] || new Array<number>();
          var from = +inputParams["from"];
          var to = +inputParams["to"];
          var count = +inputParams["count"];
          var v = 0;
          var step = (to-from)/(count-1)
          if (count>1){
            for (var index = 0;index<count;index++){
              result["value"].push(v);
              v += step;
            }
          }
        }

    }


