import { INodoxModule, INodeDefinition, IDataType } from 'nodox-core';
export abstract class NodoxModule implements INodoxModule {
  name: string;
  description: string;
  namespace: string;
  dependencies: string[];
  dataTypes: IDataType[];
  definitions: Array<INodeDefinition>;
  cloneFunctions = {};

  merge(otherModule: INodoxModule): INodoxModule {
    otherModule.definitions.forEach(newDefinition => {
      if (this.definitions.findIndex(def => { return def.fullName === newDefinition.fullName })==-1){
        this.definitions.push(newDefinition);
      } else {
        console.warn("This module %o, already has a definition with fullname %o", this.name, newDefinition.fullName);
      }
    });
    return this;
  }
}



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



