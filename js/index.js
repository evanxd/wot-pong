/* global LedMatrixHelper */
/* global Pong */
'use strict';

(function(exports) {
  var ledMatrix = new LedMatrixHelper('e1:09:43:ea:dd:68');
  var pong = new Pong(ledMatrix);
  var reconnectButton = document.querySelector('#reconnect');
  var disconnectButton = document.querySelector('#disconnect');
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

  disconnectButton.addEventListener('click', function() {
    message.innerHTML = 'Pixel is disconnecting...';
    var bluetooth = ledMatrix._bluetooth;
    bluetooth._disconnectBleServer().then(() => {
      return bluetooth._connectBleServer();
    });
  });
  reconnectButton.addEventListener('click', function() {
    message.innerHTML = 'Pixel is reconnecting...';
    var bluetooth = ledMatrix._bluetooth;
    bluetooth._disconnectBleServer().then(() => {
      return bluetooth._connectBleServer();
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
  window.addEventListener('bluetoothready', function bluetoothreadyHandler() {
    window.removeEventListener('bluetoothready', bluetoothreadyHandler);
    message.innerHTML = 'Pixel is connected.';
    newButton.disabled = false;
  });

  // Need to disconnect BLE before app is closed,
  // or FxOS will just be crashed.
  window.addEventListener('close', function() {
    ledMatrix._bluetooth._disconnectBleServer();
  });

  // For debugging in run time.
  exports.ledMatrix = ledMatrix;
  exports.pong = pong;
}(window));
