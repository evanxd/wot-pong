/* global Spirit */
'use strict';

(function(exports) {
  function Paddle(canvas, timer) {
    this._canvas = canvas;
    this._timer = timer;
    this._spirit = [1, 1, 1];
  }

  Paddle.prototype = Object.create(Spirit.prototype);

  Paddle.prototype.constructor = Paddle;

  exports.Paddle = Paddle;
}(window));
