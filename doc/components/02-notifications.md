# Notifications
Before you start using notifications, make sure that you [Feedback Principles](../#/general/8-feedback).

![Example](src/style/assets/not-ex1.jpg)
<p>Use it for general system feedback.</p>

![Example](src/style/assets/not-ex2.jpg)
<p>When feedback is connected with a specific screen area use contextual feedback instead.</p>

![Example](src/style/assets/not-ex3.jpg)
<p>Do not use notifications for obvious feedback.</p>

## Feedback categories
Feedback info should be categorized in one of those categories:

### Neutral
General information
<p><button class="mod-secondary mod-small" click.delegate="notification({title: 'Version 1.1 available', description: 'Your app will be updated automatically', type: 'info', lifetime: 2000})">Show notification</button></p>

<h3 style="color:#F44F41">Error</h3>
Information about system problem
<p><button class="mod-small mod-secondary" click.delegate="notification({title: 'Database not available', description: 'Contact Administrator for more details', type: 'error', lifetime: 2000})">Show notification</button></p>

<h3 style="color:#1EB234">Success</h3>
Information about successful or finished activity
<p><button class="mod-small mod-secondary" click.delegate="notification({title: 'Upload successful', type: 'success', lifetime: 2000})">Show notification</button></p>

<h3 style="color:#FF9C0F">Warning</h3>
Information about action that can be potentially harmful
<p><button class="mod-small mod-secondary" click.delegate="notification({title: 'Upload server almost full', description: '203MB left. Delete pictures that will not be needed anymore.', type: 'warning', lifetime: 2000})">Show notification</button></p>

## Content
Feedback content consist main information and (if needed) further description.

![Example](src/style/assets/not-ex4.jpg)
<p>Use natural, user language, suggest possible solution.</p>

![Example](src/style/assets/not-ex5.jpg)
<p>Avoid technical jargon and generic error messages.</p>

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
