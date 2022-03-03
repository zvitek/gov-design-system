import { c as config, a as setOptions } from './chunk-c8bb346c.js';
import './chunk-6ea13200.js';
import { merge } from './helpers.js';

var ConfigComponent = {
  getOptions: function getOptions() {
    return config;
  },
  setOptions: function setOptions$1(options) {
    setOptions(merge(config, options, true));
  }
};

export default ConfigComponent;
