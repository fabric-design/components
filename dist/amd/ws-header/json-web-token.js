define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
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

  var log = console;

  var JsonWebToken = exports.JsonWebToken = function () {
    function JsonWebToken(token) {
      _classCallCheck(this, JsonWebToken);

      this.token = token;
    }

    _createClass(JsonWebToken, [{
      key: 'getParsedToken',
      value: function getParsedToken() {
        if (!this.parsedToken) {
          var parts = this.token.split('.');
          this.parsedToken = JSON.parse(atob(parts[1]));
        }
        return this.parsedToken;
      }
    }, {
      key: 'isValid',
      value: function isValid() {
        try {
          var tokenObject = this.getParsedToken();
          var expiresAt = parseInt(tokenObject.exp, 10) * 1000;
          return new Date().getTime() < expiresAt;
        } catch (e) {
          log.warn('The validity of the token could not be determined');
        }
        return false;
      }
    }, {
      key: 'getUserAbbreviation',
      value: function getUserAbbreviation() {
        try {
          var tokenObject = this.getParsedToken();

          var nameKey = Object.keys(tokenObject).find(function (key) {
            return key.includes('managed-id');
          });
          return tokenObject[nameKey];
        } catch (e) {
          log.warn('The validity of the token could not be determined');
        }
        return null;
      }
    }, {
      key: 'toString',
      value: function toString() {
        return this.token;
      }
    }, {
      key: 'valueOf',
      value: function valueOf() {
        return this.toString();
      }
    }, {
      key: 'toJSON',
      value: function toJSON() {
        return this.toString();
      }
    }]);

    return JsonWebToken;
  }();
});