/*! Gov v0.1.0 | MIT License | github.com/gov/gov */
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: 'GovBadge',
  props: {
    inversed: {
      type: Boolean,
      default: false
    },
    warning: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"gov-badge",class:[{
        'gov-badge--inversed': _vm.inversed,
        'gov-badge--warning': _vm.warning,
        'gov-badge--error': _vm.error
}]},[_vm._t("default")],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

var use = function use(plugin) {
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
  }
};
var registerComponent = function registerComponent(Vue, component) {
  Vue.component(component.name, component);
};
var registerComponentProgrammatic = function registerComponentProgrammatic(Vue, property, component) {
  if (!Vue.prototype.$gov) Vue.prototype.$gov = {};
  Vue.prototype.$gov[property] = component;
};

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, __vue_component__);
  }
};
use(Plugin);

//
//
//
//
//
//
var script$1 = {
  name: 'GovBreadcrumb'
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{staticClass:"gov-breadcrumbs"},[_vm._t("default")],2)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/normalizeComponent_1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

var config = {
  defaultContainerElement: null,
  defaultIconPack: 'mdi',
  defaultIconComponent: null,
  defaultInputAutocomplete: 'on',
  defaultLinkTags: ['a', 'button', 'input', 'router-link', 'nuxt-link', 'n-link', 'RouterLink', 'NuxtLink', 'NLink'],
  defaultBreadcrumbTag: 'a',
  customIconPacks: null
};
var setOptions = function setOptions(options) {
  config = options;
};
var setVueInstance = function setVueInstance(Vue) {
  VueInstance = Vue;
};
var VueInstance;

//
var script$2 = {
  name: 'GovBreadcrumbItem',
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      default: function _default() {
        return config.defaultBreadcrumbTag;
      }
    },
    active: Boolean
  },
  computed: {
    computedTag: function computedTag() {
      if (this.active) {
        return 'strong';
      }

      return this.tag;
    },
    computedClasses: function computedClasses() {
      var table = {
        'strong': 'gov-title gov-title--delta'
      };
      return table[this.computedTag] || 'gov-link gov-link--standalone';
    }
  }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"gov-breadcrumbs__item"},[_c(_vm.computedTag,_vm._g(_vm._b({tag:"component",class:_vm.computedClasses},'component',_vm.$attrs,false),_vm.$listeners),[_vm._t("default")],2)],1)};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$2 = /*#__PURE__*/normalizeComponent_1(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    undefined,
    undefined,
    undefined
  );

var Plugin$1 = {
  install: function install(Vue) {
    registerComponent(Vue, __vue_component__$1);
    registerComponent(Vue, __vue_component__$2);
  }
};
use(Plugin$1);

//
var script$3 = {
  name: 'GovButton',
  inheritAttrs: false,
  props: {
    type: [String, Object],
    size: String,
    label: String,
    primaryOutlined: Boolean,
    primary: Boolean,
    inversed: Boolean,
    small: Boolean,
    large: Boolean,
    active: Boolean,
    nativeType: {
      type: String,
      default: 'button',
      validator: function validator(value) {
        return ['button', 'submit', 'reset'].indexOf(value) >= 0;
      }
    },
    tag: {
      type: String,
      default: 'button',
      validator: function validator(value) {
        return config.defaultLinkTags.indexOf(value) >= 0;
      }
    }
  },
  computed: {
    computedTag: function computedTag() {
      var disabled = this.$attrs.disabled;

      if (disabled !== undefined && disabled !== false) {
        return 'button';
      }

      return this.tag;
    }
  }
};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.computedTag,_vm._g(_vm._b({tag:"component",staticClass:"gov-button",class:[_vm.size, _vm.type, {
        'gov-button--primary': _vm.primary,
        'gov-button--primary-outlined': _vm.primaryOutlined,
        'gov-button--inversed': _vm.inversed,
        'gov-button--large': _vm.large,
        'gov-button--small': _vm.small,
        'gov-button--is-active': _vm.active,
    }],attrs:{"type":_vm.nativeType}},'component',_vm.$attrs,false),_vm.$listeners),[(_vm.label)?[_vm._v(_vm._s(_vm.label))]:(_vm.$slots.default)?[_vm._t("default")]:_vm._e()],2)};
var __vue_staticRenderFns__$3 = [];

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$3 = /*#__PURE__*/normalizeComponent_1(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    undefined,
    undefined,
    undefined
  );

var Plugin$2 = {
  install: function install(Vue) {
    registerComponent(Vue, __vue_component__$3);
  }
};
use(Plugin$2);

var FormErrorMixin = {
  props: {
    validationMessage: {
      type: [String, Array],
      required: false,
      default: null
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      return _this.prepareValidity();
    });
  },
  watch: {
    validationMessage: function validationMessage() {
      this.prepareValidity();
    }
  },
  computed: {
    parentField: function parentField() {
      var parent = this.$parent;

      for (var i = 0; i < 3; i++) {
        if (parent && !parent.$data._isField) {
          parent = parent.$parent;
        }
      }

      return parent;
    },
    childField: function childField() {
      var children = this.$children.filter(function (child) {
        return child.$data._isField;
      });

      if (children.length) {
        return children[0];
      }

      return null;
    }
  },
  methods: {
    prepareValidity: function prepareValidity() {
      var msg = this.validationMessage;

      if (Array.isArray(msg) && msg.length || typeof msg === 'string') {
        this.setValidity(msg);
      } else {
        this.setValidity(null);
      }
    },
    setValidity: function setValidity(message) {
      var _this2 = this;

      this.$nextTick(function () {
        var field = _this2.childField || _this2.parentField;

        if (field) {
          field.errorMessage = message;
        }
      });
    }
  }
};

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

/**
 * +/- function to native math sign
 */
function signPoly(value) {
  if (value < 0) return -1;
  return value > 0 ? 1 : 0;
}

var sign = Math.sign || signPoly;
/**
 * Checks if the flag is set
 * @param val
 * @param flag
 * @returns {boolean}
 */

function hasFlag(val, flag) {
  return (val & flag) === flag;
}
/**
 * Native modulo bug with negative numbers
 * @param n
 * @param mod
 * @returns {number}
 */


function mod(n, mod) {
  return (n % mod + mod) % mod;
}
/**
 * Asserts a value is beetween min and max
 * @param val
 * @param min
 * @param max
 * @returns {number}
 */


function bound(val, min, max) {
  return Math.max(min, Math.min(max, val));
}
/**
 * Get value of an object property/path even if it's nested
 */

function getValueByPath(obj, path) {
  return path.split('.').reduce(function (o, i) {
    return o ? o[i] : null;
  }, obj);
}
/**
 * Extension of indexOf method by equality function if specified
 */

function indexOf(array, obj, fn) {
  if (!array) return -1;
  if (!fn || typeof fn !== 'function') return array.indexOf(obj);

  for (var i = 0; i < array.length; i++) {
    if (fn(array[i], obj)) {
      return i;
    }
  }

  return -1;
}
/**
 * Merge function to replace Object.assign with deep merging possibility
 */

var isObject = function isObject(item) {
  return _typeof(item) === 'object' && !Array.isArray(item);
};

var mergeFn = function mergeFn(target, source) {
  var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (deep || !Object.assign) {
    var isDeep = function isDeep(prop) {
      return isObject(source[prop]) && target !== null && target.hasOwnProperty(prop) && isObject(target[prop]);
    };

    var replaced = Object.getOwnPropertyNames(source).map(function (prop) {
      return _defineProperty({}, prop, isDeep(prop) ? mergeFn(target[prop], source[prop], deep) : source[prop]);
    }).reduce(function (a, b) {
      return _objectSpread2({}, a, {}, b);
    }, {});
    return _objectSpread2({}, target, {}, replaced);
  } else {
    return Object.assign(target, source);
  }
};

var merge = mergeFn;
/**
 * Mobile detection
 * https://www.abeautifulsite.net/detecting-mobile-devices-with-javascript
 */

var isMobile = {
  Android: function Android() {
    return typeof window !== 'undefined' && window.navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function BlackBerry() {
    return typeof window !== 'undefined' && window.navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function iOS() {
    return typeof window !== 'undefined' && (window.navigator.userAgent.match(/iPhone|iPad|iPod/i) || window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);
  },
  Opera: function Opera() {
    return typeof window !== 'undefined' && window.navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function Windows() {
    return typeof window !== 'undefined' && window.navigator.userAgent.match(/IEMobile/i);
  },
  any: function any() {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
  }
};
function removeElement(el) {
  if (typeof el.remove !== 'undefined') {
    el.remove();
  } else if (typeof el.parentNode !== 'undefined' && el.parentNode !== null) {
    el.parentNode.removeChild(el);
  }
}
function createAbsoluteElement(el) {
  var root = document.createElement('div');
  root.style.position = 'absolute';
  root.style.left = '0px';
  root.style.top = '0px';
  root.style.width = '100%';
  var wrapper = document.createElement('div');
  root.appendChild(wrapper);
  wrapper.appendChild(el);
  document.body.appendChild(root);
  return root;
}
function isVueComponent(c) {
  return c && c._isVue;
}
/**
 * Escape regex characters
 * http://stackoverflow.com/a/6969486
 */

function escapeRegExpChars(value) {
  if (!value) return value; // eslint-disable-next-line

  return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}
/**
 * Remove accents/diacritics in a string in JavaScript
 * https://stackoverflow.com/a/37511463
 */

function removeDiacriticsFromString(value) {
  if (!value) return value;
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
function multiColumnSort(inputArray, sortingPriority) {
  // clone it to prevent the any watchers from triggering every sorting iteration
  var array = JSON.parse(JSON.stringify(inputArray));

  var fieldSorter = function fieldSorter(fields) {
    return function (a, b) {
      return fields.map(function (o) {
        var dir = 1;

        if (o[0] === '-') {
          dir = -1;
          o = o.substring(1);
        }

        var aValue = getValueByPath(a, o);
        var bValue = getValueByPath(b, o);
        return aValue > bValue ? dir : aValue < bValue ? -dir : 0;
      }).reduce(function (p, n) {
        return p || n;
      }, 0);
    };
  };

  return array.sort(fieldSorter(sortingPriority));
}
function createNewEvent(eventName) {
  var event;

  if (typeof Event === 'function') {
    event = new Event(eventName);
  } else {
    event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
  }

  return event;
}
function toCssWidth(width) {
  return width === undefined ? null : isNaN(width) ? width : width + 'px';
}
/**
 * Return month names according to a specified locale
 * @param  {String} locale A bcp47 localerouter. undefined will use the user browser locale
 * @param  {String} format long (ex. March), short (ex. Mar) or narrow (M)
 * @return {Array<String>} An array of month names
 */

function getMonthNames() {
  var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'long';
  var dates = [];

  for (var i = 0; i < 12; i++) {
    dates.push(new Date(2000, i, 15));
  }

  var dtf = new Intl.DateTimeFormat(locale, {
    month: format
  });
  return dates.map(function (d) {
    return dtf.format(d);
  });
}
/**
 * Return weekday names according to a specified locale
 * @param  {String} locale A bcp47 localerouter. undefined will use the user browser locale
 * @param  {String} format long (ex. Thursday), short (ex. Thu) or narrow (T)
 * @return {Array<String>} An array of weekday names
 */

function getWeekdayNames() {
  var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'narrow';
  var dates = [];

  for (var i = 0; i < 7; i++) {
    var dt = new Date(2000, 0, i + 1);
    dates[dt.getDay()] = dt;
  }

  var dtf = new Intl.DateTimeFormat(locale, {
    weekday: format
  });
  return dates.map(function (d) {
    return dtf.format(d);
  });
}
/**
 * Accept a regex with group names and return an object
 * ex. matchWithGroups(/((?!=<year>)\d+)\/((?!=<month>)\d+)\/((?!=<day>)\d+)/, '2000/12/25')
 * will return { year: 2000, month: 12, day: 25 }
 * @param  {String} includes injections of (?!={groupname}) for each group
 * @param  {String} the string to run regex
 * @return {Object} an object with a property for each group having the group's match as the value
 */

function matchWithGroups(pattern, str) {
  var matches = str.match(pattern);
  return pattern // get the pattern as a string
  .toString() // suss out the groups
  .match(/<(.+?)>/g) // remove the braces
  .map(function (group) {
    var groupMatches = group.match(/<(.+)>/);

    if (!groupMatches || groupMatches.length <= 0) {
      return null;
    }

    return group.match(/<(.+)>/)[1];
  }) // create an object with a property for each group having the group's match as the value
  .reduce(function (acc, curr, index, arr) {
    if (matches && matches.length > index) {
      acc[curr] = matches[index + 1];
    } else {
      acc[curr] = null;
    }

    return acc;
  }, {});
}
/**
 * Based on
 * https://github.com/fregante/supports-webp
 */

function isWebpSupported() {
  return new Promise(function (resolve) {
    var image = new Image();

    image.onerror = function () {
      return resolve(false);
    };

    image.onload = function () {
      return resolve(image.width === 1);
    };

    image.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
  }).catch(function () {
    return false;
  });
}
/**
 * @param {Object} vm
 * @return {boolean}
 */

function isCustomElement(vm) {
  return 'shadowRoot' in vm.$root.$options;
}
/**
 * @param {any} d
 * @return {boolean}
 */

var isDefined = function isDefined(d) {
  return d !== undefined;
};
/**
 * @param {Number} length
 * @return {String}
 */

var makeid = function makeid() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
/**
 * @param {any} value
 * @return {boolean}
 */

var isSingleValue = function isSingleValue(value) {
  return !!(typeof value === 'string' || typeof value === 'number');
};
/**
 * @param {any} value
 * @return {Array}
 */

var returnAsArray = function returnAsArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (isSingleValue(value)) {
    return [value];
  }

  return [];
};

var CheckRadioMixin = {
  mixins: [FormErrorMixin],
  props: {
    value: [String, Number, Boolean, Function, Object, Array],
    nativeValue: [String, Number, Boolean, Function, Object, Array],
    disabled: Boolean,
    required: Boolean,
    error: Boolean,
    name: String,
    customUniqueId: {
      type: String,
      required: false,
      default: null
    }
  },
  data: function data() {
    return {
      newValue: this.value,
      uniqueId: null
    };
  },
  computed: {
    computedValue: {
      get: function get() {
        return this.newValue;
      },
      set: function set(value) {
        this.newValue = value;
        this.$emit('input', value);
      }
    },
    wrapperClass: function wrapperClass() {
      return {
        'gov-form-control--error': this.error
      };
    },

    /**
     * Find parent Field, max 3 levels deep.
     */
    parentField: function parentField() {
      var parent = this.$parent;

      for (var i = 0; i < 3; i++) {
        if (parent && !parent.$data._isField) {
          parent = parent.$parent;
        }
      }

      return parent;
    }
  },
  watch: {
    /**
    * When v-model change, set internal value.
    */
    value: function value(_value) {
      this.newValue = _value;
    },
    uniqueId: function uniqueId() {
      this.swtUniqueId();
    }
  },
  mounted: function mounted() {
    this.uniqueId = this.customUniqueId || 'radio_' + makeid();
  },
  methods: {
    focus: function focus() {
      if (this.disabled) {
        return;
      } // MacOS FireFox and Safari do not focus when clicked


      this.$refs.input.focus();
      this.change();
    },
    change: function change() {
      if (this.$refs.input.checked) {
        this.newValue = this.falseValue;
      } else {
        this.newValue = this.trueValue;
      }

      this.computedValue = this.newValue;
    },
    swtUniqueId: function swtUniqueId() {
      var _this = this;

      this.$nextTick(function () {
        if (_this.parentField) {
          _this.parentField.uniqueId = _this.uniqueId;
        }
      });
    }
  }
};

//
var script$4 = {
  name: 'GovCheckbox',
  mixins: [CheckRadioMixin],
  props: {
    indeterminate: Boolean,
    ariaLabelledby: String,
    trueValue: {
      type: [String, Number, Boolean, Function, Object, Array],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean, Function, Object, Array],
      default: false
    },
    autocomplete: {
      type: String,
      default: 'on'
    }
  },
  data: function data() {
    return {
      _isCheckbox: true
    };
  }
};

/* script */
const __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"input",staticClass:"gov-form-control__checkbox",attrs:{"type":"checkbox","autocomplete":_vm.autocomplete,"disabled":_vm.disabled,"required":_vm.required,"name":_vm.name,"id":_vm.uniqueId,"true-value":_vm.trueValue,"false-value":_vm.falseValue,"aria-labelledby":_vm.ariaLabelledby},domProps:{"indeterminate":_vm.indeterminate,"checked":_vm.computedValue === _vm.trueValue,"value":_vm.nativeValue,"checked":Array.isArray(_vm.computedValue)?_vm._i(_vm.computedValue,_vm.nativeValue)>-1:_vm._q(_vm.computedValue,_vm.trueValue)},on:{"click":function($event){$event.stopPropagation();},"change":function($event){var $$a=_vm.computedValue,$$el=$event.target,$$c=$$el.checked?(_vm.trueValue):(_vm.falseValue);if(Array.isArray($$a)){var $$v=_vm.nativeValue,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.computedValue=$$a.concat([$$v]));}else{$$i>-1&&(_vm.computedValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.computedValue=$$c;}}}}),_c('label',{ref:"label",staticClass:"gov-form-control__label",attrs:{"for":_vm.uniqueId,"id":_vm.ariaLabelledby,"disabled":_vm.disabled},on:{"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.$refs.label.click()}}},[_vm._t("default")],2),_c('span',{staticClass:"gov-form-control__indicator"})])};
var __vue_staticRenderFns__$4 = [];

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$4 = /*#__PURE__*/normalizeComponent_1(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    undefined,
    undefined,
    undefined
  );

var Plugin$3 = {
  install: function install(Vue) {
    registerComponent(Vue, __vue_component__$4);
  }
};
use(Plugin$3);

//
var script$5 = {
  name: 'GovAccordionItem',
  model: {
    prop: 'open',
    event: 'update:open'
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    ariaId: {
      type: String,
      required: false,
      default: null
    },
    label: {
      type: String,
      required: true
    },
    noBorder: {
      type: Boolean,
      required: false
    }
  },
  data: function data() {
    return {
      isOpen: this.open,
      uniqueId: null
    };
  },
  watch: {
    open: function open(value) {
      this.isOpen = value;
    }
  },
  methods: {
    /**
     * Toggle and emit events
     */
    toggle: function toggle() {
      this.isOpen = !this.isOpen;
      this.$emit('update:open', this.isOpen);
      this.$emit(this.isOpen ? 'open' : 'close');
    }
  },
  mounted: function mounted() {
    this.uniqueId = this.ariaId || 'accordion_' + makeid();
  }
};

/* script */
const __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('button',{staticClass:"gov-accordion__header",class:{
            'is-expanded': _vm.isOpen,
            'gov-accordion__header--noborder': _vm.noBorder},attrs:{"id":_vm.uniqueId,"aria-expanded":_vm.isOpen},on:{"click":_vm.toggle}},[_c('h3',[_vm._t("icon"),_vm._v(" "+_vm._s(_vm.label)+" ")],2)]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isOpen),expression:"isOpen"}],staticClass:"gov-accordion__content",class:{
        'is-expanded': _vm.isOpen},attrs:{"aria-labelledby":_vm.uniqueId,"tabindex":"-1"}},[_c('div',{staticClass:"gov-accordion__content-inner"},[_vm._t("default")],2)])])};
