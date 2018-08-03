# types
## AbstractTypeStrategy

Abstract strategy class to handle different types of inline edit

**Parameters**

-   `options` **[Object][1]** Options for this strategy

### validate

Validates the input value

**Parameters**

-   `value` **any** Value to validate

Returns **[boolean][2]** 

### convert

Converts the input value into a usable value

**Parameters**

-   `value` **any** Value to convert

Returns **any** 

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean
## NumberStrategy

**Extends AbstractTypeStrategy**

Strategy to handle number type of inline edit

**Parameters**

-   `options` **[Object][1]** Type options

### validate

Validate if the given value is a valid number

**Parameters**

-   `value` **[string][2]** The input value

Returns **[boolean][3]** 

### convert

Converts the localized string number to a decimal

**Parameters**

-   `value` **[string][2]** The input value

Returns **[number][4]** 

### convertToDecimal

Converts a localized number string to float or int (no thousand separator, decimal with dot)

**Parameters**

-   `match` **[string][2]** Unused
-   `parts` **[Array][5]&lt;[string][2]>** Matched groups of applied reg ex. Depending on the applied regexp only some
    indexes are filled. For german or english index 0 - 2 will be filled. If no locale specified 0-2 will be filled
    if the number is in english format and 3-5 if it is in english format.

Returns **[string][2]** 

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[5]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array
## PriceStrategy

**Extends AbstractTypeStrategy**

Strategy to handle price type of inline edit

**Parameters**

-   `options` **[Object][1]** Type options

### validate

Validate if the given value is a valid number

**Parameters**

-   `value` **[string][2]** The input value

Returns **[boolean][3]** 

### convert

Converts the localized string number to a decimal

**Parameters**

-   `value` **[string][2]** The input value

Returns **[number][4]** 

### convertToDecimal

Converts a localized number string to float or int (no thousand separator, decimal with dot)

**Parameters**

-   `match` **[string][2]** Unused
-   `parts` **[Array][5]&lt;[string][2]>** Matched groups of applied reg ex. Depending on the applied regexp only some
    indexes are filled. For german or english index 0 - 2 will be filled. If no locale specified 0-2 will be filled
    if the number is in english format and 3-5 if it is in english format.

Returns **[string][2]** 

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[5]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array
## TextStrategy

**Extends AbstractTypeStrategy**

Strategy to handle text type of inline edit

### validate

Validates the input value

**Parameters**

-   `value` **any** Value to validate

Returns **[boolean][1]** 

### convert

Converts the input value into a usable value

**Parameters**

-   `value` **any** Value to convert

Returns **any** 

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean
## TypeHandler

Handler of strategies to manage inline edit types

### getStrategy

Get the type strategy for the given type

**Parameters**

-   `type` **[string][1]** Inline edit type
-   `options` **[Object][2]** Type options

Returns **void** 

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object
