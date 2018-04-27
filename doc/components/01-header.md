# Header
<!---
General
All of our applications in Zalando requires a header, an authorization mechanism based on OAuth2 and most likely a localization for German and English users. To reduce the redundancy and effort every team had, we created a header component which ships all necessary features. You can set the application name, navigation links, listen on locale and authentication changes.
-->
## Usage
To use Header simply embed the ws-header in your application and import the scss rules. The color on theme that you selected for your product.
<div style="position: relative; overflow: hidden; padding-bottom: 120px">
  <ws-header appName="Demo Page" links.bind="[{label: 'Link', href: 'LinkValue', onClick: log},{label: 'Link2',href: '2222',children: [{label: 'Sub link 1', href: 'Go go app 1'},{label: 'Sub link 1', href: 'Go go app 1'}]}]"></ws-header>
</div>
```html
<ws-header
  appName="Demo Page"
  businessPartnerId="business-partner-id"
  clientId="youturn-client-id"
  links="{[
    {label: 'Link', href: 'LinkValue', onClick: (value) => console.log(value)},
    {
      label: 'Link2',
      href: '2222',
      children: [
        {label: 'Sub link 1', href: 'Go go app 1'},
        {label: 'Sub link 1', href: 'Go go app 1'}
      ]
    }
  ]}">
</ws-header>
```

## Alternate Link Components
If you need to use an alternate link component (such as, in this example, a Link component from react router) simply pass it instead of the link config object and it will be rendered in it's place.
```html
import { Link } from 'react-router-dom';

<ws-header
  appName="Demo Page"
  links={[
    (<Link to="/nmm">Somewhere</Link>),
    {
      label: 'Link',
      href: 'LinkValue',
      onClick: (value) => console.log(value)
    },
  ]}>
</ws-header>
```

## Persistence
These header component has to persist several values during page reloads. For instance the selected locale
or the requested access token and it's expiration time. Per default the header will use the local storage
but it can be configured to use the cookies as well. To do so you have to call a static function on the header class.
```html
<script>
  WSHeader.setStorageType('cookie', 'key-name-prefix');
</script>
```

## Localization
The header provides the user the possibility to select a language (browser language is selected by default). The selected
language will be persisted during reloads in the selected storage. To act on locale changes
you have to listen for the `ws-locale-changed` event on the window object.

<div style="position: relative; overflow: hidden; padding-bottom: 120px">
  <ws-header appName="Demo Page" ws-locale-changed.delegate="log('New locale is: ', $event.detail)"></ws-header>
</div>
```html
<ws-header appName="Demo Page"></ws-header>
<script>
  // To initialize your application specific localization get the current locale
  i18next.setLocale(WSHeader.getLocale());
  // To listen for locale changes bind a listener for ws-locale-changed
  window.addEventListener('ws-locale-changed', event => {
    console.log('New locale is: ', event.detail);
  });
</script>
```

## Authorization
Every user must retrieve an access token via the OAuth2 Implicit flow to get access to the backend resources.
The header already implements these implicit flow and a login button. To be able to authenticate with the
implicit flow you have to specify your client and business partner id. The default login url is: https://identity.zalando.com/oauth2/authorize
```html
<ws-header app-name="Test app" client-id="yourturn-client-id" business-partner-id="bpid"></ws-header>
```

##### Getting the access token
To retrieve the access token you have two possibilities. For the first option you have to
listen for the event `ws-auth-changed` on window object. The event details will contain an access token
if the access_token was successfully parsed from the location.hash. It can be empty when the token expired.
```html
<script>
  window.addEventListener('ws-auth-changed', event => {
      console.log('New access token is: ', event.detail);
  })
</script>
```

To get the access token, for example to validate if the user can access the current route, you can call
the static function `getAccessToken()` which will return the access token or null.
```html
<script>
  console.log('Current access token is: ', WSHeader.getAccessToken());
</script>
```

##### Programmatically request login / logout
If you want to display a login page to the user or manage by yourself when you want to login or logout,
you can do this by publishing `ws-authorize` or `ws-unauthorize` events to the window. The header is
listening for those events and triggers the corresponding action. Afterwards a `ws-auth-changed` event might occur.
```html
<script>
  window.addEventListener('ws-auth-changed', event => {
      console.log('New access token: ', event.detail);
  });
  // Request authorization will redirect the user to the OAuth2 authorize page
  window.dispatchEvent(new CustomEvent('ws-authorize'));
  // Request logout will remove the token from the storage and trigger a ws-auth-changed event
  window.dispatchEvent(new CustomEvent('ws-unauthorize'));
</script>
```
