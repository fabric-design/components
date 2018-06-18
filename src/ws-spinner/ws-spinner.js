import {React, Component, PropTypes} from '../imports';

/**
 * Renders a simple spinner with the primary color
 * @property {string} size One of small, medium, large. Default to medium
 * @property {boolean} isWhite True if the spinner color should be white
 */
export class WSSpinner extends Component {

  /**
   * @type {Object}
   */
  static propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    isWhite: PropTypes.bool
  };

  /**
   * @type {Object}
   */
  static defaultProps = {
    size: 'medium',
    isWhite: false
  };

  /**
   * @returns {JSX}
   */
  render() {
    return (
      <div className={`spinner mod-${this.props.size} ${this.props.isWhite ? 'mod-white' : ''}`}>
        <div className="spinner-layer">
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>
      </div>
    );
  }
}
