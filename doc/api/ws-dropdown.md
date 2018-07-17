# ws-dropdown
## DropdownInput

**Extends Component**

Renders renders a text input inside a dropdown container to provide a free text dropdown component.
Possible options are value and placeholder which are both strings.

**Parameters**

-   `props` **[Object][1]** React props

**Properties**

-   `props` **[Object][1]** React properties object
    -   `props.value` **[string][2]** Value of text input
    -   `props.placeholder` **[string][2]** Placeholder for text inputs (Filter input or Input only version)
    -   `props.handle` **[Function][3]** Function used to propagate data

### componentDidMount

Prevent default change event to bubble up

Returns **void** 

### componentWillUnmount

Prevent default change event to bubble up

Returns **void** 

### onKeyDown

Call submit on enter key

**Parameters**

-   `event` **[KeyboardEvent][4]** JavaScript Event object

Returns **[boolean][5]** 

### onChange

Set input value to state

**Parameters**

-   `event` **[KeyboardEvent][4]** JavaScript event object

Returns **void** 

### onSubmit

Called when enter or submit key is pressed

Returns **void** 

### onOpen

Bind keyboard listener and focus input if available when dropdown opens

Returns **void** 

### getHeight

Gets the height of the menu container to scale the outer container up

Returns **[number][6]** 

### render

Returns **[Object][1]** 

### defaultProps

Type: [Object][1]

### propTypes

Type: [Object][1]

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[4]: https://developer.mozilla.org/docs/Web/API/KeyboardEvent

[5]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[6]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number
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

-   `props` **[Object][1]** React props
-   `context` **[Object][1]** React context

**Properties**

-   `props` **[Object][1]** React properties object
    -   `props.item` **[Object][1]** Dropdown item configuration
    -   `props.icon` **[string][2]** Class name of icon in trigger
    -   `props.isParent` **[boolean][3]** Flag to identify if this item renders the parent dropdown item
    -   `props.handle` **[Function][4]** Function used to propagate data

### componentDidMount

Listen for clicks on dropdown item

Returns **void** 

### componentWillReceiveProps

Important to update the state when the items in menu changed.
When in the multi select a dropdown item is selected and stored (submitted) it will be filtered out
of the item list and shown in a separate value list. React doesn't created new components but reuses them.
This leads to property updates and without this function a wrong item will be rendered.

**Parameters**

-   `props` **[Object][1]** React component props

Returns **void** 

### componentWillUnmount

Listen for clicks on dropdown item

Returns **void** 

### onMouseDown

Prevent mouse down to prevent following blur event
The blur event triggers overlay close which leads to the click is not captured (invisible element)

**Parameters**

-   `event` **[MouseEvent][5]** JavaScript event object

Returns **void** 

### onClick

Handle clicks on this dropdown item. This can trigger a back navigation, selecting the item on multi selects
or change the dropdown value for simple dropdown's

**Parameters**

-   `event` **[MouseEvent][5]** JavaScript event object

Returns **void** 

### handlePropagation

This is required to propagate changes from child menu to parent menu.
For instance if the menu size, it's value changed or the parent or child menu should be shown.

**Parameters**

-   `type` **[string][2]** Type of propagated data
-   `data` **any** Data which was propagated. Can be height of child menu or reference of child

Returns **void** 

### render

Renders the dropdown item

Returns **[Object][1]** 

### defaultProps

Type: [Object][1]

### propTypes

Type: [Object][1]

### contextTypes

Type: [Object][1]

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[5]: https://developer.mozilla.org/docs/Web/API/MouseEvent
## DropdownMenu

**Extends Component**

This class renders the menu inside a dropdown container. Since the wrapper WSDropdown is missing, which provides
additional wrapping markup and functionality, you SHOULD NOT use this component as standalone.

**Parameters**

-   `props` **[Object][1]** React props
-   `context` **[Object][1]** React context

**Properties**

