'use strict';

(function(exports) {
  function Spirit(canvas, timer) {
    this._canvas = canvas;
    this._timer = timer;
    this._spirit = [1];
  }

  Spirit.prototype = {
    _spirit: null,
    _canvas: null,
    _timer: null,
    _x: -1,
    _y: -1,
    _isEventListenerAdded: false,

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
      this._timer.addAction(function() {
        var x = this._x;
        var y = this._y;
        var isCollided = this._isCollided();
        this._howToMove(isCollided);
        x += this._direction.x;
        y += this._direction.y;
        this.draw(x, y);
        this._x = x;
        this._y = y;
      }.bind(this));
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

    control: function(config) {
      if (!this._isEventListenerAdded) {
        window.addEventListener(config.left, () => {
          if (this._timer.isPaused) {
            return;
          }
          if (!this._isCollided().x || this._x) {
            this.draw(this._x - 1, this._y);
          }
        });
        window.addEventListener(config.right, () =>  {
          var matrix = this._canvas.matrix;
          if (this._timer.isPaused) {
            return;
          }
          if (!this._isCollided().x ||
              (matrix[this._x + this._spirit.length] &&
               !matrix[this._x + this._spirit.length][this._y])
          ) {
            this.draw(this._x + 1, this._y);
          }
        });
      }
      this._isEventListenerAdded = true;
    }
  };

  exports.Spirit = Spirit;
}(window));
