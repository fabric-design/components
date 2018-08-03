/**
 * Abstract strategy class to handle different types of inline edit
 */
export class AbstractTypeStrategy {

  /**
   * Receive type specific options
   * @param {Object} options Options for this strategy
   */
  constructor(options) {
    this.options = options;
  }

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
