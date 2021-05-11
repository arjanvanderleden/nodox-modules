"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodoxModuleBase = void 0;
class NodoxModuleBase {
    constructor() {
        this.name = '';
        this.description = '';
        this.namespace = '';
        this.dependencies = [];
        this.dataTypes = [];
        this.definitions = [];
        this.cloneFunctions = {};
    }
    merge(otherModule) {
        otherModule.definitions.forEach(newDefinition => {
            if (this.definitions.find(def => def.fullName === newDefinition.fullName)) {
                this.definitions.push(newDefinition);
            }
            else {
                console.warn("This module %o, already has a definition with fullname %o", this.name, newDefinition.fullName);
            }
        });
        return this;
    }
}
exports.NodoxModuleBase = NodoxModuleBase;
/*
export class XXX extends NodoxModule {
  constructor() {
    super();
    this.name = "XXX";
    this.description = "<description>";
    this.namespace = "nodox.modules.XXX";
    this.dependencies = [
      "nodox.modules.core",
      "nodox.modules.Calc"];
    this.dataTypes = <DataType[]>[
      {
        name: "dtXXX",
        description: "<description>",
        accepts: []
      }
    ];
    this.definitions = <NodoxNodeDefinition[]>[
      {
        name: "deXXX",
        description: "<description>",
        processFunction: ()=>{},
        preprocessFunction: (context: IRunningContext) => {},
        postprocessFunction: (context: IRunningContext) => {},
        inputs: <Array<InputDefinition>>[
          {
            name: "inputXXX",
            description: "<description>",
            dataType: "nodox.modules.core.number",
            defaultValue: 0
          }
        ],
        outputs: <Array<OutputDefinition>>[
          {
            name: "outputXXX",
            description: "<description>",
            dataType: this.namespace + ".dtXXX"
          }
        ],
        icon: "nodox:XXX",
        fullName: this.namespace + ".XXX"
      }
    ];
  }
*/
