# Inline Edit

## Usage
The inline edit is a managed text input which reduces visual noise when not active. When the input has focus 
it is rendered as normal input and if not it looks like normal text.

<ws-inline-edit type="number" value="123,456" change.delegate="console.log($event.detail)" options.bind="{locale: 'en'}"></ws-inline-edit>
```html
<ws-inline-edit
  type="number" 
  value="123,456"
  options={{locale: 'en'}}>
</ws-inline-edit>
```

## Types
The input has right now 3 different types which validates the input value and converts the text value into the proper type.
Available types are: text, number, price. 

#### Type: Text
When selecting text the text is not validated and all values are allowed. 

<ws-inline-edit value="Some crazy text" change.delegate="console.log($event.detail)" type="text"></ws-inline-edit>
```html
<ws-inline-edit
  type="text" 
  value="Some crazy text">
</ws-inline-edit>
```

#### Type: Number
With this type is set, the value will be validated to follow the pattern for german or english style. Optional a locale
can be specified to force a specific number pattern. German numbers have commas as decimal and dots as thousand separator.
English numbers have dots as thousands operator and dots as decimal separator.  

Input with flexible number style:
<ws-inline-edit value="123.1245" change.delegate="console.log($event.detail)" type="number"></ws-inline-edit>
```html
<ws-inline-edit
  type="number" 
  value="123.1245">
</ws-inline-edit>
```

#### Type: Price
The difference to the type number here is that the decimal precision is fixed to two. 

<ws-inline-edit value="123.12" change.delegate="console.log($event.detail)" type="price" options.bind="{locale: 'en'}"></ws-inline-edit>
```html
<ws-inline-edit
  type="price" 
  value="123.12"
  options={{locale: 'en'}}>
</ws-inline-edit>
```

## Narrow look
In several places you will have to show editable values which are pretty tiny and got not much space. Here the look="narrow"
is a good choice. It reduces the top and bottom padding, inherits the line height and auto-magically resize the inputs
to fit their content. The style is adjusted as well to make it more clear which texts are editable.

<ws-inline-edit value="Crazy text" change.delegate="console.log($event.detail)" look="narrow"></ws-inline-edit>
```html
<ws-inline-edit 
  value="Crazy text"
  look="narrow">
</ws-inline-edit>
```
