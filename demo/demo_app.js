import { React, render } from '../components/imports';
import WSHeader from '../components/ws-header/';
import WSNotification from '../components/ws-notification/';

render(<div>
	<WSHeader title='Demo Page' links={[
		{ label: 'Link', value: 'LinkValue', onclick: (value) => router.goTo(value) }
	]}/>
	<WSNotification/>
</div>
, document.getElementById('root'));
