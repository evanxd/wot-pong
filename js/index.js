/* global LedMatrixHelper */
/* global Pong */
'use strict';

(function(exports) {
  var ledMatrix = new LedMatrixHelper({ address: 'e1:09:43:ea:dd:68' });
  var bluetooth = ledMatrix.bluetooth;
  var pong = new Pong(ledMatrix);
  var reconnectButton = document.querySelector('#reconnect');
  var demoButton = document.querySelector('#demo');
  var newButton = document.querySelector('#new');
  var leftButton = document.querySelector('#left');
  var rightButton = document.querySelector('#right');
  var message = document.querySelector('#message');

  leftButton.addEventListener('click', function() {
    window.dispatchEvent(new CustomEvent('move-paddle1-left'));
  });

  rightButton.addEventListener('click', function() {
    window.dispatchEvent(new CustomEvent('move-paddle1-right'));
  });

  reconnectButton.addEventListener('click', function() {
    message.innerHTML = 'Pixel is reconnecting...';
    bluetooth._disconnect().then(() => {
      return bluetooth._connect();
    });
  });

  demoButton.addEventListener('click', function() {
    !pong.isPaused && pong.pause();
    pong.start({ isDemoMode: true });
  });

  newButton.addEventListener('click', function() {
    !pong.isPaused && pong.pause();
    pong.start();
  });

  message.innerHTML = 'Pixel is connecting...';
  bluetooth.on('connected', function() {
    message.innerHTML = 'Pixel is connected.';
    newButton.disabled = false;
  });

  // Need to disconnect BLE before app is closed,
  // or FxOS will just be crashed.
  window.addEventListener('close', function() {
    bluetooth._disconnect();
  });

  // For debugging in run time.
  exports.ledMatrix = ledMatrix;
  exports.pong = pong;
}(window));
