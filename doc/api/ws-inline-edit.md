# ws-inline-edit
## WSInlineEdit

**Extends Component**

This class describes a Preact/React component which renders a inline-edit element.
The inline-edit component can be used everywhere in block where you want to have ability to change value.
As an example you can use it in div blocks, rows, tables.

**Parameters**

-   `props`  

### constructor

**Parameters**

-   `props` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Preact props

### state

### editElement

Function that show input when you click on div and focus it

Returns **void** 

### keyAction

Function that save text when click 'Enter' or cancel when click 'Escape' button

**Parameters**

-   `e` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** click event

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### blurAction

Function that save text when input on blur and send text value to updating function

**Parameters**

-   `e` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** click event

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### updating

Function that return value for outside use if text is not the same

**Parameters**

-   `text` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** text to show

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### render

Render the complete inline-edit component

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### propTypes

### defaultProps
