# Tab Menu

## Usage
A tab menu only requires the items to be specified while a item can consist of a label, value, badge or a disabled flag.
<ws-tab-menu items.bind="[{label: 'This is my awesome tab 1', value: 1}, {value: 'tab 2'}, {label: 'With badge', value: 3, badge: 54}]"></ws-tab-menu>
```html
<ws-tab-menu items="[
    {label: 'This is my awesome tab 1', value: 1},
    {value: 'tab 2'},
    {label: 'With badge', value: 3, badge: 54}
  ]">
</ws-tab-menu>
```

## Value
<ws-tab-menu value="tab 2" items.bind="[{label: 'This is my awesome tab 1', value: 1}, {value: 'tab 2'}, {label: 'With badge', value: 3, badge: 54}]"></ws-tab-menu>
```html
<ws-tab-menu value="tab 2" items="[
    {label: 'This is my awesome tab 1', value: 1},
    {value: 'tab 2'},
    {label: 'With badge', value: 3, badge: 54}
  ]">
</ws-tab-menu>
```
