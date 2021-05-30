"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Svg = void 0;
const nodox_core_1 = require("@avdl/nodox-core");
const point_1 = require("@avdl/point");
const convert = {
    hsv: {
        rgb: (...args) => undefined
    }
};
class Svg extends nodox_core_1.NodoxModuleBase {
    constructor() {
        super();
        this.name = 'Svg';
        this.description = 'Definitions for creating svg elements';
        this.namespace = 'nodox.module.svg';
        this.dependencies = [
            nodox_core_1.CORE_MODULE_NAMESPACE,
            'nodox.module.calc'
        ];
        this.cloneFunctions[this.namespace + '.element'] = (element) => {
            return element.clone();
        };
        this.dataTypes = [
            {
                name: 'point',
                description: 'Svg point',
                accepts: []
            }, {
                name: 'color',
                description: 'Svg color',
                accepts: []
            }, {
                name: 'element',
                description: 'Snap element',
                accepts: []
            }
        ];
        this.definitions = [
            {
                name: 'Point',
                description: 'Create a point',
                processFunction: this.processPoint,
                preprocessFunction: this.preprocess,
                processingMode: nodox_core_1.NodeProcessingMode.wrap,
                inputs: [{
                        name: 'x',
                        description: 'X value of point',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`,
                        defaultValue: 0
                    },
                    {
                        name: 'y',
                        description: 'Y value of point',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`,
                        defaultValue: 0
                    }],
                outputs: [{
                        name: 'point',
                        description: 'Point',
                        dataType: this.namespace + '.point'
                    }],
                icon: 'nodox:svg_point',
                fullName: this.namespace + '.point'
            },
            {
                name: 'Color',
                description: 'Create a color',
                processFunction: this.processColor,
                preprocessFunction: this.preprocess,
                processingMode: nodox_core_1.NodeProcessingMode.wrap,
                inputs: [{
                        name: 'r',
                        description: 'Red value of color',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`,
                        defaultValue: 0
                    },
                    {
                        name: 'g',
                        description: 'Green value of color',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`,
                        defaultValue: 0
                    }, {
                        name: 'b',
                        description: 'Blue value of color',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`,
                        defaultValue: 0
                    }],
                outputs: [{
                        name: 'color',
                        description: 'The generated color',
                        dataType: this.namespace + '.color'
                    }],
                icon: 'nodox:core_nodox',
                fullName: this.namespace + '.color'
            },
            {
                name: 'HSV Color',
                description: 'Create a color with HSV values',
                processFunction: this.processHsvColor,
                preprocessFunction: this.preprocess,
                processingMode: nodox_core_1.NodeProcessingMode.wrap,
                inputs: [{
                        name: 'h',
                        description: 'Hue value of color',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`,
                        defaultValue: 0
                    },
                    {
                        name: 's',
                        description: 'Saturation value of color',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`,
                        defaultValue: 0
                    }, {
                        name: 'v',
                        description: 'Value component of color',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`,
                        defaultValue: 0
                    }],
                outputs: [{
                        name: 'color',
                        description: 'The generated color',
                        dataType: this.namespace + '.color'
                    }],
                icon: 'nodox:core_nodox',
                fullName: this.namespace + '.hsvcolor'
            },
            {
                name: 'Vector',
                description: 'Delta of two points',
                processFunction: this.processDeltaPoint,
                preprocessFunction: this.preprocess,
                processingMode: nodox_core_1.NodeProcessingMode.wrap,
                inputs: [
                    {
                        name: 'first',
                        description: 'First point',
                        dataType: this.namespace + '.point',
                        defaultValue: new point_1.Point(0, 0)
                    },
                    {
                        name: 'second',
                        description: 'Second point',
                        dataType: this.namespace + '.point',
                        defaultValue: new point_1.Point(0, 0)
                    }
                ],
                outputs: [
                    {
                        name: 'distance',
                        description: 'Distance between the points',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`
                    },
                    {
                        name: 'angle',
                        description: 'Angle between the points',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`
                    },
                    {
                        name: 'vector',
                        description: 'Angle between the points',
                        dataType: this.namespace + '.point'
                    }
                ],
                icon: 'nodox:svg_circle',
                fullName: this.namespace + '.vector'
            },
            {
                name: 'Circle',
                description: 'Create a circle',
                processFunction: this.processCircle,
                preprocessFunction: this.preprocess,
                processingMode: nodox_core_1.NodeProcessingMode.wrap,
                inputs: [{
                        name: 'center',
                        description: 'Center of circle',
                        dataType: this.namespace + '.point',
                        defaultValue: new point_1.Point(0, 0)
                    },
                    {
                        name: 'radius',
                        description: 'Radius of circle',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`,
                        defaultValue: 10
                    }],
                outputs: [{
                        name: 'circle',
                        description: 'The circle element',
                        dataType: this.namespace + '.element'
                    }],
                icon: 'nodox:svg_circle',
                fullName: this.namespace + '.circle'
            },
            {
                name: 'Rectangle',
                description: 'Create a rectangle',
                processFunction: this.processRectangle,
                preprocessFunction: this.preprocess,
                processingMode: nodox_core_1.NodeProcessingMode.wrap,
                inputs: [{
                        name: 'point',
                        description: 'First point for rectangle',
                        dataType: this.namespace + '.point',
                        defaultValue: new point_1.Point(0, 0)
                    },
                    {
                        name: 'width',
                        description: 'Width of the rectangle',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`,
                        defaultValue: 10
                    },
                    {
                        name: 'height',
                        description: 'Height of the rectangle',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`,
                        defaultValue: 10
                    }],
                outputs: [
                    {
                        name: 'rectangle',
                        description: 'The rectangle element',
                        dataType: this.namespace + '.element'
                    }
                ],
                icon: 'nodox:svg_rectangle',
                fullName: this.namespace + '.rectangle'
            },
            {
                name: 'Grid',
                description: 'Creates an array of points',
                processFunction: this.processGrid,
                postprocessFunction: this.postprocessGrid,
                processingMode: nodox_core_1.NodeProcessingMode.wrap,
                inputs: [
                    {
                        name: 'position',
                        description: 'position of center',
                        dataType: 'nodox.module.svg.point',
                        defaultValue: () => new point_1.Point(0, 0)
                    }, {
                        name: 'columns',
                        description: 'number of columns',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`,
                        defaultValue: 0
                    },
                    {
                        name: 'rows',
                        description: 'number of rows',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`,
                        defaultValue: 0
                    }, {
                        name: 'width',
                        description: 'width of grid',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`,
                        defaultValue: 0
                    }, {
                        name: 'height',
                        description: 'height of grid',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`,
                        defaultValue: 0
                    }
                ],
                outputs: [{
                        name: 'point',
                        description: 'An array of points',
                        dataType: 'nodox.module.svg.point'
                    }, {
                        name: 'count',
                        description: 'Numbur of points generated',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`
                    }],
                icon: 'nodox:svg_grid',
                fullName: this.namespace + '.grid'
            },
            {
                name: 'Radial Grid',
                description: 'Creates an circular array of points',
                processFunction: this.processRadialGrid,
                postprocessFunction: this.postprocessGrid,
                processingMode: nodox_core_1.NodeProcessingMode.wrap,
                inputs: [
                    {
                        name: 'center',
                        description: 'position of center',
                        dataType: 'nodox.module.svg.point',
                        defaultValue: () => new point_1.Point(0, 0)
                    }, {
                        name: 'radius',
                        description: 'radius of the circle',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`,
                        defaultValue: 0
                    }, {
                        name: 'count',
                        description: 'number of columns',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`,
                        defaultValue: 0
                    }
                ],
                outputs: [
                    {
                        name: 'point',
                        description: 'An array of points',
                        dataType: 'nodox.module.svg.point'
                    },
                    {
                        name: 'x',
                        description: 'An array of x values',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`
                    },
                    {
                        name: 'y',
                        description: 'An array of y values',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`
                    },
                    {
                        name: 'count',
                        description: 'Numbur of points generated',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`
                    }
                ],
                icon: 'nodox:svg_radialGrid',
                fullName: this.namespace + '.radialGrid'
            },
            {
                name: 'ellipse',
                description: 'create an ellipse',
                processFunction: this.processCircle,
                preprocessFunction: this.preprocess,
                processingMode: nodox_core_1.NodeProcessingMode.wrap,
                inputs: [],
                outputs: [],
                fullName: this.namespace + '.ellipse',
                icon: 'nodox:svg_ellipse'
            },
            {
                name: 'polygon',
                description: 'create a polygon',
                processFunction: this.processPolygon,
                preprocessFunction: this.preprocess,
                processingMode: nodox_core_1.NodeProcessingMode.wrap,
                inputs: [
                    {
                        name: 'center',
                        description: 'position of center',
                        dataType: 'nodox.module.svg.point',
                        defaultValue: new point_1.Point(0, 0)
                    }, {
                        name: 'radius',
                        description: 'radius of the points of the polygon',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`,
                        defaultValue: 0
                    }, {
                        name: 'count',
                        description: 'number of columns',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`,
                        defaultValue: 0
                    },
                    {
                        name: 'starShaped',
                        description: 'Convex',
                        dataType: 'nodox.module.core.boolean',
                        defaultValue: false
                    },
                    {
                        name: 'useInnerRadius',
                        description: 'Convex',
                        dataType: 'nodox.module.core.boolean',
                        defaultValue: false
                    }, {
                        name: 'innerRadius',
                        description: 'inner radius',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`,
                        defaultValue: 0
                    }
                ],
                outputs: [
                    {
                        name: 'polygon',
                        description: 'The polygon element',
                        dataType: this.namespace + '.element'
                    }
                ],
                fullName: this.namespace + '.polygon',
                icon: 'nodox:svg_polygon'
            },
            {
                name: 'text',
                description: 'create text',
                processFunction: this.processCircle,
                preprocessFunction: this.preprocess,
                processingMode: nodox_core_1.NodeProcessingMode.wrap,
                inputs: [],
                outputs: [],
                fullName: this.namespace + '.text',
                icon: 'nodox:svg_text'
            },
            {
                name: 'set fill',
                description: 'fill element',
                processFunction: this.processSetFill,
                preprocessFunction: this.preprocess,
                processingMode: nodox_core_1.NodeProcessingMode.wrap,
                inputs: [
                    {
                        name: 'element',
                        description: 'The element',
                        dataType: this.namespace + '.element',
                        defaultValue: null
                    }, {
                        name: 'color',
                        description: 'Color of the fill',
                        dataType: this.namespace + '.color',
                        defaultValue: null
                    }, {
                        name: 'opacity',
                        description: 'Fill opacity',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`,
                        defaultValue: 1
                    }
                ],
                outputs: [
                    {
                        name: 'element',
                        description: 'The stroked element',
                        dataType: this.namespace + '.element'
                    }
                ],
                icon: 'nodox:svg_fill',
                fullName: this.namespace + '.fill'
            },
            {
                name: 'set stroke',
                description: 'set a stroke on the element',
                processFunction: this.processSetStroke,
                preprocessFunction: this.preprocess,
                processingMode: nodox_core_1.NodeProcessingMode.wrap,
                inputs: [
                    {
                        name: 'element',
                        description: 'The element to be stroked',
                        dataType: this.namespace + '.element',
                        defaultValue: null
                    }, {
                        name: 'color',
                        description: 'Stroke color',
                        dataType: this.namespace + '.color',
                        defaultValue: null
                    }, {
                        name: 'width',
                        description: 'Stroke width',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`,
                        defaultValue: 0
                    }
                ],
                outputs: [
                    {
                        name: 'element',
                        description: 'The stroked element',
                        dataType: this.namespace + '.element'
                    }
                ],
                icon: 'editor:ic_border_color',
                fullName: this.namespace + '.stroke'
            },
            {
                name: 'group',
                description: 'group elements',
                processFunction: this.processGroup,
                preprocessFunction: this.preprocess,
                postprocessFunction: this.postprocessGroup,
                processingMode: nodox_core_1.NodeProcessingMode.wrap,
                inputs: [{
                        name: 'element',
                        description: 'The element(s) to be grouped',
                        dataType: this.namespace + '.element',
                        defaultValue: null
                    }],
                outputs: [{
                        name: 'element',
                        description: 'The group element',
                        dataType: this.namespace + '.element'
                    }],
                icon: 'nodox:svg_group',
                fullName: this.namespace + '.group'
            },
            {
                name: 'combine',
                description: 'combine elements',
                processFunction: this.processCombine,
                preprocessFunction: this.preprocess,
                postprocessFunction: this.postprocessCombine,
                processingMode: nodox_core_1.NodeProcessingMode.addEmpty,
                inputs: [{
                        name: 'firstElement',
                        description: 'The first element (bottom)',
                        dataType: this.namespace + '.element',
                        defaultValue: null
                    }, {
                        name: 'secondElement',
                        description: 'The 2nd element',
                        dataType: this.namespace + '.element',
                        defaultValue: null
                    },
                    {
                        name: 'thirdElement',
                        description: 'The 3d element',
                        dataType: this.namespace + '.element',
                        defaultValue: null
                    },
                    {
                        name: 'fourthElement',
                        description: 'The 4th element',
                        dataType: this.namespace + '.element',
                        defaultValue: null
                    },
                    {
                        name: 'fifthElement',
                        description: 'The 5th element',
                        dataType: this.namespace + '.element',
                        defaultValue: null
                    },
                    {
                        name: 'groupElements',
                        description: 'Convex',
                        dataType: 'nodox.module.core.boolean',
                        defaultValue: true
                    }],
                outputs: [{
                        name: 'element',
                        description: 'The resulting element (or elements if not grouped)',
                        dataType: this.namespace + '.element'
                    }],
                icon: 'nodox:svg_group',
                fullName: this.namespace + '.combine'
            },
            {
                name: 'translate',
                description: 'translates an element',
                processFunction: this.processTranslate,
                preprocessFunction: this.preprocess,
                processingMode: nodox_core_1.NodeProcessingMode.wrap,
                icon: 'nodox:svg_translate',
                inputs: [
                    {
                        name: 'element',
                        description: 'The element to be translated',
                        dataType: this.namespace + '.element',
                        defaultValue: null
                    }, {
                        name: 'dx',
                        description: 'horizontal translation',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`,
                        defaultValue: 0
                    }, {
                        name: 'dy',
                        description: 'vertical translation',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`,
                        defaultValue: 0
                    }
                ],
                outputs: [
                    {
                        name: 'element',
                        description: 'The translated element',
                        dataType: this.namespace + '.element'
                    }
                ],
                fullName: this.namespace + '.translate'
            },
            {
                name: 'scale',
                description: 'Scale an element',
                processFunction: this.processScale,
                preprocessFunction: this.preprocess,
                processingMode: nodox_core_1.NodeProcessingMode.wrap,
                icon: 'nodox:svg_scale',
                inputs: [
                    {
                        name: 'element',
                        description: 'The element to be rotated',
                        dataType: this.namespace + '.element',
                        defaultValue: null
                    }, {
                        name: 'center',
                        description: 'Center of rotation',
                        dataType: this.namespace + '.point',
                        defaultValue: new point_1.Point(0, 0)
                    },
                    {
                        name: 'factor',
                        description: 'scale factor',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`,
                        defaultValue: 10
                    }
                ],
                outputs: [{
                        name: 'element',
                        description: 'The rotated element',
                        dataType: this.namespace + '.element'
                    }],
                fullName: this.namespace + '.scale'
            },
            {
                name: 'rotate',
                description: 'rotates ',
                processFunction: this.processRotate,
                preprocessFunction: this.preprocess,
                processingMode: nodox_core_1.NodeProcessingMode.wrap,
                icon: 'nodox:svg_rotate',
                inputs: [
                    {
                        name: 'element',
                        description: 'The element to be rotated',
                        dataType: this.namespace + '.element',
                        defaultValue: null
                    }, {
                        name: 'center',
                        description: 'Center of rotation',
                        dataType: this.namespace + '.point',
                        defaultValue: new point_1.Point(0, 0)
                    },
                    {
                        name: 'angle',
                        description: 'angle of rotation in degrees',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`,
                        defaultValue: 10
                    }
                ],
                outputs: [{
                        name: 'element',
                        description: 'The rotated element',
                        dataType: this.namespace + '.element'
                    }],
                fullName: this.namespace + '.rotate'
            },
            {
                name: 'matrix transform',
                description: 'create a circle',
                processFunction: this.processCircle,
                preprocessFunction: this.preprocess,
                processingMode: nodox_core_1.NodeProcessingMode.wrap,
                inputs: [],
                outputs: [],
                fullName: this.namespace + '.matrix',
                icon: 'nodox:svg_matrix'
            }
        ];
    }
    merge(otherModule) {
        return super.merge(otherModule);
    }
    processColor(context, result, inputParams, index) {
        var _a;
        result.color = (_a = result.color) !== null && _a !== void 0 ? _a : [];
        const r = Math.min(Math.max(+inputParams.r, 0), 1) * 255;
        const g = Math.min(Math.max(+inputParams.g, 0), 1) * 255;
        const b = Math.min(Math.max(+inputParams.b, 0), 1) * 255;
        result.color.push(new SVG.Color({ r: r, g: g, b: b }));
    }
    processHsvColor(context, result, inputParams, index) {
        var _a;
        result.color = (_a = result.color) !== null && _a !== void 0 ? _a : [];
        const h = Math.min(Math.max(+inputParams.h, 0), 1);
        const s = Math.min(Math.max(+inputParams.s, 0), 1);
        const v = Math.min(Math.max(+inputParams.v, 0), 1);
        const [r, g, b] = convert.hsv.rgb([h, s, v]) || [1, 2, 3];
        result.color.push(new SVG.Color({ r, g, b }));
    }
    processPoint(context, result, inputParams, index) {
        var _a;
        result.point = (_a = result.point) !== null && _a !== void 0 ? _a : [];
        const x = inputParams.x;
        const y = inputParams.y;
        result.point.push({ x: x, y: y });
    }
    processCircle(context, result, inputParams, index) {
        var _a;
        result.circle = (_a = result.circle) !== null && _a !== void 0 ? _a : [];
        const point = inputParams.center;
        const radius = +inputParams.radius;
        result.circle.push(context.svg.circle(radius).move(point.x, point.y));
    }
    processRectangle(context, result, inputParams, index) {
        var _a;
        result.rectangle = (_a = result.rectangle) !== null && _a !== void 0 ? _a : [];
        const point = inputParams.point;
        const width = +inputParams.width;
        const height = +inputParams.height;
        const radius = +inputParams.radius;
        const rect = context.svg.rect(width, height);
        rect.move(point.x, point.y);
        if (!isNaN(radius))
            rect.radius(radius);
        result.rectangle.push(rect);
    }
    processDeltaPoint(context, result, inputParams, index) {
        var _a, _b, _c;
        result.distance = (_a = result.distance) !== null && _a !== void 0 ? _a : [];
        result.angle = (_b = result.angle) !== null && _b !== void 0 ? _b : [];
        result.vector = (_c = result.vector) !== null && _c !== void 0 ? _c : [];
        const first = new point_1.Point(inputParams.first.x, inputParams.first.y);
        const second = new point_1.Point(inputParams.second.x, inputParams.second.y);
        const vector = first.subtract(second);
        result.vector.push(vector);
        result.distance.push(Math.sqrt(vector.x * vector.x + vector.y * vector.y));
        result.angle.push(Math.atan2(vector.y, vector.x) / Math.PI / 2 + 0.5);
    }
    processEllipse(context, result, inputParams, index) {
        var _a;
        result.ellipse = (_a = result.ellipse) !== null && _a !== void 0 ? _a : [];
        const width = +inputParams.width;
        const height = +inputParams.height;
        const ellipse = context.svg.ellipse(width, height);
        result.ellipse.push(ellipse);
    }
    // number
    // center : point
    processPolygon(context, result, inputParams, index) {
        var _a;
        result.polygon = (_a = result.polygon) !== null && _a !== void 0 ? _a : [];
        const center = inputParams.center;
        const count = +inputParams.count;
        if (count < 3) {
            result.polygon.push(null);
            return;
        }
        const radius = +inputParams.radius;
        const isStarShaped = !!inputParams.starShaped;
        // const useInnerRadius = inputParams.useInnerRadius;
        // const innerRadius = +inputParams.innerRadius;
        const indexStep = isStarShaped ? Math.floor((count - 1) / 2) : 1;
        let pointIndex = 0;
        let pathString = '';
        const points = [];
        for (let c = 0; c < count; c++) {
            const x = +center.x + Math.cos(2 * c * Math.PI / count) * radius;
            const y = +center.y + Math.sin(2 * c * Math.PI / count) * radius;
            points.push(new point_1.Point(x, y));
        }
        // starshaped polygons have multiple subpaths
        let pointsAdded = 0;
        let newPath = true;
        while (pointsAdded < count) {
            if (!points[pointIndex]) {
                pathString += ' Z';
                pointIndex++;
                newPath = true;
            }
            pathString += (newPath) ? 'M' + points[pointIndex].x + ',' + points[pointIndex].y : ' L ' + points[pointIndex].x + ',' + points[pointIndex].y;
            newPath = false;
            delete points[pointIndex];
            pointIndex = (pointIndex + indexStep) % count;
            pointsAdded++;
        }
        pathString += ' Z';
        result.polygon.push(context.svg.path(pathString));
    }
    processText(context, result, inputParams, index) {
        const text = '' + inputParams.text;
        result.sum.push(context.svg.text(text));
    }
    processSetStroke(context, result, inputParams, index) {
        var _a;
        result.element = (_a = result.element) !== null && _a !== void 0 ? _a : [];
        const element = inputParams.element;
        const color = inputParams.color;
        const width = +inputParams.width;
        if (element && element.attr) {
            element.attr({ stroke: color.toHex(), strokeWidth: width });
        }
        result.element.push(element);
    }
    processSetFill(context, result, inputParams, index) {
        var _a;
        result.element = (_a = result.element) !== null && _a !== void 0 ? _a : [];
        const element = inputParams.element;
        const color = inputParams.color;
        let opacity = +inputParams.opacity;
        opacity = Math.max(0, Math.min(1, opacity));
        if (element && element.attr) {
            element.attr({ fill: color.toHex() });
            if (opacity < 1) {
                element.attr({ fillOpacity: opacity });
            }
        }
        result.element.push(element);
    }
    processGroup(context, result, inputParams, index) {
        const gElement = context.groupElement = context.groupElement || context.svg.group();
        const element = inputParams.element;
        if (element) {
            gElement.add(element);
        }
    }
    postprocessGroup(context, nodeValues) {
        var _a;
        nodeValues.values.element = (_a = nodeValues.values.element) !== null && _a !== void 0 ? _a : [];
        nodeValues.values.element.push(context.groupElement);
        context.groupElement = null;
    }
    processCombine(context, result, inputParams, index) {
        const firstElement = inputParams.firstElement;
        const secondEement = inputParams.secondElement;
        const thirdElement = inputParams.thirdElement;
        const fourthElement = inputParams.fourthElement;
        const fifthElement = inputParams.fifthElement;
        const doGroup = !!inputParams.groupElements;
        if (!context.collectedElements) {
            context.collectedElements = {};
            context.collectedElements.firstElements = [];
            context.collectedElements.secondElements = [];
            context.collectedElements.thirdElements = [];
            context.collectedElements.fourthElements = [];
            context.collectedElements.fifthElements = [];
            if (doGroup) {
                context.groupElement = context.groupElement || context.svg.group();
            }
        }
        if (firstElement)
            context.collectedElements.firstElements.push(firstElement);
        if (secondEement)
            context.collectedElements.secondElements.push(secondEement);
        if (thirdElement)
            context.collectedElements.thirdElements.push(thirdElement);
        if (fourthElement)
            context.collectedElements.fourthElements.push(fourthElement);
        if (fifthElement)
            context.collectedElements.fifthElements.push(fifthElement);
    }
    postprocessCombine(context, nodeValues) {
        var _a;
        nodeValues.values.element = (_a = nodeValues.values.element) !== null && _a !== void 0 ? _a : [];
        if (context.groupElement) {
            // all elements are grouped in the only output element
            nodeValues.values.element.push(context.groupElement);
            context.collectedElements.firstElements.forEach((elem) => { context.groupElement.add(elem); });
            context.collectedElements.secondElements.forEach((elem) => { context.groupElement.add(elem); });
            context.collectedElements.thirdElements.forEach((elem) => { context.groupElement.add(elem); });
            context.collectedElements.fourthElements.forEach((elem) => { context.groupElement.add(elem); });
            context.collectedElements.fifthElements.forEach((elem) => { context.groupElement.add(elem); });
            context.groupElement = null;
        }
        else {
            // all elements are output
            context.collectedElements.firstElements.forEach((elem) => { nodeValues.values.element.push(elem); });
            context.collectedElements.secondElements.forEach((elem) => { nodeValues.values.element.push(elem); });
            context.collectedElements.thirdElements.forEach((elem) => { nodeValues.values.element.push(elem); });
            context.collectedElements.fourthElements.forEach((elem) => { nodeValues.values.element.push(elem); });
            context.collectedElements.fifthElements.forEach((elem) => { nodeValues.values.element.push(elem); });
        }
        context.collectedElements = null;
    }
    applyMatrix(element, matrix) {
        element.transform({
            a: matrix.a,
            b: matrix.a,
            c: matrix.c,
            d: matrix.d,
            e: matrix.e,
            f: matrix.f
        });
    }
    // input svg element
    // input matrix abcd ef
    // input svg element
    processTransform(context, result, inputParams, index) {
        var _a;
        result.element = (_a = result.element) !== null && _a !== void 0 ? _a : [];
        const element = inputParams.element;
        const a = +inputParams.a;
        const b = +inputParams.b;
        const c = +inputParams.c;
        const d = +inputParams.d;
        const e = +inputParams.e;
        const f = +inputParams.f;
        const matrix = new SVG.Matrix({ a: a, b: b, c: c, d: d, e: e, f: f });
        this.applyMatrix(element, matrix);
        result.element.push(element);
    }
    // input svg element
    // input rotation angle
    // input rotation point
    // ouput svg element
    processRotate(context, result, inputParams, index) {
        var _a;
        result.element = (_a = result.element) !== null && _a !== void 0 ? _a : [];
        const element = inputParams.element;
        let point = inputParams.center;
        if (!point) {
            const bbox = element.bbox();
            point = new point_1.Point(bbox.cx, bbox.cy);
        }
        const angle = +inputParams.angle * 360;
        // var matrix = <Snap.Matrix> element.transform().localMatrix;
        const matrix = new SVG.Matrix(element);
        matrix.rotate(angle, point.x, point.y);
        this.applyMatrix(element, matrix);
        result.element.push(element);
    }
    // input svg element
    // input scale factor
    // input scale origin point
    // ouput svg element
    processScale(context, result, inputParams, index) {
        var _a;
        result.element = (_a = result.element) !== null && _a !== void 0 ? _a : [];
        const element = inputParams.element;
        const point = inputParams.center;
        const factor = +inputParams.factor;
        const matrix = new SVG.Matrix(element);
        matrix.scale(factor, factor, point.x, point.y);
        this.applyMatrix(element, matrix);
        result.element.push(element);
    }
    // input svg element
    // input dx
    // input dy
    // ouput svg element
    processTranslate(context, result, inputParams, index) {
        var _a;
        result.element = (_a = result.element) !== null && _a !== void 0 ? _a : [];
        const element = inputParams.element;
        const dx = +inputParams.dx;
        const dy = +inputParams.dy;
        element.translate(dx, dy);
        result.element.push(element);
    }
    // output pattern
    // output patternName
    // output svg element
    processCreatePattern(context, result, inputParams, index) {
        var _a;
        result.element = (_a = result.element) !== null && _a !== void 0 ? _a : [];
        const element = inputParams.element;
        result.element.push(element);
    }
    // input patternName
    // input svg element
    processSetPattern(context, result, inputParams, index) {
        var _a;
        result.element = (_a = result.element) !== null && _a !== void 0 ? _a : [];
        const element = inputParams.element;
        result.element.push(element);
    }
    processRadialGrid(context, result, inputParams, index) {
        var _a, _b, _c;
        result.point = (_a = result.point) !== null && _a !== void 0 ? _a : [];
        result.x = (_b = result.x) !== null && _b !== void 0 ? _b : [];
        result.y = (_c = result.y) !== null && _c !== void 0 ? _c : [];
        const center = inputParams.center;
        const count = Math.floor(+inputParams.count);
        const radius = +inputParams.radius;
        for (let c = 0; c < count; c++) {
            const x = +center.x + Math.cos(2 * c * Math.PI / count) * radius;
            const y = +center.y + Math.sin(2 * c * Math.PI / count) * radius;
            result.point.push({ x: x, y: y });
            result.x.push(x);
            result.y.push(y);
        }
    }
    processGrid(context, result, inputParams, index) {
        var _a;
        result.point = (_a = result.point) !== null && _a !== void 0 ? _a : [];
        const position = inputParams.position;
        const columns = +inputParams.columns;
        const rows = +inputParams.rows;
        const width = +inputParams.width;
        const height = +inputParams.height;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                const x = +position.x + c * width / columns - 0.5 * width;
                const y = +position.y + r * height / rows - 0.5 * height;
                result.point.push({ x: x, y: y });
            }
        }
    }
    postprocessGrid(context, nodeValues) {
        var _a, _b;
        nodeValues.keyNames.push('count');
        nodeValues.values.count = (_a = nodeValues.values.count) !== null && _a !== void 0 ? _a : [];
        nodeValues.values.point = (_b = nodeValues.values.point) !== null && _b !== void 0 ? _b : [];
        nodeValues.values.count.push(nodeValues.values.point.length);
    }
    preprocess(context) {
        context.svg = {};
    }
}
exports.Svg = Svg;
