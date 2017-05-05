import React from 'react';
import {Component, PropTypes} from '../imports';

/**
 * This class describes a Preact/React component which renders a single tile
 * @property {Object} props React properties object
 * @property {Object} props.config Defines the configuration of the tile, e.g. the background color
 * @property {number} props.size Defines the width and height of the tile
 */
export class Tile extends Component {

  /**
   * @type {Object}
   */
  static propTypes = {
    data: PropTypes.object,
    config: PropTypes.object,
    size: PropTypes.number
  };


  /**
   * @type {Object}
   */
  static defaultProps = {
    data: {},
    config: {},
    size: 25
  };

  /**
   * Renders the chart
   * @returns {Object}
   */
  render() {
    const {config, size} = this.props;
    const style = {
      backgroundColor: config.backgroundColor,
      width: `${size}px`,
      height: `${size}px`
    };

    return (
      <div className="tile" style={style} />
    );
  }
}
