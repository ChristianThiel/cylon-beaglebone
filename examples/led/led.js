"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    beaglebone: { adaptor: "beaglebone" }
  },

  devices: {
    led: { driver: "led", pin: "P9_14" }
  },

  work: function(my) {
    var brightness = 0,
        fade = 5;

    every((0.05).seconds(), function() {
      brightness += fade;

      my.led.brightness(brightness);

      if ((brightness === 0) || (brightness === 255)) {
        fade = -fade;
      }
    });
  }
}).start();
