/*! Gov v0.1.0 | MIT License | github.com/gov/gov */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.Table = {}));
}(this, function (exports) { 'use strict';

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
  function toCssWidth(width) {
    return width === undefined ? null : isNaN(width) ? width : width + 'px';
  }
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

  var config = {
    defaultContainerElement: null,
    defaultIconPack: 'mdi',
    defaultIconComponent: null,
    defaultInputAutocomplete: 'on',
    defaultLinkTags: ['a', 'button', 'input', 'router-link', 'nuxt-link', 'n-link', 'RouterLink', 'NuxtLink', 'NLink'],
    defaultBreadcrumbTag: 'a',
    customIconPacks: null
  };
  var setVueInstance = function setVueInstance(Vue) {
    VueInstance = Vue;
  };
  var VueInstance;

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
  var script = {
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
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"input",staticClass:"gov-form-control__checkbox",attrs:{"type":"checkbox","autocomplete":_vm.autocomplete,"disabled":_vm.disabled,"required":_vm.required,"name":_vm.name,"id":_vm.uniqueId,"true-value":_vm.trueValue,"false-value":_vm.falseValue,"aria-labelledby":_vm.ariaLabelledby},domProps:{"indeterminate":_vm.indeterminate,"checked":_vm.computedValue === _vm.trueValue,"value":_vm.nativeValue,"checked":Array.isArray(_vm.computedValue)?_vm._i(_vm.computedValue,_vm.nativeValue)>-1:_vm._q(_vm.computedValue,_vm.trueValue)},on:{"click":function($event){$event.stopPropagation();},"change":function($event){var $$a=_vm.computedValue,$$el=$event.target,$$c=$$el.checked?(_vm.trueValue):(_vm.falseValue);if(Array.isArray($$a)){var $$v=_vm.nativeValue,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.computedValue=$$a.concat([$$v]));}else{$$i>-1&&(_vm.computedValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.computedValue=$$c;}}}}),_c('label',{ref:"label",staticClass:"gov-form-control__label",attrs:{"for":_vm.uniqueId,"id":_vm.ariaLabelledby,"disabled":_vm.disabled},on:{"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.$refs.label.click()}}},[_vm._t("default")],2),_c('span',{staticClass:"gov-form-control__indicator"})])};
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
  var script$1 = {
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
  const __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.gov || _vm.govComplex)?_c('span',{class:[_vm.newPack, _vm.newIcon]}):_c('span',{staticClass:"icon",class:[_vm.size]},[(!_vm.useIconComponent)?_c('i',{class:[_vm.newPack, _vm.newIcon, _vm.newCustomSize, _vm.customClass]}):_c(_vm.useIconComponent,{tag:"component",class:[_vm.customClass],attrs:{"icon":[_vm.newPack, _vm.newIcon],"size":_vm.newCustomSize}})],1)};
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
  var script$2 = {
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
  const __vue_script__$2 = script$2;

  /* template */
  var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('input',_vm._b({ref:"input",staticClass:"gov-form-control__input",class:[_vm.customClass],attrs:{"type":_vm.type,"autocomplete":_vm.newAutocomplete,"maxlength":_vm.maxlength,"id":_vm.uniqueId},domProps:{"value":_vm.computedValue},on:{"input":_vm.onInput,"change":_vm.onChange,"blur":_vm.newOnBlur,"focus":_vm.newOnFocus}},'input',_vm.$attrs,false))};
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

  var script$3 = {
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
  const __vue_script__$3 = script$3;

  /* template */

    /* style */
    const __vue_inject_styles__$3 = undefined;
    /* scoped */
    const __vue_scope_id__$3 = undefined;
    /* module identifier */
    const __vue_module_identifier__$3 = undefined;
    /* functional template */
    const __vue_is_functional_template__$3 = undefined;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$3 = /*#__PURE__*/normalizeComponent_1(
      {},
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

  var _components;
  var script$4 = {
    name: 'GovTable',
    components: (_components = {}, _defineProperty(_components, __vue_component__.name, __vue_component__), _defineProperty(_components, __vue_component__$1.name, __vue_component__$1), _defineProperty(_components, __vue_component__$2.name, __vue_component__$2), _defineProperty(_components, SlotComponent.name, SlotComponent), _defineProperty(_components, __vue_component__$3.name, __vue_component__$3), _components),
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
            var TableColumnComponent = VueInstance.extend(__vue_component__$3);
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
  const __vue_script__$4 = script$4;

  /* template */
  var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gov-table"},[_vm._t("default"),_c('div',{staticClass:"gov-table-cover",class:_vm.tableWrapperClasses,style:(_vm.tableStyle)},[_c('table',{staticClass:"gov-table gov-table--mobile-block",class:_vm.tableClasses,attrs:{"tabindex":!_vm.focusable ? false : 0},on:{"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }if($event.target !== $event.currentTarget){ return null; }$event.preventDefault();return _vm.pressedArrow(-1)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }if($event.target !== $event.currentTarget){ return null; }$event.preventDefault();return _vm.pressedArrow(1)}]}},[(_vm.caption)?_c('caption',{directives:[{name:"show",rawName:"v-show",value:(_vm.showCaption),expression:"showCaption"}]},[_vm._v(_vm._s(_vm.caption))]):_vm._e(),(_vm.newColumns.length && _vm.showHeader)?_c('thead',[_c('tr',[(_vm.showDetailRowIcon)?_c('th',{attrs:{"width":"40px"}}):_vm._e(),(_vm.checkable && _vm.checkboxPosition === 'left')?_c('th',{class:['checkbox-cell', { 'is-sticky': _vm.stickyCheckbox } ]},[(_vm.headerCheckable)?[_c('gov-checkbox',{attrs:{"autocomplete":"off","value":_vm.isAllChecked,"disabled":_vm.isAllUncheckable},nativeOn:{"change":function($event){return _vm.checkAll($event)}}})]:_vm._e()],2):_vm._e(),_vm._l((_vm.visibleColumns),function(column,index){return _c('th',_vm._b({key:column.newKey + ':' + index + 'header',class:[column.thClasses, {
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
  var __vue_staticRenderFns__$3 = [];

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
      { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
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

  var use = function use(plugin) {
    if (typeof window !== 'undefined' && window.Vue) {
      window.Vue.use(plugin);
    }
  };
  var registerComponent = function registerComponent(Vue, component) {
    Vue.component(component.name, component);
  };

  var Plugin = {
    install: function install(Vue) {
      // individual import + extend method into Table.vue
      if (typeof VueInstance === 'undefined') {
        setVueInstance(Vue);
      }

      registerComponent(Vue, __vue_component__$4);
      registerComponent(Vue, __vue_component__$3);
    }
  };
  use(Plugin);

  exports.GovTable = __vue_component__$4;
  exports.GovTableColumn = __vue_component__$3;
  exports.default = Plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
