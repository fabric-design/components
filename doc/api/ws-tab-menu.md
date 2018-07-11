# ws-tab-menu
## WSTabMenu

**Extends Component**

This component renders a tab menu and provides the selected tab via a value property.

**Parameters**

-   `props` **[Object][1]** React component properties

**Properties**

-   `items` **[Array][2]** List of menu items {value: any & required, label: string, className: string, badge: string}
-   `value` **any** Matching a value of an item
-   `onChange` **[Function][3]** Callback function for React/Preact applications

### componentDidMount

Bind listeners after mount

Returns **void** 

### componentWillReceiveProps

Update state from property change

**Parameters**

-   `props` **[Object][1]** React properties

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

-   `event` **[Event][4]** JavaScript event object

Returns **void** 

### configureMenuItems

Bind listeners and move dash below active item

Returns **void** 

### animateDash

Animate the dash below the new active item

**Parameters**

-   `newMenuItem` **[HTMLElement][5]** HTMLElement of new active menu item

Returns **void** 

### createState

Create a state object from the properties

**Parameters**

-   `props` **[Object][1]** React properties


-   Throws **any** Error when no items are passed

Returns **[Object][1]** 

### renderMenuItem

Render a single menu item

**Parameters**

-   `item` **[Object][1]** Menu item object
-   `index` **[number][6]** Index of item in item list

Returns **JSX** 

### render

Render the component markup

Returns **JSX** 

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[4]: https://developer.mozilla.org/docs/Web/API/Event

[5]: https://developer.mozilla.org/docs/Web/HTML/Element

[6]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number
