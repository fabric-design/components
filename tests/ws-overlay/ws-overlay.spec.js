/* eslint-disable */
import {React} from 'imports';
import {WSOverlay} from '../../src/ws-overlay/ws-overlay';
import {TestComponent} from '../test-component';

describe('A WSOverlay', () => {

  it('tracks clicks outside of overlay', () => {
    const dd = new TestComponent(<WSOverlay type="select"/>);
    spyOn(dd.component, 'close');

    expect(dd.component.close).not.toHaveBeenCalled();

    dd.component.onDocumentClick({target: dd.component.container});
    expect(dd.component.close).not.toHaveBeenCalled();

    dd.component.onDocumentClick({target: document.body});
    expect(dd.component.close).toHaveBeenCalled();
  });

  it('closes overlay on escape key', () => {
    const dd = new WSOverlay({});
    spyOn(dd, 'close');

    dd.onGlobalKeyDown({key: 'ArrowUp'});
    expect(dd.close).not.toHaveBeenCalled();
    dd.onGlobalKeyDown({key: 'Escape'});
    expect(dd.close).toHaveBeenCalled();
  });
});
