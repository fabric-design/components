'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CookieStorage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _abstractStorage = require('./abstract-storage');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EXTRACT_TOP_LEVEL_DOMAIN = /.*?([a-zA-Z0-9-]{3,}\.[a-zA-Z0-9]{2,})$/;

var CookieStorage = exports.CookieStorage = function (_AbstractStorage) {
  _inherits(CookieStorage, _AbstractStorage);

  function CookieStorage() {
    _classCallCheck(this, CookieStorage);

    return _possibleConstructorReturn(this, (CookieStorage.__proto__ || Object.getPrototypeOf(CookieStorage)).apply(this, arguments));
  }

  _createClass(CookieStorage, [{
    key: 'set',
    value: function set(key, value) {
      var expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      this.createCookie(key, value, expires);
    }
  }, {
    key: 'get',
    value: function get(key) {
      var regex = new RegExp('' + this.name + key + '=(.*?)(;|$)');
      var match = document.cookie.match(regex);

      if (match) {
        try {
          return JSON.parse(decodeURIComponent(match[1]));
        } catch (e) {
          console.warn('Could not deserialize ' + key);
        }
      }
      return undefined;
    }
  }, {
    key: 'remove',
    value: function remove(key) {
      var expires = new Date();
      expires.setDate(expires.getDate() - 1);
      this.createCookie(key, null, expires);
    }
  }, {
    key: 'createCookie',
    value: function createCookie(key, value, expires) {
      var encodedValue = encodeURIComponent(JSON.stringify(value));
      var domain = location.hostname.replace(EXTRACT_TOP_LEVEL_DOMAIN, '$1');

      document.cookie = '' + this.name + key + '=' + encodedValue + ';expires=' + expires + ';domain=' + domain;
    }
  }]);

  return CookieStorage;
}(_abstractStorage.AbstractStorage);