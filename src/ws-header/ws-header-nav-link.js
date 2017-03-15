import { React, Component } from '../imports';

export default class WSHeaderNavLink extends Component {
  render() {
    return (<li className="nav-link" key={this.props.key} onClick={() => this.props.link.onclick && this.props.link.onclick(this.props.link.value)} >
      <a>{this.props.link.label}</a>
    </li>);
  }
}
