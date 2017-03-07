System.register(['../imports', 'moment', './ws-date-picker-calendar'], function (_export, _context) {
	"use strict";

	var React, Component, moment, WSDatePickerCalendar, _createClass, WSDatePicker;

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
		}, function (_moment) {
			moment = _moment.default;
		}, function (_wsDatePickerCalendar) {
			WSDatePickerCalendar = _wsDatePickerCalendar.WSDatePickerCalendar;
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

			_export('WSDatePicker', WSDatePicker = function (_Component) {
				_inherits(WSDatePicker, _Component);

				function WSDatePicker(props) {
					_classCallCheck(this, WSDatePicker);

					var _this = _possibleConstructorReturn(this, (WSDatePicker.__proto__ || Object.getPrototypeOf(WSDatePicker)).call(this, props));

					var momentDay = _this.props.date ? moment(_this.props.date) : null;
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

						return React.createElement(
							'div',
							{ className: 'ws-date-picker' },
							React.createElement('input', { value: this.state.dateString, placeholder: 'Please choose a date', onClick: function onClick() {
									return _this2.toggleCalendar();
								} }),
							React.createElement('i', { className: 'icon icon-' + (this.state.show ? 'cross' : 'calendar') }),
							this.state.show ? React.createElement(WSDatePickerCalendar, { onUpdate: function onUpdate(date) {
									return _this2.onUpdate(date);
								}, momentDay: this.state.momentDay }) : null
						);
					}
				}]);

				return WSDatePicker;
			}(Component));

			_export('WSDatePicker', WSDatePicker);
		}
	};
});