var __vue_staticRenderFns__$5 = [];

  /* style */
  const __vue_inject_styles__$5 = undefined;
  /* scoped */
  const __vue_scope_id__$5 = undefined;
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$5 = /*#__PURE__*/normalizeComponent_1(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
var script$6 = {
  name: 'GovAccordion',
  props: {
    small: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    noInnerOffset: {
      type: Boolean,
      default: false
    }
  }
};

/* script */
const __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gov-accordion",class:{
        'gov-accordion--large': _vm.large,
        'gov-accordion--no-inner-offset': _vm.noInnerOffset,
        'gov-accordion--small': _vm.small}},[_vm._t("default")],2)};
var __vue_staticRenderFns__$6 = [];

  /* style */
  const __vue_inject_styles__$6 = undefined;
  /* scoped */
  const __vue_scope_id__$6 = undefined;
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$6 = /*#__PURE__*/normalizeComponent_1(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    undefined,
    undefined,
    undefined
  );

var Plugin$4 = {
  install: function install(Vue) {
    registerComponent(Vue, __vue_component__$6);
    registerComponent(Vue, __vue_component__$5);
  }
};
use(Plugin$4);

var FormElementMixin = {
  mixins: [FormErrorMixin],
  props: {
    autocomplete: {
      type: String,
      required: false,
      default: undefined
    },
    maxlength: {
      type: [Number, String],
      required: false,
      default: undefined
    },
    customUniqueId: {
      type: [String, Number],
      required: false,
      default: null
    }
  },
  data: function data() {
    return {
      uniqueId: null,
      isFocused: false
    };
  },
  mounted: function mounted() {
    this.uniqueId = this.customUniqueId || 'input_' + makeid();
  },
  watch: {
    uniqueId: function uniqueId() {
      this.swtUniqueId();
    }
  },
  computed: {
    /**
     * Find parent Field, max 3 levels deep.
     */
    parentField: function parentField() {
      var parent = this.$parent;

      for (var i = 0; i < 3; i++) {
        if (parent && !parent.$data._isField) {
          parent = parent.$parent;
        }
      }

      return parent;
    }
  },
  methods: {
    /**
     * Focus method that work dynamically depending on the component.
     */
    focus: function focus() {
      var el = this.getElement();
      if (el === undefined) return;
      this.$nextTick(function () {
        if (el) el.focus();
      });
    },
    onBlur: function onBlur($event) {
      this.isFocused = false;
      this.$emit('blur', $event);
    },
    onFocus: function onFocus($event) {
      this.isFocused = true;
      this.$emit('focus', $event);
    },
    getElement: function getElement() {
      var el = this.$refs[this.$data._elementRef];

      while (isVueComponent(el)) {
        el = el.$refs[el.$data._elementRef];
      }

      return el;
    },
    setNotEmpty: function setNotEmpty(status) {
      var _this = this;

      this.$nextTick(function () {
        if (_this.parentField) {
          _this.parentField.notEmpty = status;
        }
      });
    },
    swtUniqueId: function swtUniqueId() {
      var _this2 = this;

      this.$nextTick(function () {
        if (_this2.parentField) {
          _this2.parentField.uniqueId = _this2.uniqueId;
        }
      });
    }
  }
};

var InputMixin = {
  mixins: [FormElementMixin],
  inheritAttrs: false,
  props: {
    value: [Number, String],
    type: {
      type: String,
      default: 'text'
    },
    lazy: {
      type: Boolean,
      default: false
    },
    whisperer: {
      type: Boolean,
      default: false
    },
    customClass: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      newValue: this.value,
      enforceEmptyValue: false,
      _elementRef: 'input'
    };
  },
  computed: {
    computedValue: {
      get: function get() {
        return this.newValue;
      },
      set: function set(value) {
        this.newValue = value;
        this.$emit('input', value);
      }
    },

    /**
    * Get value length
    */
    valueLength: function valueLength() {
      if (typeof this.computedValue === 'string') {
        return this.computedValue.length;
      } else if (typeof this.computedValue === 'number') {
        return this.computedValue.toString().length;
      }

      return 0;
    }
  },
  watch: {
    /**
    * When v-model is changed:
    *   1. Set internal value.
    */
    value: function value(_value) {
      this.newValue = _value;
      this.calculateNotEmpty();
    }
  },
  methods: {
    onInput: function onInput(event) {
      if (!this.lazy) {
        var value = event.target.value;
        this.updateValue(value);
      }
    },
    onChange: function onChange(event) {
      if (this.lazy) {
        var value = event.target.value;
        this.updateValue(value);
      }
    },
    newOnBlur: function newOnBlur(event) {
      this.onBlur(event);
      this.calculateNotEmpty();
    },
    newOnFocus: function newOnFocus(event) {
      this.onFocus(event);
      this.calculateNotEmpty();
    },
    updateValue: function updateValue(value) {
      this.computedValue = value;
    },
    calculateNotEmpty: function calculateNotEmpty() {
      this.setNotEmpty(this.isFocused || this.valueLength || this.enforceEmptyValue);
    }
  },
  mounted: function mounted() {
    this.calculateNotEmpty();
  }
};

//
var script$7 = {
  name: 'GovInput',
  mixins: [InputMixin, FormElementMixin],
  computed: {
    newAutocomplete: function newAutocomplete() {
      return this.autocomplete || config.defaultInputAutocomplete;
    }
  },
  watch: {
    type: function type() {
      this.resolveNativeTypes();
    }
  },
  methods: {
    resolveNativeTypes: function resolveNativeTypes() {
      if (['date', 'time'].indexOf(this.type) !== -1) {
        this.enforceEmptyValue = true;
        this.calculateNotEmpty();
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      if (!_this.whisperer) return;

      _this.$refs.input.addEventListener('blur', function () {
        _this.isFocused = false;

        _this.calculateNotEmpty();
      });
    });
    this.resolveNativeTypes();
  }
};

/* script */
const __vue_script__$7 = script$7;

/* template */
var __vue_render__$7 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('input',_vm._b({ref:"input",staticClass:"gov-form-control__input",class:[_vm.customClass],attrs:{"type":_vm.type,"autocomplete":_vm.newAutocomplete,"maxlength":_vm.maxlength,"id":_vm.uniqueId},domProps:{"value":_vm.computedValue},on:{"input":_vm.onInput,"change":_vm.onChange,"blur":_vm.newOnBlur,"focus":_vm.newOnFocus}},'input',_vm.$attrs,false))};
var __vue_staticRenderFns__$7 = [];

  /* style */
  const __vue_inject_styles__$7 = undefined;
  /* scoped */
  const __vue_scope_id__$7 = undefined;
  /* module identifier */
  const __vue_module_identifier__$7 = undefined;
  /* functional template */
  const __vue_is_functional_template__$7 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$7 = /*#__PURE__*/normalizeComponent_1(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    false,
    undefined,
    undefined,
    undefined
  );

