# ws-tab-menu
## WSTabMenu

**Extends Component**

This component renders a tab menu and provides the selected tab via a value property.

**Parameters**

-   `props`  

**Properties**

-   `items` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** List of menu items {value: any & required, label: string, className: string, badge: string}
-   `value` **any** Matching a value of an item
-   `onChange` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Callback function for React/Preact applications

### constructor

**Parameters**

-   `props` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** React component properties

### componentDidMount

Bind listeners after mount

Returns **void** 

### componentWillReceiveProps

Update state from property change

**Parameters**

-   `props` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** React properties

Returns **void** 

### componentDidUpdate

Bind listeners after update

Returns **void** 

### componentWillUnmount

Unbind event listeners

Returns **void** 

### onClick

Handles clicks on menu items

**Parameters**

-   `event` **[Event](https://developer.mozilla.org/en-US/docs/Web/API/Event)** JavaScript event object

Returns **void** 

### configureMenuItems

Bind listeners and move dash below active item

Returns **void** 

### animateDash

Animate the dash below the new active item

**Parameters**

-   `newMenuItem` **[Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)** HTMLElement of new active menu item

Returns **void** 

### createState

Create a state object from the properties

**Parameters**

-   `props` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** React properties


-   Throws **any** Error when no items are passed

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### renderMenuItem

Render a single menu item

**Parameters**

-   `item` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Menu item object
-   `index` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index of item in item list

Returns **XML** 

### render

Render the component markup

Returns **XML** 
