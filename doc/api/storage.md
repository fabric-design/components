# storage
## AbstractStorage

This class describes the interface of an storage class

**Parameters**

-   `name`  

### constructor

**Parameters**

-   `name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The storage name

### set

**Parameters**

-   `key` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Storage key name
-   `value` **any** Value to store

Returns **void** 

### get

**Parameters**

-   `key` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Storage key name

Returns **any** 

### remove

**Parameters**

-   `key` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Storage key name

Returns **void** 
## CookieStorage

**Extends AbstractStorage**

This class implements a key value storage based on top level domain cookies

### set

Set value for specific key in cookies

**Parameters**

-   `key` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Storage key name
-   `value` **any** Value to store

Returns **void** 

### get

Get value from cookies by it's storage key

**Parameters**

-   `key` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Storage key name

Returns **any** 

### remove

Removes a stored value by its storage key

**Parameters**

-   `key` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Storage key name

Returns **void** 

### createCookie

Creates a cookie for the current top level domain

**Parameters**

-   `key` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Cookie name without storage name
-   `value` **any** Cookie value (not serialized)
-   `expires` **[Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)** Cookie expiration date

Returns **void** 
## LocalStorage

**Extends AbstractStorage**

This class implements a key value storage based on top level domain cookies

### set

Set value for specific key in localStorage

**Parameters**

-   `key` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Storage key name
-   `value` **any** Value to store

Returns **void** 

### get

Get value from localStorage by it's storage key

**Parameters**

-   `key` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Storage key name

Returns **any** 

### remove

Removes a stored value by its storage key

**Parameters**

-   `key` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Storage key name

Returns **void** 
