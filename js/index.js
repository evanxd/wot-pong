/* global LedMatrixHelper */
/* global Pong */
'use strict';

(function(exports) {
  var ledMatrix = new LedMatrixHelper('e1:09:43:ea:dd:68');
  var pong = new Pong(ledMatrix);
  var reconnectButton = document.querySelector('#reconnect');
  var startButton = document.querySelector('#start');
  var leftButton = document.querySelector('#left');
  var rightButton = document.querySelector('#right');
  var message = document.querySelector('#message');

  leftButton.addEventListener('click', function() {
    window.dispatchEvent(new CustomEvent('move-paddle-left'));
  });

  rightButton.addEventListener('click', function() {
    window.dispatchEvent(new CustomEvent('move-paddle-right'));
  });

  reconnectButton.addEventListener('click', function() {
    message.innerHTML = 'Pixel is reconnecting...';
    var bluetooth = ledMatrix._bluetooth;
    bluetooth._disconnectBleServer().then(() => {
      return bluetooth._connectBleServer();
    });
  });

  startButton.addEventListener('click', function() {
    if (pong.isPaused) {
      pong.start();
    } else {
      pong.pause();
    }
  });

  message.innerHTML = 'Pixel is connecting...';
  window.addEventListener('bluetoothready', function bluetoothreadyHandler() {
    window.removeEventListener('bluetoothready', bluetoothreadyHandler);
    message.innerHTML = 'Pixel is connected.';
    startButton.disabled = false;
  });

  // For debugging in run time.
  exports.ledMatrix = ledMatrix;
  exports.pong = pong;
}(window));
