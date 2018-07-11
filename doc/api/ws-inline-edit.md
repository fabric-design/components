# ws-inline-edit
## WSInlineEdit

**Extends Component**

This class describes a Preact/React component which renders a inline-edit element.
The inline-edit component can be used everywhere in block where you want to have ability to change value.
As an example you can use it in div blocks, rows, tables.

**Parameters**

-   `props` **[Object][1]** Preact props

### state

Type: [Object][1]

### editElement

Function that show input when you click on div and focus it

Returns **void** 

### keyAction

Function that save text when click 'Enter' or cancel when click 'Escape' button

**Parameters**

-   `e` **[Object][1]** click event

Returns **[Object][1]** 

### blurAction

Function that save text when input on blur and send text value to updating function

**Parameters**

-   `e` **[Object][1]** click event

Returns **[Object][1]** 

### updating

Function that return value for outside use if text is not the same

**Parameters**

-   `text` **[Object][1]** text to show

Returns **[Object][1]** 

### render

Render the complete inline-edit component

Returns **[Object][1]** 

### propTypes

Types of properties

### defaultProps

Create default onUpdate function to prevent errors if user don't use it

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object
