import { _ as __vue_normalize__, r as registerComponent, u as use } from './chunk-000033c2.js';
import { c as config } from './chunk-c8bb346c.js';

//
//
//
//
//
//
var script = {
  name: 'GovBreadcrumb'
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{staticClass:"gov-breadcrumbs"},[_vm._t("default")],2)};
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
  

  
  const __vue_component__ = /*#__PURE__*/__vue_normalize__(
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
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"gov-breadcrumbs__item"},[_c(_vm.computedTag,_vm._g(_vm._b({tag:"component",class:_vm.computedClasses},'component',_vm.$attrs,false),_vm.$listeners),[_vm._t("default")],2)],1)};
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
  

  
  const __vue_component__$1 = /*#__PURE__*/__vue_normalize__(
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

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, __vue_component__);
    registerComponent(Vue, __vue_component__$1);
  }
};
use(Plugin);

export default Plugin;
export { __vue_component__ as GovBreadcrumb, __vue_component__$1 as GovBreadcrumbItem };
