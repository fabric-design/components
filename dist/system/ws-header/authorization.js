System.register(['./simple-steam'], function (_export, _context) {
  "use strict";

  var SimpleSteam, _slicedToArray, _createClass, Authorization;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_simpleSteam) {
      SimpleSteam = _simpleSteam.SimpleSteam;
    }],
    execute: function () {
      _slicedToArray = function () {
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

      _export('Authorization', Authorization = function () {
        function Authorization(storage) {
          var loginUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
          var refreshUrl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
          var clientId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
          var businessPartnerId = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

          _classCallCheck(this, Authorization);

          this.storage = storage;
          this.loginUrl = loginUrl;
          this.refreshUrl = refreshUrl;
          this.clientId = clientId;
          this.businessPartnerId = businessPartnerId;
          this.authorized = new SimpleSteam();

          this.checkExpiration();
        }

        _createClass(Authorization, [{
          key: 'checkExpiration',
          value: function checkExpiration() {
            var _this = this;

            var expiresAt = this.storage.get('expires_at') || 0;
            var refreshToken = this.storage.get('refresh_token');
            if (!refreshToken) {
              return;
            }

            if (new Date().getTime() > expiresAt - 60000) {
              this.refresh(refreshToken);
            }

            setTimeout(function () {
              return _this.checkExpiration();
            }, 59000);
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
              this.authorized.publish(this.storage.get('access_token'));
            } else {
              this.authorized.publish(null);
            }
          }
        }, {
          key: 'updateTokens',
          value: function updateTokens(params) {
            var expires = params.expires_in ? parseInt(params.expires_in, 10) : 3600;
            this.storage.set('access_token', params.access_token);
            this.storage.set('refresh_token', params.refresh_token);
            this.storage.set('expires_at', new Date().getTime() + expires * 1000);

            this.authorized.publish(params.access_token);
          }
        }, {
          key: 'authorize',
          value: function authorize() {
            var query = this.buildQuery([['business_partner_id', this.businessPartnerId], ['client_id', this.clientId], ['state', this.createAndRememberUUID()], ['response_type', 'token']]);

            location.href = this.loginUrl + '?' + query;
          }
        }, {
          key: 'refresh',
          value: function refresh(token) {
            var _this2 = this;

            if (!this.refreshUrl || !token) {
              return;
            }
            var data = this.buildQuery([['business_partner_id', this.businessPartnerId], ['client_id', this.clientId], ['grant_type', 'refresh_token'], ['refresh_token', token], ['state', this.createAndRememberUUID()], ['response_type', 'token']]);

            var xhr = new XMLHttpRequest();
            xhr.open('POST', this.refreshUrl, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.addEventListener('load', function () {
              if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                  _this2.updateTokens(JSON.parse(xhr.responseText));
                } else {
                  throw new Error('Could not refresh token: ' + xhr.responseText);
                }
              }
            });
            xhr.send(data);
          }
        }, {
          key: 'unauthorize',
          value: function unauthorize() {
            this.storage.remove('access_key');
            this.storage.remove('refresh_key');
            this.storage.remove('expires_at');
            this.authorized.publish(null);
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
      }());

      _export('Authorization', Authorization);
    }
  };
});