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
var Nodox_Modules_Svg_1 = require("./Nodox.Modules.Svg");
var nodox_core_1 = require("nodox-core");
var SvgGrids = (function (_super) {
    __extends(SvgGrids, _super);
    function SvgGrids() {
        var _this = _super.call(this) || this;
        _this.name = "SvgGrids";
        _this.description = "Grids for Svg";
        _this.definitions = [
            {
                name: "Hex Grid",
                description: "Creates an hexagonal grid of points",
                processFunction: _this.processHexGrid,
                postprocessFunction: _super.prototype.postprocessGrid,
                inputs: [
                    {
                        name: "center",
                        description: "position of center",
                        dataType: "nodox.modules.svg.point",
                        defaultValue: function () { return new nodox_core_1.Point(0, 0); }
                    }, {
                        name: "rings",
                        description: "number of rings around center)",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 1
                    }, {
                        name: "size",
                        description: "size (distance between centers)",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    }, {
                        name: "angle",
                        description: "rotation of grid",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    }
                ],
                outputs: [{
                        name: "point",
                        description: "An array of points",
                        dataType: "nodox.modules.svg.point"
                    }, {
                        name: "count",
                        description: "Numbur of points generated",
                        dataType: "nodox.modules.core.number"
                    }],
                icon: "nodox:svg_hexGrid",
                fullName: _this.namespace + ".hexGrid"
            }
        ];
        return _this;
    }
    SvgGrids.prototype.merge = function (otherModule) {
        return _super.prototype.merge.call(this, otherModule);
    };
    SvgGrids.prototype.processHexGrid = function (context, result, inputParams, index) {
        result["point"] = result["point"] || new Array();
        var center = inputParams["center"];
        var rings = +inputParams["rings"];
        var size = +inputParams["size"];
        var angle = +inputParams["angle"];
        result["point"].push(center);
        for (var ring = 1; ring < rings; ring++) {
            for (var corner = 0; corner < 6; corner++) {
                var thisCorner = new nodox_core_1.Point(ring * size * Math.cos(corner * Math.PI / 3 + angle * Math.PI / 180), ring * size * Math.sin(corner * Math.PI / 3 + angle * Math.PI / 180)).add(center);
                var nextCorner = new nodox_core_1.Point(ring * size * Math.cos((corner + 1) * Math.PI / 3 + angle * Math.PI / 180), ring * size * Math.sin((corner + 1) * Math.PI / 3 + angle * Math.PI / 180)).add(center);
                result["point"].push(thisCorner);
                for (var step = 1; step < ring; step++) {
                    var betweenPoint = new nodox_core_1.Point(thisCorner.x + step / ring * (nextCorner.x - thisCorner.x), thisCorner.y + step / ring * (nextCorner.y - thisCorner.y));
                    result["point"].push(betweenPoint);
                }
            }
        }
    };
    return SvgGrids;
}(Nodox_Modules_Svg_1.Svg));
exports.SvgGrids = SvgGrids;
