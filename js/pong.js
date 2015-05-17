/* global Ball */
/* global Paddle */

'use strict';

(function(exports) {
  var MATRIX_HEIGHT = 8;

  function Pong(canvas) {
    this._canvas = canvas;
    this._ball = new Ball(canvas);
    this._paddle = new Paddle(canvas);
  }

  Pong.prototype = {
    isPaused: true,
    _canvas: null,
    _paddle: null,
    _ball: null,
    _initilized: false,

    _init: function() {
      if (this._initilized) {
        return;
      }
      this._ball.draw(2, 1);
      this._paddle.draw(5, 7);
      this._startGameoverChecker();
      this._initilized = true;
    },

    start: function() {
      this._init();
      this._ball.move();
      this._paddle.control({
        left: 'move-paddle-left',
        right: 'move-paddle-right',
      });
      this.isPaused = false;
    },

    pause: function() {
      this._ball.pause();
      this._paddle.pause();
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
