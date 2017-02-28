define(['exports', './ws-header/ws-header', './ws-dropdown/ws-dropdown'], function (exports, _wsHeader, _wsDropdown) {
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
  Object.defineProperty(exports, 'WSDropdown', {
    enumerable: true,
    get: function () {
      return _wsDropdown.WSDropdown;
    }
  });
});