import React from 'react';
import {Component, PropTypes} from '../imports';

/**
 * This class describes a Preact/React component which renders a single tile
 * @property {Object} props React properties object
 * @property {Object} props.identifier identifier of the tile
 * @property {Object} props.config Defines the background color of the tile
 * @property {Object} props.tileClass The class of the tile which can also be used for color styling
 * @property {number} props.size Defines the width and height of the tile
 */
export class Tile extends Component {

  /**
   * @type {Object}
   */
  static propTypes = {
    identifier: PropTypes.string,
    config: PropTypes.string,
    tileClass: PropTypes.string,
    size: PropTypes.number
  };


  /**
   * @type {Object}
   */
  static defaultProps = {
    identifier: '',
    config: '',
    tileClass: '',
    size: 25
  };

  /**
   * Renders the chart
   * @returns {Object}
   */
  render() {
    const {config, size} = this.props;
    const style = {
      backgroundColor: config,
      width: `${size}px`,
      height: `${size}px`
    };

    return (
      <div className={`tile ${this.props.tileClass}`} style={style} />
    );
  }
}
