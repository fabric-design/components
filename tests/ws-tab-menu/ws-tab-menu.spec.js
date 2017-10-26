/* eslint-disable */
import {React} from 'imports';
import {WSTabMenu} from '../../src/ws-tab-menu/ws-tab-menu';
import {TestComponent} from '../test-component';

function getExpectedBounds(tabItem) {
  return {
    left: tabItem.offsetLeft,
    right: tabItem.parentNode.offsetWidth - tabItem.offsetLeft - tabItem.offsetWidth
  }
}

describe('A WSTabMenu', () => {
  /** @type {Object} */
  let props;
  /** @type {TestComponent} */
  let tabMenu;

  beforeEach(() => {
    props = {
      items: [
        {label: 'Some label 1', value: 'some value 1'},
        {value: 'another value 2'},
        {label: 'Disabled 3', value: 'disabled 3'},
        {label: 'Badge 4', value: 'badge 4', badge: 1}
      ],
      onChange: jasmine.createSpy('onChange()')
    };
    tabMenu = new TestComponent(() => <WSTabMenu items={props.items} value={props.value} onChange={props.onChange}/>);
  });

  afterEach(() => {
    tabMenu.dispose();
  });

  it('renders correctly', () => {
    // Validate all texts are rendered properly
    const texts = Array.from(tabMenu.container.querySelectorAll('.text')).map(node => node.textContent);
    expect(texts).toEqual(props.items.map(item => item.label || item.value));
    // Validate all badges are rendered properly
    const badges = Array.from(tabMenu.container.querySelectorAll('.badge')).map(node => node.textContent);
    expect(badges).toEqual(props.items.filter(item => !!item.badge).map(item => item.badge.toString()));
    // Check if the dash is shown below first item
    const dash = tabMenu.container.querySelector('.dash');
    const expectedBounds = getExpectedBounds(tabMenu.container.querySelector('.tab-item'));
    expect(dash.style.left).toBe(`${expectedBounds.left}px`);
    expect(dash.style.right).toBe(`${expectedBounds.right}px`);
  });

  it('moves dash correctly', () => {
    // Check if the dash is shown below first item
    const dash = tabMenu.container.querySelector('.dash');
    const boundsOfFirst = getExpectedBounds(tabMenu.container.querySelector('.tab-item'));
    expect(dash.style.left).toBe(`${boundsOfFirst.left}px`);
    expect(dash.style.right).toBe(`${boundsOfFirst.right}px`);

    const nextActiveIndex = 3;
    props.value = props.items[nextActiveIndex].value;
    tabMenu.render();

    const boundsOfNext = getExpectedBounds(tabMenu.container.querySelectorAll('.tab-item')[nextActiveIndex]);
    expect(dash.style.left).toBe(`${boundsOfNext.left}px`);
    expect(dash.style.right).toBe(`${boundsOfNext.right}px`);
  });

  it('propagates changes', () => {
    expect(props.onChange).not.toHaveBeenCalled();
    tabMenu.container.addEventListener('change', props.onChange);

    const element = tabMenu.container.querySelector('.tab-item:nth-child(2)');
    const event = new MouseEvent('click');
    element.dispatchEvent(event);

    expect(props.onChange).toHaveBeenCalledTimes(2);
  });
});
