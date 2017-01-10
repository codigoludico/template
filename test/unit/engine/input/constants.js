/* global describe, it */
import {PRESSED,RELEASED} from "engine/input/constants";
import {expect} from "chai";

describe("Engine", function() {
  describe("Input", () => {
    describe("Constants", () => {
      it("should test if constant values are correct", () => {
        expect(PRESSED).to.be.equal(1.0);
        expect(RELEASED).to.be.equal(0.0);
      });
    });
  });
});
