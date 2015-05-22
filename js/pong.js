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
    this._paddle2 = new Paddle(canvas, this._timer);
    this._init();
  }

  Pong.prototype = {
    _timer: null,
    _canvas: null,
    _ball: null,
    _paddle1: null,
    _paddle2: null,
    _isDemoMode: false,
    _hitBallTimes: 0,

    get isPaused() {
      return this._timer.isPaused;
    },

    _init: function() {
      var paddle1Sound = new Audio('resources/sounds/adoken.wav');
      var paddle2Sound = new Audio('resources/sounds/soluken.wav');
      this._timer.addAction(function() {
        this._checkGameover();

        var timer = this._timer;
        var speed = this._timer.speed;
        if (this._isBallHitByPaddle1()) {
          paddle1Sound.play();
          navigator.vibrate([150]);
          // Ball speed will be faster and faster
          // after player hits ball more and more times.
          if (speed >= 100) {
            timer.speed = speed - 20;
            timer.pause();
            timer.start();
          }
          this._hitBallTimes++;
        }
        if (this._isBallHitByPaddle2()) {
          paddle2Sound.play();
          navigator.vibrate([150]);
        }

        this._isDemoMode && this._doPaddle1AI();
        this._doPaddle2AI();
      }.bind(this));
      this._ball.move();
      this._paddle1.control({
        left: 'move-paddle1-left',
        right: 'move-paddle1-right',
      });
      this._paddle2.control({
        left: 'move-paddle2-left',
        right: 'move-paddle2-right', 
      });
    },

    start: function(options) {
      if (options && options.isDemoMode) {
        this._isDemoMode = options.isDemoMode;
      } else {
        this._isDemoMode = false;
      }
      this._ball.draw(Math.floor(Math.random() * 6), 3);
      this._paddle1.draw(Math.floor(Math.random() * 5), 7);
      this._paddle2.draw(Math.floor(Math.random() * 5), 0);
      this._timer.speed = DEFAULT_SPEED;
      this._timer.start();
    },

    pause: function() {
      this._timer.pause();
    },

    _checkGameover: function() {
      if (this._isDemoMode) {
        return;
      }
      if (this._ball._y === MATRIX_HEIGHT - 1) {
        console.log('You lose!');
        this._timer.pause();
        new Audio('resources/sounds/dead.wav').play();
        navigator.vibrate([2000]);
        this._hitBallTimes = 0;
      } else if (this._hitBallTimes === 10) {
        console.log('You win!');
        this._timer.pause();
        new Audio('resources/sounds/win.wav').play();
        navigator.vibrate([1000, 500, 1000]);
        this._hitBallTimes = 0;
      }
    },

    _isBallHitByPaddle1: function() {
      return (this._paddle1._y - this._ball._y === 1 &&
        this._ball._x - this._paddle1._x >= 0 &&
        this._ball._x - this._paddle1._x < 3);
    },

    _isBallHitByPaddle2: function() {
      return this._ball._y - this._paddle2._y === 1 &&
        this._ball._x - this._paddle2._x >= 0 &&
        this._ball._x - this._paddle2._x < 3;
    },

    _doPaddle1AI: function() {
      var ball = this._ball;
      var paddle1 = this._paddle1;
      if (paddle1._x > ball._x) {
        window.dispatchEvent(new CustomEvent('move-paddle1-left'));
      } else if (paddle1._x < ball._x) {
        window.dispatchEvent(new CustomEvent('move-paddle1-right'));
      }
    },

    _doPaddle2AI: function() {
      var ball = this._ball;
      var paddle2 = this._paddle2;
      if (paddle2._x > ball._x) {
        window.dispatchEvent(new CustomEvent('move-paddle2-left'));
      } else if (paddle2._x < ball._x) {
        window.dispatchEvent(new CustomEvent('move-paddle2-right'));
      }
    },
  };

  exports.Pong = Pong;
}(window));
