"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listReverse = void 0;
const postprocessReverse = (context, nodeValues) => {
    nodeValues.keyNames.push("count");
    nodeValues.values["count"] = nodeValues.values["count"] || new Array();
    nodeValues.values["item"] = nodeValues.values["item"] || new Array();
    nodeValues.values["item"].revers();
    nodeValues.values["count"].push(nodeValues.values["item"].length);
};
const processList = (context, result, inputParams, index) => {
    var _a;
    result["item"] = (_a = result["item"]) !== null && _a !== void 0 ? _a : [];
    if (!result["seed"]) {
        result["seed"] = new Array();
        result["seed"].push(inputParams["seed"]);
    }
    ;
    var item = inputParams["item"];
    result["item"].push(item);
};
const namespace = 'nodox.core';
exports.listReverse = {
    name: "List reverse",
    description: "Shuffles a list",
    processFunction: processList,
    postprocessFunction: postprocessReverse,
    inputs: [
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
};
