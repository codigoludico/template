/* global Float32Array */
import {PRESSED,RELEASED} from "./constants";

/** Contiene las teclas que están presionadas como valores decimales (float 32) */
const keys = new Float32Array(256);

/** Contiene el elemento del DOM encargado de escuchar los eventos del teclado. */
let target;

/**
 * Lanza una excepción si el valor de la tecla
 * es menor que 0 o mayor que el número de teclas
 * de `keys`.
 *
 * @param {number} key
 */
function throwOnInvalidRange(key) {
  if (key < 0 || key >= keys.length) {
    throw new RangeError(`Tecla ${key} no válida`);
  }
}

/**
 * Listener usado a la hora de gestionar la presión de las teclas.
 *
 * @internal
 * @param {KeyboardEvent} e
 */
function handler(e) {
  keys[e.keyCode] = (e.type === "keydown" ? PRESSED : RELEASED);
}

/**
 * Devuelve si la tecla no está presionada.
 *
 * @param {number} key - Identificador numérico de la tecla.
 * @return {boolean} - Devuelve `true` si la tecla no ha sido presionada.
 */
export function isReleased(key) {
  throwOnInvalidRange(key);
  return keys[key] === RELEASED;
}

/**
 * Devuelve si la tecla está presionada.
 *
 * @param {number} key - Identificador numérico de la tecla.
 * @return {boolean} - Devuelve `true` si la tecla está presionada.
 */
export function isPressed(key) {
  throwOnInvalidRange(key);
  return keys[key] === PRESSED;
}

/**
 * Devuelve el estado de la tecla.
 *
 * @param {number} key - Identificador numérico de la tecla.
 * @return {boolean} - Devuelve el estado de la tecla, 1.0 si está presionada o 0.0 si no lo está.
 */
export function stateOf(key) {
  throwOnInvalidRange(key);
  return keys[key];
}

/**
 * Simula que una tecla está presionada.
 *
 * @param {number} key - Identificador numérico de la tecla.
 */
export function press(key) {
  throwOnInvalidRange(key);
  keys[key] = PRESSED;
}

/**
 * Simula que una tecla no está presionada.
 *
 * @param {number} key - Identificador numérico de la tecla.
 */
export function release(key) {
  throwOnInvalidRange(key);
  keys[key] = RELEASED;
}

/**
 * Comienza a escuchar el teclado en el objeto indicado.
 *
 * @param {Element} element - Elemento del DOM que escuchará los eventos.
 */
export function start(element = window) {
  if (!target) {
    target = element;
    target.addEventListener("keyup", handler);
    target.addEventListener("keydown", handler);
  } else {
    throw new Error("El teclado ya se inicializó usando:", target);
  }
}

/**
 * Detiene la escucha de eventos del teclado.
 */
export function stop() {
  if (target) {
    target.removeEventListener("keyup", handler);
    target.removeEventListener("keydown", handler);
    target = null;
  } else {
    throw new Error("El teclado no se inicializó");
  }
}

export default {
  start,
  stop,
  stateOf,
  press,
  release,
  isPressed,
  isReleased
};
