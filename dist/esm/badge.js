import { _ as __vue_normalize__, r as registerComponent, u as use } from './chunk-000033c2.js';

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

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, __vue_component__);
  }
};
use(Plugin);

export default Plugin;
export { __vue_component__ as GovBadge };
