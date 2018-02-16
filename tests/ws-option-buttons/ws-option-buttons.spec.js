/* eslint-disable */
import {React} from 'imports';
import {TestComponent} from '../test-component';
import {WSOptionButtons} from '../../src/ws-option-buttons/ws-option-buttons';

describe('A WSOptionButtons', () => {
  const items = ['HW17', 'FS18', {value: 'test', label: 'TEST'}, 'FS16'];

  it('enriches items and renders properly', () => {
    const btns = new TestComponent(<WSOptionButtons items={items}/>);
    const expectedLabels = items.map(item => typeof item === 'string' ? item : item.label || item.value);
    const anchors = Array.from(btns.container.querySelectorAll('.option-button a'));
    const actualLabels = anchors.map(anchor => anchor.innerText.trim());

    expect(actualLabels).toEqual(expectedLabels);
  });

  it('populates correct value', () => {
    const onChange = jasmine.createSpy('onChange()');
    const eventHandler = jasmine.createSpy('eventHandler()');
    const btns = new TestComponent(<WSOptionButtons items={items} onChange={onChange}/>);
    btns.container.addEventListener('change', eventHandler);
    btns.container.querySelector('.option-button:nth-child(2) a').dispatchEvent(new MouseEvent('click'));

    expect(onChange).toHaveBeenCalledWith([items[1]]);
    expect(eventHandler).toHaveBeenCalledWith(new CustomEvent({}));
  });

  it('limit\'s selectable elements', () => {
    const btns = new TestComponent(<WSOptionButtons items={items} />);
    expect(btns.container.querySelectorAll('.option-button:not(.is-hidden)').length).toBe(3);
    expect(btns.container.querySelectorAll('.option-button.is-hidden').length).toBe(1);
    expect(btns.container.querySelector('.show-more')).toBeTruthy();
    const btns2 = new TestComponent(<WSOptionButtons items={items} initialVisible={4} />);
    expect(btns2.container.querySelectorAll('.option-button:not(.is-hidden)').length).toBe(4);
    expect(btns2.container.querySelectorAll('.option-button.is-hidden').length).toBe(0);
    expect(btns2.container.querySelector('.show-more')).toBeFalsy();
    const btns3 = new TestComponent(<WSOptionButtons items={items} initialVisible={1} />);
    expect(btns3.container.querySelectorAll('.option-button:not(.is-hidden)').length).toBe(1);
    expect(btns3.container.querySelectorAll('.option-button.is-hidden').length).toBe(3);
    expect(btns3.container.querySelector('.show-more')).toBeTruthy();
  });
});
