import { React, render } from '../components/imports';
import WSHeader from '../components/ws-header.js';

render(<WSHeader title='Demo Page' links={[
	{ label: 'Link', value: 'LinkValue', onclick: (value) => router.goTo(value) }
]}/>, document.body);
