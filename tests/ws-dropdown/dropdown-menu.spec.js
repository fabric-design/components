/* eslint-disable */
import {React} from 'imports';
import {DropdownMenu} from '../../src/ws-dropdown/dropdown-menu';

describe('A DropdownMenu', () => {

  it('filters items', () => {
    const dm = new DropdownMenu({items: [{label: 't1'}, {label: 't2'}, {label: 't3', stored: true}]});
    dm.context = {multiple: false};

    // Get all items
    dm.state.filter = 'irrelevant';
    expect(dm.getFilteredItems().length).toBe(3);
    // Get all items with filter string in label and not stored
    dm.state.filtered = true;
    dm.props.filterable = true;
    dm.state.filter = '1';
    expect(dm.getFilteredItems().length).toBe(1);
    dm.state.filter = 't';
    expect(dm.getFilteredItems().length).toBe(2);
    // Get all not stored items
    dm.context.multiple = true;
    dm.state.filtered = false;
    dm.props.filterable = false;
    dm.state.filter = 'anything';
    expect(dm.getFilteredItems().length).toBe(2);
  });

  it('filters items only when min length', () => {
    const dm = new DropdownMenu({items: [{label: 'tt1'}, {label: 'tt2'}, {label: 'tt3'}]});
    dm.context = {multiple: false};

    expect(dm.getFilteredItems().length).toBe(3);
    dm.props.minFilterLength = 2;
    expect(dm.getFilteredItems().length).toBe(0);
    dm.state.filter = 't';
    expect(dm.getFilteredItems().length).toBe(0);
    dm.state.filter = 'tt';
    expect(dm.getFilteredItems().length).toBe(3);
  });

  it('gets the item for a selection index', () => {
    const items = [{label: 'test'}, {label: 'asd'}, {label: 'qwerty'}];
    const dm = new DropdownMenu({value: [], items});
    dm.context = {multiple: false};

    expect(dm.getItemAtIndex(0).item).toBe(items[0]);
    expect(dm.getItemAtIndex(5).item).toBe(items[0]);
    expect(dm.getItemAtIndex(-1).item).toBe(items[2]);

    dm.state.value = [items[1]];
    expect(dm.getItemAtIndex(0).item).toBe(items[0]); // index 0 starts in value list
    expect(dm.getItemAtIndex(1).item).toBe(items[1]); // index 1 starts after value list
    expect(dm.getItemAtIndex(5).item).toBe(items[0]); // out of bound leads to index 0 which is in value list
    expect(dm.getItemAtIndex(-1).item).toBe(items[2]); // index lower than 0 leads to the last item

    dm.context = {multiple: true};
    dm.state.value = [];

    expect(dm.getItemAtIndex(0).item).toBe(items[0]);
    expect(dm.getItemAtIndex(5).item).toBe(items[0]);
    expect(dm.getItemAtIndex(-1).item).toBe(items[2]);

    dm.state.value = [items[1]];
    expect(dm.getItemAtIndex(0).item).toBe(items[1]); // index 0 starts in value list
    expect(dm.getItemAtIndex(1).item).toBe(items[0]); // index 1 starts after value list
    expect(dm.getItemAtIndex(5).item).toBe(items[1]); // out of bound leads to index 0 which is in value list
    expect(dm.getItemAtIndex(-1).item).toBe(items[2]); // index lower than 0 leads to the last item
  });
});
