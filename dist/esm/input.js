import { _ as __vue_normalize__, r as registerComponent, u as use } from './chunk-000033c2.js';
import './chunk-c8bb346c.js';
import './chunk-3ab30214.js';
import './chunk-6ea13200.js';
import './helpers.js';
import { F as FormElementMixin } from './chunk-57016ae0.js';
import { a as InputMixin, I as Input } from './chunk-0ff64db3.js';
export { I as GovInput } from './chunk-0ff64db3.js';

//
var script = {
  name: 'GovTextarea',
  mixins: [InputMixin, FormElementMixin]
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('textarea',_vm._b({ref:"input",staticClass:"gov-form-control__input",class:[_vm.customClass],attrs:{"maxlength":_vm.maxlength,"id":_vm.uniqueId},domProps:{"value":_vm.computedValue},on:{"input":_vm.onInput,"change":_vm.onChange,"blur":_vm.newOnBlur,"focus":_vm.newOnFocus}},'textarea',_vm.$attrs,false))};
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
    registerComponent(Vue, Input);
    registerComponent(Vue, __vue_component__);
  }
};
use(Plugin);

export default Plugin;
export { __vue_component__ as GovTexarea };
