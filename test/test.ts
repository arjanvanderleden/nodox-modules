import { expect } from 'chai';
import 'mocha';
import { NodoxService, INodoxModule, NodoxDocument, INode, INodoxService } from 'nodox-core';
import { Core, Calc, Datasets, Domains, Svg, SvgExtra, SvgGrids } from '../dist';

describe('#NodoxModules', () => {
    var service: INodoxService;
    beforeEach(() => {
        service = new NodoxService();
    });

    it('should contain a valid Module Core with 1 or more definitions', () => {
        var core = new Core();
        service.registerModule(core);
        var module = service.getModules()[0];
        expect(module).to.be.equal(core);
        expect(module.definitions.length).to.be.greaterThan(0);
    })

    it('should contain a valid Module Calc with 1 or more definitions', () => {
        var calc = new Calc();
        service.registerModule(calc);
        var module = service.getModules()[0];
        expect(module).to.be.equal(calc);
        expect(module.definitions.length).to.be.greaterThan(0);
    })

    it('should contain a valid Module Datasets with 1 or more definitions', () => {
        var datasets = new Datasets();
        service.registerModule(datasets);
        var module = service.getModules()[0];
        expect(module).to.be.equal(datasets);
        expect(module.definitions.length).to.be.greaterThan(0);
    })

    it('should contain a valid Module Domains with 1 or more definitions', () => {
        var domains = new Domains();
        service.registerModule(domains);
        var module = service.getModules()[0];
        expect(module).to.be.equal(domains);
        expect(module.definitions.length).to.be.greaterThan(0);
    })

    it('should contain a valid Module Svg with 1 or more definitions', () => {
        var svg = new Svg();
        service.registerModule(svg);
        var module = service.getModules()[0];
        expect(module).to.be.equal(svg);        
        expect(module.definitions.length).to.be.greaterThan(0);
    })

    it('Should hava a definition for Point',()=>{
        var svg = new Svg();
        service.registerModule(svg);
        var module = service.getModules()[0];
        var definition = module.definitions.find(d=>d.fullName=='nodox.modules.svg.point');
        expect(definition).to.be.a('object');
    })

    it('Should create a node with definition "Point"',()=>{
        var svg = new Svg();
        service.registerModule(svg);
        var module = service.getModules()[0];
        var definition = module.definitions.find(d=>d.fullName=='nodox.modules.svg.point');
        var document = service.createNewDocument();
        var node = service.addNode(document,definition);
        expect(node).to.be.a('object');
    })

    it('Should create two nodes "Point" and one node Vector and connect these',()=>{
        var svg = new Svg();
        service.registerModule(svg);
        var module = service.getModules()[0];
        var defPoint = module.definitions.find(d=>d.fullName=='nodox.modules.svg.point');
        var defVector = module.definitions.find(d=>d.fullName=='nodox.modules.svg.vector');
        var document = service.createNewDocument();
        var point1 = service.addNode(document,defPoint);
        var point2 = service.addNode(document,defPoint);
        var vector = service.addNode(document,defVector);
        expect(point1,'point1').to.be.a('object');
        expect(point2,'point2').to.be.a('object');
        expect(vector,'vector').to.be.a('object');
        // var connection1 = service.connect(document, vector.inputs[0], point1.outputs[0]);
        // var connection2 = service.connect(document, vector.inputs[1], point2.outputs[0]);
        service.connect(document, vector.inputs[0], point1.outputs[0]);
        service.connect(document, vector.inputs[1], point2.outputs[0]);
        expect(document.connections[0],'document.connections[0]').to.be.a('object');
        expect(document.connections[1],'document.connections[1]').to.be.a('object');
    })

    it('After connecting two Points and one Vector, it should be serialized in a valid json string',()=>{
        var svg = new Svg();
        service.registerModule(svg);
        var module = service.getModules()[0];
        var defPoint = module.definitions.find(d=>d.fullName=='nodox.modules.svg.point');
        var defVector = module.definitions.find(d=>d.fullName=='nodox.modules.svg.vector');
        var document = service.createNewDocument();
        var point1 = service.addNode(document,defPoint);
        var point2 = service.addNode(document,defPoint);
        var vector = service.addNode(document,defVector);
        // var connection1 = service.connect(document, vector.inputs[0], point1.outputs[0]);
        // var connection2 = service.connect(document, vector.inputs[1], point2.outputs[0]);
        service.connect(document, vector.inputs[0], point1.outputs[0]);
        service.connect(document, vector.inputs[1], point2.outputs[0]);
        var json = service.getDocumentJson(document);
        expect(json.length).to.be.greaterThan(0);
    })


    it('should contain a valid Module SvgExtra with 1 or more definitions', () => {
        var svgextra = new SvgExtra();
        service.registerModule(svgextra);
        var module = service.getModules()[0];
        expect(module).to.be.equal(svgextra); 
        expect(module.definitions.length).to.be.greaterThan(0);
    })

    it('should contain a valid Module SvgGrids with 1 or more definitions', () => {
        var svggrids = new SvgGrids();
        service.registerModule(svggrids);
        var module = service.getModules()[0];
        expect(module).to.be.equal(svggrids); 
        expect(module.definitions.length).to.be.greaterThan(0);
    })
});