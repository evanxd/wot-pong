/* global Spirit */
'use strict';

(function(exports) {
  function Ball(canvas, x, y) {
    this._canvas = canvas;
    this._x = x;
    this._y = y;
    this._direction = {
      x: 1, y: 1
    };
  }

  Ball.prototype = Object.create(Spirit.prototype);

  Ball.prototype._doMoving = function() {
    var x = this._x;
    var y = this._y;
    this._changeDirection();
    var direction = this._direction;
    x += direction.x;
    y += direction.y;
    this.draw(x, y);
    this._x = x;
    this._y = y;
  };

  Ball.prototype._changeDirection = function() {
    var x = this._x;
    var y = this._y;
    var direction = this._direction;
    if (x === 0 || x === 7) {
      if (direction.x === 1) {
        this._direction.x = -1;
      } else {
        this._direction.x = 1;
      }
    }
    if (y === 0 || y === 7) {
      if (direction.y === 1) {
        this._direction.y = -1;
      } else {
        this._direction.y = 1;
      }
    }
  };

  exports.Ball = Ball;
}(window));
