## Classes

<dl>
<dt><a href="#WSHeader">WSHeader</a> ⇐ <code>Component</code></dt>
<dd><p>The default Header to be used everywhere</p>
</dd>
<dt><a href="#WSHeader">WSHeader</a></dt>
<dd></dd>
</dl>

<a name="WSHeader"></a>

## WSHeader ⇐ <code>Component</code>
The default Header to be used everywhere

**Kind**: global class  
**Extends**: <code>Component</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | properties |
| props.setLang | <code>function</code> | handler which sets language |
| props.setLogin | <code>function</code> | handler which sets Login information (token and boolan for loggedin) |
| props.clientId | <code>number</code> | clientId |
| props.redirectUrl | <code>string</code> | URL to redirect after successfully login |
| props.logoUrl | <code>string</code> | url for logo |
| props.title | <code>string</code> | title of Header |
| props.links | <code>array</code> | List of navigation links based on object format {label, value, onclick-Handler } |


* [WSHeader](#WSHeader) ⇐ <code>Component</code>
    * [new WSHeader()](#new_WSHeader_new)
    * [.componentDidMount()](#WSHeader+componentDidMount) ⇒ <code>void</code>
    * [.getStateFromUrl(url)](#WSHeader+getStateFromUrl) ⇒ <code>String</code>
    * [.getToken(orgUrl)](#WSHeader+getToken) ⇒ <code>String</code>
    * [.getLanguage(state)](#WSHeader+getLanguage) ⇒ <code>object</code>

<a name="new_WSHeader_new"></a>

### new WSHeader()
Constructor of WSHeader
it is initializing default values for the state object

<a name="WSHeader+componentDidMount"></a>

### wsHeader.componentDidMount() ⇒ <code>void</code>
Lifecycle: componentDidMount handler for component

**Kind**: instance method of <code>[WSHeader](#WSHeader)</code>  
<a name="WSHeader+getStateFromUrl"></a>

### wsHeader.getStateFromUrl(url) ⇒ <code>String</code>
Method to extract state parameter from url

**Kind**: instance method of <code>[WSHeader](#WSHeader)</code>  
**Returns**: <code>String</code> - state information  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | urlString to extract state parameter |

<a name="WSHeader+getToken"></a>

### wsHeader.getToken(orgUrl) ⇒ <code>String</code>
Method to get user auth token

**Kind**: instance method of <code>[WSHeader](#WSHeader)</code>  
**Returns**: <code>String</code> - auth token  

| Param | Type | Description |
| --- | --- | --- |
| orgUrl | <code>String</code> | url to receive Token |

<a name="WSHeader+getLanguage"></a>

### wsHeader.getLanguage(state) ⇒ <code>object</code>
get Language from state / localStorage

**Kind**: instance method of <code>[WSHeader](#WSHeader)</code>  
**Returns**: <code>object</code> - language object  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>object</code> | state object of component |

<a name="WSHeader"></a>

## WSHeader
**Kind**: global class  

* [WSHeader](#WSHeader)
    * [new WSHeader()](#new_WSHeader_new)
    * [.componentDidMount()](#WSHeader+componentDidMount) ⇒ <code>void</code>
    * [.getStateFromUrl(url)](#WSHeader+getStateFromUrl) ⇒ <code>String</code>
    * [.getToken(orgUrl)](#WSHeader+getToken) ⇒ <code>String</code>
    * [.getLanguage(state)](#WSHeader+getLanguage) ⇒ <code>object</code>

<a name="new_WSHeader_new"></a>

### new WSHeader()
Constructor of WSHeader
it is initializing default values for the state object

<a name="WSHeader+componentDidMount"></a>

### wsHeader.componentDidMount() ⇒ <code>void</code>
Lifecycle: componentDidMount handler for component

**Kind**: instance method of <code>[WSHeader](#WSHeader)</code>  
<a name="WSHeader+getStateFromUrl"></a>

### wsHeader.getStateFromUrl(url) ⇒ <code>String</code>
Method to extract state parameter from url

**Kind**: instance method of <code>[WSHeader](#WSHeader)</code>  
**Returns**: <code>String</code> - state information  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | urlString to extract state parameter |

<a name="WSHeader+getToken"></a>

### wsHeader.getToken(orgUrl) ⇒ <code>String</code>
Method to get user auth token

**Kind**: instance method of <code>[WSHeader](#WSHeader)</code>  
**Returns**: <code>String</code> - auth token  

| Param | Type | Description |
| --- | --- | --- |
| orgUrl | <code>String</code> | url to receive Token |

<a name="WSHeader+getLanguage"></a>

### wsHeader.getLanguage(state) ⇒ <code>object</code>
get Language from state / localStorage

**Kind**: instance method of <code>[WSHeader](#WSHeader)</code>  
**Returns**: <code>object</code> - language object  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>object</code> | state object of component |

