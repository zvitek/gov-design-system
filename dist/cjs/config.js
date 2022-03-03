'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_2 = require('./chunk-f9ad6937.js');
require('./chunk-5094d8df.js');
var helpers = require('./helpers.js');

var ConfigComponent = {
  getOptions: function getOptions() {
    return __chunk_2.config;
  },
  setOptions: function setOptions(options) {
    __chunk_2.setOptions(helpers.merge(__chunk_2.config, options, true));
  }
};

exports.default = ConfigComponent;
