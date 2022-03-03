import Plugin$1 from './badge.js';
export { default as Badge } from './badge.js';
import { a as registerComponentProgrammatic, u as use } from './chunk-000033c2.js';
import Plugin$2 from './breadcrumb.js';
export { default as Breadcrumb } from './breadcrumb.js';
import { s as setVueInstance, a as setOptions, c as config } from './chunk-c8bb346c.js';
import Plugin$3 from './button.js';
export { default as Button } from './button.js';
import './chunk-3ab30214.js';
import './chunk-6ea13200.js';
import { merge } from './helpers.js';
export { bound, createAbsoluteElement, createNewEvent, escapeRegExpChars, getMonthNames, getValueByPath, getWeekdayNames, hasFlag, indexOf, isCustomElement, isDefined, isMobile, isSingleValue, isVueComponent, isWebpSupported, makeid, matchWithGroups, merge, mod, multiColumnSort, removeDiacriticsFromString, removeElement, returnAsArray, sign, toCssWidth } from './helpers.js';
import './chunk-1ed1df71.js';
import './chunk-159bb10c.js';
import Plugin$4 from './checkbox.js';
export { default as Checkbox } from './checkbox.js';
import Plugin$5 from './accordion.js';
export { default as Accordion } from './accordion.js';
import './chunk-57016ae0.js';
import './chunk-0ff64db3.js';
import Plugin from './autocomplete.js';
export { default as Autocomplete } from './autocomplete.js';
import Plugin$7 from './field.js';
export { default as Field } from './field.js';
import './chunk-e0af83df.js';
import Plugin$8 from './icon.js';
export { default as Icon } from './icon.js';
import Plugin$9 from './input.js';
export { default as Input } from './input.js';
import Plugin$6 from './sidemenu.js';
export { default as Sidemenu } from './sidemenu.js';
import Plugin$a from './select.js';
export { default as Select } from './select.js';
import Plugin$b from './multiselect.js';
export { default as Multiselect } from './multiselect.js';
import Plugin$c from './switch.js';
export { default as Switch } from './switch.js';
import './chunk-7aa14550.js';
import Plugin$d from './tabs.js';
export { default as Tabs } from './tabs.js';
import Plugin$e from './table.js';
export { default as Table } from './table.js';
import Plugin$f from './radio.js';
export { default as Radio } from './radio.js';
import ConfigComponent from './config.js';
export { default as ConfigProgrammatic } from './config.js';



var components = /*#__PURE__*/Object.freeze({
    Autocomplete: Plugin,
    Badge: Plugin$1,
    Breadcrumb: Plugin$2,
    Button: Plugin$3,
    Checkbox: Plugin$4,
    Accordion: Plugin$5,
    Sidemenu: Plugin$6,
    Field: Plugin$7,
    Icon: Plugin$8,
    Input: Plugin$9,
    Select: Plugin$a,
    Multiselect: Plugin$b,
    Switch: Plugin$c,
    Tabs: Plugin$d,
    Table: Plugin$e,
    Radio: Plugin$f
});

var Gov = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    setVueInstance(Vue); // Options

    setOptions(merge(config, options, true)); // Components

    for (var componentKey in components) {
      Vue.use(components[componentKey]);
    } // Config component


    registerComponentProgrammatic(Vue, 'config', ConfigComponent);
  }
};
use(Gov);

export default Gov;
