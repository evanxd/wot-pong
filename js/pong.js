/* global Ball */
/* global Paddle */

'use strict';

(function(exports) {
  function Pong(canvas) {
    // this._paddle = new Paddle(canvas);
    this._ball = new Ball(canvas);
  }

  Pong.prototype = {
    isPaused: true,
    // _paddle: null,
    _ball: null,
    _initilized: false,

    _init: function() {
      if (this._initilized) {
        return;
      }
      // this._paddle.draw(0, 7);
      this._ball.draw(2, 1);
      this._initilized = true;
    },

    start: function() {
      this._init();
      this._ball.move();
      // this._paddle.control({
      //   left: 'move-paddle-left',
      //   right: 'move-paddle-right',
      // });
      this.isPaused = false;
    },

    pause: function() {
      this._ball.pause();
      // this._paddle.pause();
      this.isPaused = true;
    }
  };

  exports.Pong = Pong;
}(window));
