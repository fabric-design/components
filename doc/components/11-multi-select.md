# Multi Select

## Usage
The multi select is a component which provides a better usability over the drop down multi select feature. 
It shows the selected elements in the main view and allows removal of selected items without opening a drop down.
Also filtering for items is way simpler because the input is shown without a click. Even though this component seem to be
better suited than the dropdown multi select you should not use this component when there is less space available.

<ws-multi-select items.bind='["Men", "Women", "Unisex"]' placeholder="Gender" style="display: inline-block; width: 150px"></ws-multi-select>
```html
<ws-multi-select
  items='["Men", "Women", "Unisex"]'
  placeholder="Gender">
</ws-multi-select>
```
