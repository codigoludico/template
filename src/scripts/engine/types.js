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
 * Devuelve si una variable es numérica.
 *
 * @param {*} value - Variable que se verificará
 * @return {boolean} - Devolvemos `true` si es de tipo numérico (Infinity es de tipo numérico)
 */
export function isNumeric(v) {
  return !isNaN(v) && (typeof v === "number" || v instanceof Number);
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
 * @param {*} type - Tipo de la variable
 * @param {*} value - Variable que se verificará
 * @return {boolean}
 */
export function isA(type,value) {
  if (isFunction(type)) {
    return value instanceof type;
  } else if (isString(type)) {
    switch(type) {
      case "num":
      case "number": return isNumber(value);
      case "numeric": return isNumeric(value);
      case "int":
      case "integer": return isInteger(value);
      case "bool":
      case "boolean": return isBoolean(value);
      case "string": return isString(value);
      case "scalar": return isScalar(value);
      case "func":
      case "function": return isFunction(value);
      case "null": return isNull(value);
      case "undef":
      case "undefined": return isUndefined(value);
      case "array": return isArray(value);
      case "object": return isObject(value);
      case "error": return isError(value);
      case "regexp": return isRegExp(value);
      case "date": return isDate(value);
      case "empty": return isEmpty(value);
      default:
        throw new TypeError(`Tipo "${type}" inválido`);
    }
  } else {
    throw new TypeError("El tipo debe ser una cadena de texto o una función");
  }
}

export default {
  isBoolean,
  isNumber,
  isNumeric,
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
