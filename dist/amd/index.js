define(['exports', './ws-header/ws-header', './ws-date-picker/ws-date-picker', './ws-dropdown/ws-dropdown', './ws-inline-edit/ws-inline-edit', './ws-notification/ws-notification', './ws-week-picker/ws-week-picker', './ws-tiles-chart/ws-tiles-chart', './ws-spinner/ws-spinner'], function (exports, _wsHeader, _wsDatePicker, _wsDropdown, _wsInlineEdit, _wsNotification, _wsWeekPicker, _wsTilesChart, _wsSpinner) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'WSHeader', {
    enumerable: true,
    get: function () {
      return _wsHeader.WSHeader;
    }
  });
  Object.defineProperty(exports, 'WSDatePicker', {
    enumerable: true,
    get: function () {
      return _wsDatePicker.WSDatePicker;
    }
  });
  Object.defineProperty(exports, 'WSDropdown', {
    enumerable: true,
    get: function () {
      return _wsDropdown.WSDropdown;
    }
  });
  Object.defineProperty(exports, 'WSInlineEdit', {
    enumerable: true,
    get: function () {
      return _wsInlineEdit.WSInlineEdit;
    }
  });
  Object.defineProperty(exports, 'WSNotification', {
    enumerable: true,
    get: function () {
      return _wsNotification.WSNotification;
    }
  });
  Object.defineProperty(exports, 'WSWeekPicker', {
    enumerable: true,
    get: function () {
      return _wsWeekPicker.WSWeekPicker;
    }
  });
  Object.defineProperty(exports, 'WSTilesChart', {
    enumerable: true,
    get: function () {
      return _wsTilesChart.WSTilesChart;
    }
  });
  Object.defineProperty(exports, 'WSSpinner', {
    enumerable: true,
    get: function () {
      return _wsSpinner.WSSpinner;
    }
  });
});