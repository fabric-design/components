System.register(['./ws-header/ws-header', './ws-date-picker/ws-date-picker', './ws-dropdown/ws-dropdown', './ws-inline-edit/ws-inline-edit', './ws-notification/ws-notification', './ws-week-picker/ws-week-picker', './ws-tiles-chart/ws-tiles-chart', './ws-spinner/ws-spinner', './ws-tab-menu/ws-tab-menu', './ws-option-buttons/ws-option-buttons'], function (_export, _context) {
  "use strict";

  var WSHeader, WSDatePicker, WSDropdown, WSInlineEdit, WSNotification, WSWeekPicker, WSTilesChart, WSSpinner, WSTabMenu, WSOptionButtons;
  return {
    setters: [function (_wsHeaderWsHeader) {
      WSHeader = _wsHeaderWsHeader.WSHeader;
    }, function (_wsDatePickerWsDatePicker) {
      WSDatePicker = _wsDatePickerWsDatePicker.WSDatePicker;
    }, function (_wsDropdownWsDropdown) {
      WSDropdown = _wsDropdownWsDropdown.WSDropdown;
    }, function (_wsInlineEditWsInlineEdit) {
      WSInlineEdit = _wsInlineEditWsInlineEdit.WSInlineEdit;
    }, function (_wsNotificationWsNotification) {
      WSNotification = _wsNotificationWsNotification.WSNotification;
    }, function (_wsWeekPickerWsWeekPicker) {
      WSWeekPicker = _wsWeekPickerWsWeekPicker.WSWeekPicker;
    }, function (_wsTilesChartWsTilesChart) {
      WSTilesChart = _wsTilesChartWsTilesChart.WSTilesChart;
    }, function (_wsSpinnerWsSpinner) {
      WSSpinner = _wsSpinnerWsSpinner.WSSpinner;
    }, function (_wsTabMenuWsTabMenu) {
      WSTabMenu = _wsTabMenuWsTabMenu.WSTabMenu;
    }, function (_wsOptionButtonsWsOptionButtons) {
      WSOptionButtons = _wsOptionButtonsWsOptionButtons.WSOptionButtons;
    }],
    execute: function () {
      _export('default', {
        WSHeader: WSHeader,
        WSDatePicker: WSDatePicker,
        WSDropdown: WSDropdown,
        WSInlineEdit: WSInlineEdit,
        WSNotification: WSNotification,
        WSWeekPicker: WSWeekPicker,
        WSTilesChart: WSTilesChart,
        WSSpinner: WSSpinner,
        WSTabMenu: WSTabMenu,
        WSOptionButtons: WSOptionButtons
      });
    }
  };
});