import {AbstractStorage} from './abstract-storage';

/**
 * This class implements a key value storage based on top level domain cookies
 */
export class LocalStorage extends AbstractStorage {
  /**
   * Set value for specific key in localStorage
   * @param {string} key Storage key name
   * @param {*} value Value to store
   * @returns {void}
   */
  set(key, value) {
    const encodedValue = encodeURIComponent(JSON.stringify(value));
    window.localStorage.setItem(`${this.name}${key}`, encodedValue);
  }

  /**
   * Get value from localStorage by it's storage key
   * @param {string} key Storage key name
   * @returns {*}
   */
  get(key) {
    const encodedValue = window.localStorage.getItem(`${this.name}${key}`);

    if (encodedValue) {
      try {
        return JSON.parse(decodeURIComponent(encodedValue));
      } catch (e) {
        /* eslint-disable no-console */
        console.warn(`Could not deserialize ${key}`);
      }
    }
    return undefined;
  }

  /**
   * Removes a stored value by its storage key
   * @param {string} key Storage key name
   * @returns {void}
   */
  remove(key) {
    window.localStorage.removeItem(`${this.name}${key}`);
  }
}
