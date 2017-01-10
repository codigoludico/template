/**
 * Éste módulo contiene funciones útiles para trabajar con gamepads.
 *
 * @module engine/input/gamepad
 */

/** Listado de gamepads */
let gamepads;

/**
 * Este manejador se encarga de escuchar cuándo se añadió un gamepad
 * al navegador.
 *
 * @param {GamepadEvent} e
 */
function handler(e) {
  if (e.type === "gamepadconnected") {

  } else {

  }
}

/**
 * Actualiza la lista de gamepads.
 */
export function update() {
  gamepads = navigator.getGamepads();
}

/**
 * Comienza a escuchar los eventos para gamepads conectados, etc.
 */
export function start() {
  window.addEventListener("gamepadconnected", handler);
  window.addEventListener("gamepaddisconnected", handler);
}

/**
 * Detiene la escucha de eventos para gamepads.
 */
export function stop() {
  window.removeEventListener("gamepadconnected", handler);
  window.removeEventListener("gamepaddisconnected", handler);
}

export default {
  update,
  start,
  stop
}
