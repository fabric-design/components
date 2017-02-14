import {Component, createElement} from './preact';

export default class WSHeaderNavLink extends Component {
	render() {
		return <li class='nav-link' key={this.props.key} onClick={() => this.props.link.onclick && this.props.link.onclick(this.props.link.value)} >
			<a>{this.props.link.label}</a>
		</li>;
	}
}
