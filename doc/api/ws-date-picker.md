# ws-date-picker
## WSDatePicker

**Extends Component**

Renders a date picker component which is based on flatpickr.
To specify a date format call the setFormat function with the corresponding format.
Pls have a look at the flatpickr formatting rules.
You can set additional options to the flatpickr by passing the options property.
If you only want to display an icon instead of a input set prop iconOnly.

**Parameters**

-   `props` **[Object][1]** React properties

### componentDidMount

Initialize the flatpickr with given options and prevent default change event

Returns **void** 

### componentWillReceiveProps

Update flatpickr when prop's changed

**Parameters**

-   `props` **[Object][1]** React props

Returns **void** 

### componentWillUnmount

Destroy the flatpickr and all events and bindings

Returns **void** 

### onChange

Handle date selections and propagate the value via an custom change event and onChange callback

**Parameters**

-   `selectedDate` **[Date][2]** The currently selected date
    -   `selectedDate.0`  
-   `value` **[String][3]** The date as string using the in props specified formatting

Returns **void** 

### render

Render the component

Returns **[Object][1]** 

### setFormat

Set the format for all date picker instances

**Parameters**

-   `format` **[string][3]** Format following flatpickr options

Returns **void** 

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String
