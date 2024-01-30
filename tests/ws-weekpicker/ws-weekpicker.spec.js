import {React, render} from 'imports';
import {WSWeekPicker} from '../../src/index';
import {wait} from '../async';

/**
 * Tests for WS-WeekPicker
 */
describe('A WSWeekPicker', () => {
  let container;

  beforeEach(() => {
    if (container) {
      document.body.removeChild(container);
    }
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  it('should render', () => {
    render(<WSWeekPicker />, container);

    expect(container.querySelector('.ws-week-picker')).not.toBe(null);
  });

  it('should open the calendar on click', async done => {
    render(<WSWeekPicker />, container);
    const element = container.querySelector('.ws-week-picker');
    element.querySelector('input').click();
    await wait();

    expect(element.querySelector('.ws-date-picker-calendar')).not.toBe(null);
    done();
  });

  it('should close the calendar on click', async done => {
    render(<WSWeekPicker />, container);
    const element = container.querySelector('.ws-week-picker');
    element.querySelector('input').click();
    await wait();
    element.querySelector('input').click();
    await wait();

    expect(element.querySelector('.ws-date-picker-calendar')).toBe(null);
    done();
  });

  it('should show initial value', () => {
    render(<WSWeekPicker selectedYear="2017" selectedWeek="42" />, container);
    const element = container.querySelector('.ws-week-picker');

    expect(element.querySelector('input').value).toBe('Week 42, 2017');
  });

  it('change the value if clicked on a week', async done => {
    render(<WSWeekPicker selectedYear="2017" selectedWeek="42" />, container);
    const element = container.querySelector('.ws-week-picker');
    element.querySelector('input').click();
    await wait();
    const calendar = element.querySelector('.ws-date-picker-calendar');
    const weeks = calendar.querySelectorAll('tbody td a');
    weeks[20].click();
    await wait();

    expect(element.querySelector('input').value).toBe('Week 11, 2017');
    done();
  });

  it('change the year if clicked on an arrow', async done => {
    render(<WSWeekPicker selectedYear="2017" selectedWeek="42" />, container);
    const element = container.querySelector('.ws-week-picker');
    element.querySelector('input').click();
    await wait();
    const calendar = element.querySelector('.ws-date-picker-calendar');
    calendar.querySelector('.prev').click();
    await wait();

    expect(calendar.querySelector('.current_year').textContent).toBe('2016');
    calendar.querySelector('.next').click();
    await wait();

    expect(calendar.querySelector('.current_year').textContent).toBe('2017');
    done();
  });
});
