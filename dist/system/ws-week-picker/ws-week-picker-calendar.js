System.register(['../imports'], function (_export, _context) {
  "use strict";

  var React, Component, PropTypes, _createClass, months, allMonths, WSWeekPickerCalendar;

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

  function getDateOfISOWeek(week, year) {
    var simple = new Date(year, 0, 1 + (week - 1) * 7);
    var dow = simple.getDay();
    var ISOWeekStart = simple;
    if (dow <= 4) {
      ISOWeekStart.setDate(1 + (simple.getDate() - simple.getDay()));
    } else {
      ISOWeekStart.setDate(simple.getDate() + (8 - simple.getDay()));
    }
    return ISOWeekStart;
  }

  function getWeekOfYear(date) {
    var target = new Date(date.valueOf());

    var dayNr = date.getDay();

    target.setDate(target.getDate() - (dayNr + 3));

    var jan4 = new Date(target.getFullYear(), 0, 4);

    var dayDiff = (target - jan4) / 86400000;

    return 1 + Math.ceil(dayDiff / 7);
  }

  function getWeeks(month, year) {
    var actualMonth = month;
    var actualYear = year;
    while (actualMonth > 11) {
      actualYear += 1;
      actualMonth -= 12;
    }
    while (actualMonth < 0) {
      actualYear -= 1;
      actualMonth += 12;
    }
    var startWeek = getWeekOfYear(new Date(actualYear, actualMonth, 1));

    if (actualMonth === 0) {
      startWeek = 1;
    } else {
      startWeek = getDateOfISOWeek(startWeek, actualYear).getMonth() !== actualMonth ? startWeek + 1 : startWeek;
    }
    var endWeek = getWeekOfYear(new Date(actualYear, actualMonth + 1, 0));

    if (endWeek === 1) {
      endWeek = getWeekOfYear(new Date(actualYear, actualMonth + 1, -7));
    } else {
      endWeek = getDateOfISOWeek(endWeek, actualYear).getMonth() !== actualMonth ? endWeek - 1 : endWeek;
    }
    var weeks = [];
    for (var i = startWeek; i <= endWeek; i++) {
      weeks.push({
        week: i,
        year: actualYear
      });
    }
    return weeks;
  }
  return {
    setters: [function (_imports) {
      React = _imports.React;
      Component = _imports.Component;
      PropTypes = _imports.PropTypes;
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

      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      allMonths = [months[10], months[11]].concat(months).concat([months[0], months[1]]);

      _export('WSWeekPickerCalendar', WSWeekPickerCalendar = function (_Component) {
        _inherits(WSWeekPickerCalendar, _Component);

        function WSWeekPickerCalendar(props) {
          _classCallCheck(this, WSWeekPickerCalendar);

          var _this = _possibleConstructorReturn(this, (WSWeekPickerCalendar.__proto__ || Object.getPrototypeOf(WSWeekPickerCalendar)).call(this, props));

          var selectedDate = props.selectedYear !== null && props.selectedWeek !== null ? getDateOfISOWeek(props.selectedWeek, props.selectedYear) : new Date(Date.now());
          _this.state = {
            showingYear: selectedDate.getFullYear()
          };

          var today = new Date(Date.now());
          _this.todayYear = today.getFullYear();
          _this.todayWeek = getWeekOfYear(today);
          return _this;
        }

        _createClass(WSWeekPickerCalendar, [{
          key: 'prevYear',
          value: function prevYear() {
            this.setState({
              showingYear: this.state.showingYear - 1
            });
          }
        }, {
          key: 'nextYear',
          value: function nextYear() {
            this.setState({
              showingYear: this.state.showingYear + 1
            });
          }
        }, {
          key: 'isActive',
          value: function isActive(year, week) {
            return this.props.selectedYear === year && this.props.selectedWeek === week;
          }
        }, {
          key: 'isToday',
          value: function isToday(year, week) {
            return this.todayYear === year && this.todayWeek === week;
          }
        }, {
          key: 'buildWeekRows',
          value: function buildWeekRows() {
            var _this2 = this;

            var weeksPerMonth = [];
            for (var i = -2; i <= 13; i++) {
              weeksPerMonth.push(getWeeks(i, this.state.showingYear));
            }

            return [0, 1, 2, 3, 4].map(function (weekIndex) {
              return React.createElement(
                'tr',
                { key: weekIndex },
                allMonths.map(function (month, monthIndex) {
                  var weekInMonth = weeksPerMonth[monthIndex][weekIndex];
                  if (weekInMonth === null || weekInMonth === undefined) {
                    return React.createElement('td', { key: monthIndex + '_' + weekIndex });
                  }
                  var week = weekInMonth.week,
                      year = weekInMonth.year;

                  return React.createElement(
                    'td',
                    {
                      className: (monthIndex < 2 || monthIndex > 13 ? 'off ' : '') + (_this2.isActive(year, week) ? 'active ' : '') + (_this2.isToday(year, week) ? 'today ' : ''),
                      key: monthIndex + '_' + weekIndex
                    },
                    React.createElement(
                      'a',
                      {
                        className: 'week',
                        onClick: function onClick() {
                          return _this2.props.onChange({ week: week, year: year });
                        },
                        onKeyPress: function onKeyPress() {
                          return _this2.props.onChange({ week: week, year: year });
                        }
                      },
                      week
                    )
                  );
                })
              );
            });
          }
        }, {
          key: 'render',
          value: function render() {
            var _this3 = this;

            return React.createElement(
              'div',
              { className: 'ws-date-picker-calendar' },
              React.createElement(
                'table',
                null,
                React.createElement(
                  'caption',
                  null,
                  React.createElement(
                    'span',
                    {
                      className: 'prev',
                      onClick: function onClick() {
                        return _this3.prevYear();
                      },
                      onKeyPress: function onKeyPress() {
                        return _this3.prevYear();
                      }
                    },
                    React.createElement('span', { className: 'icon icon32 icon-left' }),
                    this.state.showingYear - 1
                  ),
                  React.createElement(
                    'span',
                    { className: 'current_year' },
                    this.state.showingYear
                  ),
                  React.createElement(
                    'span',
                    {
                      className: 'next',
                      onClick: function onClick() {
                        return _this3.nextYear();
                      },
                      onKeyPress: function onKeyPress() {
                        return _this3.nextYear();
                      }
                    },
                    this.state.showingYear + 1,
                    React.createElement('span', { className: 'icon icon32 icon-right' })
                  )
                ),
                React.createElement(
                  'thead',
                  null,
                  React.createElement(
                    'tr',
                    null,
                    allMonths.map(function (month, index) {
                      return React.createElement(
                        'th',
                        { key: index },
                        month
                      );
                    })
                  )
                ),
                React.createElement(
                  'tbody',
                  null,
                  this.buildWeekRows()
                )
              )
            );
          }
        }]);

        return WSWeekPickerCalendar;
      }(Component));

      _export('WSWeekPickerCalendar', WSWeekPickerCalendar);

      Object.defineProperty(WSWeekPickerCalendar, 'defaultProps', {
        enumerable: true,
        writable: true,
        value: {
          selectedYear: null,
          selectedWeek: null,
          onChange: function onChange() {}
        }
      });
      Object.defineProperty(WSWeekPickerCalendar, 'propTypes', {
        enumerable: true,
        writable: true,
        value: {
          selectedYear: PropTypes.number,
          selectedWeek: PropTypes.number,
          onChange: PropTypes.func
        }
      });
    }
  };
});