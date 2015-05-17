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
    var matrix = this._canvas.matrix;
    var x = this._x;
    var y = this._y;
    if ((matrix[x - 1] && matrix[x - 1][y - 1]) ||
        (matrix[x + 1] && matrix[x + 1][y - 1]) ||
        (matrix[x - 1] && matrix[x - 1][y + 1]) ||
        (matrix[x + 1] && matrix[x + 1][y + 1])) {
      this._direction.x = -this._direction.x;
      this._direction.y = -this._direction.y;
    } else {
      ['x', 'y'].forEach((dim) => {
        if (isCollided[dim]) {
          this._direction[dim] = -this._direction[dim];
        }
      });
    }
  };

  exports.Ball = Ball;
}(window));
