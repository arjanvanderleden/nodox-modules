import { expect } from 'chai';
import 'mocha';
import { NodoxService, INodoxModule, NodoxDocument, INode, INodoxService } from 'nodox-core';
import { Core, Calc, Datasets, Domains, Svg, SvgExtra, SvgGrids } from '../dist';

describe('#NodoxModules', () => {
    var service: INodoxService;
    beforeEach(() => {
        (<any>global).window = null;
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