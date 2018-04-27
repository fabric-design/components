# storage
## AbstractStorage

This class describes the interface of an storage class

**Parameters**

-   `name` **[string][1]** The storage name

### set

**Parameters**

-   `key` **[string][1]** Storage key name
-   `value` **any** Value to store

Returns **void** 

### get

**Parameters**

-   `key` **[string][1]** Storage key name

Returns **any** 

### remove

**Parameters**

-   `key` **[string][1]** Storage key name

Returns **void** 

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String
## CookieStorage

**Extends AbstractStorage**

This class implements a key value storage based on top level domain cookies

### set

Set value for specific key in cookies

**Parameters**

-   `key` **[string][1]** Storage key name
-   `value` **any** Value to store

Returns **void** 

### get

Get value from cookies by it's storage key

**Parameters**

-   `key` **[string][1]** Storage key name

Returns **any** 

### remove

Removes a stored value by its storage key

**Parameters**

-   `key` **[string][1]** Storage key name

Returns **void** 

### createCookie

Creates a cookie for the current top level domain

**Parameters**

-   `key` **[string][1]** Cookie name without storage name
-   `value` **any** Cookie value (not serialized)
-   `expires` **[Date][2]** Cookie expiration date

Returns **void** 

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date
## LocalStorage

**Extends AbstractStorage**

This class implements a key value storage based on top level domain cookies

### set

Set value for specific key in localStorage

**Parameters**

-   `key` **[string][1]** Storage key name
-   `value` **any** Value to store

Returns **void** 

### get

Get value from localStorage by it's storage key

**Parameters**

-   `key` **[string][1]** Storage key name

Returns **any** 

### remove

Removes a stored value by its storage key

**Parameters**

-   `key` **[string][1]** Storage key name

Returns **void** 

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String
