define(['exports', '../imports'], function (exports, _imports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.WSOptionButtons = undefined;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
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

  var WSOptionButtons = exports.WSOptionButtons = function (_Component) {
    _inherits(WSOptionButtons, _Component);

    function WSOptionButtons(props) {
      _classCallCheck(this, WSOptionButtons);

      var _this = _possibleConstructorReturn(this, (WSOptionButtons.__proto__ || Object.getPrototypeOf(WSOptionButtons)).call(this, props));

      Object.defineProperty(_this, 'onClickToggle', {
        enumerable: true,
        writable: true,
        value: function value(event) {
          event.stopPropagation();

          if (_this.state.visible === _this.state.items.length) {
            _this.setState({ visible: _this.props.initialVisible });
          } else {
            _this.setState({ visible: _this.state.items.length });
          }
        }
      });
      Object.defineProperty(_this, 'onClickButton', {
        enumerable: true,
        writable: true,
        value: function value(event) {
          event.stopPropagation();
          var items = _this.state.items;

          var clickedIndex = _this.buttons.indexOf(event.currentTarget);

          items[clickedIndex].selected = !items[clickedIndex].selected;
          _this.setState({ items: items });

          var value = items.filter(function (item) {
            return item.selected;
          }).map(function (item) {
            return item.value;
          });
          _this.dispatchEvent('change', value);

          if (typeof _this.props.onChange === 'function') {
            _this.props.onChange(value);
          }
        }
      });

      _this.buttons = [];
      _this.state = _this.createState(props);
      return _this;
    }

    _createClass(WSOptionButtons, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        this.buttons.forEach(function (button) {
          return button.addEventListener('click', _this2.onClickButton);
        });
        if (this.moreAnchor) {
          this.moreAnchor.addEventListener('click', this.onClickToggle);
        }
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(props) {
        this.setState(this.createState(props));
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        var _this3 = this;

        this.buttons.forEach(function (button) {
          return button.addEventListener('click', _this3.onClickButton);
        });
        if (this.moreAnchor) {
          this.moreAnchor.addEventListener('click', this.onClickToggle);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var _this4 = this;

        this.buttons.forEach(function (button) {
          return button.removeEventListener('click', _this4.onClickButton);
        });
        if (this.moreAnchor) {
          this.moreAnchor.removeEventListener('click', this.onClickToggle);
        }
      }
    }, {
      key: 'createState',
      value: function createState(props) {
        var items = this.enrichItems(props.items);

        var value = [];
        if (props.value) {
          value = Array.isArray(props.value) ? props.value : [props.value];
        }
        items.forEach(function (item) {
          item.selected = value.includes(item.value);
        });
        return {
          items: items,
          visible: props.initialVisible,
          value: value
        };
      }
    }, {
      key: 'enrichItems',
      value: function enrichItems(items) {
        return items.map(function (item) {
          if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
            return item;
          }
          return { label: item, value: item };
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this5 = this;

        return _imports.React.createElement(
          'div',
          { className: 'ws-option-buttons', ref: function ref(element) {
              _this5.element = element;
            } },
          this.state.items.map(function (item, index) {
            return _imports.React.createElement(
              'div',
              { className: 'option-button ' + (index < _this5.state.visible ? '' : 'is-hidden') },
              _imports.React.createElement(
                'a',
                {
                  className: _this5.props.buttonClass + ' ' + (item.selected ? 'is-active' : ''),
                  'data-index': '',
                  ref: function ref(element) {
                    _this5.buttons[index] = element;
                  }
                },
                item.label || item.value
              )
            );
          }),
          _imports.React.createElement(
            'a',
            {
              href: '#void',
              className: 'show-more ' + (this.props.initialVisible < this.state.items.length ? 'is-hidden' : ''),
              ref: function ref(element) {
                _this5.moreAnchor = element;
              }
            },
            this.state.visible === this.state.items.length ? 'less' : 'more'
          )
        );
      }
    }]);

    return WSOptionButtons;
  }(_imports.Component);

  Object.defineProperty(WSOptionButtons, 'propTypes', {
    enumerable: true,
    writable: true,
    value: {
      items: _imports.PropTypes.array,
      initialVisible: _imports.PropTypes.number,
      value: _imports.PropTypes.string,
      buttonClass: _imports.PropTypes.string,
      onChange: _imports.PropTypes.func
    }
  });
  Object.defineProperty(WSOptionButtons, 'defaultProps', {
    enumerable: true,
    writable: true,
    value: {
      items: [],
      initialVisible: 3,
      value: null,
      buttonClass: '',
      onChange: function onChange() {}
    }
  });
});