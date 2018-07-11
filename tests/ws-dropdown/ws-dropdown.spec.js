/* eslint-disable */
import {React} from 'imports';
import {TestComponent} from '../test-component';
import {WSDropdown} from '../../src/ws-dropdown/ws-dropdown';

describe('A WSDropdown', () => {

  it('toggles dropdown when clicking the trigger', () => {
    const dd = new TestComponent(<WSDropdown type="select"/>);
    spyOn(dd.component.overlay, 'open').and.callThrough();
    spyOn(dd.component.overlay, 'close').and.callThrough();
    spyOn(dd.component.overlay, 'toggle').and.callThrough();

    // Open
    dd.component.onTriggerClick(new Event('click'));
    expect(dd.component.overlay.toggle).toHaveBeenCalledTimes(1);
    expect(dd.component.overlay.open).toHaveBeenCalledTimes(1);
    // Close
    dd.component.onTriggerClick(new Event('click'));
    expect(dd.component.overlay.toggle).toHaveBeenCalledTimes(2);
    expect(dd.component.overlay.close).toHaveBeenCalledTimes(1);
    // Open
    dd.component.onTriggerClick(new Event('click'));
    expect(dd.component.overlay.toggle).toHaveBeenCalledTimes(3);
    expect(dd.component.overlay.open).toHaveBeenCalledTimes(2);
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
