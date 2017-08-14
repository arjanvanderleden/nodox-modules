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
var Datasets = (function (_super) {
    __extends(Datasets, _super);
    function Datasets() {
        var _this = _super.call(this) || this;
        _this.name = "Datasets";
        _this.description = "Definitions to manipulate datasets in Nodox";
        _this.namespace = "nodox.modules.datasets";
        _this.dependencies = new Array();
        _this.dataTypes = [
            {
                name: "number",
                description: "javascript type nummber",
                accepts: []
            },
            {
                name: "string",
                description: "javascript type string",
                accepts: ["*"]
            }
        ];
        _this.definitions = [
            {
                name: "Load",
                description: "loads a dataset",
                processFunction: _this.processAdd,
                inputs: [
                    {
                        name: "name",
                        description: "First number",
                        dataType: "number"
                    }
                ],
                outputs: [],
                fullName: _this.namespace + ".min"
            },
            {
                name: "Join",
                description: "Join two datasets",
                processFunction: _this.processMax,
                inputs: [],
                outputs: [],
                fullName: _this.namespace + ".join"
            },
            {
                name: "Map",
                description: "Maps a dataset",
                processFunction: _this.processMin,
                inputs: [],
                outputs: [],
                fullName: _this.namespace + ".map"
            },
            {
                name: "Filter",
                description: "Filters a dataset",
                processFunction: _this.processMin,
                inputs: [],
                outputs: [],
                fullName: _this.namespace + ".filter"
            },
            {
                name: "Address lookup",
                description: "Resolves addresses",
                processFunction: _this.processMin,
                inputs: [],
                outputs: [],
                fullName: _this.namespace + ".addressLookup"
            },
            {
                name: "Export",
                description: "Exports a dataset",
                processFunction: _this.processMin,
                inputs: [],
                outputs: [],
                fullName: _this.namespace + ".export"
            }
        ];
        return _this;
    }
    Datasets.prototype.processAdd = function (context, result, inputParams, index) {
        var a = inputParams["a"];
        var b = inputParams["b"];
        result["sum"].push(a + b);
    };
    Datasets.prototype.processMax = function (context, result, inputParams, index) {
        var a = inputParams["a"];
        var b = inputParams["b"];
        result["sum"].push(a + b);
    };
    Datasets.prototype.processMin = function (context, result, inputParams, index) {
        var a = inputParams["a"];
        var b = inputParams["b"];
        result["sum"].push(a + b);
    };
    return Datasets;
}(Nodox_Modules_NodoxModule_1.NodoxModule));
exports.Datasets = Datasets;
