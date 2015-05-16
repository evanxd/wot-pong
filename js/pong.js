/* global Ball */
/* global Paddle */

'use strict';

(function(exports) {
  function Pong(canvas) {
    // this.paddle = new Paddle(canvas, 0, 7);
    this._ball = new Ball(canvas, 0, 0);
  }

  Pong.prototype = {
    isPaused: true,
    // paddle: null,
    _ball: null,

    start: function() {
      this._ball.move();
      // this.paddle.setControllable();
      this.isPaused = false;
    },

    pause: function() {
      this._ball.pause();
      // this.paddle.pause();
      this.isPaused = true;
    }
  };

  exports.Pong = Pong;
}(window));
