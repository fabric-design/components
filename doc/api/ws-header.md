# ws-header
## Authorization

This class implements the OAuth2 authorization via the implicit flow.

**Parameters**

-   `storage`  

### constructor

**Parameters**

-   `storage` **AbstractStorage** Key value storage

### onAccessTokenChange

Set a listener for access token changes

**Parameters**

-   `callback` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Gets called when the access token changes

Returns **void** 

### changeAccessToken

Get's called when ever the access token changes

**Parameters**

-   `accessToken` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | null)** New access token

Returns **void** 

### tryFetchToken

Tries to parse the access token from the given query string

**Parameters**

-   `queryString` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Query string without leading ?

Returns **void** 

### authorize

Redirect the user to the OAuth2 authorization page

**Parameters**

-   `loginUrl` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Url the user get's redirected to authorize
-   `clientId` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** OAuth2 client id
-   `businessPartnerId` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** OAuth2 business partner id

Returns **void** 

### unauthorize

Remove authorization

Returns **void** 
## WSHeader

**Extends Component**

This component renders a generic header which provides authentication and language management

Optionally call WSHeader.setStorageType('cookie', 'zalando') If you want a to use cookies instead of localStorage
to persist the tokens. You can call WSHeader.getAccessToken().then(token => ...) to get the current access token.
It will resolve null when no access token is present and therefore the user isn't logged in.

**Parameters**

-   `props`  

**Properties**

-   `props` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** React properties object
    -   `props.loginUrl` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** property used to set the application login url
    -   `props.businessPartnerId` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** property used to set the application businessPartnerId
    -   `props.clientId` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** property used to set the application yourturn clientId
    -   `props.links` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)>** property used to set the list of links with multiple levels
    -   `props.appName` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** property used to set the application name
    -   `props.appLogo` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** property used to set the application image logo
    -   `props.rootUrl` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** property used to set the root application url
    -   `props.showLocale` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Flag used to show the locale dropdown
    -   `props.showAuthorization` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Flag to show the login area
    -   `props.onLocaleChange` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function used to propagate data
    -   `props.onAuthChange` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function used to propagate data

### constructor

**Parameters**

-   `props` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** React/Preact properties

### componentDidMount

Detect mounted state to prevent calling setState to early

Returns **void** 

### setLocale

Changes the locale to the given one

**Parameters**

-   `newLocale` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The new locale

Returns **void** 

### initState

Initialize the component state

Returns **void** 

### initAuthorization

Initialize the OAuth2 authorization

Returns **void** 

### login

Trigger login process

Returns **void** 

### logout

Delete tokens from storage to logout

Returns **void** 

### enterMenuItem

Get's called when the mouse enters a menu item

**Parameters**

-   `index` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The index of the item in the link list

Returns **void** 

### leaveMenuItem

Get's called when the mouse leaves a menu item

**Parameters**

-   `index` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The index of the item in the link list

Returns **void** 

### enterLevel2

Get's called when the mouse enters into the level 2 (sub menu)

Returns **void** 

### leaveLevel2

Get's called when the mouse leaves the level 2 (sub menu)

Returns **void** 

### render

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### authorization

### storage

Default storage instance

### setStorageType

Initialize the storage

**Parameters**

-   `type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Can be either cookie or local
-   `name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Storage name will be used as key prefix

Returns **void** 

### getAccessToken

Tries to get the access token from authorization class

**Parameters**

-   `queryString` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The current query string to parse the token from (optional, default `location.hash.substr(1)`)

Returns **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | null)** 

### removeAccessToken

Unauthorize will remove the access token from storage

Returns **void** 

### getUserAbbreviation

Get abbreviation for the user the access token is issued for

Returns **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | null)** 

### getLocale

Retrieve the persisted locale

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 
