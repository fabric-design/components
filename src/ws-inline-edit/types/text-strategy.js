import {AbstractTypeStrategy} from './abstract-type-strategy';

/**
 * Strategy to handle text type of inline edit
 */
export class TextStrategy extends AbstractTypeStrategy {

  /**
   * Validates the input value
   * @param {*} value Value to validate
   * @returns {boolean}
   */
  validate(value) { // eslint-disable-line no-unused-vars
    return true;
  }

  /**
   * Converts the input value into a usable value
   * @param {*} value Value to convert
   * @returns {*}
   */
  convert(value) {
    return value;
  }
}
