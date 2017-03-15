'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.WSDatePickerCalendar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imports = require('../imports');

var _wsDatePickerCalendarRow = require('./ws-date-picker-calendar-row.js');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var localeData = _moment2.default.localeData();

var WSDatePickerCalendar = exports.WSDatePickerCalendar = function (_Component) {
	_inherits(WSDatePickerCalendar, _Component);

	function WSDatePickerCalendar() {
		_classCallCheck(this, WSDatePickerCalendar);

		var _this = _possibleConstructorReturn(this, (WSDatePickerCalendar.__proto__ || Object.getPrototypeOf(WSDatePickerCalendar)).call(this));

		_this.state = {
			year: (0, _moment2.default)().year(),
			month: (0, _moment2.default)().month(),
			monthName: localeData.months((0, _moment2.default)())
		};
		return _this;
	}

	_createClass(WSDatePickerCalendar, [{
		key: 'prevMonth',
		value: function prevMonth() {
			var month = this.state.month - 1;
			this.setState({
				month: month,
				monthName: localeData.months((0, _moment2.default)().year(this.state.year).month(month))
			});
		}
	}, {
		key: 'nextMonth',
		value: function nextMonth() {
			var month = this.state.month + 1;
			this.setState({
				month: month,
				monthName: localeData.months((0, _moment2.default)().year(this.state.year).month(month))
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var momentMonth = (0, _moment2.default)().year(this.state.year).month(this.state.month).date(1);
			var startWeek = momentMonth.isoWeek();
			var endWeek = momentMonth.month(momentMonth.month() + 1).date(-1).isoWeek();
			var weeks = [];
			for (var week = startWeek; week <= endWeek; week++) {
				weeks.push(_imports.React.createElement(_wsDatePickerCalendarRow.WSDatePickerCalendarWeek, {
					weekNumber: week,
					year: this.state.year,
					month: this.state.month,
					momentDay: this.props.momentDay,
					key: week,
					onUpdate: function onUpdate(momentDay) {
						return _this2.props.onUpdate(momentDay);
					}
				}));
			}
			return _imports.React.createElement(
				'div',
				{ className: 'ws-date-picker-calendar' },
				_imports.React.createElement('div', { className: 'arrow-up' }),
				_imports.React.createElement(
					'table',
					null,
					_imports.React.createElement(
						'caption',
						null,
						_imports.React.createElement(
							'span',
							{ className: 'prev', onClick: function onClick() {
									return _this2.prevMonth();
								} },
							_imports.React.createElement(
								'a',
								{ href: '#' },
								_imports.React.createElement('i', { className: 'icon icon-left' })
							)
						),
						_imports.React.createElement(
							'span',
							{ className: 'next', onClick: function onClick() {
									return _this2.nextMonth();
								} },
							_imports.React.createElement(
								'a',
								{ href: '#' },
								_imports.React.createElement('i', { className: 'icon icon-right' })
							)
						),
						this.state.monthName,
						' ',
						this.state.year
					),
					_imports.React.createElement(
						'thead',
						null,
						_imports.React.createElement(
							'tr',
							null,
							_imports.React.createElement(
								'th',
								null,
								'CW'
							),
							_imports.React.createElement(
								'th',
								null,
								'Mo'
							),
							_imports.React.createElement(
								'th',
								null,
								'Tu'
							),
							_imports.React.createElement(
								'th',
								null,
								'We'
							),
							_imports.React.createElement(
								'th',
								null,
								'Th'
							),
							_imports.React.createElement(
								'th',
								null,
								'Fr'
							),
							_imports.React.createElement(
								'th',
								null,
								'Sa'
							),
							_imports.React.createElement(
								'th',
								null,
								'Su'
							)
						)
					),
					_imports.React.createElement(
						'tbody',
						null,
						weeks
					)
				)
			);
		}
	}]);

	return WSDatePickerCalendar;
}(_imports.Component);