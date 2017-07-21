var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

export var AbstractStorage = function () {
  function AbstractStorage(name) {
    _classCallCheck(this, AbstractStorage);

    this.name = name ? name + '-' : '';
  }

  _createClass(AbstractStorage, [{
    key: 'set',
    value: function set(key, value) {
      throw new Error('\'' + this.constructor.name + '\' must implement function \'set\'');
    }
  }, {
    key: 'get',
    value: function get(key) {
      throw new Error('\'' + this.constructor.name + '\' must implement function \'get\'');
    }
  }, {
    key: 'remove',
    value: function remove(key) {
      throw new Error('\'' + this.constructor.name + '\' must implement function \'remove\'');
    }
  }]);

  return AbstractStorage;
}();