var script$8 = {
  name: 'GovAutocomplete',
  components: _defineProperty({}, __vue_component__$7.name, __vue_component__$7),
  mixins: [FormElementMixin],
  inheritAttrs: false,
  props: {
    value: [Number, String],
    data: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    field: {
      type: String,
      default: 'value'
    },
    keepFirst: Boolean,
    clearOnSelect: Boolean,
    openOnFocus: Boolean,
    customFormatter: Function,
    checkInfiniteScroll: Boolean,
    keepOpen: Boolean,
    selectOnClickOutside: Boolean,
    clearable: Boolean,
    maxHeight: [String, Number],
    groupField: String,
    groupOptions: String,
    confirmKeys: {
      type: Array,
      default: function _default() {
        return ['Tab', 'Enter'];
      }
    },
    customUniqueId: {
      type: [String, Number],
      required: false,
      default: null
    }
  },
  data: function data() {
    return {
      selected: null,
      hovered: null,
      isActive: false,
      newValue: this.value,
      newAutocomplete: this.autocomplete || 'off',
      ariaAutocomplete: this.keepFirst ? 'both' : 'list',
      hasFocus: false,
      style: {},
      _isAutocomplete: true,
      _elementRef: 'input'
    };
  },
  computed: {
    computedData: function computedData() {
      var _this = this;

      if (this.groupField) {
        if (this.groupOptions) {
          var newData = [];
          this.data.forEach(function (option) {
            var group = getValueByPath(option, _this.groupField);
            var items = getValueByPath(option, _this.groupOptions);
            newData.push({
              group: group,
              items: items
            });
          });
          return newData;
        } else {
          var tmp = {};
          this.data.forEach(function (option) {
            var group = getValueByPath(option, _this.groupField);
            if (!tmp[group]) tmp[group] = [];
            tmp[group].push(option);
          });
          var _newData = [];
          Object.keys(tmp).forEach(function (group) {
            _newData.push({
              group: group,
              items: tmp[group]
            });
          });
          return _newData;
        }
      }

      return [{
        items: this.data
      }];
    },
    isEmpty: function isEmpty() {
      if (!this.computedData) return true;
      return !this.computedData.some(function (element) {
        return element.items && element.items.length;
      });
    },

    /**
     * White-listed items to not close when clicked.
     * Add input, dropdown and all children.
     */
    whiteList: function whiteList() {
      var whiteList = [];
      whiteList.push(this.$refs.input.$el.querySelector('input'));
      whiteList.push(this.$refs.dropdown); // Add all children from dropdown

      if (this.$refs.dropdown !== undefined) {
        var children = this.$refs.dropdown.querySelectorAll('*');
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var child = _step.value;
            whiteList.push(child);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      if (this.$parent.$data._isTaginput) {
        // Add taginput container
        whiteList.push(this.$parent.$el); // Add .tag and .delete

        var tagInputChildren = this.$parent.$el.querySelectorAll('*');
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = tagInputChildren[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var tagInputChild = _step2.value;
            whiteList.push(tagInputChild);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }

      return whiteList;
    },

    /**
     * Check if exists default slot
     */
    hasDefaultSlot: function hasDefaultSlot() {
      return !!this.$scopedSlots.default;
    },

    /**
     * Check if exists group slot
     */
    hasGroupSlot: function hasGroupSlot() {
      return !!this.$scopedSlots.group;
    },

    /**
     * Check if exists "empty" slot
     */
    hasEmptySlot: function hasEmptySlot() {
      return !!this.$slots.empty;
    }
  },
  watch: {
    /**
     * When updating input's value
     *   1. Emit changes
     *   2. If value isn't the same as selected, set null
     *   3. Close dropdown if value is clear or else open it
     */
    newValue: function newValue(value) {
      this.$emit('input', value); // Check if selected is invalid

      var currentValue = this.getValue(this.selected);

      if (currentValue && currentValue !== value) {
        this.setSelected(null, false);
      } // Close dropdown if input is clear or else open it


      if (this.hasFocus && (!this.openOnFocus || value)) {
        this.isActive = !!value;
      }
    },

    /**
     * When v-model is changed:
     *   1. Update internal value.
     *   2. If it's invalid, validate again.
     */
    value: function value(_value) {
      this.newValue = _value;
    },

    /**
     * Select first option if "keep-first
     */
    data: function data() {
      var _this2 = this;

      // Keep first option always pre-selected
      if (this.keepFirst) {
        this.$nextTick(function () {
          if (_this2.isActive) {
            _this2.selectFirstOption(_this2.computedData);
          } else {
            _this2.setHovered(null);
          }
        });
      }
    }
  },
  methods: {
    /**
     * Set which option is currently hovered.
     */
    setHovered: function setHovered(option) {
      if (option === undefined) return;
      this.hovered = option;
    },

    /**
     * Set which option is currently selected, update v-model,
     * update input value and close dropdown.
     */
    setSelected: function setSelected(option) {
      var _this3 = this;

      var closeDropdown = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var event = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      if (option === undefined) return;
      this.selected = option;
      this.$emit('select', this.selected, event);

      if (this.selected !== null) {
        if (this.clearOnSelect) {
          var input = this.$refs.input;
          input.newValue = '';
          input.$refs.input.value = '';
          input.$refs.input.focus();
        } else {
          this.newValue = this.getValue(this.selected);
        }

        this.setHovered(null);
      }

      closeDropdown && this.$nextTick(function () {
        _this3.isActive = false;
      });
    },

    /**
     * Select first option
     */
    selectFirstOption: function selectFirstOption(computedData) {
      var _this4 = this;

      this.$nextTick(function () {
        var nonEmptyElements = computedData.filter(function (element) {
          return element.items && element.items.length;
        });

        if (nonEmptyElements.length) {
          var option = nonEmptyElements[0].items[0];

          _this4.setHovered(option);
        } else {
          _this4.setHovered(null);
        }
      });
    },
    keydown: function keydown(event) {
      var key = event.key; // cannot destructure preventDefault (https://stackoverflow.com/a/49616808/2774496)
      // prevent emit submit event

      if (key === 'Enter') event.preventDefault(); // Close dropdown on Tab & no hovered

      if (key === 'Escape' || key === 'Tab') {
        this.isActive = false;
      }

      if (this.confirmKeys.indexOf(key) >= 0) {
        // If adding by comma, don't add the comma to the input
        if (key === ',') event.preventDefault(); // Close dropdown on select by Tab

        var closeDropdown = !this.keepOpen || key === 'Tab';

        if (this.hovered === null) {
          return;
        }

        this.setSelected(this.hovered, closeDropdown, event);
      }
    },

    /**
     * Close dropdown if clicked outside.
     */
    clickedOutside: function clickedOutside(event) {
      var target = isCustomElement(this) ? event.composedPath()[0] : event.target;

      if (!this.hasFocus && this.whiteList.indexOf(target) < 0) {
        if (this.keepFirst && this.hovered && this.selectOnClickOutside) {
          this.setSelected(this.hovered, true);
        } else {
          this.isActive = false;
        }
      }
    },

    /**
     * Return display text for the input.
     * If object, get value from path, or else just the value.
     */
    getValue: function getValue(option) {
      if (option === null) return;

      if (typeof this.customFormatter !== 'undefined') {
        return this.customFormatter(option);
      }

      return _typeof(option) === 'object' ? getValueByPath(option, this.field) : option;
    },

    /**
     * Check if the scroll list inside the dropdown
     * reached it's end.
     */
    checkIfReachedTheEndOfScroll: function checkIfReachedTheEndOfScroll(list) {
      if (list.clientHeight !== list.scrollHeight && list.scrollTop + list.clientHeight >= list.scrollHeight) {
        this.$emit('infinite-scroll');
      }
    },

    /**
     * Arrows keys listener.
     * If dropdown is active, set hovered option, or else just open.
     */
    keyArrows: function keyArrows(direction) {
      var sum = direction === 'down' ? 1 : -1;

      if (this.isActive) {
        var data = this.computedData.map(function (d) {
          return d.items;
        }).reduce(function (a, b) {
          return [].concat(_toConsumableArray(a), _toConsumableArray(b));
        }, []);
        var index = data.indexOf(this.hovered) + sum;
        index = index > data.length - 1 ? data.length - 1 : index;
        index = index < 0 ? 0 : index;
        this.setHovered(data[index] !== undefined ? data[index] : null);
        var list = this.$refs.dropdown.querySelector('.gov-autocomplete__results');
        var querySelectorText = '.gov-autocomplete__result';
        var element = list.querySelectorAll(querySelectorText)[index];
        if (!element) return;
        var visMin = list.scrollTop;
        var visMax = list.scrollTop + list.clientHeight - element.clientHeight;

        if (element.offsetTop < visMin) {
          list.scrollTop = element.offsetTop;
        } else if (element.offsetTop >= visMax) {
          list.scrollTop = element.offsetTop - list.clientHeight + element.clientHeight;
        }
      } else {
        this.isActive = true;
      }
    },

    /**
     * Focus listener.
     * If value is the same as selected, select all text.
     */
    focused: function focused(event) {
      if (this.getValue(this.selected) === this.newValue) {
        this.$el.querySelector('input').select();
      }

      if (this.openOnFocus) {
        this.isActive = true;

        if (this.keepFirst) {
          // If open on focus, update the hovered
          this.selectFirstOption(this.computedData);
        }
      }

      this.hasFocus = true;
      this.$emit('focus', event);
    },

    /**
     * Blur listener.
     */
    onBlur: function onBlur(event) {
      this.hasFocus = false;
      this.$emit('blur', event);
    },
    onInput: function onInput() {
      var currentValue = this.getValue(this.selected);
      if (currentValue && currentValue === this.newValue) return;
      this.$emit('typing', this.newValue);
    }
  },
  created: function created() {
    if (typeof window !== 'undefined') {
      document.addEventListener('click', this.clickedOutside);
    }
  },
  mounted: function mounted() {
    var _this5 = this;

    if (this.checkInfiniteScroll && this.$refs.dropdown && this.$refs.dropdown.querySelector('.gov-autocomplete__results')) {
      var list = this.$refs.dropdown.querySelector('.gov-autocomplete__results');
      list.addEventListener('scroll', function () {
        return _this5.checkIfReachedTheEndOfScroll(list);
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('click', this.clickedOutside);
    }

    if (this.checkInfiniteScroll && this.$refs.dropdown && this.$refs.dropdown.querySelector('.gov-autocomplete__results')) {
      var list = this.$refs.dropdown.querySelector('.gov-autocomplete__results');
      list.removeEventListener('scroll', this.checkIfReachedTheEndOfScroll);
    }
  }
};

/* script */
const __vue_script__$8 = script$8;

/* template */
var __vue_render__$8 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gov-autocomplete",attrs:{"role":"combobox","aria-haspopup":"listbox"}},[_c('gov-input',_vm._b({ref:"input",attrs:{"maxlength":_vm.maxlength,"autocomplete":_vm.newAutocomplete,"aria-autocomplete":_vm.ariaAutocomplete,"custom-unique-id":_vm.customUniqueId,"whisperer":true},on:{"input":_vm.onInput,"focus":_vm.focused,"blur":_vm.onBlur},nativeOn:{"keydown":[function($event){return _vm.keydown($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }$event.preventDefault();return _vm.keyArrows('up')},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }$event.preventDefault();return _vm.keyArrows('down')}]},model:{value:(_vm.newValue),callback:function ($$v) {_vm.newValue=$$v;},expression:"newValue"}},'gov-input',_vm.$attrs,false)),_c('div',{ref:"dropdown",style:(_vm.style)},[_c('ul',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive && (!_vm.isEmpty || _vm.hasEmptySlot)),expression:"isActive && (!isEmpty || hasEmptySlot)"}],staticClass:"gov-autocomplete__results"},[_vm._l((_vm.computedData),function(element,groupindex){return [(element.group)?_c('li',{key:groupindex + 'group',staticClass:"gov-autocomplete__result",attrs:{"role":"option"}},[(_vm.hasGroupSlot)?_vm._t("group",null,{"group":element.group,"index":groupindex}):_c('strong',[_vm._v(" "+_vm._s(element.group)+" ")])],2):_vm._e(),_vm._l((element.items),function(option,index){return _c('li',{key:groupindex + ':' + index,staticClass:"gov-autocomplete__result",class:{ 'selected': option === _vm.hovered },attrs:{"role":"option"},on:{"click":function($event){$event.stopPropagation();return _vm.setSelected(option, !_vm.keepOpen, $event)}}},[(_vm.hasDefaultSlot)?_vm._t("default",null,{"option":option,"index":index}):[_vm._v(" "+_vm._s(_vm.getValue(option, true))+" ")]],2)})]}),(_vm.isEmpty && _vm.hasEmptySlot)?_c('li',{staticClass:"gov-autocomplete__empty"},[_vm._t("empty")],2):_vm._e()],2)])],1)};
var __vue_staticRenderFns__$8 = [];

  /* style */
  const __vue_inject_styles__$8 = undefined;
  /* scoped */
  const __vue_scope_id__$8 = undefined;
  /* module identifier */
  const __vue_module_identifier__$8 = undefined;
  /* functional template */
  const __vue_is_functional_template__$8 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$8 = /*#__PURE__*/normalizeComponent_1(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    false,
    undefined,
    undefined,
    undefined
  );

var Plugin$5 = {
  install: function install(Vue) {
    registerComponent(Vue, __vue_component__$8);
  }
};
use(Plugin$5);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$9 = {
  name: 'GovField',
  props: {
    message: {
      type: [String, Array, Object],
      required: false
    },
    error: {
      type: Boolean,
      required: false,
      default: false
    },
    label: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      errorMessage: null,
      newMessage: this.message,
      newLabel: this.label,
      notEmpty: false,
      uniqueId: null,
      select: false,
      custom: false,
      _isField: true // Used internally by Input and Select

    };
  },
  computed: {
    /**
    * Formatted message in case it's an array
    * (each element is separated by <br> tag)
    */
    formattedMessage: function formattedMessage() {
      if (typeof this.errorMessage === 'string') {
        return [this.errorMessage];
      } else if (Array.isArray(this.errorMessage)) {
        return this.errorMessage;
      }

      if (typeof this.newMessage === 'string') {
        return [this.newMessage];
      }

      var messages = [];

      if (Array.isArray(this.newMessage)) {
        this.newMessage.forEach(function (message) {
          if (typeof message === 'string') {
            messages.push(message);
          } else {
            for (var key in message) {
              if (message[key]) {
                messages.push(key);
              }
            }
          }
        });
      } else {
        for (var key in this.newMessage) {
          if (this.newMessage[key]) {
            messages.push(key);
          }
        }
      }

      return messages.filter(function (m) {
        if (m) return m;
      });
    },
    hasMessage: function hasMessage() {
      return this.newMessage || this.$slots.message || this.errorMessage;
    },
    hasLabel: function hasLabel() {
      return this.newLabel || this.$slots.label;
    }
  },
  watch: {
    /**
    * Set internal message when prop change.
    */
    message: function message(value) {
      this.newMessage = value;
    },

    /**
    * Set internal label when prop change.
    */
    label: function label(value) {
      this.newLabel = value;
    }
  },
  mounted: function mounted() {
    var isSelect = this.$children.filter(function (children) {
      return children.$data._isSelect;
    });
    var isCheckbox = this.$children.filter(function (children) {
      return children.$data._isCheckbox;
    });
    var isSwitch = this.$children.filter(function (children) {
      return children.$data._isSwitch;
    });
    var isCustom = this.$children.filter(function (children) {
      return children.$data._isCustom;
    });

    if (isSelect.length) {
      this.select = true;
    }

    if (isCheckbox.length || isSwitch.length || isCustom.length) {
      this.custom = true;
    }
  }
};

/* script */
const __vue_script__$9 = script$9;

/* template */
var __vue_render__$9 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gov-form-control",class:{
        'gov-form-control--error': _vm.error || _vm.errorMessage,
        'gov-form-control--custom': _vm.custom,
        'not-empty': _vm.notEmpty}},[_c('div',{class:{'gov-select': _vm.select}},[_vm._t("default"),(_vm.hasLabel)?_c('label',{staticClass:"gov-form-control__label",attrs:{"for":_vm.uniqueId}},[(_vm.$slots.label)?_vm._t("label"):[_vm._v(" "+_vm._s(_vm.label)+" ")]],2):_vm._e(),(_vm.hasMessage)?_c('span',{staticClass:"gov-form-control__message"},[(_vm.$slots.message)?_vm._t("message"):[_vm._l((_vm.formattedMessage),function(mess,i){return [_vm._v(" "+_vm._s(mess)+" "),((i + 1) < _vm.formattedMessage.length)?_c('br',{key:i}):_vm._e()]})]],2):_vm._e()],2)])};
var __vue_staticRenderFns__$9 = [];

  /* style */
  const __vue_inject_styles__$9 = undefined;
  /* scoped */
  const __vue_scope_id__$9 = undefined;
  /* module identifier */
  const __vue_module_identifier__$9 = undefined;
  /* functional template */
  const __vue_is_functional_template__$9 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$9 = /*#__PURE__*/normalizeComponent_1(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    false,
    undefined,
    undefined,
    undefined
  );

var Plugin$6 = {
  install: function install(Vue) {
    registerComponent(Vue, __vue_component__$9);
  }
};
use(Plugin$6);

var mdiIcons = {
  sizes: {
    'default': 'mdi-24px',
    'is-small': null,
    'is-medium': 'mdi-36px',
    'is-large': 'mdi-48px'
  },
  iconPrefix: 'mdi-'
};
var govIcons = {
  iconPrefix: 'gov-icon--'
};
var govComplexIcons = {
  iconPrefix: 'gov-complex-icon--'
};

var faIcons = function faIcons() {
  var faIconPrefix = config && config.defaultIconComponent ? '' : 'fa-';
  return {
    sizes: {
      'default': null,
      'is-small': null,
      'is-medium': faIconPrefix + 'lg',
      'is-large': faIconPrefix + '2x'
    },
    iconPrefix: faIconPrefix,
    internalIcons: {
      'information': 'info-circle',
      'alert': 'exclamation-triangle',
      'alert-circle': 'exclamation-circle',
      'chevron-right': 'angle-right',
      'chevron-left': 'angle-left',
      'chevron-down': 'angle-down',
      'eye-off': 'eye-slash',
      'menu-down': 'caret-down',
      'menu-up': 'caret-up',
      'close-circle': 'times-circle'
    }
  };
};

var getIcons = function getIcons() {
  var icons = {
    mdi: mdiIcons,
    fa: faIcons(),
    fas: faIcons(),
    far: faIcons(),
    fad: faIcons(),
    fab: faIcons(),
    fal: faIcons(),
    'gov-icon': govIcons,
    'gov-complex-icon': govComplexIcons
  };

  if (config && config.customIconPacks) {
    icons = merge(icons, config.customIconPacks, true);
  }

  return icons;
};

//
var script$a = {
  name: 'GovIcon',
  props: {
    component: String,
    pack: String,
    icon: String,
    size: String,
    customSize: String,
    customClass: String,
    both: Boolean,
    // This is used internally to show both MDI and FA icon
    gov: {
      type: Boolean,
      default: false
    },
    govComplex: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconConfig: function iconConfig() {
      var allIcons = getIcons();
      return allIcons[this.newPack];
    },
    iconPrefix: function iconPrefix() {
      if (this.iconConfig && this.iconConfig.iconPrefix) {
        return this.iconConfig.iconPrefix;
      }

      return '';
    },

    /**
    * Internal icon name based on the pack.
    * If pack is 'fa', gets the equivalent FA icon name of the MDI,
    * internal icons are always MDI.
    */
    newIcon: function newIcon() {
      return "".concat(this.iconPrefix).concat(this.getEquivalentIconOf(this.icon));
    },
    newPack: function newPack() {
      if (this.gov) return 'gov-icon';else if (this.govComplex) return 'gov-complex-icon';else return this.pack || config.defaultIconPack;
    },
    newCustomSize: function newCustomSize() {
      return this.customSize || this.customSizeByPack;
    },
    customSizeByPack: function customSizeByPack() {
      if (this.iconConfig && this.iconConfig.sizes) {
        if (this.size && this.iconConfig.sizes[this.size] !== undefined) {
          return this.iconConfig.sizes[this.size];
        } else if (this.iconConfig.sizes.default) {
          return this.iconConfig.sizes.default;
        }
      }

      return null;
    },
    useIconComponent: function useIconComponent() {
      return this.component || config.defaultIconComponent;
    }
  },
  methods: {
    /**
    * Equivalent icon name of the MDI.
    */
    getEquivalentIconOf: function getEquivalentIconOf(value) {
      // Only transform the class if the both prop is set to true
      if (!this.both) {
        return value;
      }

      if (this.iconConfig && this.iconConfig.internalIcons && this.iconConfig.internalIcons[value]) {
        return this.iconConfig.internalIcons[value];
      }

      return value;
    }
  }
};

