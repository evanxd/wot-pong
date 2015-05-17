/* global Spirit */
'use strict';

(function(exports) {
  function Paddle(canvas) {
    this._spirit = [1, 1, 1];
    this._canvas = canvas;
  }

  Paddle.prototype = Object.create(Spirit.prototype);

  Paddle.prototype.constructor = Paddle;

  exports.Paddle = Paddle;
}(window));
