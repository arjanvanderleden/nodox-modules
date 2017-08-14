"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var nodox_core_1 = require("nodox-core");
var dist_1 = require("../dist");
describe('#NodoxModules', function () {
    var service;
    beforeEach(function () {
        service = new nodox_core_1.NodoxService();
    });
    it('should contain a valid Module Core with 1 or more definitions', function () {
        var core = new dist_1.Core();
        service.registerModule(core);
        var module = service.getModules()[0];
        chai_1.expect(module).to.be.equal(core);
        chai_1.expect(module.definitions.length).to.be.greaterThan(0);
    });
    it('should contain a valid Module Calc with 1 or more definitions', function () {
        var calc = new dist_1.Calc();
        service.registerModule(calc);
        var module = service.getModules()[0];
        chai_1.expect(module).to.be.equal(calc);
        chai_1.expect(module.definitions.length).to.be.greaterThan(0);
    });
    it('should contain a valid Module Datasets with 1 or more definitions', function () {
        var datasets = new dist_1.Datasets();
        service.registerModule(datasets);
        var module = service.getModules()[0];
        chai_1.expect(module).to.be.equal(datasets);
        chai_1.expect(module.definitions.length).to.be.greaterThan(0);
    });
    it('should contain a valid Module Domains with 1 or more definitions', function () {
        var domains = new dist_1.Domains();
        service.registerModule(domains);
        var module = service.getModules()[0];
        chai_1.expect(module).to.be.equal(domains);
        chai_1.expect(module.definitions.length).to.be.greaterThan(0);
    });
    it('should contain a valid Module Svg with 1 or more definitions', function () {
        var svg = new dist_1.Svg();
        service.registerModule(svg);
        var module = service.getModules()[0];
        chai_1.expect(module).to.be.equal(svg);
        chai_1.expect(module.definitions.length).to.be.greaterThan(0);
    });
    it('Should hava a definition for Point', function () {
        var svg = new dist_1.Svg();
        service.registerModule(svg);
        var module = service.getModules()[0];
        var definition = module.definitions.find(function (d) { return d.fullName == 'nodox.modules.svg.point'; });
        chai_1.expect(definition).to.be.a('object');
    });
    it('Should create a node with definition "Point"', function () {
        var svg = new dist_1.Svg();
        service.registerModule(svg);
        var module = service.getModules()[0];
        var definition = module.definitions.find(function (d) { return d.fullName == 'nodox.modules.svg.point'; });
        var document = service.createNewDocument();
        var node = service.addNode(document, definition);
        chai_1.expect(node).to.be.a('object');
    });
    it('Should create two nodes "Point" and one node Vector and connect these', function () {
        var svg = new dist_1.Svg();
        service.registerModule(svg);
        var module = service.getModules()[0];
        var defPoint = module.definitions.find(function (d) { return d.fullName == 'nodox.modules.svg.point'; });
        var defVector = module.definitions.find(function (d) { return d.fullName == 'nodox.modules.svg.vector'; });
        var document = service.createNewDocument();
        var point1 = service.addNode(document, defPoint);
        var point2 = service.addNode(document, defPoint);
        var vector = service.addNode(document, defVector);
        chai_1.expect(point1).to.be.a('object');
        chai_1.expect(point2).to.be.a('object');
        chai_1.expect(vector).to.be.a('object');
        // var connection1 = service.connect(document, vector.inputs[0], point1.outputs[0]);
        // var connection2 = service.connect(document, vector.inputs[1], point2.outputs[0]);
        service.connect(document, vector.inputs[0], point1.outputs[0]);
        service.connect(document, vector.inputs[1], point2.outputs[0]);
        chai_1.expect(document.connections[0]).to.be.a('object');
        chai_1.expect(document.connections[1]).to.be.a('object');
    });
    it('After connecting two Points and one Vector, it should be serialized in a valid json string', function () {
        var svg = new dist_1.Svg();
        service.registerModule(svg);
        var module = service.getModules()[0];
        var defPoint = module.definitions.find(function (d) { return d.fullName == 'nodox.modules.svg.point'; });
        var defVector = module.definitions.find(function (d) { return d.fullName == 'nodox.modules.svg.vector'; });
        var document = service.createNewDocument();
        var point1 = service.addNode(document, defPoint);
        var point2 = service.addNode(document, defPoint);
        var vector = service.addNode(document, defVector);
        // var connection1 = service.connect(document, vector.inputs[0], point1.outputs[0]);
        // var connection2 = service.connect(document, vector.inputs[1], point2.outputs[0]);
        service.connect(document, vector.inputs[0], point1.outputs[0]);
        service.connect(document, vector.inputs[1], point2.outputs[0]);
        var json = service.getDocumentJson(document);
        console.log(json);
        chai_1.expect(json.length).to.be.greaterThan(0);
    });
    it('should contain a valid Module SvgExtra with 1 or more definitions', function () {
        var svgextra = new dist_1.SvgExtra();
        service.registerModule(svgextra);
        var module = service.getModules()[0];
        chai_1.expect(module).to.be.equal(svgextra);
        chai_1.expect(module.definitions.length).to.be.greaterThan(0);
    });
    it('should contain a valid Module SvgGrids with 1 or more definitions', function () {
        var svggrids = new dist_1.SvgGrids();
        service.registerModule(svggrids);
        var module = service.getModules()[0];
        chai_1.expect(module).to.be.equal(svggrids);
        chai_1.expect(module.definitions.length).to.be.greaterThan(0);
    });
});
