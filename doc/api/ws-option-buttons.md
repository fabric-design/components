# ws-option-buttons
## WSOptionButtons

**Extends Component**

Renders a list of clickable buttons. The amount of initial visible buttons can be controlled with
the initialVisible property. The user is able to show more than these defined amount by clicking the "more" button.

**Parameters**

-   `props`  

### constructor

**Parameters**

-   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** React props

### componentDidMount

Binds event listeners when element is attached to dom

Returns **void** 

### componentWillReceiveProps

Updates the state if props changes from outside

**Parameters**

-   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** React props

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

-   `event` **[MouseEvent](https://developer.mozilla.org/docs/Web/API/MouseEvent)** JavaScript event object

Returns **void** 

### onClickButton

Handles button selection

**Parameters**

-   `event` **[MouseEvent](https://developer.mozilla.org/docs/Web/API/MouseEvent)** JavaScript event object

Returns **void** 

### createState

Creates a state object from React props

**Parameters**

-   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** React props

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### enrichItems

Used to convert the items if they are strings into the required object structure

**Parameters**

-   `items` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;([String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object))>** List of items represented as string or object

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** 

### render

Renders the component

Returns **JSX** 
