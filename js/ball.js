/* global Spirit */
'use strict';

(function(exports) {
  function Ball(canvas, timer) {
    this._canvas = canvas;
    this._timer = timer;
    this._spirit = [1];
    this._direction = {
      x: 1, y: 1
    };
  }

  Ball.prototype = Object.create(Spirit.prototype);

  Ball.prototype.constructor = Ball;

  Ball.prototype._howToMove = function(isCollided) {
    ['x', 'y'].forEach((dim) => {
      if (isCollided[dim]) {
        this._direction[dim] = -this._direction[dim];
      }
    });
  };

  exports.Ball = Ball;
}(window));
