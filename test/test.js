"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var nodox_core_1 = require("nodox-core");
var dist_1 = require("../dist");
describe('#NodoxModules', function () {
    var service;
    beforeEach(function () {
        global.window = null;
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
