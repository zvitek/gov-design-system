'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_1 = require('./chunk-459e6915.js');
var __chunk_2 = require('./chunk-f9ad6937.js');

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
  

  
  const __vue_component__ = /*#__PURE__*/__chunk_1.__vue_normalize__(
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
        return __chunk_2.config.defaultBreadcrumbTag;
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
  

  
  const __vue_component__$1 = /*#__PURE__*/__chunk_1.__vue_normalize__(
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
    __chunk_1.registerComponent(Vue, __vue_component__);
    __chunk_1.registerComponent(Vue, __vue_component__$1);
  }
};
__chunk_1.use(Plugin);

exports.GovBreadcrumb = __vue_component__;
exports.GovBreadcrumbItem = __vue_component__$1;
exports.default = Plugin;
