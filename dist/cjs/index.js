'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var badge = require('./badge.js');
var __chunk_1 = require('./chunk-459e6915.js');
var breadcrumb = require('./breadcrumb.js');
var __chunk_2 = require('./chunk-f9ad6937.js');
var button = require('./button.js');
require('./chunk-44abe813.js');
require('./chunk-5094d8df.js');
var helpers = require('./helpers.js');
require('./chunk-44453c65.js');
require('./chunk-524dd4d2.js');
var checkbox = require('./checkbox.js');
var accordion = require('./accordion.js');
require('./chunk-6815e880.js');
require('./chunk-035d0231.js');
var autocomplete = require('./autocomplete.js');
var field = require('./field.js');
require('./chunk-75c31760.js');
var icon = require('./icon.js');
var input = require('./input.js');
var sidemenu = require('./sidemenu.js');
var select = require('./select.js');
var multiselect = require('./multiselect.js');
var _switch = require('./switch.js');
require('./chunk-a0a1c199.js');
var tabs = require('./tabs.js');
var table = require('./table.js');
var radio = require('./radio.js');
var config = require('./config.js');



var components = /*#__PURE__*/Object.freeze({
    Autocomplete: autocomplete.default,
    Badge: badge.default,
    Breadcrumb: breadcrumb.default,
    Button: button.default,
    Checkbox: checkbox.default,
    Accordion: accordion.default,
    Sidemenu: sidemenu.default,
    Field: field.default,
    Icon: icon.default,
    Input: input.default,
    Select: select.default,
    Multiselect: multiselect.default,
    Switch: _switch.default,
    Tabs: tabs.default,
    Table: table.default,
    Radio: radio.default
});

var Gov = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    __chunk_2.setVueInstance(Vue); // Options

    __chunk_2.setOptions(helpers.merge(__chunk_2.config, options, true)); // Components

    for (var componentKey in components) {
      Vue.use(components[componentKey]);
    } // Config component


    __chunk_1.registerComponentProgrammatic(Vue, 'config', config.default);
  }
};
__chunk_1.use(Gov);

exports.Badge = badge.default;
exports.Breadcrumb = breadcrumb.default;
exports.Button = button.default;
exports.bound = helpers.bound;
exports.createAbsoluteElement = helpers.createAbsoluteElement;
exports.createNewEvent = helpers.createNewEvent;
exports.escapeRegExpChars = helpers.escapeRegExpChars;
exports.getMonthNames = helpers.getMonthNames;
exports.getValueByPath = helpers.getValueByPath;
exports.getWeekdayNames = helpers.getWeekdayNames;
exports.hasFlag = helpers.hasFlag;
exports.indexOf = helpers.indexOf;
exports.isCustomElement = helpers.isCustomElement;
exports.isDefined = helpers.isDefined;
exports.isMobile = helpers.isMobile;
exports.isSingleValue = helpers.isSingleValue;
exports.isVueComponent = helpers.isVueComponent;
exports.isWebpSupported = helpers.isWebpSupported;
exports.makeid = helpers.makeid;
exports.matchWithGroups = helpers.matchWithGroups;
exports.merge = helpers.merge;
exports.mod = helpers.mod;
exports.multiColumnSort = helpers.multiColumnSort;
exports.removeDiacriticsFromString = helpers.removeDiacriticsFromString;
exports.removeElement = helpers.removeElement;
exports.returnAsArray = helpers.returnAsArray;
exports.sign = helpers.sign;
exports.toCssWidth = helpers.toCssWidth;
exports.Checkbox = checkbox.default;
exports.Accordion = accordion.default;
exports.Autocomplete = autocomplete.default;
exports.Field = field.default;
exports.Icon = icon.default;
exports.Input = input.default;
exports.Sidemenu = sidemenu.default;
exports.Select = select.default;
exports.Multiselect = multiselect.default;
exports.Switch = _switch.default;
exports.Tabs = tabs.default;
exports.Table = table.default;
exports.Radio = radio.default;
exports.ConfigProgrammatic = config.default;
exports.default = Gov;
