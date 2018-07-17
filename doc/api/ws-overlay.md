# ws-overlay
## WSOverlay

**Extends Component**

This class provides basic functionality to show content in an absolute positioned overlay. It either detects
the height of it's content automatically by their clientHeight or you can use the setHeight function to
programmatically set the overlay height.

**Parameters**

-   `props` **[Object][1]** React props

**Properties**

-   `width` **[number][2]** Width of the overlay in percent
-   `orientation` **[string][3]** Can be either left or right
-   `onOpen` **[Function][4]** Will be called when dialog opened
-   `onClose` **[Function][4]** Will be called when dialog closed

### onDocumentClick

Handles click on document body to close the dropdown if clicked elsewhere

**Parameters**

-   `event` **[MouseEvent][5]** JavaScript event object

Returns **void** 

### onGlobalKeyDown

Handles global key down events when dropdown was opened

**Parameters**

-   `event` **[KeyboardEvent][6]** JavaScript event object

Returns **void** 

### setHeight

Set's the size on an element

**Parameters**

-   `newHeight` **[number][2]** The new size of the active menu will become the new dropdown container size

Returns **void** 

### open

Opens the dropdown

Returns **void** 

### close

Closes the dropdown and clears the selection if needed

Returns **void** 

### toggle

Open or close the overlay

Returns **void** 

### animateElement

Animates an element by adding a class with an css animation and executes a callback when the animation ends

**Parameters**

-   `item` **[Element][7]** The dom node to animate
-   `animationClass` **[string][3]** The css class which holds the animation definition
-   `callback` **[Function][4]** Callback which will be executed at the end of the animation

Returns **void** 

### calculateWidth

Returns **[string][3]** 

### render

Render the complete dropdown

Returns **[Object][1]** 

### defaultProps

React default property values

Type: [Object][1]

### propTypes

React property types

Type: [Object][1]

### openOverlay

Holds the instance of the currently open overlay

Type: [WSOverlay][8]

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[5]: https://developer.mozilla.org/docs/Web/API/MouseEvent

[6]: https://developer.mozilla.org/docs/Web/API/KeyboardEvent

[7]: https://developer.mozilla.org/docs/Web/API/Element

[8]: #wsoverlay
