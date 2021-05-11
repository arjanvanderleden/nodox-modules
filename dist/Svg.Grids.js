"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SvgGrids = void 0;
const Nodox_Modules_Svg_1 = require("./Nodox.Modules.Svg");
const point_1 = require("./point");
class SvgGrids extends Nodox_Modules_Svg_1.Svg {
    merge(otherModule) {
        return super.merge(otherModule);
    }
    constructor() {
        super();
        this.name = "SvgGrids";
        this.description = "Grids for Svg";
        this.definitions = [
            {
                name: "Hex Grid",
                description: "Creates an hexagonal grid of points",
                processFunction: this.processHexGrid,
                postprocessFunction: super.postprocessGrid,
                inputs: [
                    {
                        name: "center",
                        description: "position of center",
                        dataType: "nodox.modules.svg.point",
                        defaultValue: () => { return new point_1.Point(0, 0); }
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
                fullName: this.namespace + ".hexGrid"
            }
        ];
    }
    processHexGrid(context, result, inputParams, index) {
        result["point"] = result["point"] || new Array();
        var center = inputParams["center"];
        var rings = +inputParams["rings"];
        var size = +inputParams["size"];
        var angle = +inputParams["angle"];
        result["point"].push(center);
        for (var ring = 1; ring < rings; ring++) {
            for (var corner = 0; corner < 6; corner++) {
                var thisCorner = new point_1.Point(ring * size * Math.cos(corner * Math.PI / 3 + angle * Math.PI / 180), ring * size * Math.sin(corner * Math.PI / 3 + angle * Math.PI / 180)).add(center);
                var nextCorner = new point_1.Point(ring * size * Math.cos((corner + 1) * Math.PI / 3 + angle * Math.PI / 180), ring * size * Math.sin((corner + 1) * Math.PI / 3 + angle * Math.PI / 180)).add(center);
                result["point"].push(thisCorner);
                for (var step = 1; step < ring; step++) {
                    var betweenPoint = new point_1.Point(thisCorner.x + step / ring * (nextCorner.x - thisCorner.x), thisCorner.y + step / ring * (nextCorner.y - thisCorner.y));
                    result["point"].push(betweenPoint);
                }
            }
        }
    }
}
exports.SvgGrids = SvgGrids;
