import { React, render } from '../src/imports';
import WSHeader from '../src/ws-header.js';

render(<WSHeader title='Demo Page' links={[
	{ label: 'Link', value: 'LinkValue', onclick: (value) => router.goTo(value) }
]}/>, document.body);
