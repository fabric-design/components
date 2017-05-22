import React from 'react';
import {Component, PropTypes} from '../imports';

/**
 * This class describes a Preact/React component which renders a single tile
 * @property {Object} props React properties object
 * @property {Object} props.identifier identifier of the tile
 * @property {Object} props.config Defines the background color of the tile
 * @property {Object} props.groupName The class of the tile which can also be used for color styling
 * @property {number} props.size Defines the width and height of the tile
 * @property {func} props.onClick function(groupName,identifier,element) that is called when a tile is clicked
 */
export class Tile extends Component {

  /**
   * @type {Object}
   */
  static propTypes = {
    identifier: PropTypes.string,
    config: PropTypes.string,
    groupName: PropTypes.string,
    size: PropTypes.number,
    onClick: PropTypes.func
  };


  /**
   * @type {Object}
   */
  static defaultProps = {
    identifier: '',
    config: '',
    groupName: '',
    size: 25,
    onClick: () => {}
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
      <div
        className={`tile ${this.props.groupName}`}
        style={style}
        onClick={() => this.props.onClick(this.props.groupName, this.props.identifier)}
      />
    );
  }
}
