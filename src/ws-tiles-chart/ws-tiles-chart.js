import {Component, PropTypes} from "../imports";
import {Tile} from "./tile";

/**
 * This class describes a Preact/React component which renders a tiles chart
 * @class WSTilesChart
 * @property {Object} props React properties object
 */
export class WSTilesChart extends Component {

  /**
   * @type {Object}
   */
  static defaultProps = {
    data: {},
    config: {},
    title: ''
  };

  /**
   * @type {Object}
   */
  static propTypes = {
    data: PropTypes.object,
    config: PropTypes.object,
    title: PropTypes.string
  };

  /**
   * @param {Object} props React properties
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {tileSize: 0};

    this.calculateMaximumPossibleTileSize = this.calculateMaximumPossibleTileSize.bind(
      this);
  }

  componentDidMount() {
    //Calculate the tiles size
    const containerWidth = this.tilesChartContainer.clientWidth;
    const containerHeight = this.tilesChartContainer.clientHeight;
    const tilesAmount = this.props.data.groups.map(group=> {
      return group.tilesSet.length
    }).reduce((a, b)=>a + b);

    this.setState({
      tileSize: this.calculateMaximumPossibleTileSize(containerWidth,
        containerHeight, tilesAmount)
    });
  }

  /**
   * Calculates the maximum tile size based on total width, height and amount of tiles
   * @param {width} chart container width
   * @param {height} chart container height
   * @returns {int}
   */
  calculateMaximumPossibleTileSize(width, height, tilesAmount) {
    const chartArea = (width < height) ? width * width : height * height;
    return Math.sqrt((chartArea) / tilesAmount)
  }

  /**
   * Renders the chart
   * @returns {Object}
   */
  render() {
    const {data, config, title} = this.props;
    return (
      <div className="ws-tiles-chart">
        <div className="tiles-chart-title">{title}</div>

        <div className="tiles-chart-container"
             ref={(element)=>this.tilesChartContainer=element}>
          {data.groups.map(group=>group.tilesSet.map(
            tile => {
              const groupConfig = config.groupConfigs
                ? config.groupConfigs.find(config=>config.key === group.key)
                : {};
              return <Tile data={tile} config={groupConfig}
                           size={this.state.tileSize}/>
            }
          ))}
        </div>

      </div>
    );
  }
}
