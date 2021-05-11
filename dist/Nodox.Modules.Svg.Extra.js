"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SvgExtra = void 0;
const Nodox_Modules_NodoxModule_1 = require("./Nodox.Modules.NodoxModule");
const point_1 = require("./point");
class SvgExtra extends Nodox_Modules_NodoxModule_1.NodoxModuleBase {
    constructor() {
        super();
        this.name = "SvgExtra";
        this.dependencies = [
            "nodox.modules.svg"
        ];
        this.namespace = "nodox.modules.svg";
        this.dataTypes = [];
        this.definitions = [
            {
                name: "Sun",
                description: "Create a point",
                processFunction: this.processSun,
                preprocessFunction: this.preprocess,
                inputs: [
                    {
                        name: "center",
                        description: "position of center",
                        dataType: "nodox.modules.svg.point",
                        defaultValue: () => { new point_1.Point(0, 0); }
                    },
                    {
                        name: "count",
                        description: "number of columns",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    },
                    {
                        name: "innerRadius",
                        description: "radius in-side of the sun flames",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    }, {
                        name: "outerRadius",
                        label: "outer Radius",
                        description: "radius out-side of the tip of the flames",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    }, {
                        name: "baseStrength",
                        label: "Strength of the base as ratio of the difference between inner and outerradius",
                        description: "radius out-side of the tip of the flames",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    }, {
                        name: "baseTwist",
                        description: "Twist of the flame base as ratio of the base angle",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    }, {
                        name: "tipRotation",
                        description: "rotation of the flame tips as ratio of the base angle",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    },
                    {
                        name: "tipTwist",
                        description: "twist of the flame tips as absolute angle",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    }, {
                        name: "tipStrength",
                        description: "The strength of the flame tips as ratio outerradius",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    }
                ],
                outputs: [{
                        name: "sun",
                        description: "The sun element",
                        dataType: "nodox.modules.svg.element"
                    }],
                icon: "nodox:svg_point",
                fullName: this.namespace + ".sun"
            }
        ];
    }
    processSun(context, result, inputParams, index) {
        result["sun"] = result["sun"] || new Array();
        var center = inputParams["center"];
        var count = +inputParams["count"];
        var innerRadius = +inputParams["innerRadius"];
        var outerRadius = +inputParams["outerRadius"];
        var baseStrength = +inputParams["baseStrength"]; //Strength of the base as ratio of the difference between inner and outerradius
        var baseTwist = +inputParams["baseTwist"]; //Twist of the flame base as ratio of the base angle
        var tipRotation = +inputParams["tipRotation"]; //rotation of the flame tips as ratio of the base angle
        var tipStrength = +inputParams["tipStrength"]; //The strength of the flame tips as ratio outerradius
        var tipTwist = +inputParams["tipTwist"]; //twist of the flame tips as absolute angle in degrees
        if (count < 3) {
            result["sun"].push(null);
            return;
        }
        var index = 0;
        var pathString = "";
        for (var c = 0; c < count; c++) {
            var angle = 2 * Math.PI / count;
            //flame start
            var startX = +center.x + Math.cos(c * angle) * innerRadius;
            var startY = +center.y + Math.sin(c * angle) * innerRadius;
            //flame end
            var endX = +center.x + Math.cos((c + 1) * angle) * innerRadius;
            var endY = +center.y + Math.sin((c + 1) * angle) * innerRadius;
            //flame tip
            var currentFlameAngle = (c + 0.5 + tipTwist) * angle;
            var flameX = +center.x + Math.cos(currentFlameAngle) * outerRadius;
            var flameY = +center.y + Math.sin(currentFlameAngle) * outerRadius;
            var baseCpX = +center.x + Math.cos((c + 0.5 + baseTwist) * angle) * (innerRadius + baseStrength * (outerRadius - innerRadius));
            var baseCpY = +center.y + Math.sin((c + 0.5 + baseTwist) * angle) * (innerRadius + baseStrength * (outerRadius - innerRadius));
            var flameCpX = flameX + Math.cos(tipRotation / 180 * Math.PI + currentFlameAngle - Math.PI) * (outerRadius * tipStrength);
            var flameCpY = flameY + Math.sin(tipRotation / 180 * Math.PI + currentFlameAngle - Math.PI) * (outerRadius * tipStrength);
            if (c == 0) {
                pathString += " M " + startX + "," + startY;
            }
            pathString += " C " + baseCpX + "," + baseCpY + " " + flameCpX + "," + flameCpY + " " + flameX + "," + flameY;
            pathString += " C " + flameCpX + "," + flameCpY + " " + baseCpX + "," + baseCpY + " " + endX + "," + endY;
            if (c == count - 1) {
                pathString += " Z";
            }
        }
        result["sun"].push(context.svg.path(pathString));
    }
    preprocess(context) {
        context.svg = {}; //SVG(window.document.documentElement);      }
    }
}
exports.SvgExtra = SvgExtra;
