"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SvgExtra = void 0;
const nodox_core_1 = require("@avdl/nodox-core");
const point_1 = require("@avdl/point");
// declare namespace SVG {
//   const Color: any;
//   const Shape: any;
//   const Matrix: any;
//   const Element: any;
//   const G: any;
// }
class SvgExtra extends nodox_core_1.NodoxModuleBase {
    constructor() {
        super();
        this.name = 'SvgExtra';
        this.dependencies = [
            'nodox.modules.svg'
        ];
        this.namespace = 'nodox.modules.svg';
        this.description = 'demo nodes for svg';
        this.dataTypes = [];
        this.definitions = [
            {
                name: 'Sun',
                description: 'Create a point',
                processFunction: this.processSun,
                preprocessFunction: this.preprocess,
                inputs: [
                    {
                        name: 'center',
                        description: 'position of center',
                        dataType: 'nodox.modules.svg.point',
                        defaultValue: () => new point_1.Point(0, 0)
                    },
                    {
                        name: 'count',
                        description: 'number of columns',
                        dataType: 'nodox.modules.core.number',
                        defaultValue: 0
                    },
                    {
                        name: 'innerRadius',
                        description: 'radius in-side of the sun flames',
                        dataType: 'nodox.modules.core.number',
                        defaultValue: 0
                    }, {
                        name: 'outerRadius',
                        label: 'outer Radius',
                        description: 'radius out-side of the tip of the flames',
                        dataType: 'nodox.modules.core.number',
                        defaultValue: 0
                    }, {
                        name: 'baseStrength',
                        label: 'Strength of the base as ratio of the difference between inner and outerradius',
                        description: 'radius out-side of the tip of the flames',
                        dataType: 'nodox.modules.core.number',
                        defaultValue: 0
                    }, {
                        name: 'baseTwist',
                        description: 'Twist of the flame base as ratio of the base angle',
                        dataType: 'nodox.modules.core.number',
                        defaultValue: 0
                    }, {
                        name: 'tipRotation',
                        description: 'rotation of the flame tips as ratio of the base angle',
                        dataType: 'nodox.modules.core.number',
                        defaultValue: 0
                    },
                    {
                        name: 'tipTwist',
                        description: 'twist of the flame tips as absolute angle',
                        dataType: 'nodox.modules.core.number',
                        defaultValue: 0
                    }, {
                        name: 'tipStrength',
                        description: 'The strength of the flame tips as ratio outerradius',
                        dataType: 'nodox.modules.core.number',
                        defaultValue: 0
                    }
                ],
                outputs: [{
                        name: 'sun',
                        description: 'The sun element',
                        dataType: 'nodox.modules.svg.element'
                    }],
                icon: 'nodox:svg_point',
                fullName: this.namespace + '.sun'
            }
        ];
    }
    processSun(context, result, inputParams, index) {
        var _a;
        result.sun = (_a = result.sun) !== null && _a !== void 0 ? _a : [];
        const center = inputParams.center;
        const count = +inputParams.count;
        const innerRadius = +inputParams.innerRadius;
        const outerRadius = +inputParams.outerRadius;
        const baseStrength = +inputParams.baseStrength; // Strength of the base as ratio of the difference between inner and outerradius
        const baseTwist = +inputParams.baseTwist; // Twist of the flame base as ratio of the base angle
        const tipRotation = +inputParams.tipRotation; // rotation of the flame tips as ratio of the base angle
        const tipStrength = +inputParams.tipStrength; // The strength of the flame tips as ratio outerradius
        const tipTwist = +inputParams.tipTwist; // twist of the flame tips as absolute angle in degrees
        if (count < 3) {
            result.sun.push(null);
            return;
        }
        let pathString = '';
        for (let c = 0; c < count; c++) {
            const angle = 2 * Math.PI / count;
            // flame start
            const startX = +center.x + Math.cos(c * angle) * innerRadius;
            const startY = +center.y + Math.sin(c * angle) * innerRadius;
            // flame end
            const endX = +center.x + Math.cos((c + 1) * angle) * innerRadius;
            const endY = +center.y + Math.sin((c + 1) * angle) * innerRadius;
            // flame tip
            const currentFlameAngle = (c + 0.5 + tipTwist) * angle;
            const flameX = +center.x + Math.cos(currentFlameAngle) * outerRadius;
            const flameY = +center.y + Math.sin(currentFlameAngle) * outerRadius;
            const baseCpX = +center.x + Math.cos((c + 0.5 + baseTwist) * angle) * (innerRadius + baseStrength * (outerRadius - innerRadius));
            const baseCpY = +center.y + Math.sin((c + 0.5 + baseTwist) * angle) * (innerRadius + baseStrength * (outerRadius - innerRadius));
            const flameCpX = flameX + Math.cos(tipRotation / 180 * Math.PI + currentFlameAngle - Math.PI) * (outerRadius * tipStrength);
            const flameCpY = flameY + Math.sin(tipRotation / 180 * Math.PI + currentFlameAngle - Math.PI) * (outerRadius * tipStrength);
            if (c === 0) {
                pathString += ' M ' + startX + ',' + startY;
            }
            pathString += ' C ' + baseCpX + ',' + baseCpY + ' ' + flameCpX + ',' + flameCpY + ' ' + flameX + ',' + flameY;
            pathString += ' C ' + flameCpX + ',' + flameCpY + ' ' + baseCpX + ',' + baseCpY + ' ' + endX + ',' + endY;
            if (c === count - 1) {
                pathString += ' Z';
            }
        }
        result.sun.push(context.svg.path(pathString));
    }
    preprocess(context) {
        context.svg = {}; // SVG(window.document.documentElement);      }
    }
}
exports.SvgExtra = SvgExtra;
