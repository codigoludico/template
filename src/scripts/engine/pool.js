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
   *
   */
  constructor(object) {
    this.object = object;
    this.isEnabled = false;
  }

  enable() {
    this.isEnabled = true;
    return this.object;
  }

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
        return poolObject.disable();
      }
      throw new Error("El objeto no existe en el ObjectPool");
    }
  };
}
