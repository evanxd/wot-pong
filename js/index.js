/* global LedMatrixHelper */

var ledMatrix = new LedMatrixHelper('e1:09:43:ea:dd:68');
window.addEventListener('bluetoothready', function bluetoothreadyHandler() {
  window.removeEventListener('bluetoothready', bluetoothreadyHandler);
  ledMatrix.matrix[0][0] = 1;
  ledMatrix.render();
});
