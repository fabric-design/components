define(['exports', './abstract-storage'], function (exports, _abstractStorage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.LocalStorage = undefined;

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

  var LocalStorage = exports.LocalStorage = function (_AbstractStorage) {
    _inherits(LocalStorage, _AbstractStorage);

    function LocalStorage() {
      _classCallCheck(this, LocalStorage);

      return _possibleConstructorReturn(this, (LocalStorage.__proto__ || Object.getPrototypeOf(LocalStorage)).apply(this, arguments));
    }

    _createClass(LocalStorage, [{
      key: 'set',
      value: function set(key, value) {
        var encodedValue = encodeURIComponent(JSON.stringify(value));
        localStorage.setItem('' + name + key, encodedValue);
      }
    }, {
      key: 'get',
      value: function get(key) {
        var encodedValue = localStorage.getItem(key);

        if (encodedValue) {
          try {
            return JSON.parse(decodeURIComponent(encodedValue));
          } catch (e) {
            console.warn('Could not deserialize ' + key);
          }
        }
        return undefined;
      }
    }, {
      key: 'remove',
      value: function remove(key) {
        localStorage.removeItem('' + this.name + key);
      }
    }]);

    return LocalStorage;
  }(_abstractStorage.AbstractStorage);
});