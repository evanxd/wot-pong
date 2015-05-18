/* global Ball */
/* global Paddle */

'use strict';

(function(exports) {
  var MATRIX_HEIGHT = 8;

  function Pong(canvas) {
    this._canvas = canvas;
    this._ball = new Ball(canvas);
    this._paddle1 = new Paddle(canvas);
    this._paddle2 = new Paddle(canvas);
  }

  Pong.prototype = {
    isPaused: true,
    _canvas: null,
    _paddle1: null,
    _paddle2: null,
    _ball: null,
    _initilized: false,

    _init: function() {
      if (this._initilized) {
        return;
      }
      this._ball.draw(2, 1);
      this._paddle1.draw(5, 0);
      this._paddle2.draw(5, 7);
      this._startGameoverChecker();
      this._initilized = true;
    },

    start: function() {
      this._init();
      this._ball.move();
      var config = {
        left: 'move-paddle-left',
        right: 'move-paddle-right',
      };
      this._paddle1.control(config);
      this._paddle2.control(config);
      this.isPaused = false;
    },

    pause: function() {
      this._ball.pause();
      this._paddle1.pause();
      this._paddle2.pause();
      this.isPaused = true;
    },

    _startGameoverChecker: function() {
      var timerID = setInterval(() => {
        if (this._ball._y === MATRIX_HEIGHT - 1) {
          this.pause();
          this._initilized = false;
          clearInterval(timerID);
          console.log('Game Over!');
        }
      }, 150);
    }
  };

  exports.Pong = Pong;
}(window));
