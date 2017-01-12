/**
 * Éste módulo expone métodos para crear un vector bidimensional y trabajar con
 * él. Por debajo, un Vec2 no es más que un `Float32Array` con 2 elementos (x,y).
 *
 * @module engine/math/vec2
 */

import arithmetic from "./arithmetic";
import types from "../types";

/* global Float32Array, Proxy */

/** Tipo de contenedor para el vector */
export const CONTAINER = Float32Array;

/** Coordenadas del vector */
export const X = 0;
export const Y = 1;

/**
 * Devuelve si el objeto pasado es un Vec2.
 *
 * @param {*} value
 * @return {boolean} - Devuelve si el objeto pasado como parámetro es un Vec2.
 */
export function isVec2(v) {
  return types.isA(v,CONTAINER) && v.length === 2;
}

/**
 * Crea un nuevo Vec2.
 *
 * @param {number} x - Coordenada x
 * @param {number} y - Coordenada y
 * @return {Vec2}
 */
export function create(x = 0.0, y = 0.0) {
  return new CONTAINER([x,y]);
}

/**
 * Crea un nuevo Vec2 usando un sistema de coordenadas polares
 *
 * @param {number} angle - Ángulo
 * @param {number} length - longitud
 * @return {Vec2}
 */
export function polar(angle,length = 1) {
  return create(
    Math.cos(angle) * length,
    Math.sin(angle) * length
  );
}

/**
 * Establece las coordenadas del vector.
 *
 * @param {Vec2} vector - Vector
 * @param {number} x - Coordenada x
 * @param {number} y - Coordenada y
 * @return {Vec2}
 */
export function set(out,x,y) {
  out[X] = x;
  out[Y] = y;
  return out;
}

/**
 * Setea las coordenadas del vector en 0, 0
 *
 * @param {Vec2} vector - Vector
 * @return {Vec2}
 */
export function empty(out) {
  return set(out,0,0);
}

/**
 * Este método convierte el vector en un vector "proxificado" de sólo
 * lectura.
 *
 * @param {Vec2} vector
 * @return {Proxy} - Retorna el vector proxificado.
 */
export function proxify(v) {
  return new Proxy(v, {
    get(target, property) {
      if (property === "x" || property === "0") {
        return target[0];
      } else if (property === "y" || property === "1") {
        return target[1];
      }
      return null;
    },
    has(target, property) {
      if (property === "x" || property === "y") {
        return true;
      }
      return property in target;
    },
    isExtensible() { return false; },
    getPrototypeOf() { return null; },
    ownKeys() { return ["x","y"]; },
    set() { return false; },
    defineProperty() { return false; },
    deleteProperty() { return false; }
  });
}

/**
 * Copia las coordenadas de un vector en otro vector.
 *
 * @param {Vec2} vector - Vector
 * @param {Vec2} vectorToBeCopied - Vector que se va a copiar
 * @return {Vec2}
 */
export function copy(out,v) {
  return set(out,v[X],v[Y]);
}

/**
 * Clona un vector
 *
 * @param {Vec2} vector - Vector que se clonará
 * @return {Vec2} - Retorna el vector clonado
 */
export function clone(v) {
  return create(v[X],v[Y]);
}

/**
 * Establece o devuelve la coordenada x de un vector.
 *
 * @param {Vec2} vector - Vector
 * @param {number} [newValue] - Si deseamos setear un nuevo valor x sobre el vector.
 * @return {number}
 */
export function x(v,newValue = null) {
  if (types.isNumber(newValue)) {
    v[X] = newValue;
  }
  return v[X];
}

/**
 * Establece o devuelve la coordenada y de un vector.
 *
 * @param {Vec2} vector - Vector
 * @param {number} [newValue] - Si deseamos setear un nuevo valor y sobre el vector.
 * @return {number}
 */
export function y(v,newValue = null) {
  if (types.isNumber(newValue)) {
    v[Y] = newValue;
  }
  return v[Y];
}

/**
 * Devuelve la longitud cuadrada del vector.
 *
 * @param {Vec2} vector
 * @return {number}
 */
export function lengthSquaredOf(v) {
  return v[X] * v[X] + v[Y] * v[Y];
}

/**
 * Devuelve la longitud del vector.
 *
 * @param {Vec2} vector
 * @return {number}
 */
export function lengthOf(v) {
  return Math.sqrt(lengthSquaredOf(v));
}

/**
 * Devuelve la dirección del vector.
 *
 * @param {Vec2} vector - Vector
 * @return {number} - Ángulo en radianes entre a y b
 */
export function directionOf(v) {
  return Math.atan2(v[Y],v[X]);
}

