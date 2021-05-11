"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Core = void 0;
const Nodox_Modules_NodoxModule_1 = require("../Nodox.Modules.NodoxModule");
const list_reverse_1 = require("./list-reverse");
class Core extends Nodox_Modules_NodoxModule_1.NodoxModuleBase {
    constructor() {
        super();
        this.name = "Core";
        this.description = "Core definitions for Nodox";
        this.namespace = "nodox.modules.core";
        this.dependencies = [];
        this.dataTypes = [
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
        this.definitions = [
            {
                name: "Add",
                description: "adds two numbers",
                processFunction: this.processAdd,
                inputs: [
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
                outputs: [
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
                inputs: [
                    {
                        name: "seed",
                        description: "The seed to be used for teh random generator",
                        dataType: this.namespace + ".string",
                        defaultValue: "For example: Nodox"
                    }
                ],
                outputs: [
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
                inputs: [
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
                outputs: [
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
                inputs: [
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
                outputs: [
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
                processFunction: undefined,
                postprocessFunction: this.postprocessSort,
                inputs: [
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
                outputs: [
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
                processFunction: undefined,
                postprocessFunction: this.postprocessShuffle,
                inputs: [
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
                outputs: [
                    {
                        name: "item",
                        description: "Item in the list",
                        dataType: this.namespace + ".any"
                    }
                ],
                icon: "nodox:list_shuffle",
                fullName: this.namespace + ".shuffle"
            },
            list_reverse_1.listReverse
        ];
    }
    processRandom(context, result, inputParams, index) {
        if (!result["random"]) {
            result["random"] = new Array();
            var seed = inputParams["seed"];
            Math.seedrandom(seed);
        }
        result["random"].push(Math.random());
    }
    processAdd(context, result, inputParams, index) {
        result["sum"] = result["sum"] || new Array();
        var a = +inputParams["a"];
        var b = +inputParams["b"];
        result["sum"].push(a + b);
    }
    processMax(context, result, inputParams, index) {
        result["max"] = result["max"] || new Array();
        var a = +inputParams["a"];
        var b = +inputParams["b"];
        result["max"].push(Math.max(a, b));
    }
    processMin(context, result, inputParams, index) {
        result["min"] = result["min"] || new Array();
        var a = +inputParams["a"];
        var b = +inputParams["b"];
        result["min"].push(Math.min(a, b));
    }
    postprocessSort(context, nodeValues) {
        nodeValues.keyNames.push("count");
        nodeValues.values["count"] = nodeValues.values["count"] || new Array();
        nodeValues.values["item"] = nodeValues.values["item"] || new Array();
        nodeValues.values["item"].sort();
        nodeValues.values["count"].push(nodeValues.values["item"].length);
    }
    postprocessShuffle(context, nodeValues) {
        nodeValues.keyNames.push("count");
        nodeValues.values["count"] = nodeValues.values["count"] || new Array();
        nodeValues.values["item"] = nodeValues.values["item"] || new Array();
        var seed = nodeValues.values["seed"][0];
        // Fisher-Yates Shuffle
        // http://stackoverflow.com/a/6274398/2965537
        // http://bost.ocks.org/mike/shuffle/
        var shuffle = (seed, array) => {
            Math.seedrandom(seed);
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
        };
        shuffle(seed, nodeValues.values["item"]);
        nodeValues.values["count"].push(nodeValues.values["item"].length);
    }
}
exports.Core = Core;
