/* global Spirit */
'use strict';

(function(exports) {
  function Ball(canvas) {
    this._canvas = canvas;
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
        if (this._direction[dim] === 1) {
          this._direction[dim] = -1;
        } else {
          this._direction[dim] = 1;
        }
      }
    });
  };

  exports.Ball = Ball;
}(window));
