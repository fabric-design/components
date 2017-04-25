'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WSWeekPicker = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imports = require('../imports');

var _wsWeekPickerCalendar = require('./ws-week-picker-calendar');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WSWeekPicker = exports.WSWeekPicker = function (_Component) {
  _inherits(WSWeekPicker, _Component);

  function WSWeekPicker(props) {
    _classCallCheck(this, WSWeekPicker);

    var _this = _possibleConstructorReturn(this, (WSWeekPicker.__proto__ || Object.getPrototypeOf(WSWeekPicker)).call(this, props));

    _this.state = {
      show: false,
      selectedYear: props.selectedYear,
      selectedWeek: props.selectedWeek
    };
    return _this;
  }

  _createClass(WSWeekPicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.outsideClickListener = document.body.addEventListener('click', function (e) {
        if (_this2.state.show && !isDescendant(_this2.elem, e.target)) {
          _this2.setState({ show: false });
        }
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this.setState({
        selectedYear: newProps.selectedYear === null ? newProps.selectedYear : this.state.selectedYear,
        selectedWeek: newProps.selectedWeek === null ? newProps.selectedWeek : this.state.selectedWeek,
        show: newProps.show === null ? newProps.show : this.state.show
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.body.removeEventListener('click', this.outsideClickListener);
    }
  }, {
    key: 'onChange',
    value: function onChange(_ref) {
      var week = _ref.week,
          year = _ref.year;

      if (this.state.selectedWeek !== week || this.state.selectedYear !== year) {
        this.setState({
          selectedYear: year,
          selectedWeek: week
        });
        if (this.props.onChange) {
          this.props.onChange({ week: week, year: year });
        }
      }
    }
  }, {
    key: 'toggleCalendar',
    value: function toggleCalendar() {
      this.setState({ show: !this.state.show });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _imports.React.createElement(
        'div',
        { className: 'ws-week-picker', ref: function ref(elem) {
            _this3.elem = elem;
          } },
        _imports.React.createElement('input', {
          value: this.state.selectedWeek !== null ? 'Week ' + this.state.selectedWeek + ', ' + this.state.selectedYear : '',
          placeholder: 'Please choose a week',
          onClick: function onClick() {
            return _this3.toggleCalendar();
          },
          readOnly: true
        }),
        _imports.React.createElement('span', {
          className: 'icon icon-' + (this.state.show ? 'cross' : 'calendar'),
          onClick: function onClick() {
            return _this3.toggleCalendar();
          }
        }),
        this.state.show && _imports.React.createElement(_wsWeekPickerCalendar.WSWeekPickerCalendar, {
          onChange: function onChange(selection) {
            return _this3.onChange(selection);
          },
          selectedYear: this.state.selectedYear,
          selectedWeek: this.state.selectedWeek
        })
      );
    }
  }]);

  return WSWeekPicker;
}(_imports.Component);

Object.defineProperty(WSWeekPicker, 'defaultProps', {
  enumerable: true,
  writable: true,
  value: {
    selectedYear: null,
    selectedWeek: null,
    onChange: function onChange() {}
  }
});
Object.defineProperty(WSWeekPicker, 'propTypes', {
  enumerable: true,
  writable: true,
  value: {
    selectedYear: _imports.React.PropTypes.number,
    selectedWeek: _imports.React.PropTypes.number,
    onChange: _imports.React.PropTypes.func
  }
});

function isDescendant(parent, child) {
  var node = child.parentNode;
  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}