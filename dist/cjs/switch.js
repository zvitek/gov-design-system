'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_1 = require('./chunk-459e6915.js');
var __chunk_3 = require('./chunk-44abe813.js');

//
var script = {
  name: 'GovSwitch',
  mixins: [__chunk_3.FormErrorMixin],
  props: {
    value: [String, Number, Boolean, Function, Object, Array, Date],
    nativeValue: [String, Number, Boolean, Function, Object, Array, Date],
    disabled: Boolean,
    name: String,
    required: Boolean,
    ariaLabelledby: String,
    trueValue: {
      type: [String, Number, Boolean, Function, Object, Array, Date],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean, Function, Object, Array, Date],
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      newValue: this.value,
      isMouseDown: false,
      _isSwitch: true
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
    showControlLabel: function showControlLabel() {
      return !!this.$slots.default;
    }
  },
  watch: {
    /**
    * When v-model change, set internal value.
    */
    value: function value(_value) {
      this.newValue = _value;
    }
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
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"input",staticClass:"gov-form-control__toggle",attrs:{"type":"checkbox","disabled":_vm.disabled,"name":_vm.name,"required":_vm.required,"true-value":_vm.trueValue,"false-value":_vm.falseValue,"aria-labelledby":_vm.ariaLabelledby},domProps:{"checked":_vm.computedValue === _vm.trueValue,"value":_vm.nativeValue,"checked":Array.isArray(_vm.computedValue)?_vm._i(_vm.computedValue,_vm.nativeValue)>-1:_vm._q(_vm.computedValue,_vm.trueValue)},on:{"change":function($event){var $$a=_vm.computedValue,$$el=$event.target,$$c=$$el.checked?(_vm.trueValue):(_vm.falseValue);if(Array.isArray($$a)){var $$v=_vm.nativeValue,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.computedValue=$$a.concat([$$v]));}else{$$i>-1&&(_vm.computedValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.computedValue=$$c;}}}}),_c('label',{ref:"label",staticClass:"gov-form-control__label",attrs:{"disabled":_vm.disabled,"id":_vm.ariaLabelledby},on:{"click":_vm.focus,"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.$refs.label.click()},"mousedown":function($event){_vm.isMouseDown = true;},"mouseup":function($event){_vm.isMouseDown = false;},"mouseout":function($event){_vm.isMouseDown = false;},"blur":function($event){_vm.isMouseDown = false;}}},[(_vm.showControlLabel)?[_vm._t("default")]:_vm._e()],2),_c('span',{staticClass:"gov-form-control__indicator"})])};
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
    __chunk_1.registerComponent(Vue, __vue_component__);
  }
};
__chunk_1.use(Plugin);

exports.GovSwitch = __vue_component__;
exports.default = Plugin;
