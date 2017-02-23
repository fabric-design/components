import { React, render } from '../components/imports';
import WSHeader from '../components/ws-header/ws-header';

let linkValue = 'link_value';
render(<WSHeader
  title="Demo Page"
  links={[
    { label: 'Link', onclick: () => alert('Clicked on Link:', linkValue) },
  ]}
/>, document.body);
