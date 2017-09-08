/* eslint-disable */
import {React} from 'imports';
import {TestComponent} from '../test-component';
import {WSDropdown} from '../../src/ws-dropdown/ws-dropdown';

describe('A WSDropdown', () => {

  it('tracks clicks outside of dropdown', () => {
    const dd = new TestComponent(<WSDropdown type="select"/>);
    spyOn(dd.component, 'close');

    expect(dd.component.close).not.toHaveBeenCalled();

    dd.component.onDocumentClick({target: dd.component.trigger});
    expect(dd.component.close).not.toHaveBeenCalled();

    dd.component.onDocumentClick({target: document.body});
    expect(dd.component.close).toHaveBeenCalled();
  });

  it('toggles dropdown when clicking the trigger', () => {
    const dd = new TestComponent(<WSDropdown type="select"/>);
    spyOn(dd.component, 'open').and.callThrough();
    spyOn(dd.component, 'close').and.callThrough();

    // Open
    dd.component.onTriggerClick(new Event('click'));
    expect(dd.component.open).toHaveBeenCalledTimes(1);
    // Close
    dd.component.onTriggerClick(new Event('click'));
    expect(dd.component.open).toHaveBeenCalledTimes(1);
    expect(dd.component.close).toHaveBeenCalledTimes(1);
    // Open
    dd.component.onTriggerClick(new Event('click'));
    expect(dd.component.open).toHaveBeenCalledTimes(2);
  });

  it('closes dropdown on escape key', () => {
    const dd = new WSDropdown({type: 'button'});
    spyOn(dd, 'close');

    dd.onGlobalKeyDown({key: 'ArrowUp'});
    expect(dd.close).not.toHaveBeenCalled();
    dd.onGlobalKeyDown({key: 'Escape'});
    expect(dd.close).toHaveBeenCalled();
  });

  it('gets text from value for selects', () => {
    const dd = new WSDropdown({type: 'select'});
    expect(dd.getTextFromValue('test')).toEqual('test');
    expect(dd.getTextFromValue(['test', 'asd'])).toEqual('test, asd');
    expect(dd.getTextFromValue({label: 'test'})).toEqual('test');
    expect(dd.getTextFromValue([{label: 'test'}, {label: 'asd'}])).toEqual('test, asd');
  });

  it('creates states', () => {
    const dd = new WSDropdown({items: ['test', 'asd', 'qwerty'], value: 'asd', text: 'new text'});
    expect(dd.state.items[0].selected).toBeFalsy();
    expect(dd.state.items[0].stored).toBeFalsy();
    expect(dd.state.items[1].selected).toBeTruthy();
    expect(dd.state.items[1].stored).toBeTruthy();
    expect(dd.state.items[2].selected).toBeFalsy();
    expect(dd.state.items[2].stored).toBeFalsy();
    expect(dd.state.text).toEqual('new text');
  });
});