/* script */
const __vue_script__$a = script$a;

/* template */
var __vue_render__$a = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.gov || _vm.govComplex)?_c('span',{class:[_vm.newPack, _vm.newIcon]}):_c('span',{staticClass:"icon",class:[_vm.size]},[(!_vm.useIconComponent)?_c('i',{class:[_vm.newPack, _vm.newIcon, _vm.newCustomSize, _vm.customClass]}):_c(_vm.useIconComponent,{tag:"component",class:[_vm.customClass],attrs:{"icon":[_vm.newPack, _vm.newIcon],"size":_vm.newCustomSize}})],1)};
var __vue_staticRenderFns__$a = [];

  /* style */
  const __vue_inject_styles__$a = undefined;
  /* scoped */
  const __vue_scope_id__$a = undefined;
  /* module identifier */
  const __vue_module_identifier__$a = undefined;
  /* functional template */
  const __vue_is_functional_template__$a = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$a = /*#__PURE__*/normalizeComponent_1(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    false,
    undefined,
    undefined,
    undefined
  );

var Plugin$7 = {
  install: function install(Vue) {
    registerComponent(Vue, __vue_component__$a);
  }
};
use(Plugin$7);

//
var script$b = {
  name: 'GovTextarea',
  mixins: [InputMixin, FormElementMixin]
};

/* script */
const __vue_script__$b = script$b;

/* template */
var __vue_render__$b = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('textarea',_vm._b({ref:"input",staticClass:"gov-form-control__input",class:[_vm.customClass],attrs:{"maxlength":_vm.maxlength,"id":_vm.uniqueId},domProps:{"value":_vm.computedValue},on:{"input":_vm.onInput,"change":_vm.onChange,"blur":_vm.newOnBlur,"focus":_vm.newOnFocus}},'textarea',_vm.$attrs,false))};
var __vue_staticRenderFns__$b = [];

  /* style */
  const __vue_inject_styles__$b = undefined;
  /* scoped */
  const __vue_scope_id__$b = undefined;
  /* module identifier */
  const __vue_module_identifier__$b = undefined;
  /* functional template */
  const __vue_is_functional_template__$b = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$b = /*#__PURE__*/normalizeComponent_1(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    false,
    undefined,
    undefined,
    undefined
  );

var Plugin$8 = {
  install: function install(Vue) {
    registerComponent(Vue, __vue_component__$7);
    registerComponent(Vue, __vue_component__$b);
  }
};
use(Plugin$8);

//
//
//
//
//
//
//
//
var script$c = {
  name: 'GovSideMenu',
  props: {
    complex: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      _isMenu: true // Used by MenuItem

    };
  }
};

/* script */
const __vue_script__$c = script$c;

/* template */
var __vue_render__$c = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{staticClass:"gov-sidenav",class:{'gov-sidenav--complex': _vm.complex}},[_vm._t("default")],2)};
var __vue_staticRenderFns__$c = [];

  /* style */
  const __vue_inject_styles__$c = undefined;
  /* scoped */
  const __vue_scope_id__$c = undefined;
  /* module identifier */
  const __vue_module_identifier__$c = undefined;
  /* functional template */
  const __vue_is_functional_template__$c = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$c = /*#__PURE__*/normalizeComponent_1(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$c,
    __vue_script__$c,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$d = {
  name: 'GovSideMenuItem',
  inheritAttrs: false,
  model: {
    prop: 'active',
    event: 'update:active'
  },
  props: {
    label: String,
    active: Boolean,
    tag: {
      type: String,
      default: 'a',
      validator: function validator(value) {
        return config.defaultLinkTags.indexOf(value) >= 0;
      }
    },
    ariaRole: {
      type: String,
      default: ''
    }
  },
  computed: {
    ariaRoleMenu: function ariaRoleMenu() {
      return this.ariaRole === 'menuitem' ? this.ariaRole : null;
    }
  },
  methods: {
    onClick: function onClick(event) {
      if (this.disabled) return;
      this.$emit('update:active', event);
    }
  }
};

/* script */
const __vue_script__$d = script$d;

/* template */
var __vue_render__$d = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"gov-sidenav__item",attrs:{"role":_vm.ariaRoleMenu}},[_c(_vm.tag,_vm._g(_vm._b({tag:"component",class:{
            'gov-sidenav__link': true,
        },on:{"click":function($event){return _vm.onClick($event)}}},'component',_vm.$attrs,false),_vm.$listeners),[_vm._t("icon"),(_vm.label)?_c('span',[_vm._v(_vm._s(_vm.label))]):_vm._e(),_vm._t("badge")],2)],1)};
var __vue_staticRenderFns__$d = [];

  /* style */
  const __vue_inject_styles__$d = undefined;
  /* scoped */
  const __vue_scope_id__$d = undefined;
  /* module identifier */
  const __vue_module_identifier__$d = undefined;
  /* functional template */
  const __vue_is_functional_template__$d = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$d = /*#__PURE__*/normalizeComponent_1(
    { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
    __vue_inject_styles__$d,
    __vue_script__$d,
    __vue_scope_id__$d,
    __vue_is_functional_template__$d,
    __vue_module_identifier__$d,
    false,
    undefined,
    undefined,
    undefined
  );

var Plugin$9 = {
  install: function install(Vue) {
    registerComponent(Vue, __vue_component__$c);
    registerComponent(Vue, __vue_component__$d);
  }
};
use(Plugin$9);

//
var script$e = {
  name: 'GovSelect',
  mixins: [FormElementMixin],
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number, Boolean, Object, Array, Function, Date],
      default: null
    },
    placeholder: String,
    multiple: Boolean
  },
  data: function data() {
    return {
      selected: this.value,
      _elementRef: 'select',
      _isSelect: true
    };
  },
  computed: {
    computedValue: {
      get: function get() {
        return this.selected;
      },
      set: function set(value) {
        this.selected = value;
        this.$emit('input', value);
        this.calculateNotEmpty();
      }
    }
  },
  watch: {
    /**
    * When v-model is changed:
    *   1. Set the selected option.
    *   2. If it's invalid, validate again.
    */
    value: function value(_value) {
      this.selected = _value;
    }
  },
  methods: {
    calculateNotEmpty: function calculateNotEmpty() {
      this.setNotEmpty(this.isFocused || this.selected);
    }
  },
  mounted: function mounted() {
    this.calculateNotEmpty();
    var option = this.$refs.select.querySelector('option:first-of-type');

    if (option && String(option.textContent).length) {
      this.setNotEmpty(true);
    }
  }
};

/* script */
const __vue_script__$e = script$e;

