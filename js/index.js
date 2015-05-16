/* global LedMatrixHelper */
'use strict';

var ledMatrix = new LedMatrixHelper('e1:09:43:ea:dd:68');
window.addEventListener('bluetoothready', function bluetoothreadyHandler() {
  window.removeEventListener('bluetoothready', bluetoothreadyHandler);
});
