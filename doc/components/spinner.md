# Spinner

The spinner should be shown on every user interaction where the response could take longer than 250ms.
By default the spinner has the size medium with 32x32 pixel but it can be made small with 16x16 pixel or big with 48x48 pixel.
To do this just set the attribute `size` with `small` or `large`. 

<div class="row">
  <div class="column small-5">
    <ws-spinner size="large"></ws-spinner>
  </div>
  <div class="column small-5">
    <ws-spinner></ws-spinner>
  </div>
  <div class="column small-5 end">
    <ws-spinner size="small"></ws-spinner>
  </div>
</div>
```html
<div class="row">
  <div class="column small-5">
    <ws-spinner size="large"></ws-spinner>
  </div>
  <div class="column small-5">
    <ws-spinner></ws-spinner>
  </div>
  <div class="column small-5 end">
    <ws-spinner size="small"></ws-spinner>
  </div>
</div>
```

The spinner color will be the primary color.
If you want to display a spinner for instance on a button you have to change the color to white by adding
the boolean attribute `is-white`.

<button class="mod-small">
  <span>Click Me</span>&nbsp;
  <ws-spinner size="small" is-white></ws-spinner>
</button>
```html
<button>
  <span>Click Me</span>
  <ws-spinner size="small" is-white></ws-spinner>
</button>
```