/* template */
var __vue_render__$e = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('select',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"select",attrs:{"id":_vm.uniqueId,"multiple":_vm.multiple},on:{"blur":_vm.onBlur,"focus":_vm.onFocus,"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.computedValue=$event.target.multiple ? $$selectedVal : $$selectedVal[0];}}},'select',_vm.$attrs,false),[(_vm.placeholder)?[(_vm.computedValue == null)?_c('option',{attrs:{"disabled":"","hidden":""},domProps:{"value":null}},[_vm._v(" "+_vm._s(_vm.placeholder)+" ")]):_vm._e()]:_vm._e(),_vm._t("default")],2)};
var __vue_staticRenderFns__$e = [];

  /* style */
  const __vue_inject_styles__$e = undefined;
  /* scoped */
  const __vue_scope_id__$e = undefined;
  /* module identifier */
  const __vue_module_identifier__$e = undefined;
  /* functional template */
  const __vue_is_functional_template__$e = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$e = /*#__PURE__*/normalizeComponent_1(
    { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
    __vue_inject_styles__$e,
    __vue_script__$e,
    __vue_scope_id__$e,
    __vue_is_functional_template__$e,
    __vue_module_identifier__$e,
    false,
    undefined,
    undefined,
    undefined
  );

var Plugin$a = {
  install: function install(Vue) {
    registerComponent(Vue, __vue_component__$e);
  }
};
use(Plugin$a);

//
var script$f = {
  name: 'GovMultiselect',
  mixins: [FormElementMixin],
  props: {
    value: [Array, Number, String],
    data: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      required: false,
      default: null
    },
    searchField: {
      type: String,
      required: false,
      default: null
    },
    uniqueField: {
      type: String,
      required: false,
      default: null
    },
    clearOnSelect: {
      type: Boolean,
      required: false,
      default: true
    },
    openOnFocus: {
      type: Boolean,
      required: false,
      default: false
    },
    multiselect: {
      type: Boolean,
      required: false,
      default: true
    },
    keepOpen: {
      type: Boolean,
      required: false,
      default: false
    },
    customUniqueId: {
      type: [String, Number],
      required: false,
      default: null
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: function data() {
    return {
      name: '',
      selectedState: returnAsArray(this.value),
      selected: null
    };
  },
  computed: {
    filteredDataArray: function filteredDataArray() {
      var _this = this;

      return this.data.filter(function (option) {
        var val = option;

        if (!isSingleValue(option)) {
          val = getValueByPath(option, _this.searchField);
        }

        return val.toString().toLowerCase().indexOf(_this.name.toLowerCase()) >= 0;
      });
    }
  },
  watch: {
    value: function value(newValue) {
      this.selectedState = returnAsArray(newValue);
    },
    selected: function selected(newValue) {
      if (newValue) {
        var value = newValue;

        if (isSingleValue(newValue) === false) {
          value = getValueByPath(newValue, this.uniqueField);
        }

        if (this.isSelected(value) === false) {
          if (this.multiselect) {
            this.selectedState.push(newValue);
          } else {
            this.selectedState = [newValue];
          }
        }
      }
    },
    selectedState: function selectedState() {
      if (this.multiselect) {
        this.$emit('input', this.selectedState);
      } else {
        this.$emit('input', this.selectedState.length ? this.selectedState[0] : null);
      }
    }
  },
  methods: {
    isSelected: function isSelected(current) {
      var _this2 = this;

      return !!this.selectedState.filter(function (item) {
        if (isSingleValue(item)) {
          return item === current;
        } else {
          return getValueByPath(item, _this2.uniqueField) === current;
        }
      }).length;
    },
    getValue: function getValue(option) {
      if (isSingleValue(option)) {
        return option;
      } else {
        return getValueByPath(option, this.searchField);
      }
    },
    remove: function remove(index) {
      if (this.selectedState.hasOwnProperty(index)) {
        this.selectedState.splice(index, 1);
      }

      this.name = '';
    }
  }
};

/* script */
const __vue_script__$f = script$f;

/* template */
var __vue_render__$f = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('gov-field',{attrs:{"label":_vm.label}},[_c('gov-autocomplete',{attrs:{"disabled":_vm.disabled,"data":_vm.filteredDataArray,"clear-on-select":_vm.clearOnSelect,"open-on-focus":_vm.openOnFocus,"keep-open":_vm.keepOpen,"field":_vm.searchField},on:{"select":function (option) { return _vm.selected = option; }},scopedSlots:_vm._u([{key:"empty",fn:function(){return [_vm._v("No results found")]},proxy:true}]),model:{value:(_vm.name),callback:function ($$v) {_vm.name=$$v;},expression:"name"}}),(_vm.selectedState.length)?_c('ul',{staticClass:"gov-multiselect__tags"},_vm._l((_vm.selectedState),function(item,index){return _c('li',{key:index,staticClass:"gov-multiselect__tag"},[_c('span',[_vm._v(_vm._s(_vm.getValue(item)))]),_c('button',{staticClass:"gov-button--icon-only",attrs:{"type":"button","aria-label":"Odebrat"},on:{"click":function($event){$event.preventDefault();return _vm.remove(index)}}})])}),0):_vm._e()],1)};
var __vue_staticRenderFns__$f = [];

  /* style */
  const __vue_inject_styles__$f = undefined;
  /* scoped */
  const __vue_scope_id__$f = undefined;
  /* module identifier */
  const __vue_module_identifier__$f = undefined;
  /* functional template */
  const __vue_is_functional_template__$f = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$f = /*#__PURE__*/normalizeComponent_1(
    { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
    __vue_inject_styles__$f,
    __vue_script__$f,
    __vue_scope_id__$f,
    __vue_is_functional_template__$f,
    __vue_module_identifier__$f,
    false,
    undefined,
    undefined,
    undefined
  );

var Plugin$b = {
  install: function install(Vue) {
    registerComponent(Vue, __vue_component__$f);
  }
};
use(Plugin$b);

//
var script$g = {
  name: 'GovSwitch',
  mixins: [FormErrorMixin],
  props: {
    value: [String, Number, Boolean, Function, Object, Array, Date],
    nativeValue: [String, Number, Boolean, Function, Object, Array, Date],
    disabled: Boolean,
    name: String,
    required: Boolean,
    ariaLabelledby: String,
    trueValue: {
      type: [String, Number, Boolean, Function, Object, Array, Date],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean, Function, Object, Array, Date],
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      newValue: this.value,
      isMouseDown: false,
      _isSwitch: true
    };
  },
  computed: {
    computedValue: {
      get: function get() {
        return this.newValue;
      },
      set: function set(value) {
        this.newValue = value;
        this.$emit('input', value);
      }
    },
    showControlLabel: function showControlLabel() {
      return !!this.$slots.default;
    }
  },
  watch: {
    /**
    * When v-model change, set internal value.
    */
    value: function value(_value) {
      this.newValue = _value;
    }
  },
  methods: {
    focus: function focus() {
      if (this.disabled) {
        return;
      } // MacOS FireFox and Safari do not focus when clicked


      this.$refs.input.focus();
      this.change();
    },
    change: function change() {
      if (this.$refs.input.checked) {
        this.newValue = this.falseValue;
      } else {
        this.newValue = this.trueValue;
      }

      this.computedValue = this.newValue;
    }
  }
};

/* script */
const __vue_script__$g = script$g;

/* template */
var __vue_render__$g = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"input",staticClass:"gov-form-control__toggle",attrs:{"type":"checkbox","disabled":_vm.disabled,"name":_vm.name,"required":_vm.required,"true-value":_vm.trueValue,"false-value":_vm.falseValue,"aria-labelledby":_vm.ariaLabelledby},domProps:{"checked":_vm.computedValue === _vm.trueValue,"value":_vm.nativeValue,"checked":Array.isArray(_vm.computedValue)?_vm._i(_vm.computedValue,_vm.nativeValue)>-1:_vm._q(_vm.computedValue,_vm.trueValue)},on:{"change":function($event){var $$a=_vm.computedValue,$$el=$event.target,$$c=$$el.checked?(_vm.trueValue):(_vm.falseValue);if(Array.isArray($$a)){var $$v=_vm.nativeValue,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.computedValue=$$a.concat([$$v]));}else{$$i>-1&&(_vm.computedValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.computedValue=$$c;}}}}),_c('label',{ref:"label",staticClass:"gov-form-control__label",attrs:{"disabled":_vm.disabled,"id":_vm.ariaLabelledby},on:{"click":_vm.focus,"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.$refs.label.click()},"mousedown":function($event){_vm.isMouseDown = true;},"mouseup":function($event){_vm.isMouseDown = false;},"mouseout":function($event){_vm.isMouseDown = false;},"blur":function($event){_vm.isMouseDown = false;}}},[(_vm.showControlLabel)?[_vm._t("default")]:_vm._e()],2),_c('span',{staticClass:"gov-form-control__indicator"})])};
var __vue_staticRenderFns__$g = [];

  /* style */
  const __vue_inject_styles__$g = undefined;
  /* scoped */
  const __vue_scope_id__$g = undefined;
  /* module identifier */
  const __vue_module_identifier__$g = undefined;
  /* functional template */
  const __vue_is_functional_template__$g = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$g = /*#__PURE__*/normalizeComponent_1(
    { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$g },
    __vue_inject_styles__$g,
    __vue_script__$g,
    __vue_scope_id__$g,
    __vue_is_functional_template__$g,
    __vue_module_identifier__$g,
    false,
    undefined,
    undefined,
    undefined
  );

var Plugin$c = {
  install: function install(Vue) {
    registerComponent(Vue, __vue_component__$g);
  }
};
use(Plugin$c);

var SlotComponent = {
  name: 'GovSlotComponent',
  props: {
    component: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      default: 'default'
    },
    scoped: {
      type: Boolean
    },
    props: {
      type: Object
    },
    tag: {
      type: String,
      default: 'div'
    },
    event: {
      type: String,
      default: 'hook:updated'
    }
  },
  methods: {
    refresh: function refresh() {
      this.$forceUpdate();
    }
  },
  created: function created() {
    if (isVueComponent(this.component)) {
      this.component.$on(this.event, this.refresh);
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (isVueComponent(this.component)) {
      this.component.$off(this.event, this.refresh);
    }
  },
  render: function render(createElement) {
    if (isVueComponent(this.component)) {
      return createElement(this.tag, {}, this.scoped ? this.component.$scopedSlots[this.name](this.props) : this.component.$slots[this.name]);
    }
  }
};

var items = 1;
var sorted = 3;
var Sorted = sorted;
var ProviderParentMixin = (function (itemName) {
  var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var mixin = {
    provide: function provide() {
      return _defineProperty({}, 'b' + itemName, this);
    }
  };

  if (hasFlag(flags, items)) {
    mixin.data = function () {
      return {
        childItems: []
      };
    };

    mixin.methods = {
      _registerItem: function _registerItem(item) {
        this.childItems.push(item);
      },
      _unregisterItem: function _unregisterItem(item) {
        this.childItems = this.childItems.filter(function (i) {
          return i !== item;
        });
      }
    };

    if (hasFlag(flags, sorted)) {
      mixin.watch = {
        /**
         * When items are added/removed deep search in the elements default's slot
         * And mark the items with their index
         */
        childItems: function childItems(items) {
          if (items.length > 0 && this.$scopedSlots.default) {
            var tag = items[0].$vnode.tag;
            var index = 0;

            var deepSearch = function deepSearch(children) {
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                var _loop = function _loop() {
                  var child = _step.value;

                  if (child.tag === tag) {
                    // An item with the same tag will for sure be found
                    var it = items.find(function (i) {
                      return i.$vnode === child;
                    });

                    if (it) {
                      it.index = index++;
                    }
                  } else if (child.tag) {
                    var sub = child.componentInstance ? child.componentInstance.$scopedSlots.default ? child.componentInstance.$scopedSlots.default() : child.componentInstance.$children : child.children;

                    if (Array.isArray(sub) && sub.length > 0) {
                      deepSearch(sub.map(function (e) {
                        return e.$vnode;
                      }));
                    }
                  }
                };

                for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  _loop();
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }

              return false;
            };

            deepSearch(this.$scopedSlots.default());
          }
        }
      };
      mixin.computed = {
        /**
         * When items are added/removed sort them according to their position
         */
        sortedItems: function sortedItems() {
          return this.childItems.slice().sort(function (i1, i2) {
            return i1.index - i2.index;
          });
        }
      };
    }
  }

  return mixin;
});

var TabbedMixin = (function (cmp) {
  return {
    mixins: [ProviderParentMixin(cmp, Sorted)],
    components: _defineProperty({}, SlotComponent.name, SlotComponent),
    props: {
      value: {
        type: [String, Number],
        default: undefined
      },
      position: String,
      destroyOnHide: {
        type: Boolean,
        default: false
      }
    },
    data: function data() {
      return {
        activeId: this.value,
        // Internal state
        defaultSlots: [],
        contentHeight: 0,
        isTransitioning: false
      };
    },
    mounted: function mounted() {
      if (typeof this.value === 'number') {
        // Backward compatibility: converts the index value to an id
        var value = bound(this.value, 0, this.items.length - 1);
        this.activeId = this.items[value].value;
      } else {
        this.activeId = this.value;
      }
    },
    computed: {
      activeItem: function activeItem() {
        var _this = this;

        return this.activeId === undefined ? this.items[0] : this.activeId === null ? null : this.childItems.find(function (i) {
          return i.value === _this.activeId;
        });
      },
      items: function items() {
        return this.sortedItems;
      }
    },
    watch: {
      /**
       * When v-model is changed set the new active tab.
       */
      value: function value(_value) {
        if (typeof _value === 'number') {
          // Backward compatibility: converts the index value to an id
          _value = bound(_value, 0, this.items.length - 1);
          this.activeId = this.items[_value].value;
        } else {
          this.activeId = _value;
        }
      },

      /**
       * Sync internal state with external state
       */
      activeId: function activeId(val, oldValue) {
        val = this.activeItem ? typeof this.value === 'number' ? this.items.indexOf(this.activeItem) : this.activeItem.value : undefined;

        if (val !== this.value) {
          this.$emit('input', val);
        }
      }
    },
    methods: {
      /**
      * Child click listener, emit input event and change active child.
      */
      childClick: function childClick(child) {
        this.activeId = child.value;
      },
      getNextItemIdx: function getNextItemIdx(fromIdx) {
        var skipDisabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var nextItemIdx = null;
        var idx = fromIdx + 1;

        for (; idx < this.items.length; idx++) {
          var item = this.items[idx];

          if (item.visible && (!skipDisabled || skipDisabled && !item.disabled)) {
            nextItemIdx = idx;
            break;
          }
        }

        return nextItemIdx;
      },
      getPrevItemIdx: function getPrevItemIdx(fromIdx) {
        var skipDisabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var prevItemIdx = null;

        for (var idx = fromIdx - 1; idx >= 0; idx--) {
          var item = this.items[idx];

          if (item.visible && (!skipDisabled || skipDisabled && !item.disabled)) {
            prevItemIdx = idx;
            break;
          }
        }

        return prevItemIdx;
      }
    }
  };
});

//
var script$h = {
  name: 'GovTabs',
  mixins: [TabbedMixin('tab')],
  data: function data() {
    return {
      currentFocus: this.value
    };
  },
  methods: {
    giveFocusToTab: function giveFocusToTab(tab) {
      if (tab.$el && tab.$el.focus) {
        tab.$el.focus();
      } else if (tab.focus) {
        tab.focus();
      }
    },
    manageTablistKeydown: function manageTablistKeydown(event) {
      // https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key/Key_Values#Navigation_keys
      var key = event.key;

      switch (key) {
        case 'ArrowLeft':
        case 'Left':
          {
            var prevIdx = this.getPrevItemIdx(this.currentFocus, true);

            if (prevIdx === null) {
              // We try to give focus back to the last visible element
              prevIdx = this.getPrevItemIdx(this.items.length, true);
            }

            if (prevIdx !== null && this.$refs.tabLink && prevIdx < this.$refs.tabLink.length && !this.items[prevIdx].disabled) {
              this.giveFocusToTab(this.$refs.tabLink[prevIdx]);
            }

            event.preventDefault();
            break;
          }

        case 'ArrowRight':
        case 'Right':
          {
            var nextIdx = this.getNextItemIdx(this.currentFocus, true);

            if (nextIdx === null) {
              // We try to give focus back to the first visible element
              nextIdx = this.getNextItemIdx(-1, true);
            }

            if (nextIdx !== null && this.$refs.tabLink && nextIdx < this.$refs.tabLink.length && !this.items[nextIdx].disabled) {
              this.giveFocusToTab(this.$refs.tabLink[nextIdx]);
            }

            event.preventDefault();
            break;
          }
      }
    },
    manageTabKeydown: function manageTabKeydown(event, childItem) {
      // https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key/Key_Values#Navigation_keys
      var key = event.key;

      switch (key) {
        case ' ':
        case 'Space':
        case 'Spacebar':
        case 'Enter':
          {
            this.childClick(childItem);
            event.preventDefault();
            break;
          }
      }
    }
  }
};

/* script */
const __vue_script__$h = script$h;

/* template */
var __vue_render__$h = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gov-tabs"},[_c('nav',{staticClass:"gov-tabs__links-holder",attrs:{"role":"tablist","aria-orientation":"horizontal"},on:{"keydown":_vm.manageTablistKeydown}},_vm._l((_vm.items),function(childItem,childIdx){return _c('button',{directives:[{name:"show",rawName:"v-show",value:(childItem.visible),expression:"childItem.visible"}],key:childItem.value,ref:"tabLink",refInFor:true,class:['gov-tabs__link',
                     childItem.headerClass, { 'is-active': childItem.isActive,
                                              'is-disabled': childItem.disabled }],attrs:{"role":"tab","id":((childItem.value) + "-tab"),"aria-controls":((childItem.value) + "-content"),"aria-selected":("" + (childItem.isActive)),"tabindex":childItem.isActive ? 0 : -1},on:{"click":function($event){return _vm.childClick(childItem)},"focus":function($event){_vm.currentFocus = childIdx;},"keydown":function($event){return _vm.manageTabKeydown($event, childItem)}}},[_vm._v(" "+_vm._s(childItem.label)+" ")])}),0),_c('div',{staticClass:"gov-tabs__content-holder"},[_c('div',{staticClass:"gov-tabs__content is-active"},[_vm._t("default")],2)])])};
var __vue_staticRenderFns__$h = [];

  /* style */
  const __vue_inject_styles__$h = undefined;
  /* scoped */
  const __vue_scope_id__$h = undefined;
  /* module identifier */
  const __vue_module_identifier__$h = undefined;
  /* functional template */
  const __vue_is_functional_template__$h = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$h = /*#__PURE__*/normalizeComponent_1(
    { render: __vue_render__$h, staticRenderFns: __vue_staticRenderFns__$h },
    __vue_inject_styles__$h,
    __vue_script__$h,
    __vue_scope_id__$h,
    __vue_is_functional_template__$h,
    __vue_module_identifier__$h,
    false,
    undefined,
    undefined,
    undefined
  );

