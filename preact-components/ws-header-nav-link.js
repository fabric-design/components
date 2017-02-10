import {Component, h} from './preact';

export default class WSHeaderNavLink extends Component {
	render({ label, value, onclick }) {
		return h('li',
			{
				'class': 'nav-link',
				onclick: () => onclick(value)
			},
			[
				h('a', null, [label])
			]
		);
	}
}
