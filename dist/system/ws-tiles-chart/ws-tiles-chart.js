System.register(['react', '../imports', './tile'], function (_export, _context) {
  "use strict";

  var React, Component, PropTypes, Tile, _createClass, WSTilesChart;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_react) {
      React = _react.default;
    }, function (_imports) {
      Component = _imports.Component;
      PropTypes = _imports.PropTypes;
    }, function (_tile) {
      Tile = _tile.Tile;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('WSTilesChart', WSTilesChart = function (_Component) {
        _inherits(WSTilesChart, _Component);

        function WSTilesChart(props) {
          _classCallCheck(this, WSTilesChart);

          var _this = _possibleConstructorReturn(this, (WSTilesChart.__proto__ || Object.getPrototypeOf(WSTilesChart)).call(this, props));

          _this.state = { tileSize: 0 };
          _this.titleDivSize = 30;

          _this.getTileSize = _this.getTileSize.bind(_this);
          return _this;
        }

        _createClass(WSTilesChart, [{
          key: 'componentWillMount',
          value: function componentWillMount() {
            this.setState({ tileSize: this.getTileSize() });
          }
        }, {
          key: 'getGroupConfig',
          value: function getGroupConfig(config, group) {
            if (config.groupConfigs) {
              return config.groupConfigs.find(function (groupConfig) {
                return groupConfig.key === group.key;
              });
            }
            return {};
          }
        }, {
          key: 'getTileSize',
          value: function getTileSize() {
            var groups = this.props.data.groups || {};
            var tilesAmount = Object.keys(groups).map(function (groupName) {
              return groups[groupName].length;
            }).reduce(function (a, b) {
              return a + b;
            });

            var tileSize = this.calculateMaximumPossibleTileSize(this.props.width, this.props.height - this.titleDivSize, tilesAmount);

            if (tileSize <= this.props.maxTileSize && tileSize >= this.props.minTileSize) {
              return tileSize;
            } else if (tileSize > this.props.maxTileSize) {
              return this.props.maxTileSize;
            }

            return this.props.minTileSize;
          }
        }, {
          key: 'calculateMaximumPossibleTileSize',
          value: function calculateMaximumPossibleTileSize(width, height, tilesAmount) {
            var chartArea = width < height ? width * width : height * height;
            return Math.sqrt(chartArea / tilesAmount);
          }
        }, {
          key: 'render',
          value: function render() {
            var _this2 = this;

            var _props = this.props,
                data = _props.data,
                config = _props.config,
                title = _props.title,
                width = _props.width,
                height = _props.height;

            var groups = data.groups || {};
            return React.createElement(
              'div',
              { className: 'ws-tiles-chart', style: { width: width + 'px', height: height + 'px' } },
              React.createElement(
                'div',
                { className: 'tiles-chart-title' },
                title
              ),
              React.createElement(
                'div',
                { className: 'tiles-chart-container', style: { height: height - this.titleDivSize + 'px' } },
                Object.keys(groups).map(function (groupName) {
                  return groups[groupName].map(function (tile) {
                    return React.createElement(Tile, {
                      data: tile,
                      tileClass: groupName,
                      config: config[groupName],
                      size: _this2.state.tileSize
                    });
                  });
                })
              )
            );
          }
        }]);

        return WSTilesChart;
      }(Component));

      _export('WSTilesChart', WSTilesChart);

      Object.defineProperty(WSTilesChart, 'defaultProps', {
        enumerable: true,
        writable: true,
        value: {
          data: {},
          config: {},
          title: '',
          maxTileSize: 25,
          minTileSize: 8,
          width: 80,
          height: 80
        }
      });
      Object.defineProperty(WSTilesChart, 'propTypes', {
        enumerable: true,
        writable: true,
        value: {
          data: PropTypes.object,
          config: PropTypes.object,
          title: PropTypes.string,
          maxTileSize: PropTypes.number,
          width: PropTypes.number,
          height: PropTypes.number
        }
      });
    }
  };
});