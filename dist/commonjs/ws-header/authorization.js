'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Authorization = exports.Authorization = function () {
  function Authorization(storage) {
    var loginUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var clientId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var businessPartnerId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    _classCallCheck(this, Authorization);

    this.storage = storage;
    this.loginUrl = loginUrl;
    this.clientId = clientId;
    this.businessPartnerId = businessPartnerId;
  }

  _createClass(Authorization, [{
    key: 'onAccessTokenChange',
    value: function onAccessTokenChange(callback) {
      this.accessTokenChange = callback;
    }
  }, {
    key: 'changeAccessToken',
    value: function changeAccessToken(accessToken) {
      if (typeof this.accessTokenChange === 'function') {
        this.accessTokenChange(accessToken);
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
        this.updateTokens(queryParams);
      } else if (this.storage.get('access_token')) {
        this.changeAccessToken(this.storage.get('access_token'));
      } else {
        this.changeAccessToken(null);
      }
    }
  }, {
    key: 'updateTokens',
    value: function updateTokens(params) {
      var expires = params.expires_in ? parseInt(params.expires_in, 10) : 3600;
      this.storage.set('access_token', params.access_token);
      this.storage.set('expires_at', new Date().getTime() + expires * 1000);

      this.changeAccessToken(params.access_token);
    }
  }, {
    key: 'authorize',
    value: function authorize() {
      var query = this.buildQuery([['business_partner_id', this.businessPartnerId], ['client_id', this.clientId], ['state', this.createAndRememberUUID()], ['response_type', 'token']]);

      location.href = this.loginUrl + '?' + query;
    }
  }, {
    key: 'unauthorize',
    value: function unauthorize() {
      this.storage.remove('access_key');
      this.storage.remove('expires_at');
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