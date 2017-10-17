# Date Pickers

## Day Picker
Used to choose specific date.

<ws-date-picker placeholder="Select a date" change.delegate="log('Date1 changed', $event)"></ws-date-picker>
```html
<ws-date-picker placeholder="Select a date" id="date1"></ws-date-picker>
<script>
  document.getElementById('date1').addEventListener('change', event => console.log('Date1 changed', event));
</script>
```
Like a common input element you can set the `placeholder` and `value` attribute while the value has to be
a date string which is parsable by `Date.parse()` or which matches the value in the `format` attribute if specified.

![Default date](src/style/assets/pick-ex1.jpg)
<p>Add default date if you can predict the most common/natural that user would choose.</p>


### Formatting dates
You can change the formatting of the date picker component by calling the static method `setFormat` on `WSDatePicker` class.
The pattern for the format follows the rules oąąf the [flatpickr](https://chmln.github.io/flatpickr/formatting/).
For instance `Y-m-d` will result in the date `2017-06-04` which will be displayed in the input and passed
through the change event.

```html
<script>
  WSDatePicker.setFormat('Y-m-d');
</script>
<ws-date-picker value="2017-06-04"></ws-date-picker>
```

### Custom options
Since our date picker is based on the flatpickr you can configure it like the flatpickr by passing an
object through the `options` attribute. All possible options can be found [here](https://chmln.github.io/flatpickr/options/).

<ws-date-picker value="2017-06-15" format="Y-m-d" options.bind="{minDate: '2017-06-01', maxDate: '2017-06-24'}"></ws-date-picker>
```html
<ws-date-picker
  value="2017-06-15"
  options='{"minDate": "2017-06-01", "maxDate": "2017-06-24"}'>
</ws-date-picker>
```

## Week-Picker
Used to choose specific calendar week.

### General usage
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
