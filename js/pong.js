/* global Ball */
/* global Paddle */
/* global Timer */

'use strict';

(function(exports) {
  var MATRIX_HEIGHT = 8;
  var DEFAULT_SPEED = 300;

  function Pong(canvas) {
    this._canvas = canvas;
    this._timer = new Timer(DEFAULT_SPEED);
    this._ball = new Ball(canvas, this._timer);
    this._paddle1 = new Paddle(canvas, this._timer);
    // this._paddle2 = new Paddle(canvas);
    this._init();
  }

  Pong.prototype = {
    _timer: null,
    _canvas: null,
    _ball: null,
    _paddle1: null,
    _paddle2: null,
    _initilized: false,

    get isPaused() {
      return this._timer.isPaused;
    },

    _init: function() {
      this._timer.addAction(function() {
        var timer = this._timer;
        var speed = this._timer.speed;
        this._checkGameover();
        if (this._isBallHit()) {
          new Audio('resources/sounds/hit-ball.ogg').play();
          navigator.vibrate([150]);
          // Ball speed will be faster and faster
          // after player hits ball more and more times.
          if (speed >= 100) {
            timer.speed = speed - 20;
            timer.pause();
            timer.start();
          }
        }
      }.bind(this));
      this._ball.move();
      this._paddle1.control({
        left: 'move-paddle-left',
        right: 'move-paddle-right',
      });
    },

    start: function() {
      this._ball.draw(Math.floor(Math.random() * 6), 1);
      this._paddle1.draw(Math.floor(Math.random() * 5), 7);
      // this._paddle2.draw(5, 0);
      this._timer.speed = DEFAULT_SPEED;
      this._timer.start();
    },

    pause: function() {
      this._timer.pause();
    },

    _checkGameover: function() {
      if (this._ball._y === MATRIX_HEIGHT - 1) {
        this._timer.pause();
        new Audio('resources/sounds/game-over.ogg').play();
        navigator.vibrate([3000]);
        console.log('Game Over!');
      }
    },

    _isBallHit: function() {
      return this._paddle1._y - this._ball._y === 1 &&
        this._ball._x - this._paddle1._x >= 0 &&
        this._ball._x - this._paddle1._x < 3;
    }
  };

  exports.Pong = Pong;
}(window));
