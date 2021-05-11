"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(p) {
        return new Point(this.x + p.x, this.y + p.y);
    }
    snapTo(gridX, gridY) {
        const x = Math.round(this.x / gridX) * gridX;
        const y = Math.round(this.y / gridY) * gridY;
        return new Point(x, y);
    }
    scale(factor) {
        return new Point(this.x * factor, this.y * factor);
    }
    scaleRelativeTo(point, factor) {
        return this.subtract(point).scale(factor).add(point);
    }
    subtract(p) {
        return new Point(this.x - p.x, this.y - p.y);
    }
    assign(p) {
        this.x = p.x;
        this.y = p.y;
        return this;
    }
    clone() {
        return new Point(this.x, this.y);
    }
    toString() {
        return `${this.x},${this.y}`;
    }
}
exports.Point = Point;
