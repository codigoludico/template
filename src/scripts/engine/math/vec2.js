/* global Float32Array */
const CONTAINER = Float32Array;

const X = 0;
const Y = 1;

/**
 * Devuelve si el objeto pasado es un Vec2.
 *
 * @param {*} vector
 * @return {boolean} - Devuelve si el objeto pasado como parámetro es un Vec2.
 */
export function isVec2(v) {
  return v instanceof CONTAINER && v.length === 2;
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
 * @param {Vec2} vector
 * @return {number}
 */
export function directionOf(v) {
  return Math.atan2(v[Y],v[X]);
}

export default {
  create,
  lengthSquaredOf,
  lengthOf,
  directionOf
};
