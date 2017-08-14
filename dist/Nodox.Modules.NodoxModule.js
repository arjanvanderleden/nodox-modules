"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodoxModule = (function () {
    function NodoxModule() {
        this.cloneFunctions = {};
    }
    NodoxModule.prototype.merge = function (otherModule) {
        var _this = this;
        otherModule.definitions.forEach(function (newDefinition) {
            if (_this.definitions.findIndex(function (def) { return def.fullName === newDefinition.fullName; }) == -1) {
                _this.definitions.push(newDefinition);
            }
            else {
                console.warn("This module %o, already has a definition with fullname %o", _this.name, newDefinition.fullName);
            }
        });
        return this;
    };
    return NodoxModule;
}());
exports.NodoxModule = NodoxModule;
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
    this.dataTypes = <IDataType[]>[
      {
        name: "dtXXX",
        description: "<description>",
        accepts: []
      }
    ];
    this.definitions = <INodeDefinition[]>[
      {
        name: "deXXX",
        description: "<description>",
        processFunction: ()=>{},
        preprocessFunction: (context: IRunningContext) => {},
        postprocessFunction: (context: IRunningContext) => {},
        inputs: <Array<IInputDescriptor>>[
          {
            name: "inputXXX",
            description: "<description>",
            dataType: "nodox.modules.core.number",
            defaultValue: 0
          }
        ],
        outputs: <Array<IOutputDescriptor>>[
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
