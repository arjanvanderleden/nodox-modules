import { NodoxRunningContext, NodoxModule, DataType, NodeProcessingMode, Lookup, NodoxModuleBase, NodoxNodeDefinition, ProcessFunction, PreprocessFunction, PostprocessFunction } from '@avdl/nodox-core';

import { Point } from '@avdl/point';

const convert = {
  hsv: {
    rgb: (...args: any[]) => undefined
  }
};
declare namespace SVG {
  const Color: any;
  const Shape: any;
  const Matrix: any;
  const Element: any;
  const G: any;
}

export interface SvgRunningContext extends NodoxRunningContext {
  svg: any;
}

export class Svg extends NodoxModuleBase {
  name: string;
  description: string;
  namespace: string;
  definitions: NodoxNodeDefinition[];

  merge (otherModule: NodoxModule): NodoxModule {
    return super.merge(otherModule);
  }

  constructor () {
    super();
    this.name = 'Svg';
    this.description = 'Definitions for creating svg elements';
    this.namespace = 'nodox.modules.svg';
    this.dependencies = [
      'nodox.modules.core',
      'nodox.modules.math'];
    this.cloneFunctions[this.namespace + '.element'] = (element: any) => {
      return (<any>element).clone();
    };
    this.dataTypes = <DataType[]>[
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
        processFunction: this.processPoint as ProcessFunction,
        preprocessFunction: this.preprocess as PreprocessFunction,
        processingMode: NodeProcessingMode.wrap,
        inputs: [{
          name: 'x',
          description: 'X value of point',
          dataType: 'nodox.modules.core.number',
          defaultValue: 0
        },
        {
          name: 'y',
          description: 'Y value of point',
          dataType: 'nodox.modules.core.number',
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
        processFunction: this.processColor as ProcessFunction,
        preprocessFunction: this.preprocess as PreprocessFunction,
        processingMode: NodeProcessingMode.wrap,
        inputs: [{
          name: 'r',
          description: 'Red value of color',
          dataType: 'nodox.modules.core.number',
          defaultValue: 0
        },
        {
          name: 'g',
          description: 'Green value of color',
          dataType: 'nodox.modules.core.number',
          defaultValue: 0
        }, {
          name: 'b',
          description: 'Blue value of color',
          dataType: 'nodox.modules.core.number',
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
        processFunction: this.processHsvColor as ProcessFunction,
        preprocessFunction: this.preprocess as PreprocessFunction,
        processingMode: NodeProcessingMode.wrap,
        inputs: [{
          name: 'h',
          description: 'Hue value of color',
          dataType: 'nodox.modules.core.number',
          defaultValue: 0
        },
        {
          name: 's',
          description: 'Saturation value of color',
          dataType: 'nodox.modules.core.number',
          defaultValue: 0
        }, {
          name: 'v',
          description: 'Value component of color',
          dataType: 'nodox.modules.core.number',
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
        processFunction: this.processDeltaPoint as ProcessFunction,
        preprocessFunction: this.preprocess as PreprocessFunction,
        processingMode: NodeProcessingMode.wrap,
        inputs: [
          {
            name: 'first',
            description: 'First point',
            dataType: this.namespace + '.point',
            defaultValue: new Point(0, 0)
          },
          {
            name: 'second',
            description: 'Second point',
            dataType: this.namespace + '.point',
            defaultValue: new Point(0, 0)
          }
        ],
        outputs: [
          {
            name: 'distance',
            description: 'Distance between the points',
            dataType: 'nodox.modules.core.number'
          },
          {
            name: 'angle',
            description: 'Angle between the points',
            dataType: 'nodox.modules.core.number'
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
        processFunction: this.processCircle as ProcessFunction,
        preprocessFunction: this.preprocess as PreprocessFunction,
        processingMode: NodeProcessingMode.wrap,
        inputs: [{
          name: 'center',
          description: 'Center of circle',
          dataType: this.namespace + '.point',
          defaultValue: new Point(0, 0)
        },
        {
          name: 'radius',
          description: 'Radius of circle',
          dataType: 'nodox.modules.core.number',
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
        processFunction: this.processRectangle as ProcessFunction,
        preprocessFunction: this.preprocess as PreprocessFunction,
        processingMode: NodeProcessingMode.wrap,
        inputs: [{
          name: 'point',
          description: 'First point for rectangle',
          dataType: this.namespace + '.point',
          defaultValue: new Point(0, 0)
        },
        {
          name: 'width',
          description: 'Width of the rectangle',
          dataType: 'nodox.modules.core.number',
          defaultValue: 10
        },
        {
          name: 'height',
          description: 'Height of the rectangle',
          dataType: 'nodox.modules.core.number',
          defaultValue: 10
        }],
        outputs: [
          {
            name: 'rectangle',
            description: 'The rectangle element',
            dataType: this.namespace + '.element'
          }],
        icon: 'nodox:svg_rectangle',
        fullName: this.namespace + '.rectangle'
      },
      {
        name: 'Grid',
        description: 'Creates an array of points',
        processFunction: this.processGrid as ProcessFunction,
        postprocessFunction: this.postprocessGrid as PreprocessFunction,
        processingMode: NodeProcessingMode.wrap,
        inputs: [
          {
            name: 'position',
            description: 'position of center',
            dataType: 'nodox.modules.svg.point',
            defaultValue: () => new Point(0, 0)
          }, {
            name: 'columns',
            description: 'number of columns',
            dataType: 'nodox.modules.core.number',
            defaultValue: 0
          },
          {
            name: 'rows',
            description: 'number of rows',
            dataType: 'nodox.modules.core.number',
            defaultValue: 0
          }, {
            name: 'width',
            description: 'width of grid',
            dataType: 'nodox.modules.core.number',
            defaultValue: 0
          }, {
            name: 'height',
            description: 'height of grid',
            dataType: 'nodox.modules.core.number',
            defaultValue: 0
          }
        ],
        outputs: [{
          name: 'point',
          description: 'An array of points',
          dataType: 'nodox.modules.svg.point'
        }, {
          name: 'count',
          description: 'Numbur of points generated',
          dataType: 'nodox.modules.core.number'
        }],
        icon: 'nodox:svg_grid',
        fullName: this.namespace + '.grid'
      },
      {
        name: 'Radial Grid',
        description: 'Creates an circular array of points',
        processFunction: this.processRadialGrid as ProcessFunction,
        postprocessFunction: this.postprocessGrid as PreprocessFunction,
        processingMode: NodeProcessingMode.wrap,
        inputs: [
          {
            name: 'center',
            description: 'position of center',
            dataType: 'nodox.modules.svg.point',
            defaultValue: () => new Point(0, 0)
          }, {
            name: 'radius',
            description: 'radius of the circle',
            dataType: 'nodox.modules.core.number',
            defaultValue: 0
          }, {
            name: 'count',
            description: 'number of columns',
            dataType: 'nodox.modules.core.number',
            defaultValue: 0
          }],
        outputs: [
          {
            name: 'point',
            description: 'An array of points',
            dataType: 'nodox.modules.svg.point'
          },
          {
            name: 'x',
            description: 'An array of x values',
            dataType: 'nodox.modules.core.number'
          },
          {
            name: 'y',
            description: 'An array of y values',
            dataType: 'nodox.modules.core.number'
          },
          {
            name: 'count',
            description: 'Numbur of points generated',
            dataType: 'nodox.modules.core.number'
          }],
        icon: 'nodox:svg_radialGrid',
        fullName: this.namespace + '.radialGrid'
      },
      {
        name: 'ellipse',
        description: 'create an ellipse',
        processFunction: this.processCircle as ProcessFunction,
        preprocessFunction: this.preprocess as PreprocessFunction,
        processingMode: NodeProcessingMode.wrap,
        inputs: [],
        outputs: [],
        fullName: this.namespace + '.ellipse',
        icon: 'nodox:svg_ellipse'
      },
      {
        name: 'polygon',
        description: 'create a polygon',
        processFunction: this.processPolygon as ProcessFunction,
        preprocessFunction: this.preprocess as PreprocessFunction,
        processingMode: NodeProcessingMode.wrap,
        inputs: [

          {
            name: 'center',
            description: 'position of center',
            dataType: 'nodox.modules.svg.point',
            defaultValue: new Point(0, 0)
          }, {
            name: 'radius',
            description: 'radius of the points of the polygon',
            dataType: 'nodox.modules.core.number',
            defaultValue: 0
          }, {
            name: 'count',
            description: 'number of columns',
            dataType: 'nodox.modules.core.number',
            defaultValue: 0
          },
          {
            name: 'starShaped',
            description: 'Convex',
            dataType: 'nodox.modules.core.boolean',
            defaultValue: false
          },
          {
            name: 'useInnerRadius',
            description: 'Convex',
            dataType: 'nodox.modules.core.boolean',
            defaultValue: false
          }, {
            name: 'innerRadius',
            description: 'inner radius',
            dataType: 'nodox.modules.core.number',
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
        processFunction: this.processCircle as ProcessFunction,
        preprocessFunction: this.preprocess as PreprocessFunction,
        processingMode: NodeProcessingMode.wrap,
        inputs: [],
        outputs: [],
        fullName: this.namespace + '.text',
        icon: 'nodox:svg_text'
      },
      {
        name: 'set fill',
        description: 'fill element',
        processFunction: this.processSetFill as ProcessFunction,
        preprocessFunction: this.preprocess as PreprocessFunction,
        processingMode: NodeProcessingMode.wrap,
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
            dataType: 'nodox.modules.core.number',
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
        processFunction: this.processSetStroke as ProcessFunction,
        preprocessFunction: this.preprocess as PreprocessFunction,
        processingMode: NodeProcessingMode.wrap,
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
            dataType: 'nodox.modules.core.number',
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
        processFunction: this.processGroup as ProcessFunction,
        preprocessFunction: this.preprocess as PreprocessFunction,
        postprocessFunction: this.postprocessGroup as PostprocessFunction,
        processingMode: NodeProcessingMode.wrap,
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
        processFunction: this.processCombine as ProcessFunction,
        preprocessFunction: this.preprocess as PreprocessFunction,
        postprocessFunction: this.postprocessCombine as PostprocessFunction,
        processingMode: NodeProcessingMode.addEmpty,
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
          dataType: 'nodox.modules.core.boolean',
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
        processFunction: this.processTranslate as ProcessFunction,
        preprocessFunction: this.preprocess as PreprocessFunction,
        processingMode: NodeProcessingMode.wrap,
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
            dataType: 'nodox.modules.core.number',
            defaultValue: 0
          }, {
            name: 'dy',
            description: 'vertical translation',
            dataType: 'nodox.modules.core.number',
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
        processFunction: this.processScale as ProcessFunction,
        preprocessFunction: this.preprocess as PreprocessFunction,
        processingMode: NodeProcessingMode.wrap,
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
            defaultValue: new Point(0, 0)
          },
          {
            name: 'factor',
            description: 'scale factor',
            dataType: 'nodox.modules.core.number',
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
        processFunction: this.processRotate as ProcessFunction,
        preprocessFunction: this.preprocess as PreprocessFunction,
        processingMode: NodeProcessingMode.wrap,
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
            defaultValue: new Point(0, 0)
          },
          {
            name: 'angle',
            description: 'angle of rotation in degrees',
            dataType: 'nodox.modules.core.number',
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
        processFunction: this.processCircle as ProcessFunction,
        preprocessFunction: this.preprocess as PreprocessFunction,
        processingMode: NodeProcessingMode.wrap,
        inputs: [],
        outputs: [],
        fullName: this.namespace + '.matrix',
        icon: 'nodox:svg_matrix'
      }

    ];
  }

  protected processColor (context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
    result.color = result.color ?? [];
    const r = Math.min(Math.max(+inputParams.r, 0), 1) * 255;
    const g = Math.min(Math.max(+inputParams.g, 0), 1) * 255;
    const b = Math.min(Math.max(+inputParams.b, 0), 1) * 255;
    result.color.push(new SVG.Color({ r: r, g: g, b: b }));
  }

  protected processHsvColor (context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
    result.color = result.color ?? [];
    const h = Math.min(Math.max(+inputParams.h, 0), 1);
    const s = Math.min(Math.max(+inputParams.s, 0), 1);
    const v = Math.min(Math.max(+inputParams.v, 0), 1);
    const [r, g, b] = convert.hsv.rgb([h, s, v]) || [1, 2, 3];
    result.color.push(new SVG.Color({ r, g, b }));
  }

  protected processPoint (context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
    result.point = result.point ?? [];
    const x = inputParams.x;
    const y = inputParams.y;
    result.point.push({ x: x, y: y });
  }

  protected processCircle (context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
    result.circle = result.circle ?? [];
    const point = inputParams.center;
    const radius = +inputParams.radius;
    result.circle.push(context.svg.circle(radius).move(point.x, point.y));
  }

  protected processRectangle (context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
    result.rectangle = result.rectangle ?? [];
    const point = inputParams.point;
    const width = +inputParams.width;
    const height = +inputParams.height;
    const radius = +inputParams.radius;
    const rect = context.svg.rect(width, height);
    rect.move(point.x, point.y);
    if (!isNaN(radius)) rect.radius(radius);
    result.rectangle.push(rect);
  }

  protected processDeltaPoint (context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
    result.distance = result.distance ?? [];
    result.angle = result.angle ?? [];
    result.vector = result.vector ?? [];
    const first = new Point(inputParams.first.x, inputParams.first.y);
    const second = new Point(inputParams.second.x, inputParams.second.y);
    const vector = first.subtract(second);
    result.vector.push(vector);
    result.distance.push(Math.sqrt(vector.x * vector.x + vector.y * vector.y));
    result.angle.push(Math.atan2(vector.y, vector.x) / Math.PI / 2 + 0.5);
  }

  protected processEllipse (context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
    result.ellipse = result.ellipse ?? [];
    const width = +inputParams.width;
    const height = +inputParams.height;
    const ellipse = context.svg.ellipse(width, height);
    result.ellipse.push(ellipse);
  }

  // number
  // center : point
  protected processPolygon (context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
    result.polygon = result.polygon ?? [];

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
    const points: Point[] = [];
    for (let c = 0; c < count; c++) {
      const x = +center.x + Math.cos(2 * c * Math.PI / count) * radius;
      const y = +center.y + Math.sin(2 * c * Math.PI / count) * radius;
      points.push(new Point(x, y));
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

  protected processText (context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
    const text = '' + inputParams.text;
    result.sum.push(context.svg.text(text));
  }

  protected processSetStroke (context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
    result.element = result.element ?? [];
    const element = inputParams.element;
    const color = inputParams.color;
    const width = +inputParams.width;
    if (element && element.attr) {
      element.attr({ stroke: color.toHex(), strokeWidth: width });
    }
    result.element.push(element);
  }

  protected processSetFill (context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
    result.element = result.element ?? [];
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

  protected processGroup (context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
    const gElement = (<any>context).groupElement = (<any>context).groupElement || context.svg.group();
    const element = inputParams.element;
    if (element) {
      gElement.add(element);
    }
  }

  protected postprocessGroup (context: SvgRunningContext, nodeValues: Lookup<any>) {
    nodeValues.values.element = nodeValues.values.element ?? [];
    nodeValues.values.element.push((<any>context).groupElement);
    (<any>context).groupElement = null;
  }

  protected processCombine (context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
    const firstElement = inputParams.firstElement;
    const secondEement = inputParams.secondElement;
    const thirdElement = inputParams.thirdElement;
    const fourthElement = inputParams.fourthElement;
    const fifthElement = inputParams.fifthElement;
    const doGroup = !!inputParams.groupElements;
    if (!(<any>context).collectedElements) {
      (<any>context).collectedElements = {};
      (<any>context).collectedElements.firstElements = [];
      (<any>context).collectedElements.secondElements = [];
      (<any>context).collectedElements.thirdElements = [];
      (<any>context).collectedElements.fourthElements = [];
      (<any>context).collectedElements.fifthElements = [];
      if (doGroup) { (<any>context).groupElement = (<any>context).groupElement || context.svg.group(); }
    }
    if (firstElement) (<any>context).collectedElements.firstElements.push(firstElement);
    if (secondEement) (<any>context).collectedElements.secondElements.push(secondEement);
    if (thirdElement) (<any>context).collectedElements.thirdElements.push(thirdElement);
    if (fourthElement) (<any>context).collectedElements.fourthElements.push(fourthElement);
    if (fifthElement) (<any>context).collectedElements.fifthElements.push(fifthElement);
  }

  protected postprocessCombine (context: SvgRunningContext, nodeValues: Lookup<any>) {
    nodeValues.values.element = nodeValues.values.element ?? [];

    if ((<any>context).groupElement) {
      // all elements are grouped in the only output element
      nodeValues.values.element.push((<any>context).groupElement);
      (<any>context).collectedElements.firstElements.forEach((elem: any) => { (<any>context).groupElement.add(elem); });
      (<any>context).collectedElements.secondElements.forEach((elem: any) => { (<any>context).groupElement.add(elem); });
      (<any>context).collectedElements.thirdElements.forEach((elem: any) => { (<any>context).groupElement.add(elem); });
      (<any>context).collectedElements.fourthElements.forEach((elem: any) => { (<any>context).groupElement.add(elem); });
      (<any>context).collectedElements.fifthElements.forEach((elem: any) => { (<any>context).groupElement.add(elem); });
      (<any>context).groupElement = null;
    } else {
      // all elements are output
      (<any>context).collectedElements.firstElements.forEach((elem: any) => { nodeValues.values.element.push(elem); });
      (<any>context).collectedElements.secondElements.forEach((elem: any) => { nodeValues.values.element.push(elem); });
      (<any>context).collectedElements.thirdElements.forEach((elem: any) => { nodeValues.values.element.push(elem); });
      (<any>context).collectedElements.fourthElements.forEach((elem: any) => { nodeValues.values.element.push(elem); });
      (<any>context).collectedElements.fifthElements.forEach((elem: any) => { nodeValues.values.element.push(elem); });
    }
    (<any>context).collectedElements = null;
  }

  protected applyMatrix (element: any, matrix: any) {
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
  protected processTransform (context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
    result.element = result.element ?? [];
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
  protected processRotate (context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
    result.element = result.element ?? [];
    const element = inputParams.element;
    let point = inputParams.center;
    if (!point) {
      const bbox = element.bbox();
      point = new Point(bbox.cx, bbox.cy);
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
  protected processScale (context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
    result.element = result.element ?? [];
    const element = inputParams.element;
    const point = <Point> inputParams.center;
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
  protected processTranslate (context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
    result.element = result.element ?? [];

    const element = inputParams.element;
    const dx = +inputParams.dx;
    const dy = +inputParams.dy;

    element.translate(dx, dy);
    result.element.push(element);
  }

  // output pattern
  // output patternName
  // output svg element
  protected processCreatePattern (context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
    result.element = result.element ?? [];
    const element = inputParams.element;
    result.element.push(element);
  }

  // input patternName
  // input svg element
  protected processSetPattern (context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
    result.element = result.element ?? [];
    const element = inputParams.element;
    result.element.push(element);
  }

  protected processRadialGrid (context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
    result.point = result.point ?? [];
    result.x = result.x ?? [];
    result.y = result.y ?? [];

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

  protected processGrid (context: SvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
    result.point = result.point ?? [];
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

  protected postprocessGrid (context: SvgRunningContext, nodeValues: Lookup<any>) {
    nodeValues.keyNames.push('count');
    nodeValues.values.count = nodeValues.values.count ?? [];
    nodeValues.values.point = nodeValues.values.point ?? [];
    nodeValues.values.count.push(nodeValues.values.point.length);
  }

  protected preprocess (context: SvgRunningContext) {
    context.svg = {

    };
  }
}
