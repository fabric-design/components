/* eslint-disable */
import {React} from 'imports';
import {PriceStrategy} from '../../../src/ws-inline-edit/types/price-strategy';


describe('A WSInlineEdit.PriceStrategy', () => {

  function validate(type, text, shouldBe) {
    expect(type.validate(text) === shouldBe).toBeTruthy(`${text} should be ${shouldBe}`);
  }

  function convert(type, text, shouldBe) {
    const converted = type.convert(text);
    expect(converted === shouldBe).toBeTruthy(`${text} should be ${shouldBe} but was ${converted}`);
  }

  describe('validates', () => {
    it('german and english prices', () => {
      const type = new PriceStrategy({});

      validate(type, '123.45', true);
      validate(type, '123,45', true);
      validate(type, '123.456,78', true);
      validate(type, '12,345.67', true);
      validate(type, '123456789', true);
      validate(type, '123,456', true);
      validate(type, '123.456', true);
      validate(type, '12345.6', true);
      validate(type, '12345,6', true);
    });

    it('german only', () => {
      const type = new PriceStrategy({locale: 'de'});

      validate(type, '123.45', false);
      validate(type, '123,45', true);
      validate(type, '123.456,78', true);
      validate(type, '12,345.67', false);
      validate(type, '123456789', true);
      validate(type, '123,456', false);
      validate(type, '123.456', true);
      validate(type, '12345.6', false);
      validate(type, '12345,6', false);
    });

    it('english only', () => {
      const type = new PriceStrategy({locale: 'en'});

      validate(type, '123.45', true);
      validate(type, '123,45', false);
      validate(type, '123.456,78', false);
      validate(type, '12,345.67', true);
      validate(type, '123456789', true);
      validate(type, '123,456', true);
      validate(type, '123.456', false);
      validate(type, '12345.6', false);
      validate(type, '12345,6', false);
    });
  });

  describe('converts', () => {
    it('by default english numbers', () => {
      const type = new PriceStrategy({});

      convert(type, '123.45', 123.45);
      convert(type, '12,345.67', 12345.67);
      convert(type, '123456789', 123456789);
    });

    it('german only', () => {
      const type = new PriceStrategy({locale: 'de'});

      convert(type, '123,45', 123.45);
      convert(type, '123.456,78', 123456.78);
      convert(type, '123456789', 123456789);
    });

    it('english only', () => {
      const type = new PriceStrategy({locale: 'en'});

      convert(type, '123.45', 123.45);
      convert(type, '12,345.67', 12345.67);
      convert(type, '123456789', 123456789);
    });
  });
});
