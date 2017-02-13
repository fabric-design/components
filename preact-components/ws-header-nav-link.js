import {Component, createElement as h} from './preact';

export default class WSHeaderNavLink extends Component {
	render({ label, value, onclick, key }) {
		return <li class='nav-link' key={key} onclick={() => onclick(value)} >
			<a>{label}</a>
		</li>;
	}
}
