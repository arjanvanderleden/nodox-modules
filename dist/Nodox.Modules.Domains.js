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
var Domains = (function (_super) {
    __extends(Domains, _super);
    function Domains() {
        var _this = _super.call(this) || this;
        _this.name = "Domains";
        _this.description = "Nodes for translating values from one domain into the other";
        _this.namespace = "nodox.modules.domains";
        _this.dependencies = [
            "nodox.modules.core",
            "nodox.modules.calc"
        ];
        _this.dataTypes = [];
        _this.definitions = [
            {
                name: "Range",
                description: "Creates an array of numbers",
                processFunction: _this.processRange,
                inputs: [
                    {
                        name: "from",
                        description: "From number",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    }, {
                        name: "to",
                        description: "to number",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    },
                    {
                        name: "count",
                        description: "number of elements",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    }
                ],
                outputs: [{
                        name: "value",
                        description: "An array of numbers",
                        dataType: "nodox.modules.core.number"
                    }],
                icon: "nodox:range",
                fullName: _this.namespace + ".range"
            }, {
                name: "Linear",
                description: "Calculates values in a range",
                processFunction: _this.processLinearDomain,
                inputs: [
                    {
                        name: "fromStart",
                        description: "Second number",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    }, {
                        name: "fromEnd",
                        description: "First number",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    },
                    {
                        name: "toStart",
                        description: "Second number",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    }, {
                        name: "toEnd",
                        description: "First number",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    },
                    {
                        name: "value",
                        description: "First number",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    }
                ],
                outputs: [{
                        name: "value",
                        description: "The calculated value in teh output domain",
                        dataType: "nodox.modules.core.number"
                    }],
                icon: "nodox:domain_linear",
                fullName: _this.namespace + ".linear"
            },
            {
                name: "Exponential",
                description: "Calculates values in an exponential range",
                processFunction: _this.processExponentialDomain,
                inputs: [
                    {
                        name: "fromStart",
                        description: "Second number",
                        dataType: _this.namespace + ".number",
                        defaultValue: 0
                    }, {
                        name: "fromEnd",
                        description: "First number",
                        dataType: _this.namespace + ".number",
                        defaultValue: 0
                    },
                    {
                        name: "toStart",
                        description: "Second number",
                        dataType: _this.namespace + ".number",
                        defaultValue: 0
                    }, {
                        name: "toEnd",
                        description: "First number",
                        dataType: _this.namespace + ".number",
                        defaultValue: 0
                    },
                    {
                        name: "value",
                        description: "First number",
                        dataType: _this.namespace + ".number",
                        defaultValue: 0
                    }
                ],
                outputs: [{
                        name: "value",
                        description: "the new value mapped in the new domain",
                        dataType: _this.namespace + ".number"
                    }],
                icon: "nodox:domain_exponential",
                fullName: _this.namespace + ".exponential"
            }
        ];
        return _this;
    }
    Domains.prototype.processLinearDomain = function (context, result, inputParams, index) {
        result["value"] = result["value"] || new Array();
        var a = +inputParams["fromStart"];
        var b = +inputParams["fromEnd"];
        var c = +inputParams["toStart"];
        var d = +inputParams["toEnd"];
        var value = +inputParams["value"];
        result["value"].push(value * (d - c) / (b - a));
    };
    Domains.prototype.processExponentialDomain = function (context, result, inputParams, index) {
        var a = inputParams["a"];
        var b = inputParams["b"];
        result["sum"].push(a + b);
    };
    Domains.prototype.processRange = function (context, result, inputParams, index) {
        result["value"] = result["value"] || new Array();
        var from = +inputParams["from"];
        var to = +inputParams["to"];
        var count = +inputParams["count"];
        var v = 0;
        var step = (to - from) / (count - 1);
        if (count > 1) {
            for (var index = 0; index < count; index++) {
                result["value"].push(v);
                v += step;
            }
        }
    };
    return Domains;
}(Nodox_Modules_NodoxModule_1.NodoxModule));
exports.Domains = Domains;
