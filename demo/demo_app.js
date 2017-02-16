import { React, render } from '../components/imports';
import WSHeader from '../components/ws-header.js';
import WSDatePicker from '../components/ws-date-picker/ws-date-picker.js';

render(
	<div>
		<WSHeader title='Demo Page' links={[
			{ label: 'Link', value: 'LinkValue', onclick: (value) => router.goTo(value) }
		]}/>
		<WSDatePicker />
	</div>, document.body);
