import {React, PureComponent} from '../imports';

/**
 * Helper Class which is just rendering a single navigation link element
 * @class WSHeaderNavLink
 */
export default class WSHeaderNavLink extends PureComponent {
  /**
   * Render method of class
   * @returns {JSX} rendered template
   */
  render() {
    return (<li className="nav-link" key={this.props.key} onClick={() => this.props.link.onclick && this.props.link.onclick(this.props.link.value)} >
      <a>{this.props.link.label}</a>
    </li>);
  }
}
