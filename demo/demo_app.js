import { React, render } from '../src/imports';
import WSHeader from '../src/ws-header/ws-header';

const linkValue = 'link_value';
render(<WSHeader
  title="Demo Page"
  links={[
    { label: 'Link', onclick: () => alert('Clicked on Link:', linkValue) },
  ]}
/>, document.body);
