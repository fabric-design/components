import {AbstractStorage} from './abstract-storage';

const EXTRACT_TOP_LEVEL_DOMAIN = /.*?([a-zA-Z0-9-]{3,}\.[a-zA-Z0-9]{2,})$/;

/**
 * This class implements a key value storage based on top level domain cookies
 */
export class CookieStorage extends AbstractStorage {
  /**
   * Set value for specific key in cookies
   * @param {string} key Storage key name
   * @param {*} value Value to store
   * @returns {void}
   */
  set(key, value) {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    this.createCookie(key, value, expires);
  }

  /**
   * Get value from cookies by it's storage key
   * @param {string} key Storage key name
   * @returns {*}
   */
  get(key) {
    const regex = new RegExp(`${this.name}${key}=(.*?)(;|$)`);
    const match = document.cookie.match(regex);

    if (match) {
      try {
        return JSON.parse(decodeURIComponent(match[1]));
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
    const expires = new Date();
    expires.setDate(expires.getDate() - 1);
    this.createCookie(key, null, expires);
  }

  /**
   * Creates a cookie for the current top level domain
   * @param {string} key Cookie name without storage name
   * @param {*} value Cookie value (not serialized)
   * @param {Date} expires Cookie expiration date
   * @returns {void}
   */
  createCookie(key, value, expires) {
    const encodedValue = encodeURIComponent(JSON.stringify(value));
    const domain = window.location.hostname.replace(EXTRACT_TOP_LEVEL_DOMAIN, '$1');
    // Create cookie which is one day valid for the top level domain scope
    document.cookie = `${this.name}${key}=${encodedValue};expires=${expires};domain=${domain}`;
  }
}
