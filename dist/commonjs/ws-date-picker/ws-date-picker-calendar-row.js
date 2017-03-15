'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.WSDatePickerCalendarWeek = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imports = require('../imports');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WSDatePickerCalendarWeek = exports.WSDatePickerCalendarWeek = function (_Component) {
	_inherits(WSDatePickerCalendarWeek, _Component);

	function WSDatePickerCalendarWeek() {
		_classCallCheck(this, WSDatePickerCalendarWeek);

		return _possibleConstructorReturn(this, (WSDatePickerCalendarWeek.__proto__ || Object.getPrototypeOf(WSDatePickerCalendarWeek)).apply(this, arguments));
	}

	_createClass(WSDatePickerCalendarWeek, [{
		key: 'isInMonth',
		value: function isInMonth(momentDay, expectedMonth) {
			return momentDay.month() === expectedMonth;
		}
	}, {
		key: 'isActive',
		value: function isActive(year, month, date) {
			return this.props.momentDay && year === this.props.momentDay.year() && month === this.props.momentDay.month() && date === this.props.momentDay.date();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    weekNumber = _props.weekNumber,
			    month = _props.month,
			    year = _props.year;

			var momentWeek = (0, _moment2.default)().year(year).week(weekNumber);
			var weekDays = [];

			var _loop = function _loop(day) {
				var momentDay = momentWeek.day(day);
				var date = momentDay.date();
				weekDays.push(_imports.React.createElement(
					'td',
					{ className: (_this2.isInMonth(momentDay, month) ? '' : 'off ') + (_this2.isActive(momentDay.year(), momentDay.month(), date) ? 'active' : ''),
						key: date,
						onClick: function onClick() {
							return _this2.props.onUpdate(momentWeek.day(day));
						}
					},
					_imports.React.createElement(
						'a',
						{ href: '#', className: 'day' },
						date
					)
				));
			};

			for (var day = 0; day < 7; day++) {
				_loop(day);
			}
			return _imports.React.createElement(
				'tr',
				null,
				_imports.React.createElement(
					'td',
					{ className: 'off' },
					weekNumber
				),
				weekDays
			);
		}
	}]);

	return WSDatePickerCalendarWeek;
}(_imports.Component);

var WSDatePickerWeekDay = function (_Component2) {
	_inherits(WSDatePickerWeekDay, _Component2);

	function WSDatePickerWeekDay() {
		_classCallCheck(this, WSDatePickerWeekDay);

		return _possibleConstructorReturn(this, (WSDatePickerWeekDay.__proto__ || Object.getPrototypeOf(WSDatePickerWeekDay)).apply(this, arguments));
	}

	_createClass(WSDatePickerWeekDay, [{
		key: 'render',
		value: function render() {
			return _imports.React.createElement(
				'td',
				{ className: this.props.off ? 'off' : '' },
				_imports.React.createElement(
					'a',
					{ href: '#' },
					this.props.date
				)
			);
		}
	}]);

	return WSDatePickerWeekDay;
}(_imports.Component);