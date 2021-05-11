"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Svg = void 0;
const nodox_core_1 = require("nodox-core");
const Nodox_Modules_NodoxModule_1 = require("./Nodox.Modules.NodoxModule");
const convert = { hsv: {
        rgb: (...args) => void (0)
    } };
const point_1 = require("./point");
class Svg extends Nodox_Modules_NodoxModule_1.NodoxModuleBase {
    merge(otherModule) {
        return super.merge(otherModule);
    }
    constructor() {
        super();
        this.name = "Svg";
        this.description = "Definitions for creating svg elements";
        this.namespace = "nodox.modules.svg";
        this.dependencies = [
            "nodox.modules.core",
            "nodox.modules.math"
        ];
        this.cloneFunctions[this.namespace + ".element"] = (element) => {
            return element.clone();
        };
        this.dataTypes = [
            {
                name: "point",
                description: "Svg point",
                accepts: []
            }, {
                name: "color",
                description: "Svg color",
                accepts: []
            }, {
                name: "element",
                description: "Snap element",
                accepts: []
            }
        ];
        this.definitions = [
            {
                name: "Point",
                description: "Create a point",
                processFunction: this.processPoint,
                preprocessFunction: this.preprocess,
                inputs: [{
                        name: "x",
                        description: "X value of point",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    },
                    {
                        name: "y",
                        description: "Y value of point",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    }],
                outputs: [{
                        name: "point",
                        description: "Point",
                        dataType: this.namespace + ".point"
                    }],
                icon: "nodox:svg_point",
                fullName: this.namespace + ".point"
            },
            {
                name: "Color",
                description: "Create a color",
                processFunction: this.processColor,
                preprocessFunction: this.preprocess,
                inputs: [{
                        name: "r",
                        description: "Red value of color",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    },
                    {
                        name: "g",
                        description: "Green value of color",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    }, {
                        name: "b",
                        description: "Blue value of color",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    }],
                outputs: [{
                        name: "color",
                        description: "The generated color",
                        dataType: this.namespace + ".color"
                    }],
                icon: "nodox:core_nodox",
                fullName: this.namespace + ".color"
            },
            {
                name: "HSV Color",
                description: "Create a color with HSV values",
                processFunction: this.processHsvColor,
                preprocessFunction: this.preprocess,
                inputs: [{
                        name: "h",
                        description: "Hue value of color",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    },
                    {
                        name: "s",
                        description: "Saturation value of color",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    }, {
                        name: "v",
                        description: "Value component of color",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    }],
                outputs: [{
                        name: "color",
                        description: "The generated color",
                        dataType: this.namespace + ".color"
                    }],
                icon: "nodox:core_nodox",
                fullName: this.namespace + ".hsvcolor"
            },
            {
                name: "Vector",
                description: "Delta of two points",
                processFunction: this.processDeltaPoint,
                preprocessFunction: this.preprocess,
                inputs: [
                    {
                        name: "first",
                        description: "First point",
                        dataType: this.namespace + ".point",
                        defaultValue: new point_1.Point(0, 0)
                    },
                    {
                        name: "second",
                        description: "Second point",
                        dataType: this.namespace + ".point",
                        defaultValue: new point_1.Point(0, 0)
                    }
                ],
                outputs: [
                    {
                        name: "distance",
                        description: "Distance between the points",
                        dataType: "nodox.modules.core.number"
                    },
                    {
                        name: "angle",
                        description: "Angle between the points",
                        dataType: "nodox.modules.core.number"
                    },
                    {
                        name: "vector",
                        description: "Angle between the points",
                        dataType: this.namespace + ".point"
                    }
                ],
                icon: "nodox:svg_circle",
                fullName: this.namespace + ".vector"
            },
            {
                name: "Circle",
                description: "Create a circle",
                processFunction: this.processCircle,
                preprocessFunction: this.preprocess,
                inputs: [{
                        name: "center",
                        description: "Center of circle",
                        dataType: this.namespace + ".point",
                        defaultValue: new point_1.Point(0, 0)
                    },
                    {
                        name: "radius",
                        description: "Radius of circle",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 10
                    }],
                outputs: [{
                        name: "circle",
                        description: "The circle element",
                        dataType: this.namespace + ".element"
                    }],
                icon: "nodox:svg_circle",
                fullName: this.namespace + ".circle"
            },
            {
                name: "Rectangle",
                description: "Create a rectangle",
                processFunction: this.processRectangle,
                preprocessFunction: this.preprocess,
                inputs: [{
                        name: "point",
                        description: "First point for rectangle",
                        dataType: this.namespace + ".point",
                        defaultValue: new point_1.Point(0, 0)
                    },
                    {
                        name: "width",
                        description: "Width of the rectangle",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 10
                    },
                    {
                        name: "height",
                        description: "Height of the rectangle",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 10
                    }],
                outputs: [
                    {
                        name: "rectangle",
                        description: "The rectangle element",
                        dataType: this.namespace + ".element"
                    }
                ],
                icon: "nodox:svg_rectangle",
                fullName: this.namespace + ".rectangle"
            },
            {
                name: "Grid",
                description: "Creates an array of points",
                processFunction: this.processGrid,
                postprocessFunction: this.postprocessGrid,
                inputs: [
                    {
                        name: "position",
                        description: "position of center",
                        dataType: "nodox.modules.svg.point",
                        defaultValue: () => { new point_1.Point(0, 0); }
                    }, {
                        name: "columns",
                        description: "number of columns",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    },
                    {
                        name: "rows",
                        description: "number of rows",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    }, {
                        name: "width",
                        description: "width of grid",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    }, {
                        name: "height",
                        description: "height of grid",
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
                icon: "nodox:svg_grid",
                fullName: this.namespace + ".grid"
            },
            {
                name: "Radial Grid",
                description: "Creates an circular array of points",
                processFunction: this.processRadialGrid,
                postprocessFunction: this.postprocessGrid,
                inputs: [
                    {
                        name: "center",
                        description: "position of center",
                        dataType: "nodox.modules.svg.point",
                        defaultValue: () => { new point_1.Point(0, 0); }
                    }, {
                        name: "radius",
                        description: "radius of the circle",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    }, {
                        name: "count",
                        description: "number of columns",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    }
                ],
                outputs: [
                    {
                        name: "point",
                        description: "An array of points",
                        dataType: "nodox.modules.svg.point"
                    },
                    {
                        name: "x",
                        description: "An array of x values",
                        dataType: "nodox.modules.core.number"
                    },
                    {
                        name: "y",
                        description: "An array of y values",
                        dataType: "nodox.modules.core.number"
                    },
                    {
                        name: "count",
                        description: "Numbur of points generated",
                        dataType: "nodox.modules.core.number"
                    }
                ],
                icon: "nodox:svg_radialGrid",
                fullName: this.namespace + ".radialGrid"
            },
            {
                name: "ellipse",
                description: "create an ellipse",
                processFunction: this.processCircle,
                preprocessFunction: this.preprocess,
                inputs: [],
                outputs: [],
                fullName: this.namespace + ".ellipse",
                icon: "nodox:svg_ellipse",
            },
            {
                name: "polygon",
                description: "create a polygon",
                processFunction: this.processPolygon,
                preprocessFunction: this.preprocess,
                inputs: [
                    {
                        name: "center",
                        description: "position of center",
                        dataType: "nodox.modules.svg.point",
                        defaultValue: new point_1.Point(0, 0)
                    }, {
                        name: "radius",
                        description: "radius of the points of the polygon",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    }, {
                        name: "count",
                        description: "number of columns",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    },
                    {
                        name: "starShaped",
                        description: "Convex",
                        dataType: "nodox.modules.core.boolean",
                        defaultValue: false
                    },
                    {
                        name: "useInnerRadius",
                        description: "Convex",
                        dataType: "nodox.modules.core.boolean",
                        defaultValue: false
                    }, {
                        name: "innerRadius",
                        description: "inner radius",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    }
                ],
                outputs: [
                    {
                        name: "polygon",
                        description: "The polygon element",
                        dataType: this.namespace + ".element"
                    }
                ],
                fullName: this.namespace + ".polygon",
                icon: "nodox:svg_polygon",
            },
            {
                name: "text",
                description: "create text",
                processFunction: this.processCircle,
                preprocessFunction: this.preprocess,
                inputs: [],
                outputs: [],
                fullName: this.namespace + ".text",
                icon: "nodox:svg_text",
            },
            {
                name: "set fill",
                description: "fill element",
                processFunction: this.processSetFill,
                preprocessFunction: this.preprocess,
                inputs: [
                    {
                        name: "element",
                        description: "The element",
                        dataType: this.namespace + ".element",
                        defaultValue: null
                    }, {
                        name: "color",
                        description: "Color of the fill",
                        dataType: this.namespace + ".color",
                        defaultValue: null
                    }, {
                        name: "opacity",
                        description: "Fill opacity",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 1
                    }
                ],
                outputs: [
                    {
                        name: "element",
                        description: "The stroked element",
                        dataType: this.namespace + ".element"
                    }
                ],
                icon: "nodox:svg_fill",
                fullName: this.namespace + ".fill",
            },
            {
                name: "set stroke",
                description: "set a stroke on the element",
                processFunction: this.processSetStroke,
                preprocessFunction: this.preprocess,
                inputs: [
                    {
                        name: "element",
                        description: "The element to be stroked",
                        dataType: this.namespace + ".element",
                        defaultValue: null
                    }, {
                        name: "color",
                        description: "Stroke color",
                        dataType: this.namespace + ".color",
                        defaultValue: null
                    }, {
                        name: "width",
                        description: "Stroke width",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    }
                ],
                outputs: [
                    {
                        name: "element",
                        description: "The stroked element",
                        dataType: this.namespace + ".element"
                    }
                ],
                icon: "editor:ic_border_color",
                fullName: this.namespace + ".stroke"
            },
            {
                name: "group",
                description: "group elements",
                processFunction: this.processGroup,
                preprocessFunction: this.preprocess,
                postprocessFunction: this.postprocessGroup,
                inputs: [{
                        name: "element",
                        description: "The element(s) to be grouped",
                        dataType: this.namespace + ".element",
                        defaultValue: null
                    },],
                outputs: [{
                        name: "element",
                        description: "The group element",
                        dataType: this.namespace + ".element"
                    }],
                icon: "nodox:svg_group",
                fullName: this.namespace + ".group"
            },
            {
                name: "combine",
                description: "combine elements",
                processFunction: this.processCombine,
                preprocessFunction: this.preprocess,
                postprocessFunction: this.postprocessCombine,
                processingMode: nodox_core_1.NodeProcessingMode.addEmpty,
                inputs: [{
                        name: "firstElement",
                        description: "The first element (bottom)",
                        dataType: this.namespace + ".element",
                        defaultValue: null
                    }, {
                        name: "secondElement",
                        description: "The 2nd element",
                        dataType: this.namespace + ".element",
                        defaultValue: null
                    },
                    {
                        name: "thirdElement",
                        description: "The 3d element",
                        dataType: this.namespace + ".element",
                        defaultValue: null
                    },
                    {
                        name: "fourthElement",
                        description: "The 4th element",
                        dataType: this.namespace + ".element",
                        defaultValue: null
                    },
                    {
                        name: "fifthElement",
                        description: "The 5th element",
                        dataType: this.namespace + ".element",
                        defaultValue: null
                    },
                    {
                        name: "groupElements",
                        description: "Convex",
                        dataType: "nodox.modules.core.boolean",
                        defaultValue: true
                    }],
                outputs: [{
                        name: "element",
                        description: "The resulting element (or elements if not grouped)",
                        dataType: this.namespace + ".element"
                    }],
                icon: "nodox:svg_group",
                fullName: this.namespace + ".combine"
            },
            {
                name: "translate",
                description: "translates an element",
                processFunction: this.processTranslate,
                preprocessFunction: this.preprocess,
                icon: "nodox:svg_translate",
                inputs: [
                    {
                        name: "element",
                        description: "The element to be translated",
                        dataType: this.namespace + ".element",
                        defaultValue: null
                    }, {
                        name: "dx",
                        description: "horizontal translation",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    }, {
                        name: "dy",
                        description: "vertical translation",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 0
                    }
                ],
                outputs: [
                    {
                        name: "element",
                        description: "The translated element",
                        dataType: this.namespace + ".element"
                    }
                ],
                fullName: this.namespace + ".translate"
            },
            {
                name: "scale",
                description: "Scale an element",
                processFunction: this.processScale,
                preprocessFunction: this.preprocess,
                icon: "nodox:svg_scale",
                inputs: [
                    {
                        name: "element",
                        description: "The element to be rotated",
                        dataType: this.namespace + ".element",
                        defaultValue: null
                    }, {
                        name: "center",
                        description: "Center of rotation",
                        dataType: this.namespace + ".point",
                        defaultValue: new point_1.Point(0, 0)
                    },
                    {
                        name: "factor",
                        description: "scale factor",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 10
                    }
                ],
                outputs: [{
                        name: "element",
                        description: "The rotated element",
                        dataType: this.namespace + ".element"
                    }], fullName: this.namespace + ".scale"
            },
            {
                name: "rotate",
                description: "rotates ",
                processFunction: this.processRotate,
                preprocessFunction: this.preprocess,
                icon: "nodox:svg_rotate",
                inputs: [
                    {
                        name: "element",
                        description: "The element to be rotated",
                        dataType: this.namespace + ".element",
                        defaultValue: null
                    }, {
                        name: "center",
                        description: "Center of rotation",
                        dataType: this.namespace + ".point",
                        defaultValue: new point_1.Point(0, 0)
                    },
                    {
                        name: "angle",
                        description: "angle of rotation in degrees",
                        dataType: "nodox.modules.core.number",
                        defaultValue: 10
                    }
                ],
                outputs: [{
                        name: "element",
                        description: "The rotated element",
                        dataType: this.namespace + ".element"
                    }],
                fullName: this.namespace + ".rotate"
            },
            {
                name: "matrix transform",
                description: "create a circle",
                processFunction: this.processCircle,
                preprocessFunction: this.preprocess,
                inputs: [],
                outputs: [],
                fullName: this.namespace + ".matrix",
                icon: "nodox:svg_matrix",
            }
        ];
    }
    processColor(context, result, inputParams, index) {
        result["color"] = result["color"] || new Array();
        var r = Math.min(Math.max(+inputParams["r"], 0), 1) * 255;
        var g = Math.min(Math.max(+inputParams["g"], 0), 1) * 255;
        var b = Math.min(Math.max(+inputParams["b"], 0), 1) * 255;
        result["color"].push(new SVG.Color({ r: r, g: g, b: b }));
    }
    processHsvColor(context, result, inputParams, index) {
        result["color"] = result["color"] || new Array();
        var h = Math.min(Math.max(+inputParams["h"], 0), 1);
        var s = Math.min(Math.max(+inputParams["s"], 0), 1);
        var v = Math.min(Math.max(+inputParams["v"], 0), 1);
        var [r, g, b] = convert.hsv.rgb([h, s, v]) || [1, 2, 3];
        result["color"].push(new SVG.Color({ r, g, b }));
    }
    processPoint(context, result, inputParams, index) {
        result["point"] = result["point"] || new Array();
        var x = inputParams["x"];
        var y = inputParams["y"];
        result["point"].push({ x: x, y: y });
    }
    processCircle(context, result, inputParams, index) {
        result["circle"] = result["circle"] || new Array();
        var point = inputParams["center"];
        var radius = +inputParams["radius"];
        result["circle"].push(context.svg.circle(radius).move(point.x, point.y));
    }
    processRectangle(context, result, inputParams, index) {
        result["rectangle"] = result["rectangle"] || new Array();
        var point = inputParams["point"];
        var width = +inputParams["width"];
        var height = +inputParams["height"];
        var radius = +inputParams["radius"];
        var rect = context.svg.rect(width, height);
        rect.move(point.x, point.y);
        if (!isNaN(radius))
            rect.radius(radius);
        result["rectangle"].push(rect);
    }
    processDeltaPoint(context, result, inputParams, index) {
        result["distance"] = result["distance"] || new Array();
        result["angle"] = result["angle"] || new Array();
        result["vector"] = result["vector"] || new Array();
        var first = new point_1.Point(inputParams["first"].x, inputParams["first"].y);
        var second = new point_1.Point(inputParams["second"].x, inputParams["second"].y);
        var vector = first.subtract(second);
        result["vector"].push(vector);
        result["distance"].push(Math.sqrt(vector.x * vector.x + vector.y * vector.y));
        result["angle"].push(Math.atan2(vector.y, vector.x) / Math.PI / 2 + 0.5);
    }
    processEllipse(context, result, inputParams, index) {
        var width = +inputParams["width"];
        var height = +inputParams["height"];
        var ellipse = context.svg.ellipse(width, height);
        result["ellipse"].push();
    }
    // number
    // center : point
    processPolygon(context, result, inputParams, index) {
        result["polygon"] = result["polygon"] || new Array();
        var center = inputParams["center"];
        var count = +inputParams["count"];
        if (count < 3) {
            result["polygon"].push(null);
            return;
        }
        var radius = +inputParams["radius"];
        var isStarShaped = !!inputParams["starShaped"];
        var useInnerRadius = inputParams["useInnerRadius"];
        var innerRadius = +inputParams["innerRadius"];
        var indexStep = isStarShaped ? Math.floor((count - 1) / 2) : 1;
        var index = 0;
        var pathString = "";
        var points = new Array();
        for (var c = 0; c < count; c++) {
            var x = +center.x + Math.cos(2 * c * Math.PI / count) * radius;
            var y = +center.y + Math.sin(2 * c * Math.PI / count) * radius;
            points.push(new point_1.Point(x, y));
        }
        //starshaped polygons have multiple subpaths
        var pointsAdded = 0;
        var newPath = true;
        while (pointsAdded < count) {
            if (!points[index]) {
                pathString += " Z";
                index++;
                newPath = true;
            }
            pathString += (newPath) ? "M" + points[index].x + "," + points[index].y : " L " + points[index].x + "," + points[index].y;
            newPath = false;
            delete points[index];
            index = (index + indexStep) % count;
            pointsAdded++;
        }
        pathString += " Z";
        result["polygon"].push(context.svg.path(pathString));
    }
    processText(context, result, inputParams, index) {
        var text = "" + inputParams["text"];
        result["sum"].push(context.svg.text(text));
    }
    processSetStroke(context, result, inputParams, index) {
        result["element"] = result["element"] || new Array();
        var element = inputParams["element"];
        var color = inputParams["color"];
        var width = +inputParams["width"];
        if (element && element.attr) {
            element.attr({ stroke: color.toHex(), strokeWidth: width });
        }
        result["element"].push(element);
    }
    processSetFill(context, result, inputParams, index) {
        result["element"] = result["element"] || new Array();
        var element = inputParams["element"];
        var color = inputParams["color"];
        var opacity = +inputParams["opacity"];
        opacity = Math.max(0, Math.min(1, opacity));
        if (element && element.attr) {
            element.attr({ fill: color.toHex() });
            if (opacity < 1) {
                element.attr({ fillOpacity: opacity });
            }
        }
        result["element"].push(element);
    }
    processGroup(context, result, inputParams, index) {
        var gElement = context.groupElement = context.groupElement || context.svg.group();
        var element = inputParams["element"];
        if (element) {
            gElement.add(element);
        }
    }
    postprocessGroup(context, nodeValues) {
        nodeValues.values["element"] = nodeValues.values["element"] || new Array();
        nodeValues.values["element"].push(context.groupElement);
        context.groupElement = null;
    }
    processCombine(context, result, inputParams, index) {
        var firstElement = inputParams["firstElement"];
        var secondEement = inputParams["secondElement"];
        var thirdElement = inputParams["thirdElement"];
        var fourthElement = inputParams["fourthElement"];
        var fifthElement = inputParams["fifthElement"];
        var doGroup = !!inputParams["groupElements"];
        if (!context.collectedElements) {
            context.collectedElements = {};
            context.collectedElements.firstElements = new Array();
            context.collectedElements.secondElements = new Array();
            context.collectedElements.thirdElements = new Array();
            context.collectedElements.fourthElements = new Array();
            context.collectedElements.fifthElements = new Array();
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
        nodeValues.values["element"] = nodeValues.values["element"] || new Array();
        if (context.groupElement) {
            // all elements are grouped in the only output element
            nodeValues.values["element"].push(context.groupElement);
            context.collectedElements.firstElements.forEach((elem) => { context.groupElement.add(elem); });
            context.collectedElements.secondElements.forEach((elem) => { context.groupElement.add(elem); });
            context.collectedElements.thirdElements.forEach((elem) => { context.groupElement.add(elem); });
            context.collectedElements.fourthElements.forEach((elem) => { context.groupElement.add(elem); });
            context.collectedElements.fifthElements.forEach((elem) => { context.groupElement.add(elem); });
            context.groupElement = null;
        }
        else {
            // all elements are output
            context.collectedElements.firstElements.forEach((elem) => { nodeValues.values["element"].push(elem); });
            context.collectedElements.secondElements.forEach((elem) => { nodeValues.values["element"].push(elem); });
            context.collectedElements.thirdElements.forEach((elem) => { nodeValues.values["element"].push(elem); });
            context.collectedElements.fourthElements.forEach((elem) => { nodeValues.values["element"].push(elem); });
            context.collectedElements.fifthElements.forEach((elem) => { nodeValues.values["element"].push(elem); });
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
    //input svg element
    //input matrix abcd ef
    //input svg element
    processTransform(context, result, inputParams, index) {
        result["element"] = result["element"] || new Array();
        var element = inputParams["element"];
        var a = +inputParams["a"];
        var b = +inputParams["b"];
        var c = +inputParams["c"];
        var d = +inputParams["d"];
        var e = +inputParams["e"];
        var f = +inputParams["f"];
        var matrix = new SVG.Matrix({ a: a, b: b, c: c, d: d, e: e, f: f });
        this.applyMatrix(element, matrix);
        result["element"].push(element);
    }
    //input svg element
    //input rotation angle
    //input rotation point
    //ouput svg element
    processRotate(context, result, inputParams, index) {
        result["element"] = result["element"] || new Array();
        var element = inputParams["element"];
        var point = inputParams["center"];
        if (!point) {
            var bbox = element.bbox();
            point = new point_1.Point(bbox.cx, bbox.cy);
        }
        var angle = +inputParams["angle"] * 360;
        //var matrix = <Snap.Matrix> element.transform().localMatrix;
        var matrix = new SVG.Matrix(element);
        matrix.rotate(angle, point.x, point.y);
        this.applyMatrix(element, matrix);
        result["element"].push(element);
    }
    //input svg element
    //input scale factor
    //input scale origin point
    //ouput svg element
    processScale(context, result, inputParams, index) {
        result["element"] = result["element"] || new Array();
        var element = inputParams["element"];
        var point = inputParams["center"];
        var factor = +inputParams["factor"];
        var matrix = new SVG.Matrix(element);
        matrix.scale(factor, factor, point.x, point.y);
        this.applyMatrix(element, matrix);
        result["element"].push(element);
    }
    //input svg element
    //input dx
    //input dy
    //ouput svg element
    processTranslate(context, result, inputParams, index) {
        result["element"] = result["element"] || new Array();
        var element = inputParams["element"];
        var dx = +inputParams["dx"];
        var dy = +inputParams["dy"];
        element.translate(dx, dy);
        result["element"].push(element);
    }
    //output pattern
    //output patternName
    //output svg element
    processCreatePattern(context, result, inputParams, index) {
        result["element"] = result["element"] || new Array();
        var element = inputParams["element"];
        result["element"].push(element);
    }
    //input patternName
    //input svg element
    processSetPattern(context, result, inputParams, index) {
        result["element"] = result["element"] || new Array();
        var element = inputParams["element"];
        result["element"].push(element);
    }
    processRadialGrid(context, result, inputParams, index) {
        result["point"] = result["point"] || new Array();
        result["x"] = result["x"] || new Array();
        result["y"] = result["y"] || new Array();
        var center = inputParams["center"];
        var count = Math.floor(+inputParams["count"]);
        var radius = +inputParams["radius"];
        for (var c = 0; c < count; c++) {
            var x = +center.x + Math.cos(2 * c * Math.PI / count) * radius;
            var y = +center.y + Math.sin(2 * c * Math.PI / count) * radius;
            result["point"].push({ x: x, y: y });
            result["x"].push(x);
            result["y"].push(y);
        }
    }
    processGrid(context, result, inputParams, index) {
        result["point"] = result["point"] || new Array();
        var position = inputParams["position"];
        var columns = +inputParams["columns"];
        var rows = +inputParams["rows"];
        var width = +inputParams["width"];
        var height = +inputParams["height"];
        for (var r = 0; r < rows; r++) {
            for (var c = 0; c < columns; c++) {
                var x = +position.x + c * width / columns - 0.5 * width;
                var y = +position.y + r * height / rows - 0.5 * height;
                result["point"].push({ x: x, y: y });
            }
        }
    }
    postprocessGrid(context, nodeValues) {
        nodeValues.keyNames.push("count");
        nodeValues.values["count"] = nodeValues.values["count"] || new Array();
        nodeValues.values["point"] = nodeValues.values["point"] || new Array();
        nodeValues.values["count"].push(nodeValues.values["point"].length);
    }
    preprocess(context) {
        context.svg = {};
    }
}
exports.Svg = Svg;
