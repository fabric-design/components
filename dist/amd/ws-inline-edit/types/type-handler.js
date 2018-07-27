define(['exports', './number-strategy', './price-strategy', './text-strategy'], function (exports, _numberStrategy, _priceStrategy, _textStrategy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TypeHandler = undefined;

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

  var TypeHandler = exports.TypeHandler = function () {
    function TypeHandler() {
      _classCallCheck(this, TypeHandler);
    }

    _createClass(TypeHandler, null, [{
      key: 'getStrategy',
      value: function getStrategy(type, options) {
        if (!this.TYPES[type]) {
          throw new Error('Unknown type: ' + type);
        }
        return new this.TYPES[type](options);
      }
    }]);

    return TypeHandler;
  }();

  Object.defineProperty(TypeHandler, 'TYPES', {
    enumerable: true,
    writable: true,
    value: {
      text: _textStrategy.TextStrategy,
      number: _numberStrategy.NumberStrategy,
      price: _priceStrategy.PriceStrategy
    }
  });
});