-   `props` **[Object][1]** React properties object
    -   `props.parent` **[Object][1]** Parent dropdown item. Only set if this is a child menu
    -   `props.items` **[Array][2]&lt;[Object][1]>** List of dropdown item configs. Each item can contain label, value, disabled, selected
    -   `props.value` **([Object][1] \| [Array][2]&lt;[Object][1]>)** Selected dropdown item(s)
    -   `props.filterable` **[boolean][3]** Flag if the dropdown menu is filterable
    -   `props.filtered` **[boolean][3]** Should be true when items are filtered outside but dropdown has no filter possibility
    -   `props.filter` **[string][4]** Default filter value
    -   `props.placeholder` **[string][4]** Placeholder for text inputs (Filter input or Input only version)
    -   `props.limit` **[number][5]** Limit visible dropdown items. Use together with filterable flag.
    -   `props.selectAll` **[boolean][3]** Show button to select all items
    -   `props.handle` **[Function][6]** Function used to propagate data

### componentDidMount

Prevent default change event to bubble up

Returns **void** 

### componentWillReceiveProps

Handle changes of passed properties

**Parameters**

-   `props` **[Object][1]** React props

Returns **void** 

### componentDidUpdate

Send the new height of this menu after update by the parent.
This will be called when updateFilter did set the new state or outside new dropdown items came in.
Only if the current menu is really active we propagate the new height

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

-   `event` **[KeyboardEvent][7]** JavaScript event object

Returns **void** 

### onKeyUpUpdateFilter

Sets the input value as filter

**Parameters**

-   `event` **[KeyboardEvent][7]** JavaScript event object

Returns **void** 

### onClickSubmit

Handles submit action on multi select drop downs

**Parameters**

-   `event` **[Event][8]** JavaScript event object

Returns **void** 

### onClickSelectAll

Handles select all action on multi select drop downs

Returns **void** 

### getHeight

Gets the current height of the menu

Returns **[number][5]** 

### getFilteredItems

If there is a filter active it applies it on the available items

Returns **[Array][2]&lt;[Object][1]>** 

### getItemAtIndex

Get the item for an index which can match the value or items list

**Parameters**

-   `index` **[number][5]** Index across value and filtered items

Returns **[Object][1]** 

### focusNextItem

Depending on the direction it marks the next dropdown item as focused

**Parameters**

-   `direction` **[number][5]** Can be 1 for down or -1 for up direction

Returns **void** 

### selectCurrentItem

Mark the currently focused item as selected

Returns **void** 

### handlePropagation

Handles data propagation from child menus
This function uses arrow function to bind the scope to this instance

**Parameters**

-   `type` **[string][4]** Should be just show-parent
-   `data` **any** Propagated data. Could be for instance a menu reference or the menu height.

Returns **void** 

### showChild

Shows the child menu and hides the current menu

**Parameters**

-   `subMenu` **[DropdownMenu][9]** The reference of the child menu to show

Returns **void** 

### showCurrent

Shows this menu and hides currently open sub menu

Returns **void** 

### animateIn

Animates a menu or sub menu into the view

**Parameters**

-   `goBack` **[boolean][3]** True if a menu should be shown and a sub menu be hidden

Returns **void** 

### animateOut

Animates a menu or sub menu out of the view

**Parameters**

-   `goBack` **[boolean][3]** True if a menu should be hidden and a sub menu be shown

Returns **void** 

### animateElement

Animates an element by adding a class with an css animation and executes a callback when the animation ends

**Parameters**

-   `item` **[Element][10]** The dom node to animate
-   `animationClass` **[string][4]** The css class which holds the animation definition
-   `callback` **[Function][6]** Callback which will be executed at the end of the animation

Returns **void** 

### render

Renders the dropdown menu

Returns **[Object][1]** 

### defaultProps

Type: [Object][1]

### propTypes

Type: [Object][1]

### contextTypes

Type: [Object][1]

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[5]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[6]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[7]: https://developer.mozilla.org/docs/Web/API/KeyboardEvent

[8]: https://developer.mozilla.org/docs/Web/API/Event

[9]: #dropdownmenu

[10]: https://developer.mozilla.org/docs/Web/API/Element
## deep

Helper function to iterate over all nesting levels without recursion

**Parameters**

-   `items` **[Array][1]** List of array items with possible children
-   `getChildren` **[Function][2]** Callback to get the children of the items
-   `callback` **[Function][2]** Will be called with each item. If return value is true the iteration will be aborted

