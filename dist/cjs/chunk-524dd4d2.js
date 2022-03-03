'use strict';

var __chunk_1 = require('./chunk-459e6915.js');
var __chunk_5 = require('./chunk-44453c65.js');

//
var script = {
  name: 'GovCheckbox',
  mixins: [__chunk_5.CheckRadioMixin],
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

exports.Checkbox = __vue_component__;
