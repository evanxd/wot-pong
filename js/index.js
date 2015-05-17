/* global LedMatrixHelper */
/* global Pong */
'use strict';

(function(exports) {
  var ledMatrix = new LedMatrixHelper('e1:09:43:ea:dd:68');
  var startButton = document.querySelector('#start');
  var leftButton = document.querySelector('#left');
  var rightButton = document.querySelector('#right');
  var pong = new Pong(ledMatrix);

  startButton.addEventListener('click', function() {
    if (pong.isPaused) {
      pong.start();
    } else {
      pong.pause();
    }
  });

  leftButton.addEventListener('click', function() {
    window.dispatchEvent(new CustomEvent('move-paddle-left'));
  });

  rightButton.addEventListener('click', function() {
    window.dispatchEvent(new CustomEvent('move-paddle-right'));
  });

  window.addEventListener('bluetoothready', function bluetoothreadyHandler() {
    window.removeEventListener('bluetoothready', bluetoothreadyHandler);
    startButton.disabled = false;
    leftButton.disabled = false;
    rightButton.disabled = false;
  });

  // For debugging.
  exports.ledMatrix = ledMatrix;
}(window));
