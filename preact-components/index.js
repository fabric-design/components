import { createElement, Component, render } from './preact';
import WSHeader from './ws-header.js';

render(<WSHeader title='Demo Page' links={[
	{ label: 'Link', value: 'LinkValue', onclick: (value) => alert(value) }
]}/>, document.body);
