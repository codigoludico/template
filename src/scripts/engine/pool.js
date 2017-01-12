/**
 * Éste módulo contiene funciones útiles para trabajar con pools de objetos
 *
 * @module engine/pool
 */

/* global Map */

/**
 * Objeto del pool
 */
class PoolObject {
  /**
   * @constructor
   * @param {Object} El objeto que deseamos contener en el Pool
   */
  constructor(object) {
    this.object = object;
    this.isEnabled = false;
  }

  /**
   * Activa este objeto dentro del Pool
   *
   * @return {Object}
   */
  enable() {
    this.isEnabled = true;
    return this.object;
  }

  /**
   * Desactiva el objeto dentro del Pool
   *
   * @return {Object}
   */
  disable() {
    this.isEnabled = false;
    return this.object;
  }
}

/**
 * Crea un Pool a partir de los parámetros indicados.
 *
 * @param {number} count - Número de objetos iniciales del pool
 * @param {Function} factory - Función encargada de crear los objetos
 * @param {...*} args - Argumentos para la función factory
 * @return {Object} - Retorna un nuevo Pool
 */
export function create(count, factory, ...args) {

  let length = 0;
  let index = 0;

  const list = [];
  const indices = new Map();

  for (index = 0; index < count; index++) {
    const newObject = factory(...args);
    indices.set(newObject, index);
    list.push(new PoolObject(newObject));
  }

  return {
    get length() {
      return length;
    },
    create() {
      const startIndex = index;
      do {
        index = (index + 1) % list.length;
        const poolObject = list[index];
        if (!poolObject.isEnabled) {
          // Aumentamos la longitud del pool.
          length++;
          return poolObject.enable();
        }
      } while(index !== startIndex);
      return null;
    },
    destroy(object) {
      const index = indices.get(object);
      if (index !== undefined) {
        const poolObject = list[index];
        // Reducimos la longitud del pool.
        length--;
        return poolObject.disable();
      }
      throw new Error("El objeto no existe en el ObjectPool");
    }
  };
}

export default {
  create
}
