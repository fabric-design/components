/* eslint-disable */
import {React} from 'imports';
import {TestComponent} from '../../test-component';
import {NumberStrategy} from '../../../src/ws-inline-edit/types/number-strategy';


describe('A WSInlineEdit.NumberStrategy', () => {

  function validate(type, text, shouldBe) {
    expect(type.validate(text) === shouldBe).toBeTruthy(`${text} should be ${shouldBe}`);
  }

  function convert(type, text, shouldBe) {
    const converted = type.convert(text);
    expect(converted === shouldBe).toBeTruthy(`${text} should be ${shouldBe} but was ${converted}`);
  }

  describe('validates', () => {
    it('german and english numbers', () => {
      const type = new NumberStrategy({});

      validate(type, '123456789', true);
      validate(type, '123.456.789', true);
      validate(type, '123.456,789', true);
      validate(type, '123456.789', true);
      validate(type, '123456,789', true);
      validate(type, '123,456789', true);
      validate(type, '123,456,789', true);
      validate(type, '123,456.789', true);
      validate(type, '123.456789', true);
      validate(type, '12,3456.789', false);
      validate(type, '12.3456,789', false);
      validate(type, '123,4567.89', false);
      validate(type, '123.4567,89', false);
    });

    it('german only', () => {
      const type = new NumberStrategy({locale: 'de'});

      validate(type, '123456789', true);
      validate(type, '123.456.789', true);
      validate(type, '123.456,789', true);
      validate(type, '123456.789', true);
      validate(type, '123456,789', true);
      validate(type, '123,456789', true);
      validate(type, '123,456,789', false);
      validate(type, '123,456.789', false);
      validate(type, '123.456789', false);
      validate(type, '12,3456.789', false);
      validate(type, '12.3456,789', false);
      validate(type, '123,4567.89', false);
      validate(type, '123.4567,89', false);
    });

    it('english only', () => {
      const type = new NumberStrategy({locale: 'en'});

      validate(type, '123456789', true);
      validate(type, '123.456.789', false);
      validate(type, '123.456,789', false);
      validate(type, '123456.789', true);
      validate(type, '123456,789', true);
      validate(type, '123,456789', false);
      validate(type, '123,456,789', true);
      validate(type, '123,456.789', true);
      validate(type, '123.456789', true);
      validate(type, '12,3456.789', false);
      validate(type, '12.3456,789', false);
      validate(type, '123,4567.89', false);
      validate(type, '123.4567,89', false);
    });
  });

  describe('converts', () => {
    it('by default english numbers', () => {
      const type = new NumberStrategy({});

      convert(type, '123456789', 123456789);
      convert(type, '123.456.789', 123456789);
      convert(type, '123.456,789', 123456.789);
      convert(type, '123456.789', 123456.789);
      convert(type, '123456,789', 123456789);
      convert(type, '123,456789', 123.456789);
      convert(type, '123,456,789', 123456789);
      convert(type, '123,456.789', 123456.789);
      convert(type, '123.456789', 123.456789);
    });

    it('german only', () => {
      const type = new NumberStrategy({locale: 'de'});

      convert(type, '123456789', 123456789);
      convert(type, '123.456.789', 123456789);
      convert(type, '123.456,789', 123456.789);
      convert(type, '123456.789', 123456789);
      convert(type, '123456,789', 123456.789);
      convert(type, '123,456789', 123.456789);
      convert(type, '123.456789', 123.456789);
    });

    it('english only', () => {
      const type = new NumberStrategy({locale: 'en'});

      convert(type, '123456789', 123456789);
      convert(type, '123456.789', 123456.789);
      convert(type, '123456,789', 123456789);
      convert(type, '123,456,789', 123456789);
      convert(type, '123,456.789', 123456.789);
      convert(type, '123.456789', 123.456789);
    });
  });
});
