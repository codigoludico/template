/* global describe, it */
import types from "engine/types";
import {expect} from "chai";

describe("Engine", function() {
  describe("Types", () => {
    it("should verify that isBoolean works properly", () => {
      expect(types.isBoolean(0)).to.be.equal(false);
      expect(types.isBoolean(1)).to.be.equal(false);
      expect(types.isBoolean(Math.PI)).to.be.equal(false);
      expect(types.isBoolean(Infinity)).to.be.equal(false);
      expect(types.isBoolean(NaN)).to.be.equal(false);
      expect(types.isBoolean(null)).to.be.equal(false);
      expect(types.isBoolean(undefined)).to.be.equal(false);
      expect(types.isBoolean(true)).to.be.equal(true);
      expect(types.isBoolean(false)).to.be.equal(true);
      expect(types.isBoolean(/^[0-9]$/)).to.be.equal(false);
      expect(types.isBoolean(new Date())).to.be.equal(false);
      expect(types.isBoolean([])).to.be.equal(false);
      expect(types.isBoolean({})).to.be.equal(false);
      expect(types.isBoolean([1,2,3])).to.be.equal(false);
      expect(types.isBoolean({a:1,b:2,c:3})).to.be.equal(false);
      expect(types.isBoolean("0")).to.be.equal(false);
      expect(types.isBoolean("hola")).to.be.equal(false);
      expect(types.isBoolean(function() { return 1; })).to.be.equal(false);
    });

    it("should verify that isNumber works properly", () => {
      expect(types.isNumber(0)).to.be.equal(true);
      expect(types.isNumber(1)).to.be.equal(true);
      expect(types.isNumber(Math.PI)).to.be.equal(true);
      expect(types.isNumber(Infinity)).to.be.equal(false);
      expect(types.isNumber(NaN)).to.be.equal(false);
      expect(types.isNumber(null)).to.be.equal(false);
      expect(types.isNumber(undefined)).to.be.equal(false);
      expect(types.isNumber(true)).to.be.equal(false);
      expect(types.isNumber(false)).to.be.equal(false);
      expect(types.isNumber(/^[0-9]$/)).to.be.equal(false);
      expect(types.isNumber(new Date())).to.be.equal(false);
      expect(types.isNumber([])).to.be.equal(false);
      expect(types.isNumber({})).to.be.equal(false);
      expect(types.isNumber([1,2,3])).to.be.equal(false);
      expect(types.isNumber({a:1,b:2,c:3})).to.be.equal(false);
      expect(types.isNumber("0")).to.be.equal(false);
      expect(types.isNumber("hola")).to.be.equal(false);
      expect(types.isNumber(function() { return 1; })).to.be.equal(false);
    });

    it("should verify that isInteger works properly", () => {
      expect(types.isInteger(0)).to.be.equal(true);
      expect(types.isInteger(1)).to.be.equal(true);
      expect(types.isInteger(Math.PI)).to.be.equal(false);
      expect(types.isInteger(Infinity)).to.be.equal(false);
      expect(types.isInteger(NaN)).to.be.equal(false);
      expect(types.isInteger(null)).to.be.equal(false);
      expect(types.isInteger(undefined)).to.be.equal(false);
      expect(types.isInteger(true)).to.be.equal(false);
      expect(types.isInteger(false)).to.be.equal(false);
      expect(types.isInteger(/^[0-9]$/)).to.be.equal(false);
      expect(types.isInteger(new Date())).to.be.equal(false);
      expect(types.isInteger([])).to.be.equal(false);
      expect(types.isInteger({})).to.be.equal(false);
      expect(types.isInteger([1,2,3])).to.be.equal(false);
      expect(types.isInteger({a:1,b:2,c:3})).to.be.equal(false);
      expect(types.isInteger("0")).to.be.equal(false);
      expect(types.isInteger("hola")).to.be.equal(false);
      expect(types.isInteger(function() { return 1; })).to.be.equal(false);
    });

    it("should verify that isString works properly", () => {
      expect(types.isString(0)).to.be.equal(false);
      expect(types.isString(1)).to.be.equal(false);
      expect(types.isString(Math.PI)).to.be.equal(false);
      expect(types.isString(Infinity)).to.be.equal(false);
      expect(types.isString(NaN)).to.be.equal(false);
      expect(types.isString(null)).to.be.equal(false);
      expect(types.isString(undefined)).to.be.equal(false);
      expect(types.isString(true)).to.be.equal(false);
      expect(types.isString(false)).to.be.equal(false);
      expect(types.isString(/^[0-9]$/)).to.be.equal(false);
      expect(types.isString(new Date())).to.be.equal(false);
      expect(types.isString([])).to.be.equal(false);
      expect(types.isString({})).to.be.equal(false);
      expect(types.isString([1,2,3])).to.be.equal(false);
      expect(types.isString({a:1,b:2,c:3})).to.be.equal(false);
      expect(types.isString("0")).to.be.equal(true);
      expect(types.isString("hola")).to.be.equal(true);
      expect(types.isString(function() { return 1; })).to.be.equal(false);
    });

    it("should verify that isScalar works properly", () => {
      expect(types.isScalar(0)).to.be.equal(true);
      expect(types.isScalar(1)).to.be.equal(true);
      expect(types.isScalar(Math.PI)).to.be.equal(true);
      expect(types.isScalar(Infinity)).to.be.equal(false);
      expect(types.isScalar(NaN)).to.be.equal(false);
      expect(types.isScalar(null)).to.be.equal(false);
      expect(types.isScalar(undefined)).to.be.equal(false);
      expect(types.isScalar(true)).to.be.equal(true);
      expect(types.isScalar(false)).to.be.equal(true);
      expect(types.isScalar(/^[0-9]$/)).to.be.equal(false);
      expect(types.isScalar(new Date())).to.be.equal(false);
      expect(types.isScalar([])).to.be.equal(false);
      expect(types.isScalar({})).to.be.equal(false);
      expect(types.isScalar([1,2,3])).to.be.equal(false);
      expect(types.isScalar({a:1,b:2,c:3})).to.be.equal(false);
      expect(types.isScalar("0")).to.be.equal(true);
      expect(types.isScalar("hola")).to.be.equal(true);
      expect(types.isScalar(function() { return 1; })).to.be.equal(false);
    });

    it("should verify that isFunction works properly", () => {
      expect(types.isFunction(0)).to.be.equal(false);
      expect(types.isFunction(1)).to.be.equal(false);
      expect(types.isFunction(Math.PI)).to.be.equal(false);
      expect(types.isFunction(Infinity)).to.be.equal(false);
      expect(types.isFunction(NaN)).to.be.equal(false);
      expect(types.isFunction(null)).to.be.equal(false);
      expect(types.isFunction(undefined)).to.be.equal(false);
      expect(types.isFunction(true)).to.be.equal(false);
      expect(types.isFunction(false)).to.be.equal(false);
      expect(types.isFunction(/^[0-9]$/)).to.be.equal(false);
      expect(types.isFunction(new Date())).to.be.equal(false);
      expect(types.isFunction([])).to.be.equal(false);
      expect(types.isFunction({})).to.be.equal(false);
      expect(types.isFunction([1,2,3])).to.be.equal(false);
      expect(types.isFunction({a:1,b:2,c:3})).to.be.equal(false);
      expect(types.isFunction("0")).to.be.equal(false);
      expect(types.isFunction("hola")).to.be.equal(false);
      expect(types.isFunction(function() { return 1; })).to.be.equal(true);
    });

    it("should verify that isArray works properly", () => {
      expect(types.isArray(0)).to.be.equal(false);
      expect(types.isArray(1)).to.be.equal(false);
      expect(types.isArray(Math.PI)).to.be.equal(false);
      expect(types.isArray(Infinity)).to.be.equal(false);
      expect(types.isArray(NaN)).to.be.equal(false);
      expect(types.isArray(null)).to.be.equal(false);
      expect(types.isArray(undefined)).to.be.equal(false);
      expect(types.isArray(true)).to.be.equal(false);
      expect(types.isArray(false)).to.be.equal(false);
      expect(types.isArray(/^[0-9]$/)).to.be.equal(false);
      expect(types.isArray(new Date())).to.be.equal(false);
      expect(types.isArray([])).to.be.equal(true);
      expect(types.isArray({})).to.be.equal(false);
      expect(types.isArray([1,2,3])).to.be.equal(true);
      expect(types.isArray({a:1,b:2,c:3})).to.be.equal(false);
      expect(types.isArray("0")).to.be.equal(false);
      expect(types.isArray("hola")).to.be.equal(false);
      expect(types.isArray(function() { return 1; })).to.be.equal(false);
    });

    it("should verify that isObject works properly", () => {
      expect(types.isObject(0)).to.be.equal(false);
      expect(types.isObject(1)).to.be.equal(false);
      expect(types.isObject(Math.PI)).to.be.equal(false);
      expect(types.isObject(Infinity)).to.be.equal(false);
      expect(types.isObject(NaN)).to.be.equal(false);
      expect(types.isObject(null)).to.be.equal(false);
      expect(types.isObject(undefined)).to.be.equal(false);
      expect(types.isObject(true)).to.be.equal(false);
      expect(types.isObject(false)).to.be.equal(false);
      expect(types.isObject(/^[0-9]$/)).to.be.equal(false);
      expect(types.isObject(new Date())).to.be.equal(false);
      expect(types.isObject([])).to.be.equal(false);
      expect(types.isObject({})).to.be.equal(true);
      expect(types.isObject([1,2,3])).to.be.equal(false);
      expect(types.isObject({a:1,b:2,c:3})).to.be.equal(true);
      expect(types.isObject("0")).to.be.equal(false);
      expect(types.isObject("hola")).to.be.equal(false);
      expect(types.isObject(function() { return 1; })).to.be.equal(false);
    });

    it("should verify that isRegExp works properly", () => {
      expect(types.isRegExp(0)).to.be.equal(false);
      expect(types.isRegExp(1)).to.be.equal(false);
      expect(types.isRegExp(Math.PI)).to.be.equal(false);
      expect(types.isRegExp(Infinity)).to.be.equal(false);
      expect(types.isRegExp(NaN)).to.be.equal(false);
      expect(types.isRegExp(null)).to.be.equal(false);
      expect(types.isRegExp(undefined)).to.be.equal(false);
      expect(types.isRegExp(true)).to.be.equal(false);
      expect(types.isRegExp(false)).to.be.equal(false);
      expect(types.isRegExp(/^[0-9]$/)).to.be.equal(true);
      expect(types.isRegExp(new Date())).to.be.equal(false);
      expect(types.isRegExp([])).to.be.equal(false);
      expect(types.isRegExp({})).to.be.equal(false);
      expect(types.isRegExp([1,2,3])).to.be.equal(false);
      expect(types.isRegExp({a:1,b:2,c:3})).to.be.equal(false);
      expect(types.isRegExp("0")).to.be.equal(false);
      expect(types.isRegExp("hola")).to.be.equal(false);
      expect(types.isRegExp(function() { return 1; })).to.be.equal(false);
    });

    it("should verify that isDate works properly", () => {
      expect(types.isDate(0)).to.be.equal(false);
      expect(types.isDate(1)).to.be.equal(false);
      expect(types.isDate(Math.PI)).to.be.equal(false);
      expect(types.isDate(Infinity)).to.be.equal(false);
      expect(types.isDate(NaN)).to.be.equal(false);
      expect(types.isDate(null)).to.be.equal(false);
      expect(types.isDate(undefined)).to.be.equal(false);
      expect(types.isDate(true)).to.be.equal(false);
      expect(types.isDate(false)).to.be.equal(false);
      expect(types.isDate(/^[0-9]$/)).to.be.equal(false);
      expect(types.isDate(new Date())).to.be.equal(true);
      expect(types.isDate([])).to.be.equal(false);
      expect(types.isDate({})).to.be.equal(false);
      expect(types.isDate([1,2,3])).to.be.equal(false);
      expect(types.isDate({a:1,b:2,c:3})).to.be.equal(false);
      expect(types.isDate("0")).to.be.equal(false);
      expect(types.isDate("hola")).to.be.equal(false);
      expect(types.isDate(function() { return 1; })).to.be.equal(false);
    });

    it("should verify that isNull works properly", () => {
      expect(types.isNull(0)).to.be.equal(false);
      expect(types.isNull(1)).to.be.equal(false);
      expect(types.isNull(Math.PI)).to.be.equal(false);
      expect(types.isNull(Infinity)).to.be.equal(false);
      expect(types.isNull(NaN)).to.be.equal(false);
      expect(types.isNull(null)).to.be.equal(true);
      expect(types.isNull(undefined)).to.be.equal(false);
      expect(types.isNull(true)).to.be.equal(false);
      expect(types.isNull(false)).to.be.equal(false);
      expect(types.isNull(/^[0-9]$/)).to.be.equal(false);
      expect(types.isNull(new Date())).to.be.equal(false);
      expect(types.isNull([])).to.be.equal(false);
      expect(types.isNull({})).to.be.equal(false);
      expect(types.isNull([1,2,3])).to.be.equal(false);
      expect(types.isNull({a:1,b:2,c:3})).to.be.equal(false);
      expect(types.isNull("0")).to.be.equal(false);
      expect(types.isNull("hola")).to.be.equal(false);
      expect(types.isNull(function() { return 1; })).to.be.equal(false);
    });

    it("should verify that isUndefined works properly", () => {
      expect(types.isUndefined(0)).to.be.equal(false);
      expect(types.isUndefined(1)).to.be.equal(false);
      expect(types.isUndefined(Math.PI)).to.be.equal(false);
      expect(types.isUndefined(Infinity)).to.be.equal(false);
      expect(types.isUndefined(NaN)).to.be.equal(false);
      expect(types.isUndefined(null)).to.be.equal(false);
      expect(types.isUndefined(undefined)).to.be.equal(true);
      expect(types.isUndefined(true)).to.be.equal(false);
      expect(types.isUndefined(false)).to.be.equal(false);
      expect(types.isUndefined(/^[0-9]$/)).to.be.equal(false);
      expect(types.isUndefined(new Date())).to.be.equal(false);
      expect(types.isUndefined([])).to.be.equal(false);
      expect(types.isUndefined({})).to.be.equal(false);
      expect(types.isUndefined([1,2,3])).to.be.equal(false);
      expect(types.isUndefined({a:1,b:2,c:3})).to.be.equal(false);
      expect(types.isUndefined("0")).to.be.equal(false);
      expect(types.isUndefined("hola")).to.be.equal(false);
      expect(types.isUndefined(function() { return 1; })).to.be.equal(false);
    });

    it("should verify that isEmpty works properly", () => {
      expect(types.isEmpty(0)).to.be.equal(true);
      expect(types.isEmpty(1)).to.be.equal(false);
      expect(types.isEmpty(Math.PI)).to.be.equal(false);
      expect(types.isEmpty(Infinity)).to.be.equal(false);
      expect(types.isEmpty(NaN)).to.be.equal(false);
      expect(types.isEmpty(null)).to.be.equal(true);
      expect(types.isEmpty(undefined)).to.be.equal(true);
      expect(types.isEmpty(true)).to.be.equal(false);
      expect(types.isEmpty(false)).to.be.equal(true);
      expect(types.isEmpty(/^[0-9]$/)).to.be.equal(false);
      expect(types.isEmpty(new Date())).to.be.equal(false);
      expect(types.isEmpty([])).to.be.equal(true);
      expect(types.isEmpty({})).to.be.equal(true);
      expect(types.isEmpty([1,2,3])).to.be.equal(false);
      expect(types.isEmpty({a:1,b:2,c:3})).to.be.equal(false);
      expect(types.isEmpty("0")).to.be.equal(false);
      expect(types.isEmpty("hola")).to.be.equal(false);
      expect(types.isEmpty(function() { return 1; })).to.be.equal(false);
    });
  });
});
