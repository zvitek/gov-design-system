/*! Gov v0.1.0 | MIT License | github.com/gov/gov */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.Sidemenu = {}));
}(this, function (exports) { 'use strict';

    //
    //
    //
    //
    //
    //
    //
    //
    var script = {
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
    var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{staticClass:"gov-sidenav",class:{'gov-sidenav--complex': _vm.complex}},[_vm._t("default")],2)};
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
    var script$1 = {
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
    const __vue_script__$1 = script$1;

    /* template */
    var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"gov-sidenav__item",attrs:{"role":_vm.ariaRoleMenu}},[_c(_vm.tag,_vm._g(_vm._b({tag:"component",class:{
                'gov-sidenav__link': true,
            },on:{"click":function($event){return _vm.onClick($event)}}},'component',_vm.$attrs,false),_vm.$listeners),[_vm._t("icon"),(_vm.label)?_c('span',[_vm._v(_vm._s(_vm.label))]):_vm._e(),_vm._t("badge")],2)],1)};
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

    exports.GovSideMenu = __vue_component__;
    exports.GovSideMenuItem = __vue_component__$1;
    exports.default = Plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
