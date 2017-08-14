import { NodeValues, IInputDescriptor, INodeDefinition, IDataType, IRunningContext, IOutputDescriptor } from "nodox-core";
import { NodoxModule } from "./Nodox.Modules.NodoxModule";
  
export class Core extends NodoxModule {
    constructor() {
      super();
      this.name = "Core";
      this.description = "Core definitions for Nodox";
      this.namespace = "nodox.modules.core";
      this.dependencies = new Array<string>();
      this.dataTypes = <IDataType[]>[
        {
          name: "number",
          description: "Javascript number",
          accepts: []
        },
        {
          name: "string",
          description: "Javascript string",
          accepts: ["*"]
        },
        {
          name: "boolean",
          description: "boolean",
          accepts: ["*"]
        },
        {
          name: "any",
          description: "Anything",
          accepts: ["*"]
        }
      ];
      this.definitions = <INodeDefinition[]>[
        {
          name: "Add",
          description: "adds two numbers",
          processFunction: this.processAdd,
          inputs: <Array<IInputDescriptor>>[
            {
              name: "a",
              description: "First number",
              dataType: this.namespace + ".number",
              defaultValue: 0
            },
            {
              name: "b",
              description: "Second number",
              dataType: this.namespace + ".number",
              defaultValue: 0
            }
          ],
          outputs: <Array<IOutputDescriptor>>[
            {
              name: "sum",
              description: "Sum of a and b",
              dataType: this.namespace + ".number"
            }
          ],
          icon: "nodox:core_nodox",
          fullName: this.namespace + ".add"
        },
        {
          name: "Random",
          description: "creates a seeded random number ",
          processFunction: this.processRandom,
          inputs: <Array<IInputDescriptor>>[
            {
              name: "seed",
              description: "The seed to be used for teh random generator",
              dataType: this.namespace + ".string",
              defaultValue: "For example: Nodox"
            }          ],
          outputs: <Array<IOutputDescriptor>>[
            {
              name: "random",
              description: "A random number between 0 and 1",
              dataType: this.namespace + ".number"
            }
          ],
          icon: "nodox:core_nodox",
          fullName: this.namespace + ".random"
        },
        {
          name: "Max",
          description: "the max of two numbers",
          processFunction: this.processMax,
          inputs: <Array<IInputDescriptor>>[
            {
              name: "a",
              description: "First number",
              dataType: this.namespace + ".number",
              defaultValue: 0
            },
            {
              name: "b",
              description: "Second number",
              dataType: this.namespace + ".number",
              defaultValue: 0
            }
          ],
          outputs: <Array<IOutputDescriptor>>[
            {
              name: "max",
              description: "The max of a and b",
              dataType: this.namespace + ".number"
            }
          ],
          icon: "nodox:core_max",
          fullName: this.namespace + ".max"
        },
        {
          name: "Min",
          description: "the min of two numbers",
          processFunction: this.processMin,
          inputs: <Array<IInputDescriptor>>[
            {
              name: "a",
              description: "First number",
              dataType: this.namespace + ".number",
              defaultValue: 0
            },
            {
              name: "b",
              description: "Second number",
              dataType: this.namespace + ".number",
              defaultValue: 0
            }
          ],
          outputs: <Array<IOutputDescriptor>>[
            {
              name: "max",
              description: "The min of a and b",
              dataType: this.namespace + ".number"
            }
          ],
          icon: "nodox:core_min",
          fullName: this.namespace + ".min"
        },
        {
          name: "List sort",
          description: "Sorts a list",
          processFunction: this.processList,
          postprocessFunction: this.postprocessSort,
          inputs: <Array<IInputDescriptor>>[
            {
              name: "item",
              description: "Item in the list",
              dataType: this.namespace + ".any",
              defaultValue: null
            },
            {
              name: "sort property",
              description: "Optional property on wich to sort",
              dataType: this.namespace + ".string",
              defaultValue: null
            }
          ],
          outputs: <Array<IOutputDescriptor>>[
            {
              name: "item",
              description: "Item in the list",
              dataType: this.namespace + ".any"
            }
          ],
          icon: "nodox:list_sort",
          fullName: this.namespace + ".sort"
        }, {
          name: "List shuffle",
          description: "Shuffles a list",
          processFunction: this.processList,
          postprocessFunction: this.postprocessShuffle,
          inputs: <Array<IInputDescriptor>>[
            {
              name: "item",
              description: "Item in the list",
              dataType: this.namespace + ".any",
              defaultValue: null
            },
            // this would be a good candidate for a "no-connector" input ....
            {
              name: "seed",
              description: "Seed for pseudo random generator",
              dataType: this.namespace + ".string",
              defaultValue: "for example: Nodox"
            }
          ],
          outputs: <Array<IOutputDescriptor>>[
            {
              name: "item",
              description: "Item in the list",
              dataType: this.namespace + ".any"
            }
          ],
          icon: "nodox:list_shuffle",
          fullName: this.namespace + ".shuffle"
        }, {
          name: "List reverse",
          description: "Shuffles a list",
          processFunction: this.processList,
          postprocessFunction: this.postprocessReverse,
          inputs: <Array<IInputDescriptor>>[
            {
              name: "item",
              description: "Item in the list",
              dataType: this.namespace + ".any",
              defaultValue: null
            }
          ],
          outputs: <Array<IOutputDescriptor>>[
            {
              name: "item",
              description: "Item in the list",
              dataType: this.namespace + ".any"
            }
          ],
          icon: "nodox:list_reverse",
          fullName: this.namespace + ".reverse"
        }

      ];
    }

