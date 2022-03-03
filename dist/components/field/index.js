/*! Gov v0.1.0 | MIT License | github.com/gov/gov */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.Field = {}));
}(this, function (exports) { 'use strict';

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
    var script = {
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
    var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gov-form-control",class:{
            'gov-form-control--error': _vm.error || _vm.errorMessage,
            'gov-form-control--custom': _vm.custom,
            'not-empty': _vm.notEmpty}},[_c('div',{class:{'gov-select': _vm.select}},[_vm._t("default"),(_vm.hasLabel)?_c('label',{staticClass:"gov-form-control__label",attrs:{"for":_vm.uniqueId}},[(_vm.$slots.label)?_vm._t("label"):[_vm._v(" "+_vm._s(_vm.label)+" ")]],2):_vm._e(),(_vm.hasMessage)?_c('span',{staticClass:"gov-form-control__message"},[(_vm.$slots.message)?_vm._t("message"):[_vm._l((_vm.formattedMessage),function(mess,i){return [_vm._v(" "+_vm._s(mess)+" "),((i + 1) < _vm.formattedMessage.length)?_c('br',{key:i}):_vm._e()]})]],2):_vm._e()],2)])};
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

    exports.GovField = __vue_component__;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
