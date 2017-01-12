/* global describe, it, beforeEach */
import random from "engine/math/random";
import {expect} from "chai";

describe("Engine", function() {
  describe("Math", () => {
    describe("Random", () => {

      beforeEach(() => {
        random.reset(0);
      });

      it("should test that pseudo-random numbers are ok", () => {
        const values = [];
        for (let index = 0; index < 1000; index++) {
          const value = random.unit();
          values.push(value);
          expect(value).to.be.within(0,1);
        }

        // Como debería generar exactamente los mismos valores, comprobamos
        // que eso sea así.
        random.reset(0);
        for (let index = 0; index < 1000; index++) {
          const value = values[index];
          expect(random.unit()).to.be.equal(value);
        }
      });

      it("should test that pseudo-random numbers are ok", () => {
        for (let index = 0; index < 1000; index++) {
          expect(random.unit()).to.be.within(0,1);
        }
      });
    });
  });
});