    private processRandom(context: IRunningContext, result: any, inputParams: Object, index:number) {
      if (!result["random"] ){
        result["random"] = new Array<number>();
        var seed = inputParams["seed"];
        (<any>Math).seedrandom(seed);
      }
      result["random"].push(Math.random());
    }


    private processAdd(context: IRunningContext, result: any, inputParams: Object, index:number) {
      result["sum"] = result["sum"] || new Array<number>();
      var a = +inputParams["a"];
      var b = +inputParams["b"];
      result["sum"].push(a + b);
    }

    private processMax(context: IRunningContext, result: any, inputParams: Object, index:number) {
      result["max"] = result["max"] || new Array<number>();
      var a = +inputParams["a"];
      var b = +inputParams["b"];
      result["max"].push(Math.max(a, b));
    }

    private processMin(context: IRunningContext, result: any, inputParams: Object, index:number) {
      result["min"] = result["min"] || new Array<number>();
      var a = +inputParams["a"];
      var b = +inputParams["b"];
      result["min"].push(Math.min(a, b));
    }

    private processList(context: IRunningContext, result: NodeValues, inputParams: Object, index:number) {
      result["item"] = result["item"] || new Array<any>();
      if (!result["seed"]) {
        result["seed"] = new Array<string>();
        result["seed"].push(inputParams["seed"])
      };
      var item = inputParams["item"];
      result["item"].push(item);
    }

    private postprocessSort(context: IRunningContext, nodeValues: NodeValues) {
      nodeValues.keyNames.push("count");
      nodeValues.values["count"] = nodeValues.values["count"] || new Array<number>();
      nodeValues.values["item"] = nodeValues.values["item"] || new Array<any>();
      nodeValues.values["item"].sort();
      nodeValues.values["count"].push(nodeValues.values["item"].length);
    }

    private postprocessShuffle(context: IRunningContext, nodeValues: NodeValues) {
      nodeValues.keyNames.push("count");
      nodeValues.values["count"] = nodeValues.values["count"] || new Array<number>();
      nodeValues.values["item"] = nodeValues.values["item"] || new Array<any>();
      var seed = nodeValues.values["seed"][0];

      // Fisher-Yates Shuffle
      // http://stackoverflow.com/a/6274398/2965537
      // http://bost.ocks.org/mike/shuffle/

      var shuffle = (seed: string, array: Array<any>) => {
        (<any>Math).seedrandom(seed);
        var counter = array.length, temp, index;
        // While there are elements in the array
        while (counter > 0) {
          // Pick a random index
          index = Math.floor(Math.random() * counter);
          // Decrease counter by 1
          counter--;
          // And swap the last element with it
          temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
        }
      }

      shuffle(seed, nodeValues.values["item"]);
      nodeValues.values["count"].push(nodeValues.values["item"].length);
    }

    private postprocessReverse(context: IRunningContext, nodeValues: NodeValues) {
      nodeValues.keyNames.push("count");
      nodeValues.values["count"] = nodeValues.values["count"] || new Array<number>();
      nodeValues.values["item"] = nodeValues.values["item"] || new Array<any>();
      nodeValues.values["item"].revers();
      nodeValues.values["count"].push(nodeValues.values["item"].length);
    }


  }


