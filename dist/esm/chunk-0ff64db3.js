import { _ as __vue_normalize__ } from './chunk-000033c2.js';
import { c as config } from './chunk-c8bb346c.js';
import { F as FormElementMixin } from './chunk-57016ae0.js';

var InputMixin = {
  mixins: [FormElementMixin],
  inheritAttrs: false,
  props: {
    value: [Number, String],
    type: {
      type: String,
      default: 'text'
    },
    lazy: {
      type: Boolean,
      default: false
    },
    whisperer: {
      type: Boolean,
      default: false
    },
    customClass: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      newValue: this.value,
      enforceEmptyValue: false,
      _elementRef: 'input'
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

    /**
    * Get value length
    */
    valueLength: function valueLength() {
      if (typeof this.computedValue === 'string') {
        return this.computedValue.length;
      } else if (typeof this.computedValue === 'number') {
        return this.computedValue.toString().length;
      }

      return 0;
    }
  },
  watch: {
    /**
    * When v-model is changed:
    *   1. Set internal value.
    */
    value: function value(_value) {
      this.newValue = _value;
      this.calculateNotEmpty();
    }
  },
  methods: {
    onInput: function onInput(event) {
      if (!this.lazy) {
        var value = event.target.value;
        this.updateValue(value);
      }
    },
    onChange: function onChange(event) {
      if (this.lazy) {
        var value = event.target.value;
        this.updateValue(value);
      }
    },
    newOnBlur: function newOnBlur(event) {
      this.onBlur(event);
      this.calculateNotEmpty();
    },
    newOnFocus: function newOnFocus(event) {
      this.onFocus(event);
      this.calculateNotEmpty();
    },
    updateValue: function updateValue(value) {
      this.computedValue = value;
    },
    calculateNotEmpty: function calculateNotEmpty() {
      this.setNotEmpty(this.isFocused || this.valueLength || this.enforceEmptyValue);
    }
  },
  mounted: function mounted() {
    this.calculateNotEmpty();
  }
};

//
var script = {
  name: 'GovInput',
  mixins: [InputMixin, FormElementMixin],
  computed: {
    newAutocomplete: function newAutocomplete() {
      return this.autocomplete || config.defaultInputAutocomplete;
    }
  },
  watch: {
    type: function type() {
      this.resolveNativeTypes();
    }
  },
  methods: {
    resolveNativeTypes: function resolveNativeTypes() {
      if (['date', 'time'].indexOf(this.type) !== -1) {
        this.enforceEmptyValue = true;
        this.calculateNotEmpty();
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      if (!_this.whisperer) return;

      _this.$refs.input.addEventListener('blur', function () {
        _this.isFocused = false;

        _this.calculateNotEmpty();
      });
    });
    this.resolveNativeTypes();
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('input',_vm._b({ref:"input",staticClass:"gov-form-control__input",class:[_vm.customClass],attrs:{"type":_vm.type,"autocomplete":_vm.newAutocomplete,"maxlength":_vm.maxlength,"id":_vm.uniqueId},domProps:{"value":_vm.computedValue},on:{"input":_vm.onInput,"change":_vm.onChange,"blur":_vm.newOnBlur,"focus":_vm.newOnFocus}},'input',_vm.$attrs,false))};
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

export { __vue_component__ as I, InputMixin as a };
