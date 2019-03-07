'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var flickr = document.querySelector('.flickr');

var intervalOne = setInterval(function () {
  setTimeout(function () {
    flickr.classList.remove('hidden');
  }, 3000);
  flickr.classList.add('hidden');
}, 4000);

var Timer = function () {
  function Timer() {
    _classCallCheck(this, Timer);

    this.days = +document.querySelector('.timer__section--days').querySelector('.timer__digits').textContent;
    this.hours = +document.querySelector('.timer__section--hours').querySelector('.timer__digits').textContent;
    this.minutes = +document.querySelector('.timer__section--minutes').querySelector('.timer__digits').textContent;
    this.seconds = +document.querySelector('.timer__section--seconds').querySelector('.timer__digits').textContent;
  }

  _createClass(Timer, [{
    key: 'run',
    value: function run() {
      var _this = this;

      var templateFunction = function templateFunction(time, result) {
        document.querySelector('.timer__section--' + time).querySelector('.timer__digits').textContent = result;
      };

      var intervalTimer = setInterval(function () {

        var seconds = void 0;
        var minutes = void 0;
        var hours = void 0;
        var days = void 0;

        if (_this.seconds < 10) {
          seconds = '0' + --_this.seconds;
        } else {
          seconds = --_this.seconds;
        }

        templateFunction('seconds', seconds);

        if (_this.seconds === 0) {
          _this.seconds = 60;

          minutes = --_this.minutes;

          if (_this.minutes < 10) {
            minutes = '0' + minutes;
          }

          if (_this.minutes === -1) {
            _this.minutes = 59;
            minutes = 59;
          }

          templateFunction('minutes', minutes);
        }

        if (_this.minutes === 59 && _this.seconds === 60) {

          hours = --_this.hours;

          if (_this.hours === -1) {
            _this.hours = 23;
            hours = 23;
          }

          if (_this.hours < 10) {
            hours = '0' + hours;
          }

          templateFunction('hours', hours);
        }

        if (_this.hours === 23 && _this.minutes === 59 && _this.seconds === 60) {
          days = --_this.days;

          if (_this.days < 10) {
            days = '0' + days;
          }

          templateFunction('days', days);
        }
      }, 1000);
    }
  }]);

  return Timer;
}();

document.addEventListener('DOMContentLoaded', function () {
  var timer = new Timer();
  timer.run();
});