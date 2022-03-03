/*! Gov v0.1.0 | MIT License | github.com/gov/gov */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.Checkbox = {}));
}(this, function (exports) { 'use strict';

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

    exports.GovCheckbox = __vue_component__;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
