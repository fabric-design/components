## Members

<dl>
<dt><a href="#WSDropdownItem">WSDropdownItem</a></dt>
<dd><p>This class renders a list item inside a dropdown menu. Since the wrapper menu is missing this class is pretty
useless as standalone. It also renders child menu&#39;s if the passed item has children.
The item object can have the following properties
{
    label: String,
    href: String, // Fully qualified URI
    icon: String, // The icon of an item must be a css class name
    children: Array<Item>,
    selected: Boolean, // Adds the class .is-active to the .dropdown-item
    focused: Boolean, // Adds the class .is-focused to the .dropdown-item
    disabled: Boolean // Adds thr class .is-disabled to the .dropdown-item
}</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#value">value()</a> ⇒ <code>Object</code></dt>
<dd><p>Renders the dropdown item</p>
</dd>
</dl>

<a name="WSDropdownItem"></a>

## WSDropdownItem
This class renders a list item inside a dropdown menu. Since the wrapper menu is missing this class is pretty
useless as standalone. It also renders child menu's if the passed item has children.
The item object can have the following properties
{
    label: String,
    href: String, // Fully qualified URI
    icon: String, // The icon of an item must be a css class name
    children: Array<Item>,
    selected: Boolean, // Adds the class .is-active to the .dropdown-item
    focused: Boolean, // Adds the class .is-focused to the .dropdown-item
    disabled: Boolean // Adds thr class .is-disabled to the .dropdown-item
}

**Kind**: global variable  
<a name="value"></a>

## value() ⇒ <code>Object</code>
Renders the dropdown item

**Kind**: global function  
