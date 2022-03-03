'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_1 = require('./chunk-459e6915.js');
require('./chunk-f9ad6937.js');
require('./chunk-5094d8df.js');
require('./helpers.js');
var __chunk_9 = require('./chunk-75c31760.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_1.registerComponent(Vue, __chunk_9.Icon);
  }
};
__chunk_1.use(Plugin);

exports.GovIcon = __chunk_9.Icon;
exports.default = Plugin;
