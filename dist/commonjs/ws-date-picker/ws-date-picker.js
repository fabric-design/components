'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.WSDatePicker = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imports = require('../imports');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _wsDatePickerCalendar = require('./ws-date-picker-calendar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WSDatePicker = exports.WSDatePicker = function (_Component) {
	_inherits(WSDatePicker, _Component);

	function WSDatePicker(props) {
		_classCallCheck(this, WSDatePicker);

		var _this = _possibleConstructorReturn(this, (WSDatePicker.__proto__ || Object.getPrototypeOf(WSDatePicker)).call(this, props));

		var momentDay = _this.props.date ? (0, _moment2.default)(_this.props.date) : null;
		_this.state = {
			show: false,
			momentDay: momentDay,
			dateString: momentDay ? momentDay.format('LL') : ''
		};
		return _this;
	}

	_createClass(WSDatePicker, [{
		key: 'toggleCalendar',
		value: function toggleCalendar() {
			this.setState({ show: !this.state.show });
		}
	}, {
		key: 'onUpdate',
		value: function onUpdate(momentDay) {
			this.setState({
				momentDay: momentDay,
				dateString: momentDay.format('LL')
			});
			this.props.onUpdate && this.props.onUpdate(momentDay.toDate());
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _imports.React.createElement(
				'div',
				{ className: 'ws-date-picker' },
				_imports.React.createElement('input', { value: this.state.dateString, placeholder: 'Please choose a date', onClick: function onClick() {
						return _this2.toggleCalendar();
					} }),
				_imports.React.createElement('i', { className: 'icon icon-' + (this.state.show ? 'cross' : 'calendar') }),
				this.state.show ? _imports.React.createElement(_wsDatePickerCalendar.WSDatePickerCalendar, { onUpdate: function onUpdate(date) {
						return _this2.onUpdate(date);
					}, momentDay: this.state.momentDay }) : null
			);
		}
	}]);

	return WSDatePicker;
}(_imports.Component);