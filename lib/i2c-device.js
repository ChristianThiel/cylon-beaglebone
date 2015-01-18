/*
 * cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


"use strict";

var Cylon = require("cylon");

var EventEmitter = require("events").EventEmitter,
    I2C = require("i2c");

var I2CDevice = module.exports = function(opts) {
  this.address = opts.address;
  this.hdwInterface = opts["interface"];
  this.i2cWire = new I2C(this.address, {
    device: this.hdwInterface
  });
};

Cylon.Utils.subclass(I2CDevice, EventEmitter);

I2CDevice.prototype.connect = function() {};

I2CDevice.prototype.disconnect = function() {};

I2CDevice.prototype.write = function(cmd, buff, callback) {
  this.i2cWire.writeBytes(cmd, buff, callback);
};

I2CDevice.prototype.read = function(cmd, length, callback) {
  if(length === 1){
    this.i2cWire.writeByte(cmd, function(err){
    });
    this.i2cWire.readByte(function(err, data){
      if(callback != null){
        callback(err, [data]);
      }
    });
  } else{
    this.i2cWire.readBytes(cmd, length, callback);
  }
};

I2CDevice.prototype.writeByte = function(byte, callback) {
  this.i2cWire.writeByte(byte, callback);
};

I2CDevice.prototype.readByte = function(callback) {
  return this.i2cWire.readByte(callback);
};
