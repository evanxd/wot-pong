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
    _speed: 150,

    setSpeed: function(speed) {
      this._speed = speed;
      if (!this.isPaused) {
        this.pause();
        this.move();
      }
    },

    // TODO: Support two dimension spirit.
    // Currently we only support one dimension spirit.
    draw: function(x, y) {
      var canvas = this._canvas;
      var length = this._spirit.length;
      var i;
      // Clean previous state.
      if (this._x !== -1 && this._y !== -1) {
        for (i = 0; i < length; i++) {
          canvas.matrix[this._x + i][this._y] = 0;
        }
      }
      for (i = 0; i < length; i++) {
        canvas.matrix[x + i][y] = 1;
      }
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
      if (x === 0 || x === 7 || !matrix[x + this._spirit.length] ||
          matrix[x + this._spirit.length][y] || matrix[x - 1][y]) {
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
      window.addEventListener(config.left, () => {
        if (this.isPaused) {
          return;
        }
        if (!this._isCollided().x || this._x) {
          this.draw(this._x - 1, this._y);
        }
      });
      window.addEventListener(config.right, () =>  {
        var matrix = this._canvas.matrix;
        if (this.isPaused) {
          return;
        }
        if (!this._isCollided().x ||
            !matrix[this._x + this._spirit.length][this._y]) {
          this.draw(this._x + 1, this._y);
        }
      });
    }
  };

  exports.Spirit = Spirit;
}(window));
