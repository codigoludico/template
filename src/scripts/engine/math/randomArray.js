/**
 * Éste módulo contiene funciones útiles para trabajar con arrays de forma
 * aleatoria.
 *
 * @module engine/math/randomArray
 */

import random from "./random";

/**
 * Retorna un índice aleatorio
 *
 * @param {Array} array
 * @return {Number}
 */
export function index(array) {
  if (array.length - 1 < 0) {
    return -1;
  }
  return random.int(0, array.length - 1);
}

/**
 * Shuffles an array.
 *
 * @param {Array} out
 * @param {Array} array
 * @return {Array}
 */
export function shuffle(out, array) {
  let index = array.length;
  while (index > 0) {
    index--;
    let randomIndex = random.int(0, index);
    const randomValue = array[randomIndex];
    out[randomIndex] = array[index];
    out[index] = randomValue;
  }
  return out;
}

/**
 * Elimina un valor aleatorio del array y lo retorna.
 *
 * @param {Array} array
 * @return {*}
 */
export function takeOne(array) {
  const randomIndex = index(array);
  if (randomIndex < 0) {
    return null;
  }
  const [removed] = array.splice(randomIndex, 1);
  return removed;
}

/**
 * Elimina múltiples valores aleatorios de un array y los retorna como otro array.
 *
 * @param {Array} out
 * @param {Array} array
 * @param {Number} count
 * @return {Array}
 */
export function take(out, array, count) {
  for (let index = 0; index < count; index++) {
    const value = takeOne(array);
    if (value !== null) {
      out.push(value);
    }
  }
  return out;
}

/**
 * Retorna un valor aleatorio de un array (sin eliminarlo).
 *
 * @param {Array} array
 * @return {*}
 */
export function pickOne(array) {
  const randomIndex = index(array);
  if (randomIndex < 0) {
    return null;
  }
  return array[randomIndex];
}

/**
 * Retorna múltiples valores aleatorios de un array (sin eliminarlos).
 *
 * @param {Array} out
 * @param {Array} array
 * @param {Number} count
 * @return {Array}
 */
export function pick(out, array, count) {
  for (let index = 0; index < count; index++) {
    const value = pickOne(array);
    if (value !== null) {
      out.push(value);
    }
  }
  return out;
}

export default {
  index,
  shuffle,
  takeOne,
  take,
  pickOne,
  pick
}
