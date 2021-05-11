import { NodoxRunningContext, NodeValues, Lookup } from "nodox-core";

const postprocessReverse = (context: NodoxRunningContext, nodeValues: NodeValues<any>) => {
    nodeValues.keyNames.push("count");
    nodeValues.values["count"] = nodeValues.values["count"] || new Array<number>();
    nodeValues.values["item"] = nodeValues.values["item"] || new Array<any>();
    nodeValues.values["item"].revers();
    nodeValues.values["count"].push(nodeValues.values["item"].length);
  }

const processList = (context: NodoxRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index:number) => {
    result["item"] = result["item"]??[];
    if (!result["seed"]) {
      result["seed"] = new Array<string>();
      result["seed"].push(inputParams["seed"])
    };
    var item = inputParams["item"];
    result["item"].push(item);
  }

const namespace = 'nodox.core';

export const listReverse = {
    name: "List reverse",
    description: "Shuffles a list",
    processFunction: processList,
    postprocessFunction: postprocessReverse,
    inputs:[
      {
        name: "item",
        description: "Item in the list",
        dataType: namespace + ".any",
        defaultValue: null
      }
    ],
    outputs: [
      {
        name: "item",
        description: "Item in the list",
        dataType: namespace + ".any"
      }
    ],
    icon: "nodox:list_reverse",
    fullName: namespace + ".reverse"
  }

