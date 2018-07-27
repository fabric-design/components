define(['exports', './abstract-type-strategy'], function (exports, _abstractTypeStrategy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PriceStrategy = undefined;

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

  var english = '([0-9]*(,[0-9]{3})*)(\\.[0-9]{2})?';
  var german = '([0-9]*(\\.[0-9]{3})*)(,[0-9]{2})?';
  var strip = function strip(str) {
    return str.replace(/[.,]/g, '');
  };

  var PriceStrategy = exports.PriceStrategy = function (_AbstractTypeStrategy) {
    _inherits(PriceStrategy, _AbstractTypeStrategy);

    function PriceStrategy(options) {
      _classCallCheck(this, PriceStrategy);

      var _this = _possibleConstructorReturn(this, (PriceStrategy.__proto__ || Object.getPrototypeOf(PriceStrategy)).call(this, options));

      _this.locale = options.locale;
      return _this;
    }

    _createClass(PriceStrategy, [{
      key: 'validate',
      value: function validate(value) {
        return PriceStrategy.getPattern(this.locale).test(value);
      }
    }, {
      key: 'convert',
      value: function convert(value) {
        var simple = value.replace(PriceStrategy.getPattern(this.locale), PriceStrategy.convertToDecimal);
        return parseFloat(simple);
      }
    }], [{
      key: 'getPattern',
      value: function getPattern(locale) {
        switch (locale) {
          case 'de':
            return new RegExp('^' + german + '$');
          case 'en':
            return new RegExp('^' + english + '$');
          default:
            return new RegExp('^' + english + '|' + german + '$');
        }
      }
    }, {
      key: 'convertToDecimal',
      value: function convertToDecimal(match) {
        var combined = strip((arguments.length <= 1 ? undefined : arguments[1]) || (arguments.length <= 4 ? undefined : arguments[4]));
        if ((arguments.length <= 3 ? undefined : arguments[3]) || (arguments.length <= 6 ? undefined : arguments[6])) {
          combined += '.' + strip((arguments.length <= 3 ? undefined : arguments[3]) || (arguments.length <= 6 ? undefined : arguments[6]));
        }
        return combined;
      }
    }]);

    return PriceStrategy;
  }(_abstractTypeStrategy.AbstractTypeStrategy);
});