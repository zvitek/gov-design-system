/*! Gov v0.1.0 | MIT License | github.com/gov/gov */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.Multiselect = {}));
}(this, function (exports) { 'use strict';

  /**
   * Get value of an object property/path even if it's nested
   */

  function getValueByPath(obj, path) {
    return path.split('.').reduce(function (o, i) {
      return o ? o[i] : null;
    }, obj);
  }
  function isVueComponent(c) {
    return c && c._isVue;
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

  //
  var script = {
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
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('gov-field',{attrs:{"label":_vm.label}},[_c('gov-autocomplete',{attrs:{"disabled":_vm.disabled,"data":_vm.filteredDataArray,"clear-on-select":_vm.clearOnSelect,"open-on-focus":_vm.openOnFocus,"keep-open":_vm.keepOpen,"field":_vm.searchField},on:{"select":function (option) { return _vm.selected = option; }},scopedSlots:_vm._u([{key:"empty",fn:function(){return [_vm._v("No results found")]},proxy:true}]),model:{value:(_vm.name),callback:function ($$v) {_vm.name=$$v;},expression:"name"}}),(_vm.selectedState.length)?_c('ul',{staticClass:"gov-multiselect__tags"},_vm._l((_vm.selectedState),function(item,index){return _c('li',{key:index,staticClass:"gov-multiselect__tag"},[_c('span',[_vm._v(_vm._s(_vm.getValue(item)))]),_c('button',{staticClass:"gov-button--icon-only",attrs:{"type":"button","aria-label":"Odebrat"},on:{"click":function($event){$event.preventDefault();return _vm.remove(index)}}})])}),0):_vm._e()],1)};
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

  var Plugin = {
    install: function install(Vue) {
      registerComponent(Vue, __vue_component__);
    }
  };
  use(Plugin);

  exports.GovMultiselect = __vue_component__;
  exports.default = Plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
