"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SimpleSteam = exports.SimpleSteam = function () {
  function SimpleSteam() {
    _classCallCheck(this, SimpleSteam);

    this.data = [];
    this.subscribers = [];
  }

  _createClass(SimpleSteam, [{
    key: "subscribe",
    value: function subscribe(callback) {
      var subscriber = {
        offset: 0,
        callback: callback
      };
      this.subscribers.push(subscriber);

      this.callSubscriber(subscriber);
    }
  }, {
    key: "publish",
    value: function publish(data) {
      this.data.push(data);
      this.callSubscribers();
    }
  }, {
    key: "callSubscribers",
    value: function callSubscribers() {
      var _this = this;

      this.subscribers.forEach(function (subscriber) {
        return _this.callSubscriber(subscriber);
      });
    }
  }, {
    key: "callSubscriber",
    value: function callSubscriber(subscriber) {
      var subscriberData = this.data.slice(subscriber.offset);
      subscriberData.forEach(function (entry) {
        return subscriber.callback(entry);
      });
      subscriber.offset = this.data.length;
    }
  }]);

  return SimpleSteam;
}();