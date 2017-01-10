/**
 * Éste módulo contiene funciones útiles para trabajar con números pseudo-aleatorios
 * que sean predecibles.
 *
 * @module engine/math/random
 */

let seed = 0;

/**
 * Valor que se usa como incremento del LCG.
 *
 * @const {Number}
 * @internal
 * @default
 */
const INCREMENT = 12345;

/**
 * Valor que se usa como multiplicador del LCG.
 *
 * @const {Number}
 * @internal
 * @default
 */
const MULTIPLIER = 1103515245;

/**
 * Valor que se usa como módulo del LCG.
 *
 * @const {Number}
 * @internal
 * @default
 */
const MODULUS = 2147483648;

/**
 * Linear-Congruential Generator
 *
 * @param {Number} value
 * @param {Number} increment
 * @param {Number} multiplier
 * @param {Number} modulus
 * @return {Number}
 * @internal
 */
function lcg(value, increment, multiplier, modulus) {
  return (((value + increment) * multiplier) % modulus);
}

/**
 * Resetea la semilla del generador aleatorio.
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
export function reset(newSeed) {
  return seed = newSeed;
}

/**
 * Retorna un valor aleatorio comprendido entre 0 y 1
 *
 * @return {Number}
 */
export function unit() {
  seed = lcg(seed, INCREMENT, MULTIPLIER, MODULUS);
  return seed / MODULUS;
}

/**
 * Retorna un número pseudo-aleatorio comprendido -1.0 y 1.0.
 *
 * @return {Number}
 */
export function normal() {
  return between(-1.0, 1.0);
}

/**
 * Retorna un pseudo-aleatorio comprendido min y max.
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
export function between(min, max) {
  return (unit() * (max - min)) + min;
}

/**
 * Retorna un pseudo-aleatorio int between min y max.
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
export function int(min, max) {
  return Math.round(between(min, max));
}

export default {
  reset,
  unit,
  normal,
  between,
  int
}
