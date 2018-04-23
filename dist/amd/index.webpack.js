define(['exports', './ws-header/ws-header', './ws-date-picker/ws-date-picker', './ws-dropdown/ws-dropdown', './ws-inline-edit/ws-inline-edit', './ws-notification/ws-notification', './ws-week-picker/ws-week-picker', './ws-tiles-chart/ws-tiles-chart', './ws-spinner/ws-spinner', './ws-tab-menu/ws-tab-menu', './ws-option-buttons/ws-option-buttons'], function (exports, _wsHeader, _wsDatePicker, _wsDropdown, _wsInlineEdit, _wsNotification, _wsWeekPicker, _wsTilesChart, _wsSpinner, _wsTabMenu, _wsOptionButtons) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    WSHeader: _wsHeader.WSHeader,
    WSDatePicker: _wsDatePicker.WSDatePicker,
    WSDropdown: _wsDropdown.WSDropdown,
    WSInlineEdit: _wsInlineEdit.WSInlineEdit,
    WSNotification: _wsNotification.WSNotification,
    WSWeekPicker: _wsWeekPicker.WSWeekPicker,
    WSTilesChart: _wsTilesChart.WSTilesChart,
    WSSpinner: _wsSpinner.WSSpinner,
    WSTabMenu: _wsTabMenu.WSTabMenu,
    WSOptionButtons: _wsOptionButtons.WSOptionButtons
  };
});