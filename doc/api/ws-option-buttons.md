# ws-option-buttons
## WSOptionButtons

**Extends Component**

Renders a list of clickable buttons. The amount of initial visible buttons can be controlled with
the initialVisible property. The user is able to show more than these defined amount by clicking the "more" button.

**Parameters**

-   `props` **[Object][1]** React props

### componentDidMount

Binds event listeners when element is attached to dom

Returns **void** 

### componentWillReceiveProps

Updates the state if props changes from outside

**Parameters**

-   `props` **[Object][1]** React props

Returns **void** 

### componentDidUpdate

Bind to new elements

Returns **void** 

### componentWillUnmount

Removes event listeners before element is detached from dom

Returns **void** 

### onClickToggle

Handles toggling visible amount

**Parameters**

-   `event` **[MouseEvent][2]** JavaScript event object

Returns **void** 

### onClickButton

Handles button selection

**Parameters**

-   `event` **[MouseEvent][2]** JavaScript event object

Returns **void** 

### createState

Creates a state object from React props

**Parameters**

-   `props` **[Object][1]** React props

Returns **[Object][1]** 

### enrichItems

Used to convert the items if they are strings into the required object structure

**Parameters**

-   `items` **[Array][3]&lt;([String][4] \| [Object][1])>** List of items represented as string or object

Returns **[Array][3]&lt;[Object][1]>** 

### render

Renders the component

Returns **JSX** 

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[2]: https://developer.mozilla.org/docs/Web/API/MouseEvent

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String
