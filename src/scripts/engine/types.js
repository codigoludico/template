/**
 * Este módulo contiene funciones útiles para verificar los tipos de las variables
 * en JavaScript.
 *
 * @module engine/types
 */

/**
 * Devuelve si una variable es un número.
 *
 * @param {*} value - Variable que se verificará
 * @return {boolean} - Devolvemos `true` si efectivamente el objeto es de tipo Number.
 */
export function isNumber(v) {
  return !isNaN(v) && (typeof v === "number" || v instanceof Number) && isFinite(v);
}

/**
 * Devuelve si una variable es un número y además el número es entero.
 *
 * @param {*} value - Variable que se verificará
 * @return {boolean} - Devolvemos `true` si efectivamente el objeto es de tipo Number.
 */
export function isInteger(v) {
  return isNumber(v)
      && Math.round(v) === v;
}

/**
 * Devuelve si una variable es una cadena.
 *
 * @param {*} value - Variable que se verificará
 * @return {boolean} - Devolvemos `true` si efectivamente el objeto es de tipo String.
 */
export function isString(v) {
  return typeof v === "string" || v instanceof String;
}

/**
 * Devuelve si una variable es un booleano.
 *
 * @param {*} value - Variable que se verificará
 * @return {boolean} - Devolvemos `true` si efectivamente el objeto es de tipo Boolean.
 */
export function isBoolean(v) {
  return typeof v === "boolean" || v instanceof Boolean;
}

/**
 * Devuelve si una variable es una función.
 *
 * @param {*} value - Variable que se verificará
 * @return {boolean} - Devolvemos `true` si efectivamente el objeto es de tipo Function.
 */
export function isFunction(v) {
  return typeof v === "function" || v instanceof Function;
}

/**
 * Devuelve si una variable es un escalar, es decir, es de tipo `Number`, `String` o `Boolean`.
 *
 * @param {*} value - Variable que se verificará
 * @return {boolean} - Devolvemos `true` si efectivamente el objeto es de tipo escalar.
 */
export function isScalar(v) {
  return isBoolean(v)
      || isNumber(v)
      || isString(v);
}

/**
 * Devuelve si una variable es un array.
 *
 * @param {*} value - Variable que se verificará
 * @return {boolean} - Devolvemos `true` si efectivamente el objeto es de tipo Array.
 */
export function isArray(v) {
  return Array.isArray(v);
}

/**
 * Devuelve si una variable es un objeto.
 *
 * @param {*} value - Variable que se verificará
 * @return {boolean} - Devolvemos `true` si efectivamente el objeto es de tipo Object.
 */
export function isObject(v) {
  return v !== null && typeof v === "object" && v.constructor === Object;
}

/**
 * Devuelve si una variable es null.
 *
 * @param {*} value - Variable que se verificará
 * @return {boolean} - Devolvemos `true` si efectivamente el objeto es de tipo null.
 */
export function isNull(v) {
  return v === null;
}

/**
 * Devuelve si una variable es undefined;
 *
 * @param {*} value - Variable que se verificará
 * @return {boolean} - Devolvemos `true` si efectivamente el objeto es de tipo undefined.
 */
export function isUndefined(v) {
  return v === undefined;
}

/**
 * Devuelve si una variable es una expresión regular.
 *
 * @param {*} value - Variable que se verificará
 * @return {boolean} - Devolvemos `true` si efectivamente el objeto es de tipo RegExp.
 */
export function isRegExp(v) {
  return v instanceof RegExp;
}

/**
 * Devuelve si una variable es una fecha.
 *
 * @param {*} value - Variable que se verificará
 * @return {boolean} - Devolvemos `true` si efectivamente el objeto es de tipo Date.
 */
export function isDate(v) {
  return v instanceof Date;
}

/**
 * Devuelve si una variable es un error.
 *
 * @param {*} value - Variable que se verificará
 * @return {boolean} - Devolvemos `true` si efectivamente el objeto es de tipo Error.
 */
export function isError(v) {
  return v instanceof Error;
}

/**
 * Devuelve si una variable está vacía o no (teniendo en cuenta el tipo)
 *
 * @param {*} value - Variable que se verificará
 * @return {boolean}
 */
export function isEmpty(v) {
  if (isScalar(v)) {
    return !v;
  } else if (isArray(v)) {
    return v.length === 0;
  } else if (isObject(v)) {
    return Object.keys(v).length === 0;
  }
  return (isNull(v) || isUndefined(v));
}

/**
 * Devuelve si una variable pertenece a un "clase" concreta.
 *
 * @param {*} value - Variable que se verificará
 * @param {*} type - Tipo de la variable
 * @return {boolean}
 */
export function isA(a,b) {
  if (isFunction(b)) {
    return a instanceof b;
  } else if (isString(b)) {
    switch(b) {
      case "num":
      case "number": return isNumber(a);
      case "int":
      case "integer": return isInteger(a);
      case "bool":
      case "boolean": return isBoolean(a);
      case "string": return isString(a);
      case "func":
      case "function": return isFunction(a);
      case "null": return isNull(a);
      case "undef":
      case "undefined": return isUndefined(a);
      case "array": return isArray(a);
      case "object": return isObject(a);
      case "error": return isError(a);
      case "regexp": return isRegExp(a);
      case "date": return isDate(a);
      case "empty": return isEmpty(a);
    }
  }
}

export default {
  isBoolean,
  isNumber,
  isInteger,
  isString,
  isScalar,
  isFunction,
  isArray,
  isObject,
  isUndefined,
  isNull,
  isRegExp,
  isDate,
  isError,
  isA,
  isEmpty
};
