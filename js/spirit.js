'use strict';

(function(exports) {
  function Spirit(canvas, x, y) {
    this._spirit = [1];
    this._canvas = canvas;
    this._x = x;
    this._y = y;
  }

  Spirit.prototype = {
    isPaused: true,
    _spirit: null,
    _canvas: null,
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
      this._timerID = setInterval(this._doMoving.bind(this), this._speed);
    },

    _doMoving: function() {},

    // TODO: Support any kind of spirit.
    draw: function(x, y) {
      var canvas = this._canvas;
      canvas.matrix[this._x][this._y] = 0;
      canvas.matrix[x][y] = 1;
      canvas.render();
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
