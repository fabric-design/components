# ws-header
## Authorization

This class implements the OAuth2 authorization via the implicit flow.

**Parameters**

-   `storage` **AbstractStorage** Key value storage

### onAccessTokenChange

Set a listener for access token changes

**Parameters**

-   `callback` **[Function][1]** Gets called when the access token changes

Returns **void** 

### changeAccessToken

Get's called when ever the access token changes

**Parameters**

-   `accessToken` **([string][2] | null)** New access token

Returns **void** 

### tryFetchToken

Tries to parse the access token from the given query string

**Parameters**

-   `queryString` **[string][2]** Query string without leading ?

Returns **void** 

### authorize

Redirect the user to the OAuth2 authorization page

**Parameters**

-   `loginUrl` **[string][2]** Url the user get's redirected to authorize
-   `clientId` **[string][2]** OAuth2 client id
-   `businessPartnerId` **[string][2]** OAuth2 business partner id

Returns **void** 

### unauthorize

Remove authorization

Returns **void** 

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String
## JsonWebToken

This class represents a JWT token

**Parameters**

-   `token` **[string][1]** Json Web Token

### isValid

Determine if the token is still valid

Returns **[boolean][2]** 

### getUserAbbreviation

Get the user abbreviation the token was issued for

Returns **[string][1]** 

### toString

Return the real token

Returns **[string][1]** 

### valueOf

Return the real token

Returns **[string][1]** 

### toJSON

Return the real token

Returns **[string][1]** 

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean
## WSHeader

**Extends Component**

This component renders a generic header which provides authentication and language management

Optionally call WSHeader.setStorageType('cookie', 'zalando') If you want a to use cookies instead of localStorage
to persist the tokens. You can call WSHeader.getAccessToken().then(token => ...) to get the current access token.
It will resolve null when no access token is present and therefore the user isn't logged in.

**Parameters**

-   `props` **[Object][1]** React/Preact properties

**Properties**

-   `props` **[Object][1]** React properties object
    -   `props.loginUrl` **[string][2]** property used to set the application login url
    -   `props.businessPartnerId` **[string][2]** property used to set the application businessPartnerId
    -   `props.clientId` **[string][2]** property used to set the application yourturn clientId
    -   `props.links` **[Array][3]&lt;[Object][1]>** property used to set the list of links with multiple levels
    -   `props.appName` **[string][2]** property used to set the application name
    -   `props.appLogo` **[string][2]** property used to set the application image logo
    -   `props.rootUrl` **[string][2]** property used to set the root application url
    -   `props.showLocale` **[boolean][4]** Flag used to show the locale dropdown
    -   `props.showAuthorization` **[boolean][4]** Flag to show the login area
    -   `props.onLocaleChange` **[Function][5]** Function used to propagate data
    -   `props.onAuthChange` **[Function][5]** Function used to propagate data

### componentDidMount

Detect mounted state to prevent calling setState to early

Returns **void** 

### setLocale

Changes the locale to the given one

**Parameters**

-   `newLocale` **[string][2]** The new locale

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

-   `index` **[number][6]** The index of the item in the link list

Returns **void** 

### leaveMenuItem

Get's called when the mouse leaves a menu item

**Parameters**

-   `index` **[number][6]** The index of the item in the link list

Returns **void** 

### enterLevel2

Get's called when the mouse enters into the level 2 (sub menu)

Returns **void** 

### leaveLevel2

Get's called when the mouse leaves the level 2 (sub menu)

Returns **void** 

### renderLink

code climate demands abstraction; this makes links

**Parameters**

-   `link` **[Object][1]** link data, label, href, etc

Returns **JSX** a rendered link

### renderMenuCommons

Renders header commons (logo and App Name)

**Parameters**

-   `props` **[Object][1]** Component props

Returns **JSX** 

### render

Returns **[Object][1]** 

### storage

Default storage instance

Type: AbstractStorage

### authorization

Type: Authorization

### setStorageType

Initialize the storage

**Parameters**

-   `type` **[string][2]** Can be either cookie or local
-   `name` **[string][2]** Storage name will be used as key prefix

Returns **void** 

### getAccessToken

Tries to get the access token from authorization class

**Parameters**

-   `queryString` **[string][2]** The current query string to parse the token from (optional, default `window.location.hash.substr(1)`)

Returns **(JsonWebToken | null)** 

### removeAccessToken

Unauthorize will remove the access token from storage

Returns **void** 

### getLocale

Retrieve the persisted locale

Returns **[string][2]** 

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[5]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[6]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number
