import { _ as __vue_normalize__, r as registerComponent, u as use } from './chunk-000033c2.js';
import { F as FormErrorMixin } from './chunk-3ab30214.js';
import './chunk-6ea13200.js';
import './helpers.js';
import { C as CheckRadioMixin } from './chunk-1ed1df71.js';

//
var script = {
  name: 'GovRadio',
  mixins: [CheckRadioMixin],
  data: function data() {
    return {
      _isCustom: true
    };
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"gov-form-group__item"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"input",staticClass:"gov-form-control__radio",attrs:{"type":"radio","id":_vm.uniqueId,"disabled":_vm.disabled,"required":_vm.required,"name":_vm.name},domProps:{"value":_vm.nativeValue,"checked":_vm._q(_vm.computedValue,_vm.nativeValue)},on:{"click":function($event){$event.stopPropagation();},"change":function($event){_vm.computedValue=_vm.nativeValue;}}}),_c('label',{ref:"label",staticClass:"gov-form-control__label",attrs:{"for":_vm.uniqueId,"disabled":_vm.disabled},on:{"click":_vm.focus,"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.$refs.label.click()}}},[_vm._t("default")],2),_c('span',{staticClass:"gov-form-control__indicator"})])};
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
  name: 'GovRadioContainer',
  mixins: [FormErrorMixin],
  props: {
    inline: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: function data() {
    return {
      _isCustom: true
    };
  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"gov-form-group",class:{'gov-form-group--inline': _vm.inline}},[_vm._t("default")],2)};
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
export { __vue_component__ as GovRadio, __vue_component__$1 as GovRadioContainer };
