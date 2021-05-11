import { Svg, ISvgRunningContext } from './Nodox.Modules.Svg';
import { NodoxModule, NodoxNodeDefinition, OutputDefinition, InputDefinition, Lookup } from 'nodox-core';
import { Point } from './point';


export class SvgGrids extends Svg {

  merge(otherModule: NodoxModule): NodoxModule {
    return super.merge(otherModule);
  }

  constructor() {
    super();
    this.name = "SvgGrids";
    this.description = "Grids for Svg";
    this.definitions = <NodoxNodeDefinition[]>[
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
            defaultValue: () => { return new Point(0, 0) }
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
          }],
        outputs:[{
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


  protected processHexGrid(context: ISvgRunningContext, result: Lookup<any>, inputParams: Lookup<any>, index: number) {
    result["point"] = result["point"] || new Array<any>();

    var center = inputParams["center"];
    var rings = +inputParams["rings"];
    var size = +inputParams["size"];
    var angle = +inputParams["angle"];
    result["point"].push(center);
    for (var ring = 1; ring < rings; ring++) {
      for (var corner = 0; corner < 6; corner++) {
        var thisCorner = new Point(ring * size * Math.cos(corner * Math.PI / 3 + angle * Math.PI / 180), ring * size * Math.sin(corner * Math.PI / 3 + angle * Math.PI / 180)).add(center);
        var nextCorner = new Point(ring * size * Math.cos((corner + 1) * Math.PI / 3 + angle * Math.PI / 180), ring * size * Math.sin((corner + 1) * Math.PI / 3 + angle * Math.PI / 180)).add(center);
        result["point"].push(thisCorner);
        for (var step = 1; step < ring; step++) {
          var betweenPoint = new Point(thisCorner.x + step / ring * (nextCorner.x - thisCorner.x), thisCorner.y + step / ring * (nextCorner.y - thisCorner.y));
          result["point"].push(betweenPoint);
        }
      }
    }
  }


}

