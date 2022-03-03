'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_1 = require('./chunk-459e6915.js');
require('./chunk-f9ad6937.js');
require('./chunk-44abe813.js');
require('./chunk-5094d8df.js');
require('./helpers.js');
var __chunk_7 = require('./chunk-6815e880.js');
var __chunk_8 = require('./chunk-035d0231.js');

//
var script = {
  name: 'GovTextarea',
  mixins: [__chunk_8.InputMixin, __chunk_7.FormElementMixin]
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

var Plugin = {
  install: function install(Vue) {
    __chunk_1.registerComponent(Vue, __chunk_8.Input);
    __chunk_1.registerComponent(Vue, __vue_component__);
  }
};
__chunk_1.use(Plugin);

exports.GovInput = __chunk_8.Input;
exports.GovTexarea = __vue_component__;
exports.default = Plugin;
