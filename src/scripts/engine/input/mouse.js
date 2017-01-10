/**
 * Este módulo contiene los métodos necesarios para trabajar con el ratón
 * exponiendo una serie de funciones útiles para comenzar la escucha de eventos,
 * detenerla y obtener el estado actual de los botones del ratón y su posición.
 *
 * @module engine/input/mouse
 */

/* global Float32Array */
import vec2 from "engine/math/vec2";
import {PRESSED,RELEASED} from "./constants";

/** Contiene las teclas que están presionadas como valores decimales (float 32) */
const buttons = new Float32Array(3);

/** Contiene las coordenadas del ratón */
const coords = {
  target: vec2.create(),
  client: vec2.create(),
  start: vec2.create(),
  end: vec2.create(),
  previous: vec2.create(),
  current: vec2.create(),
  relative: vec2.create(),
  absolute: vec2.create()
};

/** Posición inicial del ratón (una vez que presionas un botón del ratón) */
export const startPosition = vec2.proxify(coords.start);

/** Posición final del ratón (una vez que presionas un botón del ratón) */
export const endPosition = vec2.proxify(coords.end);

/** Posición actual del ratón (una vez que presionas un botón del ratón) */
export const currentPosition = vec2.proxify(coords.current);

/** Posición anterior del ratón (una vez que presionas un botón del ratón) */
export const previousPosition = vec2.proxify(coords.previous);

/** Movimiento relativo del ratón */
export const relativeMovement = vec2.proxify(coords.relative);

/** Movimiento absoluto del ratón (desde que presionas cualquier botón del ratón) */
export const absoluteMovement = vec2.proxify(coords.absolute);

/** Contiene el elemento del DOM encargado de escuchar los eventos del teclado. */
let target;

/** Guarda si el ratón está fuera del target o no. */
let isOut = false;

/**
 * Listener usado a la hora de gestionar la presión de los botones y el
 * movimiento del ratón.
 *
 * @internal
 * @param {MouseEvent} e
 */
function handler(e) {
  vec2.set(coords.client, e.clientX - vec2.x(coords.target), e.clientY - vec2.y(coords.target));
  switch(e.type) {
    case "mousedown":
    case "mouseup":
      buttons[e.button] = (e.type === "mousedown" ? PRESSED : RELEASED);
      if (e.type === "mousedown") {
        vec2.copy(coords.start, coords.client);
        vec2.copy(coords.end, coords.start);
        vec2.copy(coords.previous, coords.start);
        vec2.copy(coords.current, coords.start);
        vec2.empty(coords.absolute);
      } else {
        vec2.copy(coords.end, coords.client);
        vec2.copy(coords.current, coords.end);
        vec2.subv(coords.absolute, coords.end, coords.start);
      }
      break;

    case "mousemove":
      vec2.copy(coords.previous, coords.current);
      vec2.copy(coords.current, coords.client);
      vec2.subv(coords.relative, coords.current, coords.previous);
      break;

    case "mouseenter":
      isOut = false;
      break;

    case "mouseleave":
      isOut = true;
      break;
  }
}

/**
* Lanza una excepción si el valor del botón es menor que 0
* o mayor que el número de botones de `buttons`.
*
* @param {number} button
*/
function throwOnInvalidRange(button) {
  if (button < 0 || button >= buttons.length) {
    throw new RangeError(`Botón ${button} no válido`);
  }
}

/**
 * Devuelve si alguna tecla está presionada (cualquiera)
 *
 * @return {boolean}
 */
export function isAnyPressed() {
  for (let index = 0; index < buttons.length; index++) {
    const current = buttons[index];
    if (current !== RELEASED) {
      return true;
    }
  }
  return false;
}

/**
 * Devuelve si el botón no está presionada.
 *
 * @param {number} button - Identificador numérico de el botón.
 * @return {boolean} - Devuelve `true` si el botón no ha sido presionada.
 */
export function isReleased(button) {
  throwOnInvalidRange(button);
  return buttons[button] === RELEASED;
}

/**
 * Devuelve si el botón está presionada.
 *
 * @param {number} button - Identificador numérico de el botón.
 * @return {boolean} - Devuelve `true` si el botón está presionada.
 */
export function isPressed(button) {
  throwOnInvalidRange(button);
  return buttons[button] === PRESSED;
}

/**
 * Devuelve el estado de el botón.
 *
 * @param {number} button - Identificador numérico de el botón.
 * @return {boolean} - Devuelve el estado de el botón, 1.0 si está presionada o 0.0 si no lo está.
 */
export function stateOf(button) {
  throwOnInvalidRange(button);
  return buttons[button];
}

/**
 * Simula que una tecla está presionada.
 *
 * @param {number} button - Identificador numérico de el botón.
 */
export function press(button) {
  throwOnInvalidRange(button);
  buttons[button] = PRESSED;
}

/**
 * Simula que una tecla no está presionada.
 *
 * @param {number} button - Identificador numérico de el botón.
 */
export function release(button) {
  throwOnInvalidRange(button);
  buttons[button] = RELEASED;
}

/**
 * Comienza a escuchar el teclado en el objeto indicado.
 *
 * @param {Element} element - Elemento del DOM que escuchará los eventos.
 */
export function start(element = window) {
  if (!target) {
    target = element;
    if ("getBoundingClientRect" in target) {
      const {left,top} = target.getBoundingClientRect();
      vec2.set(coords.target,left,top);
    } else {
      vec2.empty(coords.target);
    }
    target.addEventListener("mouseup", handler);
    target.addEventListener("mousedown", handler);
    target.addEventListener("mousemove", handler);
    target.addEventListener("mouseenter", handler);
    target.addEventListener("mouseleave", handler);
  } else {
    throw new Error("El teclado ya se inicializó usando:", target);
  }
}

/**
 * Detiene la escucha de eventos del teclado.
 */
export function stop() {
  if (target) {
    target.removeEventListener("mouseup", handler);
    target.removeEventListener("mousedown", handler);
    target.removeEventListener("mousemove", handler);
    target.removeEventListener("mouseenter", handler);
    target.removeEventListener("mouseleave", handler);
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
  isReleased,
  startPosition,
  endPosition,
  currentPosition,
  previousPosition,
  relativeMovement,
  absoluteMovement
}
