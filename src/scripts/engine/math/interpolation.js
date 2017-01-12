/**
 * Interpolación lineal
 *
 * @param {number} progress - Progreso de (0.0 a 1.0)
 * @param {number} a - Inicio
 * @param {number} b - Final
 * @return {number}
 */
export function linear(p,a,b) {
  return (p * (b - a)) + a;
}

/**
 * Interpolación cuadrática
 *
 * @param {number} progress - Progreso de (0.0 a 1.0)
 * @param {number} a - Inicio
 * @param {number} b - Punto de control
 * @param {number} c - Final
 * @return {number}
 */
export function quadratic(p,a,b,c) {
  const d = linear(p,a,b);
  const e = linear(p,b,c);
  return linear(p,d,e);
}

/**
 * Interpolación cúbica
 *
 * @param {number} progress - Progreso de (0.0 a 1.0)
 * @param {number} a - Inicio
 * @param {number} b - Punto de control a
 * @param {number} c - Punto de control b
 * @param {number} d - Final
 * @return {number}
 */
export function cubic(p,a,b,c,d) {
  const e = linear(p,a,b);
  const f = linear(p,b,c);
  const g = linear(p,c,d);
  return quadratic(p,e,f,g);
}

export default {
  linear,
  quadratic,
  cubic
}
