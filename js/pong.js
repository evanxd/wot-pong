/* global Ball */
/* global Paddle */

'use strict';

(function(exports) {
  var MATRIX_HEIGHT = 8;

  function Pong(canvas) {
    this._canvas = canvas;
    this._ball = new Ball(canvas);
    this._paddle1 = new Paddle(canvas);
    // this._paddle2 = new Paddle(canvas);
    this._speed = this._ball.getSpeed();
  }

  Pong.prototype = {
    isPaused: true,
    _timerID: null,
    _speed: null,
    _canvas: null,
    _paddle1: null,
    _paddle2: null,
    _ball: null,
    _initilized: false,

    _init: function() {
      if (this._initilized) {
        return;
      }
      this._ball.draw(Math.floor(Math.random() * 6), 1);
      this._paddle1.draw(Math.floor(Math.random() * 5), 7);
      // this._paddle2.draw(5, 0);
      this._startTimer();
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
      // this._paddle2.control(config);
      this.isPaused = false;
    },

    pause: function() {
      this._ball.pause();
      this._paddle1.pause();
      // this._paddle2.pause();
      this.isPaused = true;
    },

    _startTimer: function() {
      this._timerID = setInterval(() => {
        this._checkGameover();
        if (this._paddle1._y - this._ball._y === 1 &&
            this._ball._x - this._paddle1._x >= 0 &&
            this._ball._x - this._paddle1._x < 3) {
          new Audio('resources/sounds/hit-ball.ogg').play();
          navigator.vibrate([150]);
        }
      }, this._speed);
    },

    _checkGameover: function() {
      if (this._ball._y === MATRIX_HEIGHT - 1) {
        this.pause();
        new Audio('resources/sounds/game-over.ogg').play();
        navigator.vibrate([3000]);
        this._initilized = false;
        clearInterval(this._timerID);
        console.log('Game Over!');
      }
    }
  };

  exports.Pong = Pong;
}(window));
