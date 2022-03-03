import { _ as __vue_normalize__, r as registerComponent, u as use } from './chunk-000033c2.js';
import './chunk-3ab30214.js';
import './chunk-6ea13200.js';
import './helpers.js';
import { F as FormElementMixin } from './chunk-57016ae0.js';

//
var script = {
  name: 'GovSelect',
  mixins: [FormElementMixin],
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number, Boolean, Object, Array, Function, Date],
      default: null
    },
    placeholder: String,
    multiple: Boolean
  },
  data: function data() {
    return {
      selected: this.value,
      _elementRef: 'select',
      _isSelect: true
    };
  },
  computed: {
    computedValue: {
      get: function get() {
        return this.selected;
      },
      set: function set(value) {
        this.selected = value;
        this.$emit('input', value);
        this.calculateNotEmpty();
      }
    }
  },
  watch: {
    /**
    * When v-model is changed:
    *   1. Set the selected option.
    *   2. If it's invalid, validate again.
    */
    value: function value(_value) {
      this.selected = _value;
    }
  },
  methods: {
    calculateNotEmpty: function calculateNotEmpty() {
      this.setNotEmpty(this.isFocused || this.selected);
    }
  },
  mounted: function mounted() {
    this.calculateNotEmpty();
    var option = this.$refs.select.querySelector('option:first-of-type');

    if (option && String(option.textContent).length) {
      this.setNotEmpty(true);
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('select',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"select",attrs:{"id":_vm.uniqueId,"multiple":_vm.multiple},on:{"blur":_vm.onBlur,"focus":_vm.onFocus,"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.computedValue=$event.target.multiple ? $$selectedVal : $$selectedVal[0];}}},'select',_vm.$attrs,false),[(_vm.placeholder)?[(_vm.computedValue == null)?_c('option',{attrs:{"disabled":"","hidden":""},domProps:{"value":null}},[_vm._v(" "+_vm._s(_vm.placeholder)+" ")]):_vm._e()]:_vm._e(),_vm._t("default")],2)};
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
export { __vue_component__ as GovSelect };
