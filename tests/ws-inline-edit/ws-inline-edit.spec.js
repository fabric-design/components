/* eslint-disable */
import {React} from 'imports';
import {TestComponent} from '../test-component';
import {WSInlineEdit} from '../../src/ws-inline-edit/ws-inline-edit';
import {TextStrategy} from '../../src/ws-inline-edit/types/text-strategy';
import {NumberStrategy} from '../../src/ws-inline-edit/types/number-strategy';
import {PriceStrategy} from '../../src/ws-inline-edit/types/price-strategy';

describe('A WSInlineEdit', () => {

  it('propagates changes via onChange property', () => {
    const onChange = jasmine.createSpy('onChange()');
    const inlineEdit = new TestComponent(<WSInlineEdit value="test" onChange={onChange}/>);
    const input = inlineEdit.container.querySelector('input');
    input.value = 'new val';

    expect(onChange).not.toHaveBeenCalled();
    input.dispatchEvent(new Event('change'));
    expect(onChange).toHaveBeenCalled();
  });

  it('propagates changes via change event', () => {
    const onChange = jasmine.createSpy('onChange()');
    const inlineEdit = new TestComponent(<WSInlineEdit value="test" onChange={onChange}/>);
    const input = inlineEdit.container.querySelector('input');
    input.value = 'new val';

    inlineEdit.container.addEventListener('change', onChange);

    expect(onChange).not.toHaveBeenCalled();
    input.dispatchEvent(new Event('change'));
    expect(onChange).toHaveBeenCalled();
  });

  it('doesn\'t propagate change if value didn\'t changed', () => {
    const onChange = jasmine.createSpy('onChange()');
    const inlineEdit = new TestComponent(<WSInlineEdit value="test" onChange={onChange}/>);
    const input = inlineEdit.container.querySelector('input');
    input.value = 'test';

    expect(onChange).not.toHaveBeenCalled();
    input.dispatchEvent(new Event('change'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('submits on Enter key', () => {
    const inlineEdit = new TestComponent(<WSInlineEdit/>);
    spyOn(inlineEdit.component, 'submit');

    const input = inlineEdit.container.querySelector('input');
    input.value = 'new val';

    expect(inlineEdit.component.submit).not.toHaveBeenCalled();
    input.dispatchEvent(new KeyboardEvent('keyup', {key: 'Enter'}));
    expect(inlineEdit.component.submit).toHaveBeenCalled();
  });

  it('submits on change', () => {
    const inlineEdit = new TestComponent(<WSInlineEdit/>);
    spyOn(inlineEdit.component, 'submit');

    const input = inlineEdit.container.querySelector('input');
    input.value = 'new val';

    expect(inlineEdit.component.submit).not.toHaveBeenCalled();
    input.dispatchEvent(new Event('change'));
    expect(inlineEdit.component.submit).toHaveBeenCalled();
  });

  it('aborts on Escape key', () => {
    const inlineEdit = new TestComponent(<WSInlineEdit/>);
    spyOn(inlineEdit.component, 'abort');

    const input = inlineEdit.container.querySelector('input');
    input.value = 'new val';

    expect(inlineEdit.component.abort).not.toHaveBeenCalled();
    input.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
    expect(inlineEdit.component.abort).toHaveBeenCalled();
  });

  describe('validates the input', () => {

    it('on submission', () => {
      const inlineEdit = new TestComponent(<WSInlineEdit type="text"/>);
      spyOn(inlineEdit.component.type, 'validate');

      expect(inlineEdit.component.type.validate).not.toHaveBeenCalled();
      inlineEdit.component.submit('new value');
      expect(inlineEdit.component.type.validate).toHaveBeenCalled();
    });

    it('by type text', () => {
      const inlineEdit = new TestComponent(<WSInlineEdit type="text"/>);
      expect(inlineEdit.component.type instanceof TextStrategy).toBeTruthy();
    });

    it('by type number', () => {
      const inlineEdit = new TestComponent(<WSInlineEdit type="number"/>);
      expect(inlineEdit.component.type instanceof NumberStrategy).toBeTruthy();
    });

    it('by type price', () => {
      const inlineEdit = new TestComponent(<WSInlineEdit type="price"/>);
      expect(inlineEdit.component.type instanceof PriceStrategy).toBeTruthy();
    });
  });

  describe('converts the value', () => {
    it('on submission', () => {
      const inlineEdit = new TestComponent(<WSInlineEdit type="text"/>);
      spyOn(inlineEdit.component.type, 'convert');

      expect(inlineEdit.component.type.convert).not.toHaveBeenCalled();
      inlineEdit.component.submit('new value');
      expect(inlineEdit.component.type.convert).toHaveBeenCalled();
    });
  });
});
