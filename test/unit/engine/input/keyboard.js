/* global describe, it */
import {expect} from "chai";
import Keyboard from "engine/input/keyboard";

describe("Engine", function() {
  describe("Input", () => {
    describe("Keyboard", () => {

      it("should fail if you try to start an already started Keyboard", () => {
        expect(function(){
          Keyboard.start();
          Keyboard.start();
        }).to.throw(Error);
        Keyboard.stop();
      });

      it("should fail if you try to stop a not started Keyboard", () => {
        expect(function(){
          Keyboard.stop();
        }).to.throw(Error);
      });

      it("should verify that pressing keys works properly", () => {
        Keyboard.press(32);
        expect(Keyboard.isPressed(32)).to.be.equal(true);
        expect(Keyboard.isPressed(0)).to.be.equal(false);
      });

      it("should verify that stateOf returns the key current state", () => {
        expect(Keyboard.stateOf(32)).to.be.equal(1.0);
        expect(Keyboard.stateOf(0)).to.be.equal(0.0);
      });

      it("should verify that releasing keys works properly", () => {
        Keyboard.release(32);
        expect(Keyboard.isReleased(32)).to.be.equal(true);
        expect(Keyboard.isReleased(0)).to.be.equal(true);
      });

      it("should throw if you pass an invalid key", () => {
        expect(() => Keyboard.stateOf(-1)).to.throw(RangeError);
        expect(() => Keyboard.stateOf(256)).to.throw(RangeError);

        expect(() => Keyboard.press(-1)).to.throw(RangeError);
        expect(() => Keyboard.press(256)).to.throw(RangeError);

        expect(() => Keyboard.release(-1)).to.throw(RangeError);
        expect(() => Keyboard.release(256)).to.throw(RangeError);

        expect(() => Keyboard.isPressed(-1)).to.throw(RangeError);
        expect(() => Keyboard.isPressed(256)).to.throw(RangeError);

        expect(() => Keyboard.isReleased(-1)).to.throw(RangeError);
        expect(() => Keyboard.isReleased(256)).to.throw(RangeError);
      });
    });
  });
});
