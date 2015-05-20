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
      this._isPaused = false;
      this._timerID = setInterval(() => {
        this._actions.forEach((action) => {
          !this.isPaused && action();
        });
      }, this._speed);
    },

    pause: function() {
      this._isPaused = true;
      clearInterval(this._timerID);
    }
  };

  exports.Timer = Timer;
}(window));
