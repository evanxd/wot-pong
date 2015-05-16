'use strict';

(function(exports) {
  function Spirit(matrix, x, y) {
    this._matrix = matrix;
    this._x = x;
    this._y = y;
  }

  Spirit.prototype = {
    isPaused: true,
    _matrix: null,
    _spirit: null,
    _x: -1,
    _y: -1,
    _howToMove: null,
    _timerID: null,
    _speed: 300,

    setSpirit: function(spirit) {
      this._spirit = spirit;
    },

    move: function() {
      this.isPaused = false;
      this._timerID = setInterval(this._howToMove, this._speed);
    },

    setHowToMove: function(howToMove) {
      this._howToMove = howToMove;
    },

    setSpeed: function(speed) {
      this._speed = speed;
    },

    setControllable: function(config) {
      this.isPaused = false;
    },

    pause: function() {
      this.isPaused = true;
      clearInterval(this._timerID);
    }
  };

  exports.Spirit = Spirit;
}(window));
