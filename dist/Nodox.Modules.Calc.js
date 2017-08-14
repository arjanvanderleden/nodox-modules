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
var Calc = (function (_super) {
    __extends(Calc, _super);
    function Calc() {
        var _this = _super.call(this) || this;
        _this.name = "Calc";
        _this.description = "Definitions for math functions";
        _this.namespace = "nodox.modules.calc";
        _this.dependencies = ["nodox.modules.core"];
        _this.dataTypes = [];
        _this.definitions = [
            {
                name: "Square",
                description: "calculates square of two numbers",
                processFunction: _this.processSquare,
                inputs: [{
                        name: "a",
                        description: "First number",
                        dataType: "nodox.modules.core.number"
                    }
                ],
                outputs: [{
                        name: "square",
                        description: "Square of a",
                        dataType: _this.namespace + ".number"
                    }],
                icon: "action:ic_3d_rotation",
                fullName: "nodox.modules.core.number"
            },
            {
                name: "Square root",
                description: "calculates square of two numbers",
                processFunction: _this.processSquare,
                inputs: [{
                        name: "a",
                        description: "First number",
                        dataType: "nodox.modules.core.number"
                    }
                ],
                outputs: [{
                        name: "squareroot",
                        description: "Squareroot of a",
                        dataType: "nodox.modules.core.number"
                    }],
                icon: "action:ic_3d_rotation",
                fullName: "nodox.modules.core.number"
            },
            {
                name: "Math constant",
                description: "Provides a math constant like Pi",
                processFunction: _this.processConstant,
                inputs: [{
                        name: "name",
                        description: "A string that can be translated into a mathematical constant like pi, PI, Pi",
                        dataType: "nodox.modules.core.string",
                        editorType: "select",
                        valueOptions: ["PI", "E"],
                        defaultValue: "PI"
                    }
                ],
                outputs: [{
                        name: "value",
                        description: "Value of constant",
                        dataType: "nodox.modules.core.number"
                    }],
                icon: "nodox:math_constant",
                fullName: _this.namespace + ".constant"
            }
        ];
        return _this;
    }
    Calc.prototype.processSquare = function (context, result, inputParams, index) {
        var processResult = {};
        return processResult;
    };
    Calc.prototype.processSquareRoot = function (context, result, inputParams, index) {
        var processResult = {};
        return processResult;
    };
    Calc.prototype.processConstant = function (context, result, inputParams, index) {
        result["value"] = result["value"] || new Array();
        var constantValue = 0;
        switch (inputParams["name"].toUpperCase()) {
            case "PI":
                constantValue = Math.PI;
                break;
            case "E":
                constantValue = Math.E;
                break;
        }
        result["value"].push(constantValue);
    };
    return Calc;
}(Nodox_Modules_NodoxModule_1.NodoxModule));
exports.Calc = Calc;
