'use strict';

(function(exports) {
  function Timer(speed) {
    this._actions = [];
    this._speed = speed;
  }

  Timer.prototype = {
    _isPaused: true,
    _speed: null,
    _timerID: null,
    _actions: null,

    get isPaused() {
      return this._isPaused;
    },

    set speed(speed) {
      this._speed = speed;
    },

    get speed() {
      return this._speed;
    },

    addAction: function(action) {
      this._actions.push(action);
    },

    start: function() {
      this._timerID = setInterval(function() {
        this._actions.forEach(function(action) {
          action();
        });
      }.bind(this), this._speed);
      this._isPaused = false;
    },

    pause: function() {
      clearInterval(this._timerID);
      this._isPaused = true;
    }
  };

  exports.Timer = Timer;
}(window));
