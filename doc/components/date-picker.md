# Date Picker

## Simple date picker
A date picker consist in general of an input element and a picker dialog which appears when the input
is focused and gives the user the ability to select a date in a natural way. Our date picker is a complete
component which comes with all of these. As with all of our components the changes are propagated via 
custom change events which contains details about the selected date as object and pre-formatted string.
Like a common input element you can set the `placeholder` and `value` attribute while the value has to be
a date string which is parsable by `Date.parse()` or which matches the value in the `format` attribute if specified.

<ws-date-picker placeholder="Select a date" change.delegate="log('Date1 changed', $event)"></ws-date-picker>
```html
<ws-date-picker placeholder="Select a date" id="date1"></ws-date-picker>
<script>
  document.getElementById('date1').addEventListener('change', event => console.log('Date1 changed', event));
</script>
```

## Formatting dates
If you have a localized website or simply have a global date format you want to use, you can change the 
formatting of the date picker component by calling the static method `setFormat` on `WSDatePicker` class.
The pattern for the format follows the rules of the [flatpickr](https://chmln.github.io/flatpickr/formatting/). 
For instance `Y-m-d` will result in the date `2017-06-04` which will be displayed in the input and passed 
through the change event.

```html
<script>
  WSDatePicker.setFormat('Y-m-d');
</script>
<ws-date-picker value="2017-06-04"></ws-date-picker>
```

## Custom options
Since our date picker is based on the flatpickr you can configure it like the flatpickr by passing an
object through the `options` attribute. All possible options can be found [here](https://chmln.github.io/flatpickr/options/).

<ws-date-picker value="2017-06-15" format="Y-m-d" options.bind="{minDate: '2017-06-01', maxDate: '2017-06-24'}"></ws-date-picker>
```html
<ws-date-picker
  value="2017-06-15"
  options='{"minDate": "2017-06-01", "maxDate": "2017-06-24"}'>
</ws-date-picker>
```

