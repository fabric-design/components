import { React, render } from '../components/imports';
import WSHeader from '../components/ws-header/ws-header';
import WSNotification from '../components/ws-notification/';

let linkValue = 'link_value';
render(<div>
	<WSHeader
	  title="Demo Page"
	  links={[
	    { label: 'Link', onclick: () => alert('Clicked on Link:', linkValue) },
	  ]}
	/>
	<WSNotification/>
</div>, document.getElementById('root'));
