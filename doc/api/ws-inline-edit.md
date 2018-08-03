# ws-inline-edit
## WSInlineEdit

**Extends Component**

This class describes a Preact/React component which renders a inline-edit element.
The inline-edit component can be used everywhere in block where you want to have ability to change value.
As an example you can use it in div blocks, rows, tables.

**Parameters**

-   `props` **[Object][1]** Preact props

### componentDidMount

Bind event listeners

Returns **void** 

### componentWillReceiveProps

**Parameters**

-   `props` **[Object][1]** React props

Returns **void** 

### componentWillUnmount

Unbind event listeners

Returns **void** 

### onFocus

Handles click on value to enable editing

**Parameters**

-   `event` **[Event][2]** JavaScript event object

Returns **void** 

### onKeyUp

Handle keyboard events on input

**Parameters**

-   `event` **[KeyboardEvent][3]** JavaScript event object

Returns **void** 

### onKeyDown

Resize already on

**Parameters**

-   `event` **[Event][2]** JavaScript event object

Returns **void** 

### onChange

Propagate changed value on change

**Parameters**

-   `event` **[Event][2]** JavaScript event object

Returns **void** 

### stopPropagation

Stop native events from bubbling up

**Parameters**

-   `event` **[Event][2]** JavaScript event object

Returns **void** 

### createState

Create component state

**Parameters**

-   `props` **[Object][1]** React props

Returns **{isEditing: [boolean][4], inputValue: any, initialValue: any, isValid: [boolean][4]}** 

### abort

Aborts editing and restores the initial value

Returns **void** 

### submit

Propagate changed value

**Parameters**

-   `inputValue` **[string][5]** Current value in input

Returns **void** 

### resizeInput

Resize the input to it's current value plus additional characters coming from events

**Parameters**

-   `additionalChars` **[string][5]** Possible chars which will be added in future (keyDown, keyUp)

Returns **void** 

### render

Render the complete inline-edit component

Returns **[Object][1]** 

### defaultProps

Create default onUpdate function to prevent errors if user don't use it

### propTypes

Types of properties

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[2]: https://developer.mozilla.org/docs/Web/API/Event

[3]: https://developer.mozilla.org/docs/Web/API/KeyboardEvent

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[5]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String