Returns **void** 

## WSDropdown

**Extends Component**

This class describes a Preact/React component which renders a dropdown.
The dropdown can be used as select, multi select, filterable select or as a simple menu.
Regarding the flags the changed value will look different. The flag inputOnly results in a string,
the flag multiple results in an array and without those flags the change event details contain an object.
As trigger type you can choose between an anchor, button or a select like looking container.

**Parameters**

-   `props` **[Object][3]** React props

**Properties**

-   `props` **[Object][3]** React properties object
    -   `props.type` **[string][4]** Type of trigger. Can be anchor, button, select or icon
    -   `props.text` **[string][4]** Text of trigger
    -   `props.icon` **[string][4]** Class name of icon in trigger
    -   `props.multiple` **[boolean][5]** Flag if the dropdown is a multi select menu
    -   `props.filterable` **[boolean][5]** Flag if the dropdown menu is filterable
    -   `props.inputOnly` **[boolean][5]** Flag if the dropdown only contains a text input and a button
    -   `props.filter` **[string][4]** Default filter value
    -   `props.limit` **[number][6]** Limit visible dropdown items. Use together with filterable flag.
    -   `props.orientation` **[string][4]** Dropdown orientation. Can be either left or right
    -   `props.placeholder` **[string][4]** Placeholder for text inputs (Filter input or Input only version)
    -   `props.selectAll` **[boolean][5]** Show button to select all items
    -   `props.onChange` **[string][4]** Callback for react components to propagate value changes

### getChildContext

Called by React to get the types of the child context values

Returns **[Object][3]** 

### componentDidMount

Start listening for clicks in window

Returns **void** 

### componentWillReceiveProps

Handle changes of passed properties

**Parameters**

-   `props` **[Object][3]** React props

Returns **void** 

### componentWillUnmount

Stop listening for clicks in window

Returns **void** 

### onAnyEvent

Prevent event to bubble up and keep it inside drop down

**Parameters**

-   `event` **[Event][7]** Event object

Returns **void** 

### onTriggerClick

Handle clicks on dropdown trigger

**Parameters**

-   `event` **[MouseEvent][8]** JavaScript event object

Returns **void** 

### onOpen

Call child onOpen function if available

Returns **void** 

### onClose

Call child onOpen function if available

Returns **void** 

### getTextFromValue

Get text from labels of selected items

**Parameters**

-   `value` **([string][4] \| [Object][3] \| [Array][1]&lt;[Object][3]>)** Selected items
-   `args` **[Array][1]&lt;any>** Optionally a default text can be passed

Returns **[string][4]** 

### setValue

Set the value of the dropdown and update the display text if the trigger element is a select

**Parameters**

-   `value` **([Object][3] \| [Array][1]&lt;[Object][3]>)** The new dropdown value

Returns **void** 

### createState

Create state object from properties

**Parameters**

-   `props` **[Object][3]** React props

Returns **[Object][3]** 

### handlePropagation

Handles data propagation from child elements

**Parameters**

-   `type` **[string][4]** Either change for value changes or change-height which will be emitted on menu changes
-   `data` **([Object][3] \| [number][6])** Either new value or height of new menu

Returns **void** 

### enrichItems

Used to convert the items if they are strings into the required object structure

**Parameters**

-   `items` **([string][4] \| [Array][1]&lt;([string][4] \| [Object][3])>)** List of items represented as string or object
-   `resolveLabel` **[Function][2]** Optional callback to resolve the item label (optional, default `value=>value`)

Returns **[Array][1]&lt;[Object][3]>** 

### renderTrigger

Renders the dropdown trigger element

Returns **[Object][3]** 

### renderContent

Render the content of the dropdown which can be a menu with only input and submit button
or a common menu with list items

Returns **[Object][3]** 

### render

Render the complete dropdown

Returns **[Object][3]** 

### defaultProps

Type: [Object][3]

### propTypes

Type: [Object][3]

### childContextTypes

Type: [Object][3]

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[5]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[6]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[7]: https://developer.mozilla.org/docs/Web/API/Event

[8]: https://developer.mozilla.org/docs/Web/API/MouseEvent