var sorted$1 = 1;
var optional = 2;
var Sorted$1 = sorted$1;
var InjectedChildMixin = (function (parentItemName) {
  var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var mixin = {
    inject: {
      parent: {
        from: 'b' + parentItemName,
        default: false
      }
    },
    created: function created() {
      if (!this.parent) {
        if (!hasFlag(flags, optional)) {
          this.$destroy();
          throw new Error('You should wrap ' + this.$options.name + ' in a ' + parentItemName);
        }
      } else if (this.parent._registerItem) {
        this.parent._registerItem(this);
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (this.parent && this.parent._unregisterItem) {
        this.parent._unregisterItem(this);
      }
    }
  };

  if (hasFlag(flags, sorted$1)) {
    mixin.data = function () {
      return {
        index: null
      };
    };
  }

  return mixin;
});

var TabbedChildMixin = (function (parentCmp) {
  return {
    mixins: [InjectedChildMixin(parentCmp, Sorted$1)],
    props: {
      label: String,
      visible: {
        type: Boolean,
        default: true
      },
      value: {
        type: String,
        default: function _default() {
          return this._uid.toString();
        }
      }
    },
    data: function data() {
      return {
        elementClass: 'item',
        elementRole: null
      };
    },
    computed: {
      isActive: function isActive() {
        return this.parent.activeItem === this;
      }
    },
    render: function render(createElement) {
      // if destroy apply v-if
      if (this.parent.destroyOnHide) {
        if (!this.isActive || !this.visible) {
          return;
        }
      }

      var vnode = createElement('div', {
        directives: [{
          name: 'show',
          value: this.isActive && this.visible
        }],
        attrs: {
          'class': this.elementClass,
          'role': this.elementRole,
          'id': "".concat(this.value, "-content"),
          'aria-labelledby': this.elementRole ? "".concat(this.value, "-label") : null,
          'tabindex': this.isActive ? 0 : -1
        }
      }, this.$slots.default);
      return vnode;
    }
  };
});

var script$i = {
  name: 'GovTabItem',
  mixins: [TabbedChildMixin('tab')],
  props: {
    disabled: Boolean
  },
  data: function data() {
    return {
      elementClass: 'gov-tabs__content is-active',
      elementRole: 'tabpanel'
    };
  }
};

/* script */
const __vue_script__$i = script$i;

/* template */

  /* style */
  const __vue_inject_styles__$i = undefined;
  /* scoped */
  const __vue_scope_id__$i = undefined;
  /* module identifier */
  const __vue_module_identifier__$i = undefined;
  /* functional template */
  const __vue_is_functional_template__$i = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$i = /*#__PURE__*/normalizeComponent_1(
    {},
    __vue_inject_styles__$i,
    __vue_script__$i,
    __vue_scope_id__$i,
    __vue_is_functional_template__$i,
    __vue_module_identifier__$i,
    false,
    undefined,
    undefined,
    undefined
  );

var Plugin$d = {
  install: function install(Vue) {
    registerComponent(Vue, __vue_component__$h);
    registerComponent(Vue, __vue_component__$i);
  }
};
use(Plugin$d);

function debounce (func, wait, immediate) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

var script$j = {
  name: 'GovTableColumn',
  inject: {
    $table: {
      name: '$table',
      default: false
    }
  },
  props: {
    label: String,
    customKey: [String, Number],
    field: String,
    meta: [String, Number, Boolean, Function, Object, Array],
    width: [Number, String],
    numeric: Boolean,
    centered: Boolean,
    searchable: Boolean,
    sortable: Boolean,
    visible: {
      type: Boolean,
      default: true
    },
    subheading: [String, Number],
    customSort: Function,
    customSearch: Function,
    sticky: Boolean,
    headerSelectable: Boolean,
    headerClass: String,
    cellClass: String,
    thAttrs: {
      type: Function,
      default: function _default() {
        return {};
      }
    },
    tdAttrs: {
      type: Function,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      newKey: this.customKey || this.label,
      _isTableColumn: true
    };
  },
  computed: {
    thClasses: function thClasses() {
      var attrs = this.thAttrs(this);
      var classes = [this.headerClass, {
        'is-sortable': this.sortable,
        'is-sticky': this.sticky,
        'is-unselectable': this.isHeaderUnSelectable
      }];

      if (attrs && attrs.class) {
        classes.push(attrs.class);
      }

      return classes;
    },
    thStyle: function thStyle() {
      var attrs = this.thAttrs(this);
      var style = [this.style];

      if (attrs && attrs.style) {
        style.push(attrs.style);
      }

      return style;
    },
    rootClasses: function rootClasses() {
      return [this.cellClass, {
        'has-text-right': this.numeric && !this.centered,
        'has-text-centered': this.centered,
        'is-sticky': this.sticky
      }];
    },
    style: function style() {
      return {
        width: toCssWidth(this.width)
      };
    },
    hasDefaultSlot: function hasDefaultSlot() {
      return !!this.$scopedSlots.default;
    },

    /**
     * Return if column header is un-selectable
     */
    isHeaderUnSelectable: function isHeaderUnSelectable() {
      return !this.headerSelectable && this.sortable;
    }
  },
  methods: {
    getRootClasses: function getRootClasses(row) {
      var attrs = this.tdAttrs(row, this);
      var classes = [this.rootClasses];

      if (attrs && attrs.class) {
        classes.push(attrs.class);
      }

      return classes;
    },
    getRootStyle: function getRootStyle(row) {
      var attrs = this.tdAttrs(row, this);
      var style = [];

      if (attrs && attrs.style) {
        style.push(attrs.style);
      }

      return style;
    }
  },
  created: function created() {
    if (!this.$table) {
      this.$destroy();
      throw new Error('You should wrap bTableColumn on a bTable');
    }

    this.$table.refreshSlots();
  },
  render: function render(createElement) {
    // renderless
    return null;
  }
};

/* script */
const __vue_script__$j = script$j;

/* template */

  /* style */
  const __vue_inject_styles__$j = undefined;
  /* scoped */
  const __vue_scope_id__$j = undefined;
  /* module identifier */
  const __vue_module_identifier__$j = undefined;
  /* functional template */
  const __vue_is_functional_template__$j = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$j = /*#__PURE__*/normalizeComponent_1(
    {},
    __vue_inject_styles__$j,
    __vue_script__$j,
    __vue_scope_id__$j,
    __vue_is_functional_template__$j,
    __vue_module_identifier__$j,
    false,
    undefined,
    undefined,
    undefined
  );

var _components;
var script$k = {
  name: 'GovTable',
  components: (_components = {}, _defineProperty(_components, __vue_component__$4.name, __vue_component__$4), _defineProperty(_components, __vue_component__$a.name, __vue_component__$a), _defineProperty(_components, __vue_component__$7.name, __vue_component__$7), _defineProperty(_components, SlotComponent.name, SlotComponent), _defineProperty(_components, __vue_component__$j.name, __vue_component__$j), _components),
  inheritAttrs: false,
  provide: function provide() {
    return {
      $table: this
    };
  },
  props: {
    data: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    columns: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    bordered: Boolean,
    striped: Boolean,
    narrowed: Boolean,
    hoverable: Boolean,
    loading: Boolean,
    detailed: Boolean,
    checkable: Boolean,
    headerCheckable: {
      type: Boolean,
      default: true
    },
    checkboxPosition: {
      type: String,
      default: 'left',
      validator: function validator(value) {
        return ['left', 'right'].indexOf(value) >= 0;
      }
    },
    stickyCheckbox: {
      type: Boolean,
      default: false
    },
    selected: Object,
    isRowSelectable: {
      type: Function,
      default: function _default() {
        return true;
      }
    },
    focusable: Boolean,
    customIsChecked: Function,
    isRowCheckable: {
      type: Function,
      default: function _default() {
        return true;
      }
    },
    checkedRows: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    mobileCards: {
      type: Boolean,
      default: true
    },
    defaultSort: [String, Array],
    defaultSortDirection: {
      type: String,
      default: 'asc'
    },
    sortIcon: {
      type: String,
      default: 'arrow-up'
    },
    sortIconSize: {
      type: String,
      default: 'is-small'
    },
    sortMultiple: {
      type: Boolean,
      default: false
    },
    sortMultipleData: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    sortMultipleKey: {
      type: String,
      default: null
    },
    paginated: Boolean,
    currentPage: {
      type: Number,
      default: 1
    },
    perPage: {
      type: [Number, String],
      default: 20
    },
    showDetailIcon: {
      type: Boolean,
      default: true
    },
    detailIcon: {
      type: String,
      default: 'chevron-right'
    },
    paginationPosition: {
      type: String,
      default: 'bottom',
      validator: function validator(value) {
        return ['bottom', 'top', 'both'].indexOf(value) >= 0;
      }
    },
    paginationRounded: Boolean,
    backendSorting: Boolean,
    backendFiltering: Boolean,
    rowClass: {
      type: Function,
      default: function _default() {
        return '';
      }
    },
    openedDetailed: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    hasDetailedVisible: {
      type: Function,
      default: function _default() {
        return true;
      }
    },
    detailKey: {
      type: String,
      default: ''
    },
    detailTransition: {
      type: String,
      default: ''
    },
    customDetailRow: {
      type: Boolean,
      default: false
    },
    backendPagination: Boolean,
    total: {
      type: [Number, String],
      default: 0
    },
    iconPack: String,
    mobileSortPlaceholder: String,
    customRowKey: String,
    draggable: {
      type: Boolean,
      default: false
    },
    draggableColumn: {
      type: Boolean,
      default: false
    },
    scrollable: Boolean,
    ariaNextLabel: String,
    ariaPreviousLabel: String,
    ariaPageLabel: String,
    ariaCurrentLabel: String,
    stickyHeader: Boolean,
    height: [Number, String],
    filtersEvent: {
      type: String,
      default: ''
    },
    cardLayout: Boolean,
    showHeader: {
      type: Boolean,
      default: true
    },
    debounceSearch: Number,
    caption: String,
    showCaption: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      sortMultipleDataLocal: [],
      getValueByPath: getValueByPath,
      visibleDetailRows: this.openedDetailed,
      newData: this.data,
      newDataTotal: this.backendPagination ? this.total : this.data.length,
      newCheckedRows: _toConsumableArray(this.checkedRows),
      lastCheckedRowIndex: null,
      newCurrentPage: this.currentPage,
      currentSortColumn: {},
      isAsc: true,
      filters: {},
      defaultSlots: [],
      firstTimeSort: true,
      // Used by first time initSort
      _isTable: true,
      // Used by TableColumn
      isDraggingRow: false,
      isDraggingColumn: false
    };
  },
  computed: {
    sortMultipleDataComputed: function sortMultipleDataComputed() {
      return this.backendSorting ? this.sortMultipleData : this.sortMultipleDataLocal;
    },
    tableClasses: function tableClasses() {
      return {
        'is-bordered': this.bordered,
        'is-striped': this.striped,
        'is-narrow': this.narrowed,
        'is-hoverable': (this.hoverable || this.focusable) && this.visibleData.length
      };
    },
    tableWrapperClasses: function tableWrapperClasses() {
      return {
        'has-mobile-cards': this.mobileCards,
        'has-sticky-header': this.stickyHeader,
        'is-card-list': this.cardLayout,
        'table-container': this.isScrollable
      };
    },
    tableStyle: function tableStyle() {
      return {
        height: toCssWidth(this.height)
      };
    },

    /**
    * Splitted data based on the pagination.
    */
    visibleData: function visibleData() {
      if (!this.paginated) return this.newData;
      var currentPage = this.newCurrentPage;
      var perPage = this.perPage;

      if (this.newData.length <= perPage) {
        return this.newData;
      } else {
        var start = (currentPage - 1) * perPage;
        var end = parseInt(start, 10) + parseInt(perPage, 10);
        return this.newData.slice(start, end);
      }
    },
    visibleColumns: function visibleColumns() {
      if (!this.newColumns) return this.newColumns;
      return this.newColumns.filter(function (column) {
        return column.visible || column.visible === undefined;
      });
    },

    /**
    * Check if all rows in the page are checked.
    */
    isAllChecked: function isAllChecked() {
      var _this = this;

      var validVisibleData = this.visibleData.filter(function (row) {
        return _this.isRowCheckable(row);
      });
      if (validVisibleData.length === 0) return false;
      var isAllChecked = validVisibleData.some(function (currentVisibleRow) {
        return indexOf(_this.newCheckedRows, currentVisibleRow, _this.customIsChecked) < 0;
      });
      return !isAllChecked;
    },

    /**
    * Check if all rows in the page are checkable.
    */
    isAllUncheckable: function isAllUncheckable() {
      var _this2 = this;

      var validVisibleData = this.visibleData.filter(function (row) {
        return _this2.isRowCheckable(row);
      });
      return validVisibleData.length === 0;
    },

    /**
    * Check if has any sortable column.
    */
    hasSortablenewColumns: function hasSortablenewColumns() {
      return this.newColumns.some(function (column) {
        return column.sortable;
      });
    },

    /**
    * Check if has any searchable column.
    */
    hasSearchablenewColumns: function hasSearchablenewColumns() {
      return this.newColumns.some(function (column) {
        return column.searchable;
      });
    },

    /**
    * Check if has any column using subheading.
    */
    hasCustomSubheadings: function hasCustomSubheadings() {
      if (this.$scopedSlots && this.$scopedSlots.subheading) return true;
      return this.newColumns.some(function (column) {
        return column.subheading || column.$scopedSlots && column.$scopedSlots.subheading;
      });
    },

    /**
    * Return total column count based if it's checkable or expanded
    */
    columnCount: function columnCount() {
      var count = this.visibleColumns.length;
      count += this.checkable ? 1 : 0;
      count += this.detailed && this.showDetailIcon ? 1 : 0;
      return count;
    },

    /**
    * return if detailed row tabled
    * will be with chevron column & icon or not
    */
    showDetailRowIcon: function showDetailRowIcon() {
      return this.detailed && this.showDetailIcon;
    },

    /**
    * return if scrollable table
    */
    isScrollable: function isScrollable() {
      if (this.scrollable) return true;
      if (!this.newColumns) return false;
      return this.newColumns.some(function (column) {
        return column.sticky;
      });
    },
    newColumns: function newColumns() {
      var _this3 = this;

      if (this.columns && this.columns.length) {
        return this.columns.map(function (column) {
          var TableColumnComponent = VueInstance.extend(__vue_component__$j);
          var component = new TableColumnComponent({
            parent: _this3,
            propsData: column
          });
          component.$scopedSlots = {
            default: function _default(props) {
              var vnode = component.$createElement('span', {
                domProps: {
                  innerHTML: getValueByPath(props.row, column.field)
                }
              });
              return [vnode];
            }
          };
          return component;
        });
      }

      return this.defaultSlots.filter(function (vnode) {
        return vnode.componentInstance && vnode.componentInstance.$data && vnode.componentInstance.$data._isTableColumn;
      }).map(function (vnode) {
        return vnode.componentInstance;
      });
    },
    canDragRow: function canDragRow() {
      return this.draggable && !this.isDraggingColumn;
    },
    canDragColumn: function canDragColumn() {
      return this.draggableColumn && !this.isDraggingRow;
    }
  },
  watch: {
    /**
    * When data prop change:
    *   1. Update internal value.
    *   2. Filter data if it's not backend-filtered.
    *   3. Sort again if it's not backend-sorted.
    *   4. Set new total if it's not backend-paginated.
    */
    data: function data(value) {
      var _this4 = this;

      this.newData = value;

      if (!this.backendFiltering) {
        this.newData = value.filter(function (row) {
          return _this4.isRowFiltered(row);
        });
      }

      if (!this.backendSorting) {
        this.sort(this.currentSortColumn, true);
      }

      if (!this.backendPagination) {
        this.newDataTotal = this.newData.length;
      }
    },

    /**
    * When Pagination total change, update internal total
    * only if it's backend-paginated.
    */
    total: function total(newTotal) {
      if (!this.backendPagination) return;
      this.newDataTotal = newTotal;
    },
    currentPage: function currentPage(newVal) {
      this.newCurrentPage = newVal;
    },
    newCurrentPage: function newCurrentPage(newVal) {
      this.$emit('update:currentPage', newVal);
    },

    /**
    * When checkedRows prop change, update internal value without
    * mutating original data.
    */
    checkedRows: function checkedRows(rows) {
      this.newCheckedRows = _toConsumableArray(rows);
    },

    /*
    newColumns(value) {
        this.checkSort()
    },
    */
    debounceSearch: {
      handler: function handler(value) {
        this.debouncedHandleFiltersChange = debounce(this.handleFiltersChange, value);
      },
      immediate: true
    },
    filters: {
      handler: function handler(value) {
        if (this.debounceSearch) {
          this.debouncedHandleFiltersChange(value);
        } else {
          this.handleFiltersChange(value);
        }
      },
      deep: true
    },

    /**
    * When the user wants to control the detailed rows via props.
    * Or wants to open the details of certain row with the router for example.
    */
    openedDetailed: function openedDetailed(expandedRows) {
      this.visibleDetailRows = expandedRows;
    }
  },
  methods: {
    onFiltersEvent: function onFiltersEvent(event) {
      this.$emit("filters-event-".concat(this.filtersEvent), {
        event: event,
        filters: this.filters
      });
    },
    handleFiltersChange: function handleFiltersChange(value) {
      var _this5 = this;

      if (this.backendFiltering) {
        this.$emit('filters-change', value);
      } else {
        this.newData = this.data.filter(function (row) {
          return _this5.isRowFiltered(row);
        });

        if (!this.backendPagination) {
          this.newDataTotal = this.newData.length;
        }

        if (!this.backendSorting) {
          if (this.sortMultiple && this.sortMultipleDataLocal && this.sortMultipleDataLocal.length > 0) {
            this.doSortMultiColumn();
          } else if (Object.keys(this.currentSortColumn).length > 0) {
            this.doSortSingleColumn(this.currentSortColumn);
          }
        }
      }
    },
    findIndexOfSortData: function findIndexOfSortData(column) {
      var sortObj = this.sortMultipleDataComputed.filter(function (i) {
        return i.field === column.field;
      })[0];
      return this.sortMultipleDataComputed.indexOf(sortObj) + 1;
    },
    removeSortingPriority: function removeSortingPriority(column) {
      if (this.backendSorting) {
        this.$emit('sorting-priority-removed', column.field);
      } else {
        this.sortMultipleDataLocal = this.sortMultipleDataLocal.filter(function (priority) {
          return priority.field !== column.field;
        });
        var formattedSortingPriority = this.sortMultipleDataLocal.map(function (i) {
          return (i.order && i.order === 'desc' ? '-' : '') + i.field;
        });
        this.newData = multiColumnSort(this.newData, formattedSortingPriority);
      }
    },
    resetMultiSorting: function resetMultiSorting() {
      this.sortMultipleDataLocal = [];
      this.currentSortColumn = {};
      this.newData = this.data;
    },

    /**
    * Sort an array by key without mutating original data.
    * Call the user sort function if it was passed.
    */
    sortBy: function sortBy(array, key, fn, isAsc) {
      var sorted = []; // Sorting without mutating original data

      if (fn && typeof fn === 'function') {
        sorted = _toConsumableArray(array).sort(function (a, b) {
          return fn(a, b, isAsc);
        });
      } else {
        sorted = _toConsumableArray(array).sort(function (a, b) {
          // Get nested values from objects
          var newA = getValueByPath(a, key);
          var newB = getValueByPath(b, key); // sort boolean type

          if (typeof newA === 'boolean' && typeof newB === 'boolean') {
            return isAsc ? newA - newB : newB - newA;
          }

          if (!newA && newA !== 0) return 1;
          if (!newB && newB !== 0) return -1;
          if (newA === newB) return 0;
          newA = typeof newA === 'string' ? newA.toUpperCase() : newA;
          newB = typeof newB === 'string' ? newB.toUpperCase() : newB;
          return isAsc ? newA > newB ? 1 : -1 : newA > newB ? -1 : 1;
        });
      }

      return sorted;
    },
    sortMultiColumn: function sortMultiColumn(column) {
      this.currentSortColumn = {};

      if (!this.backendSorting) {
        var existingPriority = this.sortMultipleDataLocal.filter(function (i) {
          return i.field === column.field;
        })[0];

        if (existingPriority) {
          existingPriority.order = existingPriority.order === 'desc' ? 'asc' : 'desc';
        } else {
          this.sortMultipleDataLocal.push({
            field: column.field,
            order: column.isAsc
          });
        }

        this.doSortMultiColumn();
      }
    },
    doSortMultiColumn: function doSortMultiColumn() {
      var formattedSortingPriority = this.sortMultipleDataLocal.map(function (i) {
        return (i.order && i.order === 'desc' ? '-' : '') + i.field;
      });
      this.newData = multiColumnSort(this.newData, formattedSortingPriority);
    },

    /**
    * Sort the column.
    * Toggle current direction on column if it's sortable
    * and not just updating the prop.
    */
    sort: function sort(column) {
      var updatingData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var event = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (!column || !column.sortable) return;

      if ( // if backend sorting is enabled, just emit the sort press like usual
      // if the correct key combination isnt pressed, sort like usual
      !this.backendSorting && this.sortMultiple && (this.sortMultipleKey && event[this.sortMultipleKey] || !this.sortMultipleKey)) {
        if (updatingData) {
          this.doSortMultiColumn();
        } else {
          this.sortMultiColumn(column);
        }
      } else {
        // sort multiple is enabled but the correct key combination isnt pressed so reset
        if (this.sortMultiple) {
          this.sortMultipleDataLocal = [];
        }

        if (!updatingData) {
          this.isAsc = column === this.currentSortColumn ? !this.isAsc : this.defaultSortDirection.toLowerCase() !== 'desc';
        }

        if (!this.firstTimeSort) {
          this.$emit('sort', column.field, this.isAsc ? 'asc' : 'desc', event);
        }

        if (!this.backendSorting) {
          this.doSortSingleColumn(column);
        }

        this.currentSortColumn = column;
      }
    },
    doSortSingleColumn: function doSortSingleColumn(column) {
      this.newData = this.sortBy(this.newData, column.field, column.customSort, this.isAsc);
    },
    isRowSelected: function isRowSelected(row, selected) {
      if (!selected) {
        return false;
      }

      if (this.customRowKey) {
        return row[this.customRowKey] === selected[this.customRowKey];
      }

      return row === selected;
    },

    /**
    * Check if the row is checked (is added to the array).
    */
    isRowChecked: function isRowChecked(row) {
      return indexOf(this.newCheckedRows, row, this.customIsChecked) >= 0;
    },

    /**
    * Remove a checked row from the array.
    */
    removeCheckedRow: function removeCheckedRow(row) {
      var index = indexOf(this.newCheckedRows, row, this.customIsChecked);

      if (index >= 0) {
        this.newCheckedRows.splice(index, 1);
      }
    },

    /**
    * Header checkbox click listener.
    * Add or remove all rows in current page.
    */
    checkAll: function checkAll() {
      var _this6 = this;

      var isAllChecked = this.isAllChecked;
      this.visibleData.forEach(function (currentRow) {
        if (_this6.isRowCheckable(currentRow)) {
          _this6.removeCheckedRow(currentRow);
        }

        if (!isAllChecked) {
          if (_this6.isRowCheckable(currentRow)) {
            _this6.newCheckedRows.push(currentRow);
          }
        }
      });
      this.$emit('check', this.newCheckedRows);
      this.$emit('check-all', this.newCheckedRows); // Emit checked rows to update user variable

      this.$emit('update:checkedRows', this.newCheckedRows);
    },

    /**
    * Row checkbox click listener.
    */
    checkRow: function checkRow(row, index, event) {
      if (!this.isRowCheckable(row)) return;
      var lastIndex = this.lastCheckedRowIndex;
      this.lastCheckedRowIndex = index;

      if (event.shiftKey && lastIndex !== null && index !== lastIndex) {
        this.shiftCheckRow(row, index, lastIndex);
      } else if (!this.isRowChecked(row)) {
        this.newCheckedRows.push(row);
      } else {
        this.removeCheckedRow(row);
      }

      this.$emit('check', this.newCheckedRows, row); // Emit checked rows to update user variable

      this.$emit('update:checkedRows', this.newCheckedRows);
    },

    /**
     * Check row when shift is pressed.
     */
    shiftCheckRow: function shiftCheckRow(row, index, lastCheckedRowIndex) {
      var _this7 = this;

      // Get the subset of the list between the two indicies
      var subset = this.visibleData.slice(Math.min(index, lastCheckedRowIndex), Math.max(index, lastCheckedRowIndex) + 1); // Determine the operation based on the state of the clicked checkbox

      var shouldCheck = !this.isRowChecked(row);
      subset.forEach(function (item) {
        _this7.removeCheckedRow(item);

        if (shouldCheck && _this7.isRowCheckable(item)) {
          _this7.newCheckedRows.push(item);
        }
      });
    },

    /**
    * Row click listener.
    * Emit all necessary events.
    */
    selectRow: function selectRow(row, index) {
      this.$emit('click', row);
      if (this.selected === row) return;
      if (!this.isRowSelectable(row)) return; // Emit new and old row

      this.$emit('select', row, this.selected); // Emit new row to update user variable

      this.$emit('update:selected', row);
    },

    /**
    * Toggle to show/hide details slot
    */
    toggleDetails: function toggleDetails(obj) {
      var found = this.isVisibleDetailRow(obj);

      if (found) {
        this.closeDetailRow(obj);
        this.$emit('details-close', obj);
      } else {
        this.openDetailRow(obj);
        this.$emit('details-open', obj);
      } // Syncs the detailed rows with the parent component


      this.$emit('update:openedDetailed', this.visibleDetailRows);
    },
    openDetailRow: function openDetailRow(obj) {
      var index = this.handleDetailKey(obj);
      this.visibleDetailRows.push(index);
    },
    closeDetailRow: function closeDetailRow(obj) {
      var index = this.handleDetailKey(obj);
      var i = this.visibleDetailRows.indexOf(index);

      if (i >= 0) {
        this.visibleDetailRows.splice(i, 1);
      }
    },
    isVisibleDetailRow: function isVisibleDetailRow(obj) {
      var index = this.handleDetailKey(obj);
      return this.visibleDetailRows.indexOf(index) >= 0;
    },
    isActiveDetailRow: function isActiveDetailRow(row) {
      return this.detailed && !this.customDetailRow && this.isVisibleDetailRow(row);
    },
    isActiveCustomDetailRow: function isActiveCustomDetailRow(row) {
      return this.detailed && this.customDetailRow && this.isVisibleDetailRow(row);
    },
    isRowFiltered: function isRowFiltered(row) {
      var _this8 = this;

      var _loop = function _loop(key) {
        if (!_this8.filters[key]) return "continue";
        var input = _this8.filters[key];

        var column = _this8.newColumns.filter(function (c) {
          return c.field === key;
        })[0];

        if (column && column.customSearch && typeof column.customSearch === 'function') {
          if (!column.customSearch(row, input)) return {
            v: false
          };
        } else {
          var value = _this8.getValueByPath(row, key);

          if (value == null) return {
            v: false
          };

          if (Number.isInteger(value)) {
            if (value !== Number(input)) return {
              v: false
            };
          } else {
            var re = new RegExp(escapeRegExpChars(input), 'i');
            var valueWithoutDiacritics = removeDiacriticsFromString(value);
            return {
              v: re.test(valueWithoutDiacritics) || re.test(value)
            };
          }
        }
      };

      for (var key in this.filters) {
        var _ret = _loop(key);

        switch (_ret) {
          case "continue":
            continue;

          default:
            if (_typeof(_ret) === "object") return _ret.v;
        }
      }

      return true;
    },

    /**
    * When the detailKey is defined we use the object[detailKey] as index.
    * If not, use the object reference by default.
    */
    handleDetailKey: function handleDetailKey(index) {
      var key = this.detailKey;
      return !key.length || !index ? index : index[key];
    },
    checkPredefinedDetailedRows: function checkPredefinedDetailedRows() {
      var defaultExpandedRowsDefined = this.openedDetailed.length > 0;

      if (defaultExpandedRowsDefined && !this.detailKey.length) {
        throw new Error('If you set a predefined opened-detailed, you must provide a unique key using the prop "detail-key"');
      }
    },

    /**
    * Call initSort only first time (For example async data).
    */
    checkSort: function checkSort() {
      if (this.newColumns.length && this.firstTimeSort) {
        this.initSort();
        this.firstTimeSort = false;
      } else if (this.newColumns.length) {
        if (Object.keys(this.currentSortColumn).length > 0) {
          for (var i = 0; i < this.newColumns.length; i++) {
            if (this.newColumns[i].field === this.currentSortColumn.field) {
              this.currentSortColumn = this.newColumns[i];
              break;
            }
          }
        }
      }
    },

    /**
    * Check if footer slot has custom content.
    */
    hasCustomFooterSlot: function hasCustomFooterSlot() {
      if (this.$slots.footer.length > 1) return true;
      var tag = this.$slots.footer[0].tag;
      if (tag !== 'th' && tag !== 'td') return false;
      return true;
    },

    /**
    * Check if bottom-left slot exists.
    */
    hasBottomLeftSlot: function hasBottomLeftSlot() {
      return typeof this.$slots['bottom-left'] !== 'undefined';
    },

    /**
    * Table arrow keys listener, change selection.
    */
    pressedArrow: function pressedArrow(pos) {
      if (!this.visibleData.length) return;
      var index = this.visibleData.indexOf(this.selected) + pos; // Prevent from going up from first and down from last

      index = index < 0 ? 0 : index > this.visibleData.length - 1 ? this.visibleData.length - 1 : index;
      var row = this.visibleData[index];

      if (!this.isRowSelectable(row)) {
        var newIndex = null;

        if (pos > 0) {
          for (var i = index; i < this.visibleData.length && newIndex === null; i++) {
            if (this.isRowSelectable(this.visibleData[i])) newIndex = i;
          }
        } else {
          for (var _i = index; _i >= 0 && newIndex === null; _i--) {
            if (this.isRowSelectable(this.visibleData[_i])) newIndex = _i;
          }
        }

        if (newIndex >= 0) {
          this.selectRow(this.visibleData[newIndex]);
        }
      } else {
        this.selectRow(row);
      }
    },

    /**
    * Focus table element if has selected prop.
    */
    focus: function focus() {
      if (!this.focusable) return;
      this.$el.querySelector('table').focus();
    },

    /**
    * Initial sorted column based on the default-sort prop.
    */
    initSort: function initSort() {
      var _this9 = this;

      if (this.sortMultiple && this.sortMultipleData) {
        this.sortMultipleData.forEach(function (column) {
          _this9.sortMultiColumn(column);
        });
      } else {
        if (!this.defaultSort) return;
        var sortField = '';
        var sortDirection = this.defaultSortDirection;

        if (Array.isArray(this.defaultSort)) {
          sortField = this.defaultSort[0];

          if (this.defaultSort[1]) {
            sortDirection = this.defaultSort[1];
          }
        } else {
          sortField = this.defaultSort;
        }

        var sortColumn = this.newColumns.filter(function (column) {
          return column.field === sortField;
        })[0];

        if (sortColumn) {
          this.isAsc = sortDirection.toLowerCase() !== 'desc';
          this.sort(sortColumn, true);
        }
      }
    },

    /**
    * Emits drag start event (row)
    */
    handleDragStart: function handleDragStart(event, row, index) {
      if (!this.canDragRow) return;
      this.isDraggingRow = true;
      this.$emit('dragstart', {
        event: event,
        row: row,
        index: index
      });
    },

    /**
    * Emits drag leave event (row)
    */
    handleDragEnd: function handleDragEnd(event, row, index) {
      if (!this.canDragRow) return;
      this.isDraggingRow = false;
      this.$emit('dragend', {
        event: event,
        row: row,
        index: index
      });
    },

    /**
    * Emits drop event (row)
    */
    handleDrop: function handleDrop(event, row, index) {
      if (!this.canDragRow) return;
      this.$emit('drop', {
        event: event,
        row: row,
        index: index
      });
    },

    /**
    * Emits drag over event (row)
    */
    handleDragOver: function handleDragOver(event, row, index) {
      if (!this.canDragRow) return;
      this.$emit('dragover', {
        event: event,
        row: row,
        index: index
      });
    },

    /**
    * Emits drag leave event (row)
    */
    handleDragLeave: function handleDragLeave(event, row, index) {
      if (!this.canDragRow) return;
      this.$emit('dragleave', {
        event: event,
        row: row,
        index: index
      });
    },
    emitEventForRow: function emitEventForRow(eventName, event, row) {
      return this.$listeners[eventName] ? this.$emit(eventName, row, event) : null;
    },

    /**
    * Emits drag start event (column)
    */
    handleColumnDragStart: function handleColumnDragStart(event, column, index) {
      if (!this.canDragColumn) return;
      this.isDraggingColumn = true;
      this.$emit('columndragstart', {
        event: event,
        column: column,
        index: index
      });
    },

    /**
    * Emits drag leave event (column)
    */
    handleColumnDragEnd: function handleColumnDragEnd(event, column, index) {
      if (!this.canDragColumn) return;
      this.isDraggingColumn = false;
      this.$emit('columndragend', {
        event: event,
        column: column,
        index: index
      });
    },

    /**
    * Emits drop event (column)
    */
    handleColumnDrop: function handleColumnDrop(event, column, index) {
      if (!this.canDragColumn) return;
      this.$emit('columndrop', {
        event: event,
        column: column,
        index: index
      });
    },

    /**
    * Emits drag over event (column)
    */
    handleColumnDragOver: function handleColumnDragOver(event, column, index) {
      if (!this.canDragColumn) return;
      this.$emit('columndragover', {
        event: event,
        column: column,
        index: index
      });
    },

    /**
    * Emits drag leave event (column)
    */
    handleColumnDragLeave: function handleColumnDragLeave(event, column, index) {
      if (!this.canDragColumn) return;
      this.$emit('columndragleave', {
        event: event,
        column: column,
        index: index
      });
    },
    refreshSlots: function refreshSlots() {
      this.defaultSlots = this.$slots.default || [];
    }
  },
  mounted: function mounted() {
    this.refreshSlots();
    this.checkPredefinedDetailedRows();
    this.checkSort();
  }
};

