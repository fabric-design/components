# ws-header
## Authorization

This class implements the OAuth2 authorization via the implicit flow.

**Parameters**

-   `storage`  
-   `loginUrl`   (optional, default `''`)
-   `refreshUrl`   (optional, default `''`)
-   `clientId`   (optional, default `''`)
-   `businessPartnerId`   (optional, default `''`)

### constructor

**Parameters**

-   `storage` **AbstractStorage** Key value storage
-   `loginUrl` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Url the user get's redirected to authorize (optional, default `''`)
-   `refreshUrl` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Url the app will send a POST to request a new access token (optional, default `''`)
-   `clientId` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** OAuth2 client id (optional, default `''`)
-   `businessPartnerId` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** OAuth2 business partner id (optional, default `''`)

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

Returns **void** 

### refresh

Request a new access token

**Parameters**

-   `token` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Refresh token

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
If you configured the header with a refreshUrl you should subscribe the ws-auth-changed event. It will be emitted
when the access token was refreshed and it will have the access token in the event details.

**Parameters**

-   `props`  

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

**Parameters**

-   `props` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** React/Preact props

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

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

### getLocale

Retrieve the persisted locale

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 
