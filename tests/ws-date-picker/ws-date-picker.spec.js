/* eslint-disable */
import {React} from 'imports';
import {TestComponent} from '../test-component';
import {WSDatePicker} from '../../src/ws-date-picker/ws-date-picker';

describe('A WSDatePicker', () => {

  it('closes the open pickers when next is opened', () => {
    const dp1 = new TestComponent(<WSDatePicker/>);
    const dp2 = new TestComponent(<WSDatePicker/>);

    expect(dp1.component.flatpickr.isOpen).toBeFalsy();
    expect(dp2.component.flatpickr.isOpen).toBeFalsy();

    dp1.container.querySelector('input').dispatchEvent(new MouseEvent('click', {bubbles: true}));
    dp1.container.querySelector('input').dispatchEvent(new FocusEvent('focus'));

    expect(dp1.component.flatpickr.isOpen).toBeTruthy();
    expect(dp2.component.flatpickr.isOpen).toBeFalsy();

    dp2.container.querySelector('input').dispatchEvent(new MouseEvent('click', {bubbles: true}));
    dp2.container.querySelector('input').dispatchEvent(new FocusEvent('focus'));

    expect(dp1.component.flatpickr.isOpen).toBeFalsy();
    expect(dp2.component.flatpickr.isOpen).toBeTruthy();
  });
});
