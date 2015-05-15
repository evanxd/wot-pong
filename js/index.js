/* global BluetoothHelper */
/* global LedMatrixHelper */

(function() {
  'use strict';
  var bluetooth = new BluetoothHelper('e1:09:43:ea:dd:68');
  window.addEventListener('bluetoothready', function bluetoothreadyHandler() {
    window.removeEventListener('bluetoothready', bluetoothreadyHandler);
    var ledMatrix = new LedMatrixHelper(bluetooth);
    ledMatrix.matrix[0][0] = 1;
    ledMatrix.render();
  });
}());
