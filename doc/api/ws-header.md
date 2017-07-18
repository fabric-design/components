# ws-header
## WSHeaderNavLink

Helper component which is just rendering a single navigation link element

**Parameters**

-   `props` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** properties
    -   `props.key` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** key for the list item
    -   `props.link` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** link to render
        -   `props.link.onclick` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** callback for clicks on the link
        -   `props.link.label` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** label to show for the link

Returns **JSX** rendered template
## WSHeader

**Extends Component**

The default Header to be used everywhere

**Properties**

-   `props` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** properties
    -   `props.setLang` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** handler which sets language
    -   `props.setLogin` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** handler which sets Login information (token and boolan for loggedin)
    -   `props.clientId` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** clientId
    -   `props.redirectUrl` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** URL to redirect after successfully login
    -   `props.logoUrl` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** url for logo
    -   `props.title` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** title of Header
    -   `props.links` **[array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** List of navigation links based on object format {label, onclick-Handler }

### constructor

Constructor of WSHeader
it is initializing default values for the state object

### componentDidMount

Lifecycle: componentDidMount handler for component

Returns **void** 

### getStateFromUrl

Method to extract state parameter from url

**Parameters**

-   `url` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** urlString to extract state parameter

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** state information

### getToken

Method to get user auth token

**Parameters**

-   `orgUrl` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** url to receive Token

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token string

### setCookie

Sets cookie for a given token

**Parameters**

-   `token` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Token String

Returns **void** 

### getLanguage

get Language from state / localStorage

**Parameters**

-   `state` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** state object of component

Returns **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** language object

### setLanguage

Language string to set navigation

**Parameters**

-   `lang` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Language string

Returns **void** 

### removeCookie

Removes cookie

Returns **void** 

### checkIsLoggedIn

Helper method checking if the user is already logged in

Returns **([Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | void)** 

### propagateLoginStatusChange

Updates changed login status

**Parameters**

-   `isLoggedIn` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** updated status of logged in user
-   `token` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Token String

Returns **void** 

### checkSessionState

Helper method checking current session state

**Parameters**

-   `state` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** String containing state

Returns **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** valid boolean

### login

Login

Returns **void** 

### logout

Logout

Returns **void** 

### render

Render function of component

Returns **JSX** JSX string representation of WSHeader

### propTypes

## failureListener

React to failure in user authentication

Returns **void** 

## successListener

react to success in user authentication

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** is the user logged in

## userServiceSuccess

react to success in the user lookup
set the local state with the looked up user name and email

Returns **void** 

## getTokenFromUrl

getTokenFromUrl

**Parameters**

-   `url` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** url string

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** token part

## getCookieValue

Get Cookie Value

**Parameters**

-   `a` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** cookie key to match

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** cookie value for key

## guid

Generate a global unique identifier

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** string

## s4

Helper method for calculating a unique Id

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

## setSessionState

Sets Session State

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** encoded URI component of state