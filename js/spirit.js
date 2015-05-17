'use strict';

(function(exports) {
  function Spirit(canvas) {
    this._spirit = [1];
    this._canvas = canvas;
  }

  Spirit.prototype = {
    isPaused: true,
    _spirit: null,
    _canvas: null,
    _x: -1,
    _y: -1,
    _timerID: null,
    _speed: 300,

    setSpeed: function(speed) {
      this._speed = speed;
    },

    // TODO: Support two dimension spirit.
    // Currently we only support one dimension spirit.
    draw: function(x, y) {
      var canvas = this._canvas;
      this._spirit.forEach((ele, i) => {
        // Clean previous state.
        if (this._x !== -1 && this._y !== -1) {
          canvas.matrix[this._x + i][this._y] = 0;
        }
        canvas.matrix[x + i][y] = 1;
      });
      canvas.render();
      this._x = x;
      this._y = y;
    },

    move: function() {
      this.isPaused = false;
      this._timerID = setInterval(() => {
        var x = this._x;
        var y = this._y;
        var isCollided = this._isCollided();
        this._howToMove(isCollided);
        x += this._direction.x;
        y += this._direction.y;
        this.draw(x, y);
        this._x = x;
        this._y = y;
      }, this._speed);
    },

    _howToMove: function() {},

    _isCollided: function() {
      var matrix = this._canvas.matrix;
      var x = this._x;
      var y = this._y;
      var collidedForX = false;
      var collidedForY = false;
      if (x === 0 || x === 7 ||
          matrix[x + 1][y] || matrix[x - 1][y]) {
        collidedForX = true;
      }
      if (y === 0 || y === 7 ||
          matrix[x][y + 1] || matrix[x][y - 1]) {
        collidedForY = true;
      }
      return { x: collidedForX, y: collidedForY };
    },

    pause: function() {
      this.isPaused = true;
      clearInterval(this._timerID);
    },

    control: function(config) {
      this.isPaused = false;
      // TODO: Remember to remove the below listeners.
      window.addEventListener(config.left, () => {
        if (this.isPaused) {
          return;
        }
        // TODO: Control the spirit.
      });
      window.addEventListener(config.right, () =>  {
        if (this.isPaused) {
          return;
        }
        // TODO: Control the spirit.
      });
    }
  };

  exports.Spirit = Spirit;
}(window));
