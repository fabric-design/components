# ws-dropdown
## DropdownInput

**Extends Component**

Renders renders a text input inside a dropdown container to provide a free text dropdown component.
Possible options are value and placeholder which are both strings.

**Parameters**

-   `props`  

**Properties**

-   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** React properties object
    -   `props.value` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Value of text input
    -   `props.placeholder` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Placeholder for text inputs (Filter input or Input only version)
    -   `props.handle` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** Function used to propagate data

### constructor

**Parameters**

-   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** React props

### componentDidMount

Prevent default change event to bubble up

Returns **void** 

### componentWillUnmount

Prevent default change event to bubble up

Returns **void** 

### onKeyDown

Call submit on enter key

**Parameters**

-   `event` **[KeyboardEvent](https://developer.mozilla.org/docs/Web/API/KeyboardEvent)** JavaScript Event object

Returns **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

### onChange

Set input value to state

**Parameters**

-   `event` **[KeyboardEvent](https://developer.mozilla.org/docs/Web/API/KeyboardEvent)** JavaScript event object

Returns **void** 

### onSubmit

Called when enter or submit key is pressed

Returns **void** 

### onOpen

Bind keyboard listener and focus input if available when dropdown opens

Returns **void** 

### getHeight

Gets the height of the menu container to scale the outer container up

Returns **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### render

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### defaultProps

### propTypes
## DropdownMenuItem

**Extends Component**

This class renders a list item inside a dropdown menu. Since the wrapper menu is missing this class is pretty
useless as standalone. It also renders child menu's if the passed item has children.
The item object can have the following properties
{
    label: String,
    href: String, // Fully qualified URI
    icon: String, // The icon of an item must be a css class name
    children: Array<Item>,
    selected: Boolean, // Adds the class .is-active to the .dropdown-item
    focused: Boolean, // Adds the class .is-focused to the .dropdown-item
    disabled: Boolean // Adds thr class .is-disabled to the .dropdown-item
}

**Parameters**

-   `props`  
-   `context`  

**Properties**

-   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** React properties object
    -   `props.item` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Dropdown item configuration
    -   `props.icon` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Class name of icon in trigger
    -   `props.isParent` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Flag to identify if this item renders the parent dropdown item
    -   `props.handle` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** Function used to propagate data

### constructor

**Parameters**

-   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** React props
-   `context` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** React context

### componentDidMount

Listen for clicks on dropdown item

Returns **void** 

### componentWillReceiveProps

Important to update the state when the items in menu changed.
When in the multi select a dropdown item is selected and stored (submitted) it will be filtered out
of the item list and shown in a separate value list. React doesn't created new components but reuses them.
This leads to property updates and without this function a wrong item will be rendered.

**Parameters**

-   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** React component props

Returns **void** 

### componentWillUnmount

Listen for clicks on dropdown item

Returns **void** 

### onClick

Handle clicks on this dropdown item. This can trigger a back navigation, selecting the item on multi selects
or change the dropdown value for simple dropdown's

**Parameters**

-   `event` **[MouseEvent](https://developer.mozilla.org/docs/Web/API/MouseEvent)** JavaScript event object

Returns **void** 

### handlePropagation

This is required to propagate changes from child menu to parent menu.
For instance if the menu size, it's value changed or the parent or child menu should be shown.

**Parameters**

-   `type` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Type of propagated data
-   `data` **any** Data which was propagated. Can be height of child menu or reference of child

Returns **void** 

### render

Renders the dropdown item

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### defaultProps

### propTypes

### contextTypes
## DropdownMenu

**Extends Component**

This class renders the menu inside a dropdown container. Since the wrapper WSDropdown is missing, which provides
additional wrapping markup and functionality, you SHOULD NOT use this component as standalone.

**Parameters**

-   `props`  
-   `context`  

**Properties**

-   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** React properties object
    -   `props.parent` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Parent dropdown item. Only set if this is a child menu
    -   `props.items` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** List of dropdown item configs. Each item can contain label, value, disabled, selected
    -   `props.value` **([Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>)** Selected dropdown item(s)
    -   `props.filterable` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Flag if the dropdown menu is filterable
    -   `props.filter` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Default filter value
    -   `props.placeholder` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Placeholder for text inputs (Filter input or Input only version)
    -   `props.limit` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Limit visible dropdown items. Use together with filterable flag.
    -   `props.selectAll` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Show button to select all items
    -   `props.handle` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** Function used to propagate data

### constructor

**Parameters**

-   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** React props
-   `context` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** React context

### componentDidMount

Prevent default change event to bubble up

Returns **void** 

### componentWillReceiveProps

Handle changes of passed properties

**Parameters**

-   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** React props

Returns **void** 

### componentDidUpdate

Send the new height of this menu after update to the parent.
This will be called when updateFilter did set the new state

Returns **void** 

### componentWillUnmount

Prevent default change event to bubble up

Returns **void** 

### onOpen

Bind keyboard listener and focus input if available when dropdown opens

Returns **void** 

### onClose

Unbind keyboard listener when dropdown closes

Returns **void** 

### onGlobalKeyDown

Handle global key down events to select items

**Parameters**

-   `event` **[KeyboardEvent](https://developer.mozilla.org/docs/Web/API/KeyboardEvent)** JavaScript event object

Returns **void** 

### onKeyUpUpdateFilter

Sets the input value as filter

**Parameters**

-   `event` **[KeyboardEvent](https://developer.mozilla.org/docs/Web/API/KeyboardEvent)** JavaScript event object

Returns **void** 

### onClickSubmit

Handles submit action on multi select drop downs

**Parameters**

-   `event` **[Event](https://developer.mozilla.org/docs/Web/API/Event)** JavaScript event object

Returns **void** 

### onClickSelectAll

Handles select all action on multi select drop downs

Returns **void** 

### getHeight

Gets the current height of the menu

Returns **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### getFilteredItems

If there is a filter active it applies it on the available items

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** 

### getItemAtIndex

Get the item for an index which can match the value or items list

**Parameters**

-   `index` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index across value and filtered items

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### focusNextItem

Depending on the direction it marks the next dropdown item as focused

**Parameters**

-   `direction` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Can be 1 for down or -1 for up direction

Returns **void** 

### selectCurrentItem

Mark the currently focused item as selected

Returns **void** 

### clearSelections

Deselect all items which are not stored as value. Only relevant for multi select dropdown.
When the dropdown will be closed without pressing submit the state will be restored

Returns **void** 

### handlePropagation

Handles data propagation from child menus
This function uses arrow function to bind the scope to this instance

**Parameters**

-   `type` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Should be just show-parent
-   `data` **any** Propagated data. Could be for instance a menu reference or the menu height.

Returns **void** 

### showChild

Shows the child menu and hides the current menu

**Parameters**

-   `subMenu` **WSDropdownMenu** The reference of the child menu to show

Returns **void** 

### showCurrent

Shows this menu and hides currently open sub menu

Returns **void** 

### animateIn

Animates a menu or sub menu into the view

**Parameters**

-   `goBack` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** True if a menu should be shown and a sub menu be hidden

Returns **void** 

### animateOut

Animates a menu or sub menu out of the view

**Parameters**

-   `goBack` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** True if a menu should be hidden and a sub menu be shown

Returns **void** 

### animateElement

Animates an element by adding a class with an css animation and executes a callback when the animation ends

**Parameters**

-   `item` **[Element](https://developer.mozilla.org/docs/Web/API/Element)** The dom node to animate
-   `animationClass` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The css class which holds the animation definition
-   `callback` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** Callback which will be executed at the end of the animation

Returns **void** 

### render

Renders the dropdown menu

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### defaultProps

### propTypes

### contextTypes
## WSDropdown

**Extends Component**

This class describes a Preact/React component which renders a dropdown.
The dropdown can be used as select, multi select, filterable select or as a simple menu.
Regarding the flags the changed value will look different. The flag inputOnly results in a string,
the flag multiple results in an array and without those flags the change event details contain an object.
As trigger type you can choose between an anchor, button or a select like looking container.

**Parameters**

-   `props`  

**Properties**

-   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** React properties object
    -   `props.type` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Type of trigger. Can be anchor, button, select or icon
    -   `props.text` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Text of trigger
    -   `props.icon` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Class name of icon in trigger
    -   `props.multiple` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Flag if the dropdown is a multi select menu
    -   `props.filterable` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Flag if the dropdown menu is filterable
    -   `props.inputOnly` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Flag if the dropdown only contains a text input and a button
    -   `props.filter` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Default filter value
    -   `props.limit` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Limit visible dropdown items. Use together with filterable flag.
    -   `props.orientation` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Dropdown orientation. Can be either left or right
    -   `props.placeholder` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Placeholder for text inputs (Filter input or Input only version)
    -   `props.selectAll` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Show button to select all items
    -   `props.onChange` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Callback for react components to propagate value changes

### constructor

**Parameters**

-   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** React props

### getChildContext

Called by React to get the types of the child context values

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### componentDidMount

Start listening for clicks in window

Returns **void** 

### componentWillReceiveProps

Handle changes of passed properties

**Parameters**

-   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** React props

Returns **void** 

### componentWillUnmount

Stop listening for clicks in window

Returns **void** 

### onDocumentClick

Handles click on document body to close the dropdown if clicked elsewhere

**Parameters**

-   `event` **[MouseEvent](https://developer.mozilla.org/docs/Web/API/MouseEvent)** JavaScript event object

Returns **void** 

### onTriggerClick

Handle clicks on dropdown trigger

**Parameters**

-   `event` **[MouseEvent](https://developer.mozilla.org/docs/Web/API/MouseEvent)** JavaScript event object

Returns **void** 

### onAnyEvent

Prevent event to bubble up and keep it inside drop down

**Parameters**

-   `event` **[Event](https://developer.mozilla.org/docs/Web/API/Event)** Event object

Returns **void** 

### onGlobalKeyDown

Handles global key down events when dropdown was opened

**Parameters**

-   `event` **[KeyboardEvent](https://developer.mozilla.org/docs/Web/API/KeyboardEvent)** JavaScript event object

Returns **void** 

### getTextFromValue

Get text from labels of selected items

**Parameters**

-   `value` **([String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>)** Selected items
-   `args` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>** Optionally a default text can be passed

Returns **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### setValue

Set the value of the dropdown and update the display text if the trigger element is a select

**Parameters**

-   `value` **([Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>)** The new dropdown value

Returns **void** 

### createState

Create state object from properties

**Parameters**

-   `props` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** React props

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### handlePropagation

Handles data propagation from child elements

**Parameters**

-   `type` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Either change for value changes or change-size which will be emitted on menu changes
-   `data` **([Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number))** Either new value or height of new menu

Returns **void** 

### enrichItems

Used to convert the items if they are strings into the required object structure

**Parameters**

-   `items` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;([String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object))>** List of items represented as string or object

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** 

### open

Opens the dropdown

Returns **void** 

### close

Closes the dropdown and clears the selection if needed

Returns **void** 

### adjustSize

Set's the size on an element

**Parameters**

-   `newSize` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The new size of the active menu will become the new dropdown container size

Returns **void** 

### animateElement

Animates an element by adding a class with an css animation and executes a callback when the animation ends

**Parameters**

-   `item` **[Element](https://developer.mozilla.org/docs/Web/API/Element)** The dom node to animate
-   `animationClass` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The css class which holds the animation definition
-   `callback` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** Callback which will be executed at the end of the animation

Returns **void** 

### renderTrigger

Renders the dropdown trigger element

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### renderContent

Render the content of the dropdown which can be a menu with only input and submit button
or a common menu with list items

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### render

Render the complete dropdown

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### defaultProps

### propTypes

### openDropdown

### childContextTypes
