# Dropdown

## General usage
**Trigger**:
The dropdown trigger is the element you can click to open the dropdown.
It can be one of the following types: `anchor`, `button`, `select`, `icon` and the default is `type="anchor"`.
The displayed text inside the trigger can be set via the `text` and `icon` attribute.
If you want to specify the icon you have to take a name from our <a href="#/elements/icons">icon list</a>
like `text="Click me" icon="icon-filter"`. As following you can see an example of each type.
<div style="display: flex;">
  <div style="flex: 25% 1 1">
    <label>Anchor</label>
    <ws-dropdown type="anchor" text="Click me" items.bind='["Item 1", "Item 2"]'></ws-dropdown>
  </div>
  <div style="flex: 25% 1 1">
    <label>Button</label>
    <ws-dropdown type="button" text="Click me" items.bind='["Item 1", "Item 2"]'></ws-dropdown>
  </div>
  <div style="flex: 25% 1 1">
    <label>Select</label>
    <ws-dropdown type="select" text="Click me" items.bind='["Item 1", "Item 2"]' style="width: 150px; display: inline-block;"></ws-dropdown>
  </div>
  <div style="flex: 25% 1 1">
    <label>Icon</label>
    <ws-dropdown type="icon" icon="icon-filter" items.bind='["Item 1", "Item 2"]'></ws-dropdown>
  </div>
</div>

**Disabled**
As any common html element the dropdown can be disabled by adding the `disabled="1"` flag to it.
The style of the trigger will change and the dropdown can not be opened any more.
<ws-dropdown type="button" text="Click me" items.bind='["Item 1", "Item 2"]' disabled="1"></ws-dropdown>

**Items**:
All dropdown elements requires the items attribute to be specified with an list of dropdown items.
An item can be either a simple string or a object containing the following keys:
 - **label**: string | text which is disabled
 - **value**: string, required
 - **selected**: boolean | adds the class .is-active to the item
 - **focused**: boolean | adds the class .is-focused to the item
 - **disabled**: boolean |adds the class .is-disabled to the item
 - **className**: string | classes which get's added to the item</li></ul>

**Value**:
You can pass an item as value to the dropdown and it will mark the specific item as selected for you.
The value you can pass into the dropdown differs from the combination of tags you choose.
When you specify the `multiple="1"` flag, the value can be a dropdown item or a list of dropdown items.
In case you specify the `input-only="1"` flag the value must be a simple string!
Are those two flags not specified the value can be a dropdown item represented as an object or just it's value as a string.

## Simple dropdown menu
The simple dropdown menu only contains one level of menu items and provides the ability to select only one item at the same time.
All changes are propagated via a custom change event which contains the selected item.

<ws-dropdown items.bind='["Item 1", "Item 2", "Item 3"]' text="Click me" change.delegate="log('dd1 changed', $event)"></ws-dropdown>
```html
<ws-dropdown
  items='["Item 1", "Item 2", "Item 3"]'
  text="Click me">
</ws-dropdown>
```

## Hierarchical dropdown menu
Sometimes not everything fits into one menu and we have to group our items and create a hierarchical menu.
This happens quite often on page headers or context menu's (right click). To create a hierarchical menu you
just have to add the children for the dropdown item as you want.

<ws-dropdown items.bind='["Item 1", {"label": "Item 2", "children": ["Item 2.1", {"label": "Item 2.2", "children": ["Item 2.2.1", "Item 2.2.2", "Item 2.2.3", "Item 2.2.4"]}]}, "Item 3"]' text="Click me" change.delegate="log('dd1 changed', $event)"></ws-dropdown>
```html
<ws-dropdown
  items='["Item 1", {"label": "Item 2", "children": ["Item 2.1", {"label": "Item 2.2", "children": ["Item 2.2.1", "Item 2.2.2", "Item 2.2.3", "Item 2.2.4"]}]}, "Item 3"]'
  text="Click me">
</ws-dropdown>
```

## Select element
If you want to create a select element which behaves similar to the native one give the dropdown the `type` attribute with the value `select`.
Now the trigger will look like a select box and the initial text value will be updated once a change happened.

<ws-dropdown items.bind='["Item 1", "Item 2", "Item 3"]' text="Select a value" type="select" style="display: inline-block; width: 150px"></ws-dropdown>
```html
<ws-dropdown
  items='["Item 1", "Item 2", "Item 3"]'
  text="Select a value"
  type="select">
</ws-dropdown>
```

## Multiple selections
Sometimes you want to give the user the ability to select multiple values from one item list.
Do allow this simply add the attribute `multiple="1"` to the dropdown.
Note: In some frameworks just adding the attribute like a flag leads to pass a a empty string to the component which will be
interpreted as false.

<ws-dropdown items.bind='["Item 1", "Item 2", "Item 3"]' value="Item 2" multiple="1" text="Select a value" type="select" style="display: inline-block; width: 150px"></ws-dropdown>
```html
<ws-dropdown
  items='["Item 1", "Item 2", "Item 3"]'
  value="Item 2"
  text="Select a value"
  multiple="1"
  type="select">
</ws-dropdown>
```

## Filterable list
Even modern browsers are limited in performance and your user as well. In general scrolling should be prevented and therefore
the dropdown items can be filtered to only show the relevant information.
To do so just add the flag `filterable="1"` to enable the feature. Additionally you can specify
the default filter with the attribute `filter="blue"` and the maximum amount of displayed items via the
`limit="7"` attribute.

<ws-dropdown items.bind='["Car (Blue)", "Car (Red)", "Car (Orange)", "Bus (Blue)", "Bus (Red)", "Bus (Orange)", "Yet (Blue)", "Yet (Red)", "Yet (Orange)"]' filterable="1" filter="blue" limit="7" text="Select a value" type="select" style="display: inline-block; width: 150px"></ws-dropdown>
```html
<ws-dropdown
  items.bind='["Car (Blue)", "Car (Red)", "Car (Orange)", "Bus (Blue)", "Bus (Red)", "Bus (Orange)", "Yet (Blue)", "Yet (Red)", "Yet (Orange)"]'
  filterable="1"
  filter="blue"
  limit="7"
  text="Select a value"
  type="select"
  style="display: inline-block; width: 150px">
</ws-dropdown>
```

## Input only
For our table filters and in some other cases you might need a dropdown which only contains an input element.
To achieve this you have to add the attribute `input-only="1"` to the dropdown. Here you have becide
the `value` attribute also the `placeholder` attribute to set the placeholder for the input.
**Note**: The value which you pass in and which will be propagated out must be a string and NOT a dropdown item.


<ws-dropdown type="button" text="Click me" placeholder="Insert a text" value="Default value" input-only="1"></ws-dropdown>
```html
<ws-dropdown
  type="button"
  text="Click me"
  placeholder="Insert a text"
  value="Default value"
  input-only="1">
</ws-dropdown>
```

