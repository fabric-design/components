# ws-date-picker
## WSDatePicker

**Extends Component**

Renders a date picker component which is based on flatpickr.
To specify a date format call the setFormat function with the corresponding format.
Pls have a look at the flatpickr formatting rules.
You can set additional options to the flatpickr by passing the options property.
If you only want to display an icon instead of a input set prop iconOnly.

**Parameters**

-   `props`  

### constructor

**Parameters**

-   `props` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** React properties

### componentDidMount

Initialize the flatpickr with given options and prevent default change event

Returns **void** 

### componentWillReceiveProps

Update flatpickr when prop's changed

**Parameters**

-   `props` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** React props

Returns **void** 

### componentWillUnmount

Destroy the flatpickr and all events and bindings

Returns **void** 

### onChange

Handle date selections and propagate the value via an custom change event and onChange callback

**Parameters**

-   `selectedDate` **[Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)** The currently selected date
    -   `selectedDate.0`  
-   `value` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The date as string using the in props specified formatting

Returns **void** 

### render

Render the component

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### setFormat

Set the format for all date picker instances

**Parameters**

-   `format` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Format following flatpickr options

Returns **void** 
