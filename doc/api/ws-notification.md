# ws-notification
## WSNotification

**Extends Component**

This class renders a notification list. To add new notifications here you have to publish a event to the window
with the name 'ws-notification-open' and the options listed below. To close all notifications just publish a event
with the name 'ws-notification-close-all' to the window object.

Example with options:

**Examples**

```javascript
window.dispatchEvent(new CustomEvent('ws-notification-open', {detail: {
  title: 'test', // Required string
  description: 'additional info', // Optional string
  type: 'warning', // Enum of info|success|warning|error. Default: info
  lifetime: 5000, // Lifetime of notification in milliseconds. Default: max int
}});
```

### componentDidMount

Listen to events on window object

Returns **void** 

### componentDidUpdate

Trigger animation of new notification if needed

**Parameters**

-   `prevProps` **[Object][1]** Previous react component properties
-   `prevState` **[Object][1]** Previous react component state

Returns **void** 

### componentWillUnmount

Unbind event listener from window object

Returns **void** 

### addNotify

Callback of event to add new notification to the list

**Parameters**

-   `event` **[CustomEvent][2]** JavaScript event object

Returns **void** 

### animateIn

Start to animate in a notification

**Parameters**

-   `notification` **[Object][1]** The notification to animate in
-   `index` **[number][3]** Index of notification in the list

Returns **void** 

### closeAllEvents

Close all open notifications

Returns **void** 

### close

Close a specific notification

**Parameters**

-   `index` **[number][3]** The index of the notification in the list

Returns **void** 

### render

Render the notification list

Returns **[Object][1]** 

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[2]: https://developer.mozilla.org/docs/Web/API/CustomEvent/CustomEvent

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number
