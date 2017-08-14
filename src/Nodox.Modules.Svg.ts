import { IRunningContext, INodoxModule, IDataType, INodeDefinition, IInputDescriptor, IOutputDescriptor, Point, NodeProcessingMode, NodeValues, IPoint } from 'nodox-core';
import { NodoxModule } from "./Nodox.Modules.NodoxModule";
import * as convert from "color-convert";
const window   = require('svgdom')
import * as SVG from 'svg.js';
SVG(window)
const document = window.document

export interface ISvgRunningContext extends IRunningContext {
  svg: any;
}

export class Svg extends NodoxModule {

  merge(otherModule: INodoxModule): INodoxModule {
    return super.merge(otherModule);
  }

  constructor() {    
    super();
    this.name = "Svg";
    this.description = "Definitions for creating svg elements";
    this.namespace = "nodox.modules.svg";
    this.dependencies = [
      "nodox.modules.core",
      "nodox.modules.math"];
    this.cloneFunctions[this.namespace + ".element"] = (element: any) => {
      return (<any>element).clone();
    };
    this.dataTypes = <IDataType[]>[
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
    this.definitions = <INodeDefinition[]>[
      {
        name: "Point",
        description: "Create a point",
        processFunction: this.processPoint,
        preprocessFunction: this.preprocess,
        inputs: <Array<IInputDescriptor>>[{
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
        outputs: <Array<IOutputDescriptor>>[{
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
        inputs: <Array<IInputDescriptor>>[{
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
        outputs: <Array<IOutputDescriptor>>[{
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
        inputs: <Array<IInputDescriptor>>[{
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
        outputs: <Array<IOutputDescriptor>>[{
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
        inputs: <Array<IInputDescriptor>>[
          {
            name: "first",
            description: "First point",
            dataType: this.namespace + ".point",
            defaultValue: new Point(0, 0)
          },
          {
            name: "second",
            description: "Second point",
            dataType: this.namespace + ".point",
            defaultValue: new Point(0, 0)
          }
        ],
        outputs: <Array<IOutputDescriptor>>[
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
        inputs: <Array<IInputDescriptor>>[{
          name: "center",
          description: "Center of circle",
          dataType: this.namespace + ".point",
          defaultValue: new Point(0, 0)
        },
        {
          name: "radius",
          description: "Radius of circle",
          dataType: "nodox.modules.core.number",
          defaultValue: 10
        }],
        outputs: <Array<IOutputDescriptor>>[{
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
        inputs: <Array<IInputDescriptor>>[{
          name: "point",
          description: "First point for rectangle",
          dataType: this.namespace + ".point",
          defaultValue: new Point(0, 0)
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
        outputs: <Array<IOutputDescriptor>>[
          {
            name: "rectangle",
            description: "The rectangle element",
            dataType: this.namespace + ".element"
          }],
        icon: "nodox:svg_rectangle",
        fullName: this.namespace + ".rectangle"
      },
      {
        name: "Grid",
        description: "Creates an array of points",
        processFunction: this.processGrid,
        postprocessFunction: this.postprocessGrid,
        inputs: <Array<IInputDescriptor>>[
          {
            name: "position",
            description: "position of center",
            dataType: "nodox.modules.svg.point",
            defaultValue: () => { new Point(0, 0) }
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
        outputs: <Array<IOutputDescriptor>>[{
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
        inputs: <Array<IInputDescriptor>>[
          {
            name: "center",
            description: "position of center",
            dataType: "nodox.modules.svg.point",
            defaultValue: () => { new Point(0, 0) }
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
          }],
        outputs: <Array<IOutputDescriptor>>[
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
          }],
        icon: "nodox:svg_radialGrid",
        fullName: this.namespace + ".radialGrid"
      },
      {
        name: "ellipse",
        description: "create an ellipse",
        processFunction: this.processCircle,
        preprocessFunction: this.preprocess,
        inputs: <Array<IInputDescriptor>>[],
        outputs: <Array<IOutputDescriptor>>[],
        fullName: this.namespace + ".ellipse"
      },
      {
        name: "polygon",
        description: "create a polygon",
        processFunction: this.processPolygon,
        preprocessFunction: this.preprocess,
        inputs: <Array<IInputDescriptor>>[

          {
            name: "center",
            description: "position of center",
            dataType: "nodox.modules.svg.point",
            defaultValue: new Point(0, 0)
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
            label: "Star shaped",
            description: "Convex",
            dataType: "nodox.modules.core.boolean",
            defaultValue: false
          },
          {
            name: "useInnerRadius",
            label: "Use inner radius",
            description: "Convex",
            dataType: "nodox.modules.core.boolean",
            defaultValue: false
          }, {
            name: "innerRadius",
            label: "inner Radius",
            description: "inner radius",
            dataType: "nodox.modules.core.number",
            defaultValue: 0
          }

        ],
        outputs: <Array<IOutputDescriptor>>[

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
        inputs: <Array<IInputDescriptor>>[],
        outputs: <Array<IOutputDescriptor>>[],
        fullName: this.namespace + ".text",
        icon: "nodox:svg_text",
      },
      {
        name: "set fill",
        description: "fill element",
        processFunction: this.processSetFill,
        preprocessFunction: this.preprocess,
        inputs: <Array<IInputDescriptor>>[
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
        outputs: <Array<IOutputDescriptor>>[
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
        inputs: <Array<IInputDescriptor>>[
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
        outputs: <Array<IOutputDescriptor>>[
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
        inputs: <Array<IInputDescriptor>>[{
          name: "element",
          description: "The element(s) to be grouped",
          dataType: this.namespace + ".element",
          defaultValue: null
        },],
        outputs: <Array<IOutputDescriptor>>[{
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
        processingMode: NodeProcessingMode.AddNull,
        inputs: <Array<IInputDescriptor>>[{
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
          label: "Create group",
          description: "Convex",
          dataType: "nodox.modules.core.boolean",
          defaultValue: true
        }],
        outputs: <Array<IOutputDescriptor>>[{
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
        inputs: <Array<IInputDescriptor>>[
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
        outputs: <Array<IOutputDescriptor>>[
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
        inputs: <Array<IInputDescriptor>>[
          {
            name: "element",
            description: "The element to be rotated",
            dataType: this.namespace + ".element",
            defaultValue: null
          }, {
            name: "center",
            description: "Center of rotation",
            dataType: this.namespace + ".point",
            defaultValue: new Point(0, 0)
          },
          {
            name: "factor",
            description: "scale factor",
            dataType: "nodox.modules.core.number",
            defaultValue: 10
          }
        ],
        outputs: <Array<IOutputDescriptor>>[{
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
        inputs: <Array<IInputDescriptor>>[
          {
            name: "element",
            description: "The element to be rotated",
            dataType: this.namespace + ".element",
            defaultValue: null
          }, {
            name: "center",
            description: "Center of rotation",
            dataType: this.namespace + ".point",
            defaultValue: new Point(0, 0)
          },
          {
            name: "angle",
            description: "angle of rotation in degrees",
            dataType: "nodox.modules.core.number",
            defaultValue: 10
          }
        ],
        outputs: <Array<IOutputDescriptor>>[{
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
        inputs: <Array<IInputDescriptor>>[],
        outputs: <Array<IOutputDescriptor>>[],
        fullName: this.namespace + ".matrix"
      }

    ];
  }

  protected processColor(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number) {
    result["color"] = result["color"] || new Array<any>();
    var r = Math.min(Math.max(+inputParams["r"], 0), 1) * 255;
    var g = Math.min(Math.max(+inputParams["g"], 0), 1) * 255;
    var b = Math.min(Math.max(+inputParams["b"], 0), 1) * 255;
    result["color"].push(new SVG.Color({r:r,g:g,b:b}));
  }

  protected processHsvColor(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number) {
    result["color"] = result["color"] || new Array<any>();
    var h = Math.min(Math.max(+inputParams["h"], 0), 1);
    var s = Math.min(Math.max(+inputParams["s"], 0), 1);
    var v = Math.min(Math.max(+inputParams["v"], 0), 1);
    var color = convert.hsv.rgb([h,s,v]);
    result["color"].push(new SVG.Color({r:color[0],g:color[1],b:color[2]}));
  }

  protected processPoint(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number) {
    result["point"] = result["point"] || new Array<any>();
    var x = inputParams["x"];
    var y = inputParams["y"];
    result["point"].push({ x: x, y: y });
  }

  protected processCircle(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number) {
    result["circle"] = result["circle"] || new Array<any>();
    var point = inputParams["center"];
    var radius = +inputParams["radius"];
    result["circle"].push(context.svg.circle(radius).move(point.x, point.y));
  }

  protected processRectangle(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number) {
    result["rectangle"] = result["rectangle"] || new Array<any>();
    var point = inputParams["point"];
    var width = +inputParams["width"];
    var height = +inputParams["height"];
    var radius = +inputParams["radius"];
    var rect = context.svg.rect(width,height);
    rect.move(point.x,point.y);
    if (!isNaN(radius)) rect.radius(radius);
    result["rectangle"].push(rect);
  }
  protected processDeltaPoint(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number) {
    result["distance"] = result["distance"] || new Array<number>();
    result["angle"] = result["angle"] || new Array<number>();
    result["vector"] = result["vector"] || new Array<IPoint>();
    var first = new Point(inputParams["first"].x, inputParams["first"].y);
    var second = new Point(inputParams["second"].x, inputParams["second"].y);
    var vector = first.subtract(second);
    result["vector"].push(vector);
    result["distance"].push(Math.sqrt(vector.x * vector.x + vector.y * vector.y));
    result["angle"].push(Math.atan2(vector.y, vector.x) / Math.PI / 2 + 0.5);
  }

  protected processEllipse(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number) {
    var width = +inputParams["width"];
    var height = +inputParams["height"];
    var ellipse = context.svg.ellipse(width,height);
    result["ellipse"].push()
  }

  // number
  // center : point
  protected processPolygon(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number) {
    result["polygon"] = result["polygon"] || new Array<any>();

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
    var points = new Array<Point>();
    for (var c = 0; c < count; c++) {
      var x = +center.x + Math.cos(2 * c * Math.PI / count) * radius;
      var y = +center.y + Math.sin(2 * c * Math.PI / count) * radius;
      points.push(new Point(x, y));
    }
    //starshaped polygons hae multiple subpaths
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
      points[index] = null;
      index = (index + indexStep) % count;
      pointsAdded++;
    }

    pathString += " Z"
    result["polygon"].push(context.svg.path(pathString));
  }

  protected processText(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number) {
    var text = "" + inputParams["text"];
    result["sum"].push(context.svg.text(text));
  }

  protected processSetStroke(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number) {
    result["element"] = result["element"] || new Array<any>();
    var element = <SVG.Shape> inputParams["element"];
    var color = <SVG.Color> inputParams["color"];
    var width = +inputParams["width"];
    if (element && element.attr) {
      element.attr({ stroke: color.toHex() , strokeWidth: width })
    }
    result["element"].push(element);
  }

  protected processSetFill(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number) {
    result["element"] = result["element"] || new Array<any>();
    var element = <SVG.Shape>inputParams["element"];
    var color = <SVG.Color>inputParams["color"];
    var opacity = +inputParams["opacity"];
    opacity = Math.max(0, Math.min(1, opacity));
    if (element && element.attr) {
      element.attr({ fill: color.toHex() })
      if (opacity < 1) {
        element.attr({ fillOpacity: opacity })
      }
    }
    result["element"].push(element);
  }

  protected processGroup(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number) {
    var gElement : SVG.G = (<any>context).groupElement = (<any>context).groupElement || context.svg.group();
    var element = inputParams["element"];
    if (element) {
      gElement.add(element);
    }
  }

  protected postprocessGroup(context: ISvgRunningContext, nodeValues: NodeValues) {
    nodeValues.values["element"] = nodeValues.values["element"] || new Array<any>();
    nodeValues.values["element"].push((<any>context).groupElement);
    (<any>context).groupElement = null;
  }

  protected processCombine(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number) {
    var firstElement = inputParams["firstElement"];
    var secondEement = inputParams["secondElement"];
    var thirdElement = inputParams["thirdElement"];
    var fourthElement = inputParams["fourthElement"];
    var fifthElement = inputParams["fifthElement"];
    var doGroup = !!inputParams["groupElements"];
    if (!(<any>context).collectedElements) {
      (<any>context).collectedElements = {};
      (<any>context).collectedElements.firstElements = new Array<any>();
      (<any>context).collectedElements.secondElements = new Array<any>();
      (<any>context).collectedElements.thirdElements = new Array<any>();
      (<any>context).collectedElements.fourthElements = new Array<any>();
      (<any>context).collectedElements.fifthElements = new Array<any>();
      if (doGroup) { (<any>context).groupElement = (<any>context).groupElement || context.svg.group();}
    }
    if (firstElement) (<any>context).collectedElements.firstElements.push(firstElement);
    if (secondEement) (<any>context).collectedElements.secondElements.push(secondEement);
    if (thirdElement) (<any>context).collectedElements.thirdElements.push(thirdElement);
    if (fourthElement) (<any>context).collectedElements.fourthElements.push(fourthElement);
    if (fifthElement) (<any>context).collectedElements.fifthElements.push(fifthElement);
  }

  protected postprocessCombine(context: ISvgRunningContext, nodeValues: NodeValues) {
    nodeValues.values["element"] = nodeValues.values["element"] || new Array<any>();

    if ((<any>context).groupElement) {
      // all elements are grouped in the only output element
      nodeValues.values["element"].push((<any>context).groupElement);
      (<any>context).collectedElements.firstElements.forEach(elem => { (<any>context).groupElement.add(elem) });
      (<any>context).collectedElements.secondElements.forEach(elem => { (<any>context).groupElement.add(elem) });
      (<any>context).collectedElements.thirdElements.forEach(elem => { (<any>context).groupElement.add(elem) });
      (<any>context).collectedElements.fourthElements.forEach(elem => { (<any>context).groupElement.add(elem) });
      (<any>context).collectedElements.fifthElements.forEach(elem => { (<any>context).groupElement.add(elem) });
      (<any>context).groupElement = null;
    } else {
      // all elements are output
      (<any>context).collectedElements.firstElements.forEach(elem => { nodeValues.values["element"].push(elem) });
      (<any>context).collectedElements.secondElements.forEach(elem => { nodeValues.values["element"].push(elem) });
      (<any>context).collectedElements.thirdElements.forEach(elem => { nodeValues.values["element"].push(elem) });
      (<any>context).collectedElements.fourthElements.forEach(elem => { nodeValues.values["element"].push(elem) });
      (<any>context).collectedElements.fifthElements.forEach(elem => { nodeValues.values["element"].push(elem) });
    }
    (<any>context).collectedElements = null;

  }

  protected applyMatrix(element:SVG.Element, matrix : SVG.Matrix){
    element.transform({
      a:matrix.a,
      b:matrix.a,
      c:matrix.c,
      d:matrix.d,
      e:matrix.e,
      f:matrix.f
    });
  }

  //input svg element
  //input matrix abcd ef
  //input svg element
  protected processTransform(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number) {
    result["element"] = result["element"] || new Array<any>();
    var element = <SVG.Element>inputParams["element"];
    
    var a = +inputParams["a"];
    var b = +inputParams["b"];
    var c = +inputParams["c"];
    var d = +inputParams["d"];
    var e = +inputParams["e"];
    var f = +inputParams["f"];

    var matrix = new SVG.Matrix({a:a,b:b,c:c,d:d,e:e,f:f});    
    this.applyMatrix(element, matrix);
    result["element"].push(element);
  }


  //input svg element
  //input rotation angle
  //input rotation point
  //ouput svg element
  protected processRotate(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number) {
    result["element"] = result["element"] || new Array<any>();
    var element = <SVG.Element> inputParams["element"];
    var point = inputParams["center"];
    if (!point) {
      var bbox = element.bbox();
      point = new Point(bbox.cx, bbox.cy);
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
  protected processScale(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number) {
    result["element"] = result["element"] || new Array<any>();
    var element = <SVG.Element>inputParams["element"];
    var point = <IPoint> inputParams["center"];
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
  protected processTranslate(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number) {
    result["element"] = result["element"] || new Array<any>()

    var element = inputParams["element"];
    var dx = +inputParams["dx"];
    var dy = +inputParams["dy"];

    element.translate(dx,dy);
    result["element"].push(element);
  }


  //output pattern
  //output patternName
  //output svg element
  protected processCreatePattern(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number) {
    result["element"] = result["element"] || new Array<any>();
    var element = inputParams["element"];
    result["element"].push(element);
  }


  //input patternName
  //input svg element
  protected processSetPattern(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number) {
    result["element"] = result["element"] || new Array<any>();
    var element = inputParams["element"];
    result["element"].push(element);
  }


  protected processRadialGrid(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number) {
    result["point"] = result["point"] || new Array<any>();
    result["x"] = result["x"] || new Array<number>();
    result["y"] = result["y"] || new Array<number>();

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


  protected processGrid(context: ISvgRunningContext, result: NodeValues, inputParams: Object, index: number) {
    result["point"] = result["point"] || new Array<any>();
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

  protected postprocessGrid(context: ISvgRunningContext, nodeValues: NodeValues) {
    nodeValues.keyNames.push("count");
    nodeValues.values["count"] = nodeValues.values["count"] || new Array<number>();
    nodeValues.values["point"] = nodeValues.values["point"] || new Array<any>();
    nodeValues.values["count"].push(nodeValues.values["point"].length);
  }


  protected preprocess(context: ISvgRunningContext) {
    context.svg = SVG(document.documentElement);
    
  }

}


