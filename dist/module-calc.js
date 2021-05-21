"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc = void 0;
const nodox_core_1 = require("@avdl/nodox-core");
class Calc extends nodox_core_1.NodoxModuleBase {
    constructor() {
        super();
        this.name = 'Calc';
        this.description = 'Definitions for math functions';
        this.namespace = 'nodox.module.calc';
        this.dependencies = [nodox_core_1.CORE_MODULE_NAMESPACE];
        this.dataTypes = [];
        this.definitions = [
            {
                name: 'Square',
                description: 'calculates square of two numbers',
                processFunction: this.processSquare,
                processingMode: nodox_core_1.NodeProcessingMode.wrap,
                inputs: [{
                        name: 'a',
                        description: 'First number',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`
                    }
                ],
                outputs: [{
                        name: 'square',
                        description: 'Square of a',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`
                    }],
                icon: 'action:ic_3d_rotation',
                fullName: this.namespace + '.square'
            },
            {
                name: 'Square root',
                description: 'calculates square of two numbers',
                processFunction: this.processSquare,
                processingMode: nodox_core_1.NodeProcessingMode.wrap,
                inputs: [{
                        name: 'a',
                        description: 'First number',
                        dataType: 'nodox.module.core.number'
                    }
                ],
                outputs: [{
                        name: 'squareroot',
                        description: 'Squareroot of a',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`
                    }],
                icon: 'action:ic_3d_rotation',
                fullName: this.namespace + '.squareroot'
            },
            {
                name: 'Math constant',
                description: 'Provides a math constant like Pi',
                processFunction: this.processConstant,
                processingMode: nodox_core_1.NodeProcessingMode.wrap,
                inputs: [{
                        name: 'name',
                        description: 'A string that can be translated into a mathematical constant like pi, PI, Pi',
                        dataType: 'nodox.module.core.string',
                        editorType: 'select',
                        valueOptions: ['PI', 'E'],
                        defaultValue: 'PI'
                    }
                ],
                outputs: [{
                        name: 'value',
                        description: 'Value of constant',
                        dataType: `${nodox_core_1.CORE_MODULE_NAMESPACE}.number`
                    }],
                icon: 'nodox:math_constant',
                fullName: this.namespace + '.constant'
            }
        ];
    }
    processSquare(context, result, inputParams, index) {
        const processResult = {};
        return processResult;
    }
    processSquareRoot(context, result, inputParams, index) {
        const processResult = {};
        return processResult;
    }
    processConstant(context, result, inputParams, index) {
        var _a;
        result.value = (_a = result.value) !== null && _a !== void 0 ? _a : [];
        let constantValue = 0;
        switch (inputParams.name.toUpperCase()) {
            case 'PI':
                constantValue = Math.PI;
                break;
            case 'E':
                constantValue = Math.E;
                break;
        }
        result.value.push(constantValue);
    }
}
exports.Calc = Calc;
