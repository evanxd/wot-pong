/* global LedMatrixHelper */
/* global Pong */
'use strict';

(function(exports) {
  var ledMatrix = new LedMatrixHelper('e1:09:43:ea:dd:68');
  var startButton = document.querySelector('#start');
  var pong = new Pong(ledMatrix);

  startButton.addEventListener('click', function() {
    if (pong.isPaused) {
      pong.start();
    } else {
      pong.pause();
    }
  });

  window.addEventListener('bluetoothready', function bluetoothreadyHandler() {
    window.removeEventListener('bluetoothready', bluetoothreadyHandler);
    startButton.disabled = false;
  });

  // For debugging.
  exports.ledMatrix = ledMatrix;
}(window));
