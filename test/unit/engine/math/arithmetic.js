/* global describe, it */
import arithmetic from "engine/math/arithmetic";
import {expect} from "chai";

describe("Engine", function() {
  describe("Math", () => {
    describe("Arithmetic", () => {
      it("debería sumar varios números entre sí", () => {
        expect(arithmetic.add(2,3)).to.be.equal(5);
        expect(arithmetic.add(2,-3)).to.be.equal(-1);
        expect(arithmetic.add(0,3)).to.be.equal(3);
        expect(arithmetic.add(Infinity,3)).to.be.equal(Infinity);
        expect(arithmetic.add({},3)).to.be.NaN;
        expect(arithmetic.add("",3)).to.be.NaN;
        expect(arithmetic.add([],3)).to.be.NaN;
      });

      it("debería restar varios valores entre sí", () => {
        expect(arithmetic.sub(2,3)).to.be.equal(-1);
        expect(arithmetic.sub(2,-3)).to.be.equal(5);
        expect(arithmetic.sub(0,3)).to.be.equal(-3);
        expect(arithmetic.sub(Infinity,3)).to.be.equal(Infinity);
        expect(arithmetic.sub({},3)).to.be.NaN;
        expect(arithmetic.sub("",3)).to.be.NaN;
        expect(arithmetic.sub([],3)).to.be.NaN;
      });

      it("debería multiplicar varios valores entre sí", () => {
        expect(arithmetic.mul(2,3)).to.be.equal(6);
        expect(arithmetic.mul(2,-3)).to.be.equal(-6);
        expect(arithmetic.mul(0,3)).to.be.equal(0);
        expect(arithmetic.mul(Infinity,3)).to.be.equal(Infinity);
        expect(arithmetic.mul({},3)).to.be.NaN;
        expect(arithmetic.mul("",3)).to.be.NaN;
        expect(arithmetic.mul([],3)).to.be.NaN;
      });

      it("debería dividir varios valores entre sí", () => {
        expect(arithmetic.div(2,3)).to.be.closeTo(0.6666666666666,0.0001);
        expect(arithmetic.div(2,-3)).to.be.closeTo(-0.666666666666,0.0001);
        expect(arithmetic.div(0,3)).to.be.equal(0);
        expect(arithmetic.div(Infinity,3)).to.be.equal(Infinity);
        expect(arithmetic.div({},3)).to.be.NaN;
        expect(arithmetic.div("",3)).to.be.NaN;
        expect(arithmetic.div([],3)).to.be.NaN;
      });
    });
  });
});
