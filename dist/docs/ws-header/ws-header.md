## Classes

<dl>
<dt><a href="#WSHeader">WSHeader</a> ⇐ <code>Component</code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#getTokenFromUrl">getTokenFromUrl(url)</a></dt>
<dd><p>getTokenFromUrl</p>
</dd>
<dt><a href="#getCookieValue">getCookieValue(a)</a> ⇒ <code>String</code></dt>
<dd><p>Get Cookie Value</p>
</dd>
<dt><a href="#guid">guid()</a> ⇒ <code>String</code></dt>
<dd><p>GUID</p>
</dd>
<dt><a href="#setSessionState">setSessionState()</a> ⇒ <code>String</code></dt>
<dd><p>Sets Session State</p>
</dd>
</dl>

<a name="WSHeader"></a>

## WSHeader ⇐ <code>Component</code>
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

<a name="new_WSHeader_new"></a>

### new exports.WSHeader()
The default Header to be used everywhere

<a name="getTokenFromUrl"></a>

## getTokenFromUrl(url)
getTokenFromUrl

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | url string returns {String} token part |

<a name="getCookieValue"></a>

## getCookieValue(a) ⇒ <code>String</code>
Get Cookie Value

**Kind**: global function  
**Returns**: <code>String</code> - cookie value for key  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>String</code> | cookie key to match |

<a name="guid"></a>

## guid() ⇒ <code>String</code>
GUID

**Kind**: global function  
**Returns**: <code>String</code> - string  
<a name="setSessionState"></a>

## setSessionState() ⇒ <code>String</code>
Sets Session State

**Kind**: global function  
**Returns**: <code>String</code> - encoded URI component of state  
