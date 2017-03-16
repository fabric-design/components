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

