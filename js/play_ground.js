/* global LedMatrixHelper */
'use strict';

(function() {
  var ledMatrix = new LedMatrixHelper('e1:09:43:ea:dd:68');
  window.addEventListener('bluetoothready', function bluetoothreadyHandler() {
    window.removeEventListener('bluetoothready', bluetoothreadyHandler);

    setInterval(function() {
      leftShiftMatrix();
      drawWaterPipe();
      ledMatrix.render();
    }, 200);
  });

  function leftShiftMatrix() {
    for (var i = 0; i < 7; i++) {
      for (var j = 0; j < 8; j++) {
        ledMatrix.matrix[i][j] = ledMatrix.matrix[i + 1][j];
      }
    }
  }

  function drawWaterPipe() {
    var top = Math.floor((Math.random() * 3) + 1);
    var bottom = Math.floor((Math.random() * 3) + 1);
    var between = 8 - bottom;
    for (var i = 0; i < 8; i++) {
      if (i < top) {
        ledMatrix.matrix[7][i] = 1;
      } else if (i < between) {
        ledMatrix.matrix[7][i] = 0;
      } else {
        ledMatrix.matrix[7][i] = 1;
      }
    }
  }
})();
