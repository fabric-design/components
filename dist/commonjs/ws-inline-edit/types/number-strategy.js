'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberStrategy = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _abstractTypeStrategy = require('./abstract-type-strategy');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var english = '([0-9]*(,[0-9]{3})*)(\\.[0-9]+)?';
var german = '([0-9]*(\\.[0-9]{3})*)(,[0-9]+)?';
var strip = function strip(str) {
  return str.replace(/[.,]/g, '');
};

var NumberStrategy = exports.NumberStrategy = function (_AbstractTypeStrategy) {
  _inherits(NumberStrategy, _AbstractTypeStrategy);

  function NumberStrategy(options) {
    _classCallCheck(this, NumberStrategy);

    var _this = _possibleConstructorReturn(this, (NumberStrategy.__proto__ || Object.getPrototypeOf(NumberStrategy)).call(this, options));

    _this.locale = options.locale;
    return _this;
  }

  _createClass(NumberStrategy, [{
    key: 'validate',
    value: function validate(value) {
      if (this.locale) {
        return NumberStrategy.getPattern(this.locale).test(value);
      }
      return NumberStrategy.getPattern('en').test(value) || NumberStrategy.getPattern('de').test(value);
    }
  }, {
    key: 'convert',
    value: function convert(value) {
      var simple = void 0;
      if (this.locale) {
        simple = value.replace(NumberStrategy.getPattern(this.locale), NumberStrategy.convertToDecimal);
      } else if (NumberStrategy.getPattern('en').test(value)) {
        simple = value.replace(NumberStrategy.getPattern('en'), NumberStrategy.convertToDecimal);
      } else if (NumberStrategy.getPattern('de').test(value)) {
        simple = value.replace(NumberStrategy.getPattern('de'), NumberStrategy.convertToDecimal);
      }
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
          return new RegExp('^' + english + '$');
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

  return NumberStrategy;
}(_abstractTypeStrategy.AbstractTypeStrategy);