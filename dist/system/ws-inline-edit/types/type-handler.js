System.register(['./number-strategy', './price-strategy', './text-strategy'], function (_export, _context) {
  "use strict";

  var NumberStrategy, PriceStrategy, TextStrategy, _createClass, TypeHandler;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_numberStrategy) {
      NumberStrategy = _numberStrategy.NumberStrategy;
    }, function (_priceStrategy) {
      PriceStrategy = _priceStrategy.PriceStrategy;
    }, function (_textStrategy) {
      TextStrategy = _textStrategy.TextStrategy;
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

      _export('TypeHandler', TypeHandler = function () {
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
      }());

      _export('TypeHandler', TypeHandler);

      Object.defineProperty(TypeHandler, 'TYPES', {
        enumerable: true,
        writable: true,
        value: {
          text: TextStrategy,
          number: NumberStrategy,
          price: PriceStrategy
        }
      });
    }
  };
});