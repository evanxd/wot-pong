/* global LedMatrixHelper */
/* global Pong */
'use strict';

(function() {
  var ledMatrix = new LedMatrixHelper('e1:09:43:ea:dd:68');
  var startButton = document.querySelector('#start');
  var pong = new Pong();

  window.addEventListener('bluetoothready', function() {
    startButton.addEventListener('click', function() {
      if (pong.isPaused) {
        pong.start();
      } else {
        pong.pause();
      }
    });
  });
}());
