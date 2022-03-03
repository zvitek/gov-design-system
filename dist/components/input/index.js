/*! Gov v0.1.0 | MIT License | github.com/gov/gov */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.Input = {}));
}(this, function (exports) { 'use strict';

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

  var config = {
    defaultContainerElement: null,
    defaultIconPack: 'mdi',
    defaultIconComponent: null,
    defaultInputAutocomplete: 'on',
    defaultLinkTags: ['a', 'button', 'input', 'router-link', 'nuxt-link', 'n-link', 'RouterLink', 'NuxtLink', 'NLink'],
    defaultBreadcrumbTag: 'a',
    customIconPacks: null
  };

  //
  var script = {
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
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('input',_vm._b({ref:"input",staticClass:"gov-form-control__input",class:[_vm.customClass],attrs:{"type":_vm.type,"autocomplete":_vm.newAutocomplete,"maxlength":_vm.maxlength,"id":_vm.uniqueId},domProps:{"value":_vm.computedValue},on:{"input":_vm.onInput,"change":_vm.onChange,"blur":_vm.newOnBlur,"focus":_vm.newOnFocus}},'input',_vm.$attrs,false))};
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

  //
  var script$1 = {
    name: 'GovTextarea',
    mixins: [InputMixin, FormElementMixin]
  };

  /* script */
  const __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('textarea',_vm._b({ref:"input",staticClass:"gov-form-control__input",class:[_vm.customClass],attrs:{"maxlength":_vm.maxlength,"id":_vm.uniqueId},domProps:{"value":_vm.computedValue},on:{"input":_vm.onInput,"change":_vm.onChange,"blur":_vm.newOnBlur,"focus":_vm.newOnFocus}},'textarea',_vm.$attrs,false))};
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
      registerComponent(Vue, __vue_component__$1);
    }
  };
  use(Plugin);

  exports.GovInput = __vue_component__;
  exports.GovTexarea = __vue_component__$1;
  exports.default = Plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
