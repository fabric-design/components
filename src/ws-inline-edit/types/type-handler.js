import {NumberStrategy} from './number-strategy';
import {DateStrategy} from './date-strategy';
import {PriceStrategy} from './price-strategy';
import {TextStrategy} from './text-strategy';

/**
 * Handler of strategies to manage inline edit types
 */
export class TypeHandler {

  static TYPES = {
    text: TextStrategy,
    number: NumberStrategy,
    price: PriceStrategy,
    date: DateStrategy
  };

  /**
   * Get the type strategy for the given type
   * @param {string} type Inline edit type
   * @param {Object} options Type options
   * @returns {void}
   */
  static getStrategy(type, options) {
    if (!this.TYPES[type]) {
      throw new Error(`Unknown type: ${type}`);
    }
    return new this.TYPES[type](options);
  }
}
