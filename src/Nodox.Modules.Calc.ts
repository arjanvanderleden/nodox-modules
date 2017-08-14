import { NodeValues, IInputDescriptor, INodeDefinition, IDataType, IRunningContext, IOutputDescriptor } from "nodox-core";
import { NodoxModule } from "./Nodox.Modules.NodoxModule";

export class Calc extends NodoxModule {
    constructor() {
        super();
        this.name = "Calc";
        this.description = "Definitions for math functions";
        this.namespace = "nodox.modules.calc";
        this.dependencies = ["nodox.modules.core"];
        this.dataTypes = <IDataType[]>[

        ];
        this.definitions = <INodeDefinition[]>[
            {
                name: "Square",
                description: "calculates square of two numbers",
                processFunction: this.processSquare,
                inputs: <Array<IInputDescriptor>>[{
                    name: "a",
                    description: "First number",
                    dataType: "nodox.modules.core.number"
                }
                ],
                outputs: <Array<IOutputDescriptor>>[{
                    name: "square",
                    description: "Square of a",
                    dataType: this.namespace + ".number"
                }],
                icon: "action:ic_3d_rotation",
                fullName: "nodox.modules.core.number"
            },
            {
                name: "Square root",
                description: "calculates square of two numbers",
                processFunction: this.processSquare,
                inputs: <Array<IInputDescriptor>>[{
                    name: "a",
                    description: "First number",
                    dataType: "nodox.modules.core.number"
                }
                ],
                outputs: <Array<IOutputDescriptor>>[{
                    name: "squareroot",
                    description: "Squareroot of a",
                    dataType: "nodox.modules.core.number"
                }],
                icon: "action:ic_3d_rotation",
                fullName: "nodox.modules.core.number"
            },
            {
                name: "Math constant",
                description: "Provides a math constant like Pi",
                processFunction: this.processConstant,
                inputs: <Array<IInputDescriptor>>[{
                    name: "name",
                    description: "A string that can be translated into a mathematical constant like pi, PI, Pi",
                    dataType: "nodox.modules.core.string",
                    editorType: "select",
                    valueOptions: ["PI", "E"],
                    defaultValue: "PI"
                }
                ],
                outputs: <Array<IOutputDescriptor>>[{
                    name: "value",
                    description: "Value of constant",
                    dataType: "nodox.modules.core.number"
                }],
                icon: "nodox:math_constant",
                fullName: this.namespace + ".constant"
            }
        ];
    }



    private processSquare(context: IRunningContext, result: NodeValues, inputParams: Object, index: number) {
        var processResult = {};
        return processResult;
    }

    private processSquareRoot(context: IRunningContext, result: NodeValues, inputParams: Object, index: number) {
        var processResult = {};
        return processResult;
    }

    private processConstant(context: IRunningContext, result: NodeValues, inputParams: Object, index: number) {
        result["value"] = result["value"] || new Array<number>();
        var constantValue = 0;
        switch ((<string>inputParams["name"]).toUpperCase()) {
            case "PI": constantValue = Math.PI; break;
            case "E": constantValue = Math.E; break;
        }
        result["value"].push(constantValue);
    }
}