/* script */
const __vue_script__$k = script$k;

/* template */
var __vue_render__$i = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gov-table"},[_vm._t("default"),_c('div',{staticClass:"gov-table-cover",class:_vm.tableWrapperClasses,style:(_vm.tableStyle)},[_c('table',{staticClass:"gov-table gov-table--mobile-block",class:_vm.tableClasses,attrs:{"tabindex":!_vm.focusable ? false : 0},on:{"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }if($event.target !== $event.currentTarget){ return null; }$event.preventDefault();return _vm.pressedArrow(-1)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }if($event.target !== $event.currentTarget){ return null; }$event.preventDefault();return _vm.pressedArrow(1)}]}},[(_vm.caption)?_c('caption',{directives:[{name:"show",rawName:"v-show",value:(_vm.showCaption),expression:"showCaption"}]},[_vm._v(_vm._s(_vm.caption))]):_vm._e(),(_vm.newColumns.length && _vm.showHeader)?_c('thead',[_c('tr',[(_vm.showDetailRowIcon)?_c('th',{attrs:{"width":"40px"}}):_vm._e(),(_vm.checkable && _vm.checkboxPosition === 'left')?_c('th',{class:['checkbox-cell', { 'is-sticky': _vm.stickyCheckbox } ]},[(_vm.headerCheckable)?[_c('gov-checkbox',{attrs:{"autocomplete":"off","value":_vm.isAllChecked,"disabled":_vm.isAllUncheckable},nativeOn:{"change":function($event){return _vm.checkAll($event)}}})]:_vm._e()],2):_vm._e(),_vm._l((_vm.visibleColumns),function(column,index){return _c('th',_vm._b({key:column.newKey + ':' + index + 'header',class:[column.thClasses, {
                            'is-current-sort': !_vm.sortMultiple && _vm.currentSortColumn === column,
                        }],style:(column.thStyle),attrs:{"draggable":_vm.canDragColumn},on:{"click":function($event){$event.stopPropagation();return _vm.sort(column, null, $event)},"dragstart":function($event){return _vm.handleColumnDragStart($event, column, index)},"dragend":function($event){return _vm.handleColumnDragEnd($event, column, index)},"drop":function($event){return _vm.handleColumnDrop($event, column, index)},"dragover":function($event){return _vm.handleColumnDragOver($event, column, index)},"dragleave":function($event){return _vm.handleColumnDragLeave($event, column, index)}}},'th',column.thAttrs(column),false),[_c('div',{staticClass:"th-wrap",class:{
                                'is-numeric': column.numeric,
                                'is-centered': column.centered
                        }},[(column.$scopedSlots && column.$scopedSlots.header)?[_c('gov-slot-component',{attrs:{"component":column,"scoped":"","name":"header","tag":"span","props":{ column: column, index: index }}})]:[_c('span',{staticClass:"is-relative"},[_vm._v(" "+_vm._s(column.label)+" "),(_vm.sortMultiple &&
                                            _vm.sortMultipleDataComputed &&
                                            _vm.sortMultipleDataComputed.length > 0 &&
                                            _vm.sortMultipleDataComputed.filter(function (i) { return i.field === column.field; }).length > 0)?[_c('gov-icon',{class:{
                                                'is-desc': _vm.sortMultipleDataComputed.filter(function (i) { return i.field === column.field; })[0].order === 'desc'},attrs:{"icon":_vm.sortIcon,"pack":_vm.iconPack,"both":"","size":_vm.sortIconSize}}),_vm._v(" "+_vm._s(_vm.findIndexOfSortData(column))+" "),_c('button',{staticClass:"delete is-small multi-sort-cancel-icon",attrs:{"type":"button"},on:{"click":function($event){$event.stopPropagation();return _vm.removeSortingPriority(column)}}})]:_c('gov-icon',{staticClass:"sort-icon",class:{
                                            'is-desc': !_vm.isAsc,
                                            'is-invisible': _vm.currentSortColumn !== column
                                        },attrs:{"icon":_vm.sortIcon,"pack":_vm.iconPack,"both":"","size":_vm.sortIconSize}})],2)]],2)])}),(_vm.checkable && _vm.checkboxPosition === 'right')?_c('th',{class:['checkbox-cell', { 'is-sticky': _vm.stickyCheckbox } ]},[(_vm.headerCheckable)?[_c('gov-checkbox',{attrs:{"autocomplete":"off","value":_vm.isAllChecked,"disabled":_vm.isAllUncheckable},nativeOn:{"change":function($event){return _vm.checkAll($event)}}})]:_vm._e()],2):_vm._e()],2),(_vm.hasCustomSubheadings)?_c('tr',{staticClass:"is-subheading"},[(_vm.showDetailRowIcon)?_c('th',{attrs:{"width":"40px"}}):_vm._e(),(_vm.checkable && _vm.checkboxPosition === 'left')?_c('th'):_vm._e(),_vm._l((_vm.visibleColumns),function(column,index){return _c('th',{key:column.newKey + ':' + index + 'subheading',style:(column.style)},[_c('div',{staticClass:"th-wrap",class:{
                                'is-numeric': column.numeric,
                                'is-centered': column.centered
                        }},[(column.$scopedSlots && column.$scopedSlots.subheading)?[_c('gov-slot-component',{attrs:{"component":column,"scoped":"","name":"subheading","tag":"span","props":{ column: column, index: index }}})]:[_vm._v(_vm._s(column.subheading))]],2)])}),(_vm.checkable && _vm.checkboxPosition === 'right')?_c('th'):_vm._e()],2):_vm._e(),(_vm.hasSearchablenewColumns)?_c('tr',[(_vm.showDetailRowIcon)?_c('th',{attrs:{"width":"40px"}}):_vm._e(),(_vm.checkable && _vm.checkboxPosition === 'left')?_c('th'):_vm._e(),_vm._l((_vm.visibleColumns),function(column,index){return _c('th',_vm._b({key:column.newKey + ':' + index + 'searchable',class:{'is-sticky': column.sticky},style:(column.thStyle)},'th',column.thAttrs(column),false),[_c('div',{staticClass:"th-wrap"},[(column.searchable)?[(column.$scopedSlots
                                    && column.$scopedSlots.searchable)?[_c('gov-slot-component',{attrs:{"component":column,"scoped":true,"name":"searchable","tag":"span","props":{ column: column, filters: _vm.filters }}})]:_c('b-input',{attrs:{"type":column.numeric ? 'number' : 'text'},nativeOn:_vm._d({},[_vm.filtersEvent,function($event){return _vm.onFiltersEvent($event)}]),model:{value:(_vm.filters[column.field]),callback:function ($$v) {_vm.$set(_vm.filters, column.field, $$v);},expression:"filters[column.field]"}})]:_vm._e()],2)])}),(_vm.checkable && _vm.checkboxPosition === 'right')?_c('th'):_vm._e()],2):_vm._e()]):_vm._e(),_c('tbody',[_vm._l((_vm.visibleData),function(row,index){return [_c('tr',{key:_vm.customRowKey ? row[_vm.customRowKey] : index,class:[_vm.rowClass(row, index), {
                            'is-selected': _vm.isRowSelected(row, _vm.selected),
                            'is-checked': _vm.isRowChecked(row),
                        }],attrs:{"draggable":_vm.canDragRow},on:{"click":function($event){return _vm.selectRow(row)},"dblclick":function($event){return _vm.$emit('dblclick', row)},"mouseenter":function($event){return _vm.emitEventForRow('mouseenter', $event, row)},"mouseleave":function($event){return _vm.emitEventForRow('mouseleave', $event, row)},"contextmenu":function($event){return _vm.$emit('contextmenu', row, $event)},"dragstart":function($event){return _vm.handleDragStart($event, row, index)},"dragend":function($event){return _vm.handleDragEnd($event, row, index)},"drop":function($event){return _vm.handleDrop($event, row, index)},"dragover":function($event){return _vm.handleDragOver($event, row, index)},"dragleave":function($event){return _vm.handleDragLeave($event, row, index)}}},[(_vm.showDetailRowIcon)?_c('td',{staticClass:"chevron-cell"},[(_vm.hasDetailedVisible(row))?_c('a',{attrs:{"role":"button"},on:{"click":function($event){$event.stopPropagation();return _vm.toggleDetails(row)}}},[_c('gov-icon',{class:{'is-expanded': _vm.isVisibleDetailRow(row)},attrs:{"icon":_vm.detailIcon,"pack":_vm.iconPack,"both":""}})],1):_vm._e()]):_vm._e(),(_vm.checkable && _vm.checkboxPosition === 'left')?_c('td',{class:['checkbox-cell', { 'is-sticky': _vm.stickyCheckbox } ]},[_c('gov-checkbox',{attrs:{"autocomplete":"off","disabled":!_vm.isRowCheckable(row),"value":_vm.isRowChecked(row)},nativeOn:{"click":function($event){$event.preventDefault();$event.stopPropagation();return _vm.checkRow(row, index, $event)}}})],1):_vm._e(),_vm._l((_vm.visibleColumns),function(column,colindex){return [(column.$scopedSlots && column.$scopedSlots.default)?[_c('gov-slot-component',_vm._b({key:column.newKey + ':' + index + ':' + colindex,class:column.getRootClasses(row),style:(column.getRootStyle(row)),attrs:{"component":column,"scoped":"","name":"default","tag":"td","data-label":column.label,"props":{ row: row, column: column, index: index, colindex: colindex, toggleDetails: _vm.toggleDetails }},nativeOn:{"click":function($event){return _vm.$emit('cellclick',row,column,index,colindex)}}},'gov-slot-component',column.tdAttrs(row, column),false))]:_vm._e()]}),(_vm.checkable && _vm.checkboxPosition === 'right')?_c('td',{class:['checkbox-cell', { 'is-sticky': _vm.stickyCheckbox } ]},[_c('gov-checkbox',{attrs:{"autocomplete":"off","disabled":!_vm.isRowCheckable(row),"value":_vm.isRowChecked(row)},nativeOn:{"click":function($event){$event.preventDefault();$event.stopPropagation();return _vm.checkRow(row, index, $event)}}})],1):_vm._e()],2),_c('transition',{key:(_vm.customRowKey ? row[_vm.customRowKey] : index) + 'detail',attrs:{"name":_vm.detailTransition}},[(_vm.isActiveDetailRow(row))?_c('tr',{staticClass:"detail"},[_c('td',{attrs:{"colspan":_vm.columnCount}},[_c('div',{staticClass:"detail-container"},[_vm._t("detail",null,{"row":row,"index":index})],2)])]):_vm._e()]),(_vm.isActiveCustomDetailRow(row))?_vm._t("detail",null,{"row":row,"index":index}):_vm._e()]}),(!_vm.visibleData.length)?_c('tr',{staticClass:"is-empty"},[_c('td',{attrs:{"colspan":_vm.columnCount}},[_vm._t("empty")],2)]):_vm._e()],2),(_vm.$slots.footer !== undefined)?_c('tfoot',[_c('tr',{staticClass:"table-footer"},[(_vm.hasCustomFooterSlot())?_vm._t("footer"):_c('th',{attrs:{"colspan":_vm.columnCount}},[_vm._t("footer")],2)],2)]):_vm._e()])])],2)};
