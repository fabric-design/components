# Week-Picker
A calendar utility to select a week.

## General usage
**Change-Callback**:
The week-picker will notify the outside if the user selected a week. The dev can implement a callback via a `onChange` function-property on the element receiving an `{week, year}`-object as an input. Or the dev could attach an `change` event listener on the element receiving the same input object as an event.
<ws-week-picker change.delegate="alert('Week picked', $event.week, $event.year)"></ws-week-picker>
```html
<ws-dropdown
  onChange="e => alert('Week picked', e.week, e.year)">
</ws-dropdown>
```

**Initial Value**:
You can pass an initial value by setting the properties `selectedYear` and `selectedWeek`. Both have to be numbers.
```html
<ws-dropdown
  selectedYear="2017"
  selectedWeek="42">
</ws-dropdown>
```