/* global describe, it */
import {expect} from "chai";
import Mouse from "engine/input/mouse";

describe("Engine", function() {
  describe("Input", () => {
    describe("Mouse", () => {

      it("should fail if you try to start an already started Mouse", () => {
        expect(function(){
          Mouse.start();
          Mouse.start();
        }).to.throw(Error);
        Mouse.stop();
      });

      it("should fail if you try to stop a not started Mouse", () => {
        expect(function(){
          Mouse.stop();
        }).to.throw(Error);
      });

      it("should verify that pressing buttons works properly", () => {
        Mouse.press(2);
        expect(Mouse.isPressed(2)).to.be.equal(true);
        expect(Mouse.isPressed(0)).to.be.equal(false);
      });

      it("should verify that stateOf returns the button current state", () => {
        expect(Mouse.stateOf(2)).to.be.equal(1.0);
        expect(Mouse.stateOf(0)).to.be.equal(0.0);
      });

      it("should verify that releasing buttons works properly", () => {
        Mouse.release(2);
        expect(Mouse.isReleased(2)).to.be.equal(true);
        expect(Mouse.isReleased(0)).to.be.equal(true);
      });

      it("should throw if you pass an invalid button", () => {
        expect(() => Mouse.stateOf(-1)).to.throw(RangeError);
        expect(() => Mouse.stateOf(256)).to.throw(RangeError);

        expect(() => Mouse.press(-1)).to.throw(RangeError);
        expect(() => Mouse.press(256)).to.throw(RangeError);

        expect(() => Mouse.release(-1)).to.throw(RangeError);
        expect(() => Mouse.release(256)).to.throw(RangeError);

        expect(() => Mouse.isPressed(-1)).to.throw(RangeError);
        expect(() => Mouse.isPressed(256)).to.throw(RangeError);

        expect(() => Mouse.isReleased(-1)).to.throw(RangeError);
        expect(() => Mouse.isReleased(256)).to.throw(RangeError);
      });
    });
  });
});
