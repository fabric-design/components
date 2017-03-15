System.register(['../imports', './ws-date-picker-calendar-row.js', 'moment'], function (_export, _context) {
	"use strict";

	var React, Component, WSDatePickerCalendarWeek, moment, _createClass, localeData, WSDatePickerCalendar;

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
		setters: [function (_imports) {
			React = _imports.React;
			Component = _imports.Component;
		}, function (_wsDatePickerCalendarRowJs) {
			WSDatePickerCalendarWeek = _wsDatePickerCalendarRowJs.WSDatePickerCalendarWeek;
		}, function (_moment) {
			moment = _moment.default;
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

			localeData = moment.localeData();

			_export('WSDatePickerCalendar', WSDatePickerCalendar = function (_Component) {
				_inherits(WSDatePickerCalendar, _Component);

				function WSDatePickerCalendar() {
					_classCallCheck(this, WSDatePickerCalendar);

					var _this = _possibleConstructorReturn(this, (WSDatePickerCalendar.__proto__ || Object.getPrototypeOf(WSDatePickerCalendar)).call(this));

					_this.state = {
						year: moment().year(),
						month: moment().month(),
						monthName: localeData.months(moment())
					};
					return _this;
				}

				_createClass(WSDatePickerCalendar, [{
					key: 'prevMonth',
					value: function prevMonth() {
						var month = this.state.month - 1;
						this.setState({
							month: month,
							monthName: localeData.months(moment().year(this.state.year).month(month))
						});
					}
				}, {
					key: 'nextMonth',
					value: function nextMonth() {
						var month = this.state.month + 1;
						this.setState({
							month: month,
							monthName: localeData.months(moment().year(this.state.year).month(month))
						});
					}
				}, {
					key: 'render',
					value: function render() {
						var _this2 = this;

						var momentMonth = moment().year(this.state.year).month(this.state.month).date(1);
						var startWeek = momentMonth.isoWeek();
						var endWeek = momentMonth.month(momentMonth.month() + 1).date(-1).isoWeek();
						var weeks = [];
						for (var week = startWeek; week <= endWeek; week++) {
							weeks.push(React.createElement(WSDatePickerCalendarWeek, {
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
						return React.createElement(
							'div',
							{ className: 'ws-date-picker-calendar' },
							React.createElement('div', { className: 'arrow-up' }),
							React.createElement(
								'table',
								null,
								React.createElement(
									'caption',
									null,
									React.createElement(
										'span',
										{ className: 'prev', onClick: function onClick() {
												return _this2.prevMonth();
											} },
										React.createElement(
											'a',
											{ href: '#' },
											React.createElement('i', { className: 'icon icon-left' })
										)
									),
									React.createElement(
										'span',
										{ className: 'next', onClick: function onClick() {
												return _this2.nextMonth();
											} },
										React.createElement(
											'a',
											{ href: '#' },
											React.createElement('i', { className: 'icon icon-right' })
										)
									),
									this.state.monthName,
									' ',
									this.state.year
								),
								React.createElement(
									'thead',
									null,
									React.createElement(
										'tr',
										null,
										React.createElement(
											'th',
											null,
											'CW'
										),
										React.createElement(
											'th',
											null,
											'Mo'
										),
										React.createElement(
											'th',
											null,
											'Tu'
										),
										React.createElement(
											'th',
											null,
											'We'
										),
										React.createElement(
											'th',
											null,
											'Th'
										),
										React.createElement(
											'th',
											null,
											'Fr'
										),
										React.createElement(
											'th',
											null,
											'Sa'
										),
										React.createElement(
											'th',
											null,
											'Su'
										)
									)
								),
								React.createElement(
									'tbody',
									null,
									weeks
								)
							)
						);
					}
				}]);

				return WSDatePickerCalendar;
			}(Component));

			_export('WSDatePickerCalendar', WSDatePickerCalendar);
		}
	};
});