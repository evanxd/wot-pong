(function(exports) {
  'use strict';

  var MATRIX_WIDTH = 8;
  var MATRIX_HEIGHT = 8;

  function LedMatrixHelper(bluetooth) {
    this._initMatrix();
    this._bluetooth = bluetooth;
  }

  LedMatrixHelper.prototype = {
    matrix: null,
    _bluetooth: null,

    render: function() {
      var data = '';
      var i, j, value;
      for (i = 0; i < MATRIX_WIDTH; i++) {
        value = 0;
        for (j = 0; j < MATRIX_HEIGHT; j++) {
          if (this.matrix[i][j]) {
            value += 1 << j;
          }
        }
        data += this._paddingLeft(i.toString(16), 2) +
                this._paddingLeft(value.toString(16), 2);
      }
      console.log('LED Matrix data: ' + data);
      this._bluetooth.sendData(data);
    },

    _paddingLeft: function(str, lenght) {
      if (str.length >= lenght) {
        return str;
      } else {
        return this._paddingLeft('0' + str, lenght);
      }
    },

    _initMatrix: function() {
      this.matrix = [];
      for (var i = 0; i < MATRIX_WIDTH; i++) {
        this.matrix[i] = [];
        for (var j = 0; j < MATRIX_HEIGHT; j++) {
          this.matrix[i][j] = 0;
        }
      }
    }
  };

  exports.LedMatrixHelper = LedMatrixHelper;
}(window));
