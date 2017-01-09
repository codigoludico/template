/* global describe, it */
import vec2 from "engine/math/vec2";
import {expect} from "chai";

const DELTA = 0.00000001;

describe("Math", function() {
  describe("Vec2", () => {
    it("should create a new vector", () => {
      const newVector = vec2.create();
      expect(newVector).to.be.instanceof(vec2.CONTAINER);
      expect(newVector).to.have.property("length", 2);
    });

    it("should create a new vector (with parameters)", () => {
      const newVector = vec2.create(25,5);
      expect(newVector).to.be.instanceof(vec2.CONTAINER);
      expect(newVector).to.be.deep.equal({"0":25,"1":5});
    });

    it("should create a new vector (using polar coordinates)", () => {
      const a = vec2.polar(Math.PI * 0.25);
      expect(a).to.have.property(0).and.be.closeTo(0.7071067690849304,DELTA);
      expect(a).to.have.property(1).and.be.closeTo(0.7071067690849304,DELTA);

      const b = vec2.polar(Math.PI * 0.5);
      expect(b).to.have.property(0).and.be.closeTo(0,DELTA);
      expect(b).to.have.property(1).and.be.closeTo(1,DELTA);

      const c = vec2.polar(Math.PI * 0);
      expect(c).to.have.property(0).and.be.closeTo(1,DELTA);
      expect(c).to.have.property(1).and.be.closeTo(0,DELTA);
    });

    it("should calculate vector length (squared ^2)", () => {
      expect(vec2.lengthSquaredOf(vec2.create(5,5))).to.be.equal(50);
      expect(vec2.lengthSquaredOf(vec2.create())).to.be.equal(0);
      expect(vec2.lengthSquaredOf(vec2.create(1,0))).to.be.equal(1);
      expect(vec2.lengthSquaredOf(vec2.create(0,1))).to.be.equal(1);
    });

    it("should calculate vector length", () => {
      expect(vec2.lengthOf(vec2.create(5,5))).to.be.closeTo(7.071067812,DELTA);
      expect(vec2.lengthOf(vec2.create())).to.be.equal(0);
      expect(vec2.lengthOf(vec2.create(1,0))).to.be.equal(1);
      expect(vec2.lengthOf(vec2.create(0,1))).to.be.equal(1);
    });

    it("should calculate vector direction", () => {
      expect(vec2.directionOf(vec2.create())).to.be.closeTo(0,DELTA);
      expect(vec2.directionOf(vec2.create(1,0))).to.be.closeTo(0,DELTA);
      expect(vec2.directionOf(vec2.create(0,1))).to.be.closeTo(Math.PI * 0.5,DELTA);
      expect(vec2.directionOf(vec2.create(0,-1))).to.be.closeTo(Math.PI * -0.5,DELTA);
      expect(vec2.directionOf(vec2.create(0.707106,0.707106))).to.be.closeTo(Math.PI * 0.25,DELTA);
    });
  });
});
