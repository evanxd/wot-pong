(function(exports) {
  'use strict';

  var BLESHIELD_SERVICE_UUID = '713d0000-503e-4c75-ba94-3148f18d941e';
  var BLESHIELD_RX_UUID = '713d0003-503e-4c75-ba94-3148f18d941e';
  var BLESHIELD_TX_UUID = '713d0002-503e-4c75-ba94-3148f18d941e';

  function BluetoothHelper(address) {
    this.address = address;
    this._bluetooth = window.navigator.mozBluetooth;
    this._bluetooth.addEventListener('attributechanged',
      this._handleBluetoothAttributechanged.bind(this));
  }

  BluetoothHelper.prototype = {
    address: null,
    name: null,
    isConnected: false,
    _bluetooth: null,
    _gatt: null,
    _writeChar: null,
    _notifyChar: null,

    sendData: function(data) {
      data = this._parseHexString(data);
      this._writeChar.writeValue(data);
    },

    _parseHexString: function(str) {
      var arrayBuffer = new ArrayBuffer(Math.ceil(str.length / 2));
      var uint8Array = new Uint8Array(arrayBuffer);

      for (var i = 0, j = 0; i < str.length; i += 2, j++) {
        uint8Array[j] = parseInt(str.substr(i, 2), 16);
      }
      return arrayBuffer;
    },

    _connectBleServer: function() {
      this._bluetooth.defaultAdapter.startDiscovery().then(discovery => {
        discovery.addEventListener('devicefound',
          this._handleDevicefound.bind(this));
      });
      console.log('Connecting...');
    },

    _disconnectBleServer: function() {
      console.log('Disconnecting...');
      return this._gatt.disconnect().then(() => {
        return this._bluetooth.defaultAdapter.stopDiscovery();
      }).then(() => {
        this.isConnected = false;
      });
    },

    _handleBluetoothAttributechanged: function(evt) {
      for (var key in evt.attrs) {
        switch (evt.attrs[key]) {
          case 'defaultAdapter':
            this._connectBleServer();
            break;
        }
      }
    },

    _handleDevicefound: function(evt) {
      var devcie = evt.device;
      var gatt = devcie.gatt;
      this._gatt = gatt;
      if (devcie.address === this.address) {
        this.name = devcie.name;
        gatt.connect().then(() => {
          return gatt.discoverServices();
        }).then(() => {
          var service = gatt.services.find(function(service) {
            return service.uuid === BLESHIELD_SERVICE_UUID;
          });
          this._writeChar = service.characteristics.find(function(characteristic) {
            return characteristic.uuid === BLESHIELD_RX_UUID;
          });
          this._notifyChar = service.characteristics.find(function(characteristic) {
            return characteristic.uuid === BLESHIELD_TX_UUID;
          });

          if (this._writeChar && Array.isArray(this._notifyChar.descriptors)) {
            console.log('bluetoothready');
            window.dispatchEvent(new CustomEvent('bluetoothready'));
            this.isConnected = true;
          } else {
            // XXX: Workaround to retry to connect the BLE server.
            this._disconnectBleServer().then(() => {
              this._connectBleServer();
            });
          }
        });
      }
    }
  };

  exports.BluetoothHelper = BluetoothHelper;
}(window));