/**
 * Devuelve la distancia entre los vectores a y b.
 *
 * @param {Vec2} a - Primer operando
 * @param {Vec2} b - Segundo operando
 * @return {number} - Distancia entre el vector a y el vector b.
 */
export function distanceBetween(a,b) {
  return lengthOf(subv(create(),a,b));
}

/**
 * Devuelve la dirección entre a y b.
 *
 * @param {Vec2} a - Primer operando
 * @param {Vec2} b - Segundo operando
 * @return {number} - Ángulo en radianes entre a y b
 */
export function directionBetween(a,b) {
  return directionOf(subv(create(),a,b));
}

/**
 * Realiza una operación cualquiera sobre un vector.
 *
 * @param {Function} fn - Operación que se realizará sobre los vectores.
 * @param {Vec2} out - Elemento que contendrá el resultado de la operación.
 * @param {Vec2} a - Primer operando
 * @param {Vec2} b - Segundo operando
 * @return {Vec2} - Retorna el mismo vector que se pasó como parámetro `out`.
 */
export function operateVector(fn,out,a,b) {
  out[X] = fn(a[X],b[X]);
  out[Y] = fn(a[Y],b[Y]);
  return out;
}

/**
 * Realiza una operación entre un vector y un escalar.
 *
 * @param {Function} fn - Operación que se realizará sobre el vector y el escalar.
 * @param {Vec2} out - Elemento que contendrá el resultado de la operación.
 * @param {Vec2} a - Primer operando
 * @param {Vec2} b - Segundo operando
 * @return {Vec2} - Retorna el mismo vector que se pasó como parámetro `out`.
 */
export function operateScalar(fn,out,v,s) {
  out[X] = fn(v[X],s);
  out[Y] = fn(v[Y],s);
  return out;
}

/**
 * Suma dos vectores.
 *
 * @param {Vec2} out - Vector que contendrá el resultado de la suma.
 * @param {Vec2} a - Primer operando
 * @param {Vec2} b - Segundo operando
 */
export function addv(out,a,b) {
  return operateVector(arithmetic.add,out,a,b);
}

/**
 * Resta dos vectores.
 *
 * @param {Vec2} out - Vector que contendrá el resultado de la resta.
 * @param {Vec2} a - Primer operando
 * @param {Vec2} b - Segundo operando
 */
export function subv(out,a,b) {
  return operateVector(arithmetic.sub,out,a,b);
}

/**
 * Multiplicación de dos vectores.
 *
 * @param {Vec2} out - Vector que contendrá el resultado de la multiplicación.
 * @param {Vec2} a - Primer operando
 * @param {Vec2} b - Segundo operando
 */
export function mulv(out,a,b) {
  return operateVector(arithmetic.mul,out,a,b);
}

/**
 * División de dos vectores.
 *
 * @param {Vec2} out - Vector que contendrá el resultado de la división.
 * @param {Vec2} a - Primer operando
 * @param {Vec2} b - Segundo operando
 */
export function divv(out,a,b) {
  return operateVector(arithmetic.div,out,a,b);
}

/**
 * Suma de un vector con un escalar.
 *
 * @param {Vec2} out - Vector que contendrá el resultado de la suma.
 * @param {Vec2} a - Primer operando
 * @param {Vec2} b - Segundo operando
 */
export function adds(out,a,b) {
  return operateScalar(arithmetic.add,out,a,b);
}

/**
 * Resta de un vector y un escalar.
 *
 * @param {Vec2} out - Vector que contendrá el resultado de la resta.
 * @param {Vec2} a - Primer operando
 * @param {Vec2} b - Segundo operando
 */
export function subs(out,a,b) {
  return operateScalar(arithmetic.sub,out,a,b);
}

/**
 * Multiplicación de un vector y un escalar.
 *
 * @param {Vec2} out - Vector que contendrá el resultado de la multiplicación.
 * @param {Vec2} a - Primer operando
 * @param {Vec2} b - Segundo operando
 */
export function muls(out,a,b) {
  return operateScalar(arithmetic.mul,out,a,b);
}

/**
 * División de un vector y un escalar.
 *
 * @param {Vec2} out - Vector que contendrá el resultado de la división.
 * @param {Vec2} a - Primer operando
 * @param {Vec2} b - Segundo operando
 */
export function divs(out,a,b) {
  return operateScalar(arithmetic.div,out,a,b);
}

export default {
  CONTAINER,
  create,
  polar,
  empty,
  set,
  copy,
  clone,
  proxify,
  lengthSquaredOf,
  lengthOf,
  distanceBetween,
  directionOf,
  directionBetween,
  operateVector,
  operateScalar,
  addv,
  subv,
  mulv,
  divv,
  adds,
  subs,
  muls,
  divs,
  x,
  y
};
