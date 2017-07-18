/* eslint-disable no-unused-vars */
/**
 * This class describes the interface of an storage class
 *
 */
export class AbstractStorage {

  /**
   * @param {string} name The storage name
   * @constructor
   */
  constructor(name) {
    this.name = name ? `${name}-` : '';
  }

  /**
   * @param {string} key Storage key name
   * @param {*} value Value to store
   * @returns {void}
   */
  set(key, value) {
    throw new Error(`'${this.constructor.name}' must implement function 'set'`);
  }

  /**
   * @param {string} key Storage key name
   * @returns {*}
   */
  get(key) {
    throw new Error(`'${this.constructor.name}' must implement function 'get'`);
  }

  /**
   * @param {string} key Storage key name
   * @returns {void}
   */
  remove(key) {
    throw new Error(`'${this.constructor.name}' must implement function 'remove'`);
  }
}
