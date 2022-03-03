'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_1 = require('./chunk-459e6915.js');
require('./chunk-44abe813.js');
require('./chunk-5094d8df.js');
require('./helpers.js');
require('./chunk-44453c65.js');
var __chunk_6 = require('./chunk-524dd4d2.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_1.registerComponent(Vue, __chunk_6.Checkbox);
  }
};
__chunk_1.use(Plugin);

exports.GovCheckbox = __chunk_6.Checkbox;
exports.default = Plugin;
