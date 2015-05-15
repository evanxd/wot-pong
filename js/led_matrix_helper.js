(function(exports) {
  'use strict';

  function LedMatrixHelper(bluetooth) {
    this._initMatrix();
    this._bluetooth = bluetooth;
  }

  LedMatrixHelper.prototype = {
    matrix: null,
    _bluetooth: null,

    render: function() {
      var data;
      var i, j;
      for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
          if (this.matrix[i][j]) {
            data += (1 << j);
          }
        }
        // XXX: Fix me.
        data = i.toString(16) + data.toString(16);
        console.log('LED Matrix data: ' + data);
        this._bluetooth.sendData('0204');
      }
    },

    _initMatrix: function() {
      this.matrix = [];
      for (var i = 0; i < 8; i++) {
        this.matrix[i] = [];
        for (var j = 0; j < 8; j++) {
          this.matrix[i][j] = 0;
        }
      }
    }
  };

  exports.LedMatrixHelper = LedMatrixHelper;
}(window));
