"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Nodox_Modules_NodoxModule_1 = require("./Nodox.Modules.NodoxModule");
var Core = (function (_super) {
    __extends(Core, _super);
    function Core() {
        var _this = _super.call(this) || this;
        _this.name = "Core";
        _this.description = "Core definitions for Nodox";
        _this.namespace = "nodox.modules.core";
        _this.dependencies = new Array();
        _this.dataTypes = [
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
        _this.definitions = [
            {
                name: "Add",
                description: "adds two numbers",
                processFunction: _this.processAdd,
                inputs: [
                    {
                        name: "a",
                        description: "First number",
                        dataType: _this.namespace + ".number",
                        defaultValue: 0
                    },
                    {
                        name: "b",
                        description: "Second number",
                        dataType: _this.namespace + ".number",
                        defaultValue: 0
                    }
                ],
                outputs: [
                    {
                        name: "sum",
                        description: "Sum of a and b",
                        dataType: _this.namespace + ".number"
                    }
                ],
                icon: "nodox:core_nodox",
                fullName: _this.namespace + ".add"
            },
            {
                name: "Random",
                description: "creates a seeded random number ",
                processFunction: _this.processRandom,
                inputs: [
                    {
                        name: "seed",
                        description: "The seed to be used for teh random generator",
                        dataType: _this.namespace + ".string",
                        defaultValue: "For example: Nodox"
                    }
                ],
                outputs: [
                    {
                        name: "random",
                        description: "A random number between 0 and 1",
                        dataType: _this.namespace + ".number"
                    }
                ],
                icon: "nodox:core_nodox",
                fullName: _this.namespace + ".random"
            },
            {
                name: "Max",
                description: "the max of two numbers",
                processFunction: _this.processMax,
                inputs: [
                    {
                        name: "a",
                        description: "First number",
                        dataType: _this.namespace + ".number",
                        defaultValue: 0
                    },
                    {
                        name: "b",
                        description: "Second number",
                        dataType: _this.namespace + ".number",
                        defaultValue: 0
                    }
                ],
                outputs: [
                    {
                        name: "max",
                        description: "The max of a and b",
                        dataType: _this.namespace + ".number"
                    }
                ],
                icon: "nodox:core_max",
                fullName: _this.namespace + ".max"
            },
            {
                name: "Min",
                description: "the min of two numbers",
                processFunction: _this.processMin,
                inputs: [
                    {
                        name: "a",
                        description: "First number",
                        dataType: _this.namespace + ".number",
                        defaultValue: 0
                    },
                    {
                        name: "b",
                        description: "Second number",
                        dataType: _this.namespace + ".number",
                        defaultValue: 0
                    }
                ],
                outputs: [
                    {
                        name: "max",
                        description: "The min of a and b",
                        dataType: _this.namespace + ".number"
                    }
                ],
                icon: "nodox:core_min",
                fullName: _this.namespace + ".min"
            },
            {
                name: "List sort",
                description: "Sorts a list",
                processFunction: _this.processList,
                postprocessFunction: _this.postprocessSort,
                inputs: [
                    {
                        name: "item",
                        description: "Item in the list",
                        dataType: _this.namespace + ".any",
                        defaultValue: null
                    },
                    {
                        name: "sort property",
                        description: "Optional property on wich to sort",
                        dataType: _this.namespace + ".string",
                        defaultValue: null
                    }
                ],
                outputs: [
                    {
                        name: "item",
                        description: "Item in the list",
                        dataType: _this.namespace + ".any"
                    }
                ],
                icon: "nodox:list_sort",
                fullName: _this.namespace + ".sort"
            }, {
                name: "List shuffle",
                description: "Shuffles a list",
                processFunction: _this.processList,
                postprocessFunction: _this.postprocessShuffle,
                inputs: [
                    {
                        name: "item",
                        description: "Item in the list",
                        dataType: _this.namespace + ".any",
                        defaultValue: null
                    },
                    // this would be a good candidate for a "no-connector" input ....
                    {
                        name: "seed",
                        description: "Seed for pseudo random generator",
                        dataType: _this.namespace + ".string",
                        defaultValue: "for example: Nodox"
                    }
                ],
                outputs: [
                    {
                        name: "item",
                        description: "Item in the list",
                        dataType: _this.namespace + ".any"
                    }
                ],
                icon: "nodox:list_shuffle",
                fullName: _this.namespace + ".shuffle"
            }, {
                name: "List reverse",
                description: "Shuffles a list",
                processFunction: _this.processList,
                postprocessFunction: _this.postprocessReverse,
                inputs: [
                    {
                        name: "item",
                        description: "Item in the list",
                        dataType: _this.namespace + ".any",
                        defaultValue: null
                    }
                ],
                outputs: [
                    {
                        name: "item",
                        description: "Item in the list",
                        dataType: _this.namespace + ".any"
                    }
                ],
                icon: "nodox:list_reverse",
                fullName: _this.namespace + ".reverse"
            }
        ];
        return _this;
    }
    Core.prototype.processRandom = function (context, result, inputParams, index) {
        if (!result["random"]) {
            result["random"] = new Array();
            var seed = inputParams["seed"];
            Math.seedrandom(seed);
        }
        result["random"].push(Math.random());
    };
    Core.prototype.processAdd = function (context, result, inputParams, index) {
        result["sum"] = result["sum"] || new Array();
        var a = +inputParams["a"];
        var b = +inputParams["b"];
        result["sum"].push(a + b);
    };
    Core.prototype.processMax = function (context, result, inputParams, index) {
        result["max"] = result["max"] || new Array();
        var a = +inputParams["a"];
        var b = +inputParams["b"];
        result["max"].push(Math.max(a, b));
    };
    Core.prototype.processMin = function (context, result, inputParams, index) {
        result["min"] = result["min"] || new Array();
        var a = +inputParams["a"];
        var b = +inputParams["b"];
        result["min"].push(Math.min(a, b));
    };
    Core.prototype.processList = function (context, result, inputParams, index) {
        result["item"] = result["item"] || new Array();
        if (!result["seed"]) {
            result["seed"] = new Array();
            result["seed"].push(inputParams["seed"]);
        }
        ;
        var item = inputParams["item"];
        result["item"].push(item);
    };
    Core.prototype.postprocessSort = function (context, nodeValues) {
        nodeValues.keyNames.push("count");
        nodeValues.values["count"] = nodeValues.values["count"] || new Array();
        nodeValues.values["item"] = nodeValues.values["item"] || new Array();
        nodeValues.values["item"].sort();
        nodeValues.values["count"].push(nodeValues.values["item"].length);
    };
    Core.prototype.postprocessShuffle = function (context, nodeValues) {
        nodeValues.keyNames.push("count");
        nodeValues.values["count"] = nodeValues.values["count"] || new Array();
        nodeValues.values["item"] = nodeValues.values["item"] || new Array();
        var seed = nodeValues.values["seed"][0];
        // Fisher-Yates Shuffle
        // http://stackoverflow.com/a/6274398/2965537
        // http://bost.ocks.org/mike/shuffle/
        var shuffle = function (seed, array) {
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
    };
    Core.prototype.postprocessReverse = function (context, nodeValues) {
        nodeValues.keyNames.push("count");
        nodeValues.values["count"] = nodeValues.values["count"] || new Array();
        nodeValues.values["item"] = nodeValues.values["item"] || new Array();
        nodeValues.values["item"].revers();
        nodeValues.values["count"].push(nodeValues.values["item"].length);
    };
    return Core;
}(Nodox_Modules_NodoxModule_1.NodoxModule));
exports.Core = Core;
