/* global Float32Array */
import types from "engine/types";
import vec2 from "./vec2";

export const CONTAINER = Float32Array;

export const X = 0;
export const Y = 1;
export const W = 2;
export const H = 3;

/**
 * Devuelve si el objeto es una caja o no.
 *
 * @param {*} value - Objeto que vamos a comprobar que es una caja.
 * @return {boolean}
 */
export function isBox2(v) {
  return v instanceof CONTAINER && v.length >= 4;
}

/**
 * Crea una nueva caja.
 *
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @return {Box2}
 */
export function create(x = 0.0, y = 0.0, w = 0.0, h = 0.0) {
  return new CONTAINER([x,y,w,h]);
}

/**
 * Devuelve o establece una nueva posición x para la caja
 *
 * @param {Box2} box - Caja
 * @param {number} [newValue] - Nuevo valor
 * @return {number}
 */
export function x(b,newValue) {
  if (types.isNumber(newValue)) {
    b[X] = newValue;
  }
  return b[X];
}

/**
 * Devuelve o establece una nueva posición y para la caja
 *
 * @param {Box2} box - Caja
 * @param {number} [newValue] - Nuevo valor
 * @return {number}
 */
export function y(b,newValue) {
  if (types.isNumber(newValue)) {
    b[Y] = newValue;
  }
  return b[Y];
}

/**
 * Devuelve o establece un nuevo ancho para la caja
 *
 * @param {Box2} box - Caja
 * @param {number} [newValue] - Nuevo valor
 * @return {number}
 */
export function width(b,newValue) {
  if (types.isNumber(newValue)) {
    b[W] = newValue;
  }
  return b[W];
}

/**
 * Devuelve o establece un nuevo alto para la caja
 *
 * @param {Box2} box - Caja
 * @param {number} [newValue] - Nuevo valor
 * @return {number}
 */
export function height(b,newValue) {
  if (types.isNumber(newValue)) {
    b[H] = newValue;
  }
  return b[H];
}

/**
 * Devuelve la coordenada izquierda de la caja
 *
 * @param {Box2} box
 * @return {number}
 */
export function left(b) {
  return b[X];
}

/**
 * Devuelve la coordenada derecha de la caja
 *
 * @param {Box2} box
 * @return {number}
 */
export function right(b) {
  return b[X] + b[W];
}

/**
 * Devuelve la coordenada superior de la caja
 *
 * @param {Box2} box
 * @return {number}
 */
export function top(b) {
  return b[Y];
}

/**
 * Devuelve la coordenada inferior de la caja
 *
 * @param {Box2} box
 * @return {number}
 */
export function bottom(b) {
  return b[Y] + b[H];
}

/**
 * Devuelve si el vector está contenido dentro de la caja.
 *
 * @param {Box2} box - Caja
 * @param {Vec2} vector - Vector
 * @return {boolean}
 */
export function containsv(b,v) {
  const vx = vec2.x(v);
  const vy = vec2.y(v);
  return vx > left(b)
      && vy > top(b)
      && vx < right(b)
      && vy < bottom(b);
}
