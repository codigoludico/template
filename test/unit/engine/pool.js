/* global describe, it */
import pool from "engine/pool";
import {expect} from "chai";

describe("Engine", function() {
  describe("Pool", () => {
    it("should create a new pool", () => {
      const newPool = pool.create(20, () => {
        return {
          "name": "newPoolObject",
          "x": 0,
          "y": 0
        };
      });

      const aPoolObject = newPool.create();
      expect(aPoolObject).to.be.deep.equal({
        "name": "newPoolObject",
        "x": 0,
        "y": 0
      });
    });

    it("should create a new pool and exhaust it", () => {
      const newPool = pool.create(20, () => {
        return {
          "name": "newPoolObject",
          "x": 0,
          "y": 0
        };
      });

      for (let index = 0; index < 100; index++) {
        const aPoolObject = newPool.create();
        if (index < 20) {
          expect(aPoolObject).to.be.deep.equal({
            "name": "newPoolObject",
            "x": 0,
            "y": 0
          });
        } else {
          expect(aPoolObject).to.be.equal(null);
        }
      }
      expect(newPool).to.have.property("length").and.be.equal(20);
    });

    it("should create a pool and verify that it returns its proper length", () => {
      const newPool = pool.create(20, () => {
        return {
          "name": "newPoolObject",
          "x": 0,
          "y": 0
        };
      });

      const aPoolObject = newPool.create();
      expect(newPool.length).to.be.equal(1);
      newPool.destroy(aPoolObject);
      expect(newPool.length).to.be.equal(0);
    });

    it("should throw an error if you're trying an invalid object", () => {
      const newPool = pool.create(20, () => {
        return {
          "name": "newPoolObject",
          "x": 0,
          "y": 0
        };
      });

      const aPoolObject = newPool.create();
      expect(newPool).to.have.property("length").and.be.equal(1);
      newPool.destroy(aPoolObject);
      expect(newPool).to.have.property("length").and.be.equal(0);
      expect(() => {
        newPool.destroy({});
      }).to.throw(Error);
    });
  });
});
