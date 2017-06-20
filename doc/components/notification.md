# Notification

## Setup
Because the notifications are elements which should be displayed on top of everything and relative to the window
you have to add the tag `<ws-notification></ws-notification>` to the most root container you can add.
So either document body or the application root depending on your setup. This notification element is
just the holder / list of notifications.

## Creating notifications
To create a notification you have to publish a custom event to the window containing the relevant data.
The type of the event has to be `ws-notification-open` and the details has to be an object containing:
- **title**: string, required
- **description**: string, optional
- **type**: string, oneOf: info|error|warning|success, default: info
- **lifetime**: number, milliseconds until disappearing, default: 2147483647

<button class="mod-small" id="notification1" click.delegate="notification({title: 'Do you want to stay logged in?', type: 'info', lifetime: 5000})">Show notification</button>
```html
<button class="mod-small" id="notification1">Show notification</button>
<script type="text/javascript">
  document.getElementById('notification1').addEventListener('click', event => {
    window.dispatchEvent(new CustomEvent('ws-notification-open', {detail: {title: 'Do you want to stay logged in?', type: 'info', lifetime: 5000}}));
  });
</script>
```

## Options
Here you can try out the different combinations of the options you can provide to the notification.
<div class="row collapse">
  <div class="column small-6">
    <label>Title</label>
    <input type="text" placeholder="Title" value="Some title" ref="navTitle" />
  </div>
  <div class="column small-6">
    <label>Description</label>
    <input type="text" placeholder="Title" ref="navDescription" />
  </div>
  <div class="column small-6">
    <label>Type</label>
    <select ref="navType">
      <option value="info">Info</option>
      <option value="success">Success</option>
      <option value="warning">Warning</option>
      <option value="error">Error</option>
    </select>
  </div>
  <div class="column small-6">
    <label>Lifetime</label>
    <input type="number" placeholder="Title" value="5000" ref="navLifetime" />
  </div>
</div></br>
<button class="mod-small" click.delegate="notification({title: navTitle.value, description: navDescription.value, type: navType.value, lifetime: navLifetime.value})">Show notification</button>
