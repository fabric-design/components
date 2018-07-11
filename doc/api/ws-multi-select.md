# ws-multi-select
## WSMultiSelect

**Extends WSDropdown**

This component provides another way to hav a multi select with dropdown.
It renders an input which opens a dropdown on focus. Items selected from the dropdown
appear in a list below the input.

**Properties**

-   `filtered` **[boolean][1]** Must be true to tell the underlaying dropdown that the filtering is outside

### componentDidMount

Bind event listeners when attached to DOM

Returns **void** 

### componentWillUnmount

Unbind event listeners before detaching from dom

Returns **void** 

### onClickIcon

Focus input on icon click

**Parameters**

-   `event` **[MouseEvent][2]** JavaScript event object

Returns **void** 

### onKeyUp

Handle input change

**Parameters**

-   `event` **[KeyboardEvent][3]** JavaScript event object

Returns **void** 

### onFocus

Opening dropdown when focusing the input

**Parameters**

-   `event` **[Event][4]** JavaScript event object

Returns **void** 

### onBlur

Close dropdown when blurring the input

**Parameters**

-   `event` **[Object][5]** JavaScript event object

Returns **void** 

### stopPropagation

Stop propagation of native change events

**Parameters**

-   `event` **[Event][4]** JavaScript event object

Returns **void** 

### setValue

Create new value

**Parameters**

-   `item` **[Object][5]** Selected item

Returns **void** 

### removeItem

Remove clicked item from value list

**Parameters**

-   `item` **[Object][5]** Clicked item

Returns **void** 

### renderTrigger

Returns **JSX** 

### render

Returns **JSX** 

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[2]: https://developer.mozilla.org/docs/Web/API/MouseEvent

[3]: https://developer.mozilla.org/docs/Web/API/KeyboardEvent

[4]: https://developer.mozilla.org/docs/Web/API/Event

[5]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object
