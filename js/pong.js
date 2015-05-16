'use strict';

(function(exports) {
  function Pong() {}

  Pong.prototype = {
    isPaused: true,

    start: function() {
      this.isPaused = false;
    },

    pause: function() {
      this.isPaused = true;
    }
  };

  exports.Pong = Pong;
}(window));
