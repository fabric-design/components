import React from 'react';
import {Component, PropTypes} from '../imports';
import {Tile} from './tile';

/**
 * This class describes a Preact/React component which renders a tiles chart
 * @class WSTilesChart
 * @property {Object} props React properties object
 * @property {Object} props.data Defines the Groups of tiles that should be shown in the chart
 * @property {Object} props.config Defines the color of each group of tiles
 * @property {string} props.title Title of the chart
 * @property {number} props.maxTileSize Defines the maximum size that the tile can be
 *
 */
export class WSTilesChart extends Component {

  /**
   * @type {Object}
   */
  static defaultProps = {
    data: {},
    config: {},
    title: '',
    maxTileSize: 25,
    minTileSize: 8,
    width: 80,
    height: 80
  };

  /**
   * @type {Object}
   */
  static propTypes = {
    data: PropTypes.object,
    config: PropTypes.object,
    title: PropTypes.string,
    maxTileSize: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number
  };

  /**
   * @param {Object} props React properties
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {tileSize: 0};
    this.titleDivSize = 30;

    this.getTileSize = this.getTileSize.bind(this);
  }

  /**
   * Calculate the tiles size
   * @returns {void}
   */
  componentWillMount() {
    this.setState({tileSize: this.getTileSize()});
  }

  /**
   * Finds the config of the group
   * @param {array} config Array of group configurations
   * @param {object} group to be filtered
   * @returns {object}
   */
  getGroupConfig(config, group) {
    if (config.groupConfigs) {
      return config.groupConfigs.find(groupConfig => groupConfig.key === group.key);
    }
    return {};
  }

  /**
   * Returns the size to be used for the tile
   * @returns {number}
   */
  getTileSize() {
    const groups = this.props.data.groups || {};
    const tilesAmount = Object.keys(groups).map(groupName => groups[groupName].length).reduce((a, b) => a + b);

    const tileSize = this.calculateMaximumPossibleTileSize(
      this.props.width, this.props.height - this.titleDivSize, tilesAmount
    );

    if (tileSize <= this.props.maxTileSize && tileSize >= this.props.minTileSize) {
      return tileSize;
    } else if (tileSize > this.props.maxTileSize) {
      return this.props.maxTileSize;
    }

    return this.props.minTileSize;
  }

  /**
   * Calculates the maximum tile size based on total width, height and amount of tiles
   * @param {number} width of the container
   * @param {number} height of the container
   * @param {number} tilesAmount total number of tiles in the chart
   * @returns {number}
   */
  calculateMaximumPossibleTileSize(width, height, tilesAmount) {
    const chartArea = (width < height) ? width * width : height * height;
    return Math.sqrt(chartArea / tilesAmount);
  }

  /**
   * Renders the chart
   * @returns {Object}
   */
  render() {
    const {data, config, title, width, height} = this.props;
    const groups = data.groups || {};
    return (
      <div className="ws-tiles-chart" style={{width: `${width}px`, height: `${height}px`}}>
        <div className="tiles-chart-title">{title}</div>
        <div className="tiles-chart-container" style={{height: `${height - this.titleDivSize}px`}}>
          {Object.keys(groups).map(groupName => groups[groupName].map(tile =>
            <Tile
              data={tile}
              tileClass={groupName}
              config={config[groupName]}
              size={this.state.tileSize}
            />
          ))}
        </div>
      </div>
    );
  }
}