var __vue_staticRenderFns__$i = [];

  /* style */
  const __vue_inject_styles__$k = undefined;
  /* scoped */
  const __vue_scope_id__$k = undefined;
  /* module identifier */
  const __vue_module_identifier__$k = undefined;
  /* functional template */
  const __vue_is_functional_template__$k = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$k = /*#__PURE__*/normalizeComponent_1(
    { render: __vue_render__$i, staticRenderFns: __vue_staticRenderFns__$i },
    __vue_inject_styles__$k,
    __vue_script__$k,
    __vue_scope_id__$k,
    __vue_is_functional_template__$k,
    __vue_module_identifier__$k,
    false,
    undefined,
    undefined,
    undefined
  );

var Plugin$e = {
  install: function install(Vue) {
    // individual import + extend method into Table.vue
    if (typeof VueInstance === 'undefined') {
      setVueInstance(Vue);
    }

    registerComponent(Vue, __vue_component__$k);
    registerComponent(Vue, __vue_component__$j);
  }
};
use(Plugin$e);

//
var script$l = {
  name: 'GovRadio',
  mixins: [CheckRadioMixin],
  data: function data() {
    return {
      _isCustom: true
    };
  }
};

/* script */
const __vue_script__$l = script$l;

/* template */
var __vue_render__$j = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"gov-form-group__item"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"input",staticClass:"gov-form-control__radio",attrs:{"type":"radio","id":_vm.uniqueId,"disabled":_vm.disabled,"required":_vm.required,"name":_vm.name},domProps:{"value":_vm.nativeValue,"checked":_vm._q(_vm.computedValue,_vm.nativeValue)},on:{"click":function($event){$event.stopPropagation();},"change":function($event){_vm.computedValue=_vm.nativeValue;}}}),_c('label',{ref:"label",staticClass:"gov-form-control__label",attrs:{"for":_vm.uniqueId,"disabled":_vm.disabled},on:{"click":_vm.focus,"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.$refs.label.click()}}},[_vm._t("default")],2),_c('span',{staticClass:"gov-form-control__indicator"})])};
var __vue_staticRenderFns__$j = [];

  /* style */
  const __vue_inject_styles__$l = undefined;
  /* scoped */
  const __vue_scope_id__$l = undefined;
  /* module identifier */
  const __vue_module_identifier__$l = undefined;
  /* functional template */
  const __vue_is_functional_template__$l = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$l = /*#__PURE__*/normalizeComponent_1(
    { render: __vue_render__$j, staticRenderFns: __vue_staticRenderFns__$j },
    __vue_inject_styles__$l,
    __vue_script__$l,
    __vue_scope_id__$l,
    __vue_is_functional_template__$l,
    __vue_module_identifier__$l,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$m = {
  name: 'GovRadioContainer',
  mixins: [FormErrorMixin],
  props: {
    inline: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: function data() {
    return {
      _isCustom: true
    };
  }
};

/* script */
const __vue_script__$m = script$m;

/* template */
var __vue_render__$k = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"gov-form-group",class:{'gov-form-group--inline': _vm.inline}},[_vm._t("default")],2)};
var __vue_staticRenderFns__$k = [];

  /* style */
  const __vue_inject_styles__$m = undefined;
  /* scoped */
  const __vue_scope_id__$m = undefined;
  /* module identifier */
  const __vue_module_identifier__$m = undefined;
  /* functional template */
  const __vue_is_functional_template__$m = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$m = /*#__PURE__*/normalizeComponent_1(
    { render: __vue_render__$k, staticRenderFns: __vue_staticRenderFns__$k },
    __vue_inject_styles__$m,
    __vue_script__$m,
    __vue_scope_id__$m,
    __vue_is_functional_template__$m,
    __vue_module_identifier__$m,
    false,
    undefined,
    undefined,
    undefined
  );

var Plugin$f = {
  install: function install(Vue) {
    registerComponent(Vue, __vue_component__$l);
    registerComponent(Vue, __vue_component__$m);
  }
};
use(Plugin$f);



var components = /*#__PURE__*/Object.freeze({
    Autocomplete: Plugin$5,
    Badge: Plugin,
    Breadcrumb: Plugin$1,
    Button: Plugin$2,
    Checkbox: Plugin$3,
    Accordion: Plugin$4,
    Sidemenu: Plugin$9,
    Field: Plugin$6,
    Icon: Plugin$7,
    Input: Plugin$8,
    Select: Plugin$a,
    Multiselect: Plugin$b,
    Switch: Plugin$c,
    Tabs: Plugin$d,
    Table: Plugin$e,
    Radio: Plugin$f
});

var ConfigComponent = {
  getOptions: function getOptions() {
    return config;
  },
  setOptions: function setOptions$1(options) {
    setOptions(merge(config, options, true));
  }
};

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
export { Plugin$4 as Accordion, Plugin$5 as Autocomplete, Plugin as Badge, Plugin$1 as Breadcrumb, Plugin$2 as Button, Plugin$3 as Checkbox, ConfigComponent as ConfigProgrammatic, Plugin$6 as Field, Plugin$7 as Icon, Plugin$8 as Input, Plugin$b as Multiselect, Plugin$f as Radio, Plugin$a as Select, Plugin$9 as Sidemenu, Plugin$c as Switch, Plugin$e as Table, Plugin$d as Tabs, bound, createAbsoluteElement, createNewEvent, escapeRegExpChars, getMonthNames, getValueByPath, getWeekdayNames, hasFlag, indexOf, isCustomElement, isDefined, isMobile, isSingleValue, isVueComponent, isWebpSupported, makeid, matchWithGroups, merge, mod, multiColumnSort, removeDiacriticsFromString, removeElement, returnAsArray, sign, toCssWidth };
