# Dropdowns

## Usage
Dropdown is used to enter data from at least three predefined options.

<ws-dropdown items.bind='["Men", "Women", "Unisex"]' text="Gender" type="select" style="display: inline-block; width: 150px"></ws-dropdown>
```html
<ws-dropdown
  items='["Men", "Women", "Unisex"]'
  text="Gender"
  type="select">
</ws-dropdown>
```
If one value is more common, consider putting it by default. For longer list consider to put most common values at the beginning of the list.

The dropdown triggered by: `anchor`, `button`, `select`, `icon`.

<div style="display: flex;">
  <div style="flex: 25% 1 1">
    <label>Anchor</label>
    <ws-dropdown type="anchor" text="Gender" items.bind='["Men", "Women", "Unisex"]'></ws-dropdown>
  </div>
  <div style="flex: 25% 1 1">
    <label>Button</label>
    <ws-dropdown type="button" text="Gender" items.bind='["Men", "Women", "Unisex"]'></ws-dropdown>
  </div>
  <div style="flex: 25% 1 1">
    <label>Select</label>
    <ws-dropdown type="select" text="Gender" items.bind='["Men", "Women", "Unisex"]' style="width: 150px; display: inline-block;"></ws-dropdown>
  </div>
  <div style="flex: 25% 1 1">
    <label>Icon</label>
    <ws-dropdown type="icon" icon="icon-filter" items.bind='["Men", "Women", "Unisex"]'></ws-dropdown>
  </div>
</div>
<!---
If you want to create a select element which behaves similar to the native one give the dropdown the `type` attribute with the value `select`.
Now the trigger will look like a select box and the initial text value will be updated once a change happened.
-->
<!---

<ws-dropdown items.bind='["Men", "Women", "Unisex"]' text="Gender" change.delegate="log('dd1 changed', $event)"></ws-dropdown>
```html
<ws-dropdown
  items='["Men", "Women", "Unisex"]'
  text="Gender">
</ws-dropdown>
```
-->

## Multi-level
This option can be used when at least one dropdown option has hierarchical structure.

<ws-dropdown items.bind='["Desktop", {"label": "Documents", "children": ["Pics", {"label": "Docs", "children": ["Work", "Personal", "Stored", "Backup"]}]}, "Music"]' text="Source" change.delegate="log('dd1 changed', $event)"></ws-dropdown>
```html
<ws-dropdown
  items.bind='["Desktop", {"label": "Documents", "children": ["Pics", {"label": "Docs", "children": ["Work", "Personal", "Stored", "Backup"]}]}, "Music"]'
  text="Source">
</ws-dropdown>
```

## Multi-select
Use it when user might choose more than one option from the list.
<!--
Do allow this simply add the attribute `multiple="1"` to the dropdown.
Note: In some frameworks just adding the attribute like a flag leads to pass a a empty string to the component which will be
interpreted as false.
-->
<ws-dropdown items.bind='["Design", "Dev", "Product"]' multiple="1" text="Tags" type="select" style="display: inline-block; width: 150px"></ws-dropdown>
```html
<ws-dropdown
  items='["Design", "Dev", "Product"]'
  text="Tags"
  multiple="1"
  type="select">
</ws-dropdown>
```

## Filter input
In some cases, instead of going through the list, it is easier to just type an option name to filter results.
<!--
To do so just add the flag `filterable="1"` to enable the feature. Additionally you can specify
the default filter with the attribute `filter="blue"` and the maximum amount of displayed items via the
`limit="7"` attribute.
-->
<ws-dropdown items.bind='["Car (Blue)", "Car (Red)", "Car (Orange)", "Bus (Blue)", "Bus (Red)", "Bus (Orange)", "Jet (Blue)", "Jet (Red)", "Jet (Orange)"]' filterable="1" filter="blue" limit="7" text="Select a value" type="select" style="display: inline-block; width: 150px"></ws-dropdown>
```html
<ws-dropdown
  items.bind='["Car (Blue)", "Car (Red)", "Car (Orange)", "Bus (Blue)", "Bus (Red)", "Bus (Orange)", "Jet (Blue)", "Jet (Red)", "Jet (Orange)"]'
  filterable="1"
  filter="blue"
  limit="7"
  text="Select a value"
  type="select"
  style="display: inline-block; width: 150px">
</ws-dropdown>
```
<!--
TABLE FILTER - SHOULD BE INCLUDED IN "TABLE" OR "TABLE FILTERS" DOCUMENTATION
Input only
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
  input-only="1">
</ws-dropdown>
```
-->

<!---
default is `type="anchor"`.

The displayed text inside the trigger can be set via the `text` and `icon` attribute.
If you want to specify the icon you have to take a name from our <a href="#/elements/icons">icon list</a> like `text="Click me" icon="icon-filter"`. As following you can see an example of each type.
-->
<!---

**Disabled**
As any common html element the dropdown can be disabled by adding the `disabled` flag to it.
The style of the trigger will change and the dropdown can not be opened any more.
<ws-dropdown type="button" text="Click me" items.bind='["Item 1", "Item 2"]' disabled></ws-dropdown>

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
-->
