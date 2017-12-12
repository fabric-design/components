define(['exports', './json-web-token'], function (exports, _jsonWebToken) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Authorization = undefined;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

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

  var Authorization = exports.Authorization = function () {
    function Authorization(storage) {
      _classCallCheck(this, Authorization);

      this.storage = storage;
      this.accessToken = undefined;
    }

    _createClass(Authorization, [{
      key: 'onAccessTokenChange',
      value: function onAccessTokenChange(callback) {
        this.accessTokenChange = callback;
      }
    }, {
      key: 'changeAccessToken',
      value: function changeAccessToken(accessToken) {
        if (this.accessToken !== accessToken) {
          this.accessToken = accessToken;
          if (typeof this.accessTokenChange === 'function') {
            this.accessTokenChange(accessToken);
          }
        }
      }
    }, {
      key: 'tryFetchToken',
      value: function tryFetchToken(queryString) {
        var queryParams = {};
        (queryString || '').split('&').forEach(function (keyValue) {
          var _keyValue$split = keyValue.split('='),
              _keyValue$split2 = _slicedToArray(_keyValue$split, 2),
              key = _keyValue$split2[0],
              value = _keyValue$split2[1];

          queryParams[key] = decodeURIComponent(value);
        });

        if (queryParams.state) {
          if (this.storage.get('state') !== queryParams.state) {
            throw new Error('Unexpected authorisation response');
          }
          var token = new _jsonWebToken.JsonWebToken(queryParams.access_token);
          this.storage.set('access_token', token);
          this.changeAccessToken(token);
        } else if (this.storage.get('access_token')) {
          var _token = new _jsonWebToken.JsonWebToken(this.storage.get('access_token'));
          this.changeAccessToken(_token);
        } else {
          this.changeAccessToken(null);
        }
      }
    }, {
      key: 'authorize',
      value: function authorize(loginUrl, clientId, businessPartnerId) {
        var query = this.buildQuery([['business_partner_id', businessPartnerId], ['client_id', clientId], ['state', this.createAndRememberUUID()], ['response_type', 'token']]);

        location.href = loginUrl + '?' + query;
      }
    }, {
      key: 'unauthorize',
      value: function unauthorize() {
        this.storage.remove('access_token');
        this.changeAccessToken(null);
      }
    }, {
      key: 'createAndRememberUUID',
      value: function createAndRememberUUID() {
        var id = function id(length) {
          return Math.round(Math.random() * Math.pow(10, length)).toString(16).substring(0, length);
        };
        var uuid = id(8) + '-' + id(4) + '-' + id(4) + '-' + id(4) + '-' + id(12);
        this.storage.set('state', uuid);
        return uuid;
      }
    }, {
      key: 'buildQuery',
      value: function buildQuery(params) {
        return params.map(function (pair) {
          return pair[0] + '=' + encodeURIComponent(pair[1]);
        }).join('&');
      }
    }]);

    return Authorization;
  }();
});