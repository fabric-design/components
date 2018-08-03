# ws-date-picker
## WSDatePicker

**Extends Component**

-   **See: [https://chmln.github.io/flatpickr/][1]**

Renders a date picker component which is based on flatpickr.
To specify a date format call the setFormat function with the corresponding format.
Pls have a look at the flatpickr formatting rules.
You can set additional options to the flatpickr by passing the options property.
If you only want to display an icon instead of a input set prop iconOnly.

**Parameters**

-   `props` **[Object][2]** React properties

### componentDidMount

Initialize the flatpickr with given options and prevent default change event

Returns **void** 

### componentWillReceiveProps

Update flatpickr when prop's changed

**Parameters**

-   `props` **[Object][2]** React props

Returns **void** 

### componentWillUnmount

Destroy the flatpickr and all events and bindings

Returns **void** 

### onChange

Handle date selections and propagate the value via an custom change event and onChange callback

**Parameters**

-   `selectedDate` **[Date][3]** The currently selected date
    -   `selectedDate.0`  
-   `value` **[string][4]** The date as string using the in props specified formatting

Returns **void** 

### onClick

Since we prevent clicks bubbling up the date picker doesn't recognize those when clicking another date picker
and therefore doesn't close the old one. So we call the necessary fn manually.

**Parameters**

-   `event` **[Event][5]** JavaScript event object

Returns **void** 

### stopPropagation

Prevent clicks bubbling out

**Parameters**

-   `event` **[MouseEvent][6]** JavaScript event object

Returns **void** 

### render

Render the component

Returns **[Object][2]** 

### flatpickrInstances

Holds all open flatpickr instances to pass captured click event to them

Type: [Array][7]

### setFormat

Set the format for all date picker instances

**Parameters**

-   `format` **[string][4]** Format following flatpickr options

Returns **void** 

[1]: https://chmln.github.io/flatpickr/

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[5]: https://developer.mozilla.org/docs/Web/API/Event

[6]: https://developer.mozilla.org/docs/Web/API/MouseEvent

[7]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array
