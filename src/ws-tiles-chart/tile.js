import {Component, PropTypes} from "../imports";



export const Tile = ({data, config, size}) => {
  const style = {
    'backgroundColor': config.backgroundColor,
    width: `${size}px`,
    height: `${size}px`
  };

  return (
    <div key={data.key} className="tile" style={style}/>
  );
};

Tile.propTypes = {
  data: PropTypes.object,
  config: PropTypes.object,
  size: PropTypes.number
}
