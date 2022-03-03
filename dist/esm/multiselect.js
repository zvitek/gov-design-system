import { _ as __vue_normalize__, r as registerComponent, u as use } from './chunk-000033c2.js';
import './chunk-3ab30214.js';
import './chunk-6ea13200.js';
import { returnAsArray, isSingleValue, getValueByPath } from './helpers.js';
import { F as FormElementMixin } from './chunk-57016ae0.js';

//
var script = {
  name: 'GovMultiselect',
  mixins: [FormElementMixin],
  props: {
    value: [Array, Number, String],
    data: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      required: false,
      default: null
    },
    searchField: {
      type: String,
      required: false,
      default: null
    },
    uniqueField: {
      type: String,
      required: false,
      default: null
    },
    clearOnSelect: {
      type: Boolean,
      required: false,
      default: true
    },
    openOnFocus: {
      type: Boolean,
      required: false,
      default: false
    },
    multiselect: {
      type: Boolean,
      required: false,
      default: true
    },
    keepOpen: {
      type: Boolean,
      required: false,
      default: false
    },
    customUniqueId: {
      type: [String, Number],
      required: false,
      default: null
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: function data() {
    return {
      name: '',
      selectedState: returnAsArray(this.value),
      selected: null
    };
  },
  computed: {
    filteredDataArray: function filteredDataArray() {
      var _this = this;

      return this.data.filter(function (option) {
        var val = option;

        if (!isSingleValue(option)) {
          val = getValueByPath(option, _this.searchField);
        }

        return val.toString().toLowerCase().indexOf(_this.name.toLowerCase()) >= 0;
      });
    }
  },
  watch: {
    value: function value(newValue) {
      this.selectedState = returnAsArray(newValue);
    },
    selected: function selected(newValue) {
      if (newValue) {
        var value = newValue;

        if (isSingleValue(newValue) === false) {
          value = getValueByPath(newValue, this.uniqueField);
        }

        if (this.isSelected(value) === false) {
          if (this.multiselect) {
            this.selectedState.push(newValue);
          } else {
            this.selectedState = [newValue];
          }
        }
      }
    },
    selectedState: function selectedState() {
      if (this.multiselect) {
        this.$emit('input', this.selectedState);
      } else {
        this.$emit('input', this.selectedState.length ? this.selectedState[0] : null);
      }
    }
  },
  methods: {
    isSelected: function isSelected(current) {
      var _this2 = this;

      return !!this.selectedState.filter(function (item) {
        if (isSingleValue(item)) {
          return item === current;
        } else {
          return getValueByPath(item, _this2.uniqueField) === current;
        }
      }).length;
    },
    getValue: function getValue(option) {
      if (isSingleValue(option)) {
        return option;
      } else {
        return getValueByPath(option, this.searchField);
      }
    },
    remove: function remove(index) {
      if (this.selectedState.hasOwnProperty(index)) {
        this.selectedState.splice(index, 1);
      }

      this.name = '';
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('gov-field',{attrs:{"label":_vm.label}},[_c('gov-autocomplete',{attrs:{"disabled":_vm.disabled,"data":_vm.filteredDataArray,"clear-on-select":_vm.clearOnSelect,"open-on-focus":_vm.openOnFocus,"keep-open":_vm.keepOpen,"field":_vm.searchField},on:{"select":function (option) { return _vm.selected = option; }},scopedSlots:_vm._u([{key:"empty",fn:function(){return [_vm._v("No results found")]},proxy:true}]),model:{value:(_vm.name),callback:function ($$v) {_vm.name=$$v;},expression:"name"}}),(_vm.selectedState.length)?_c('ul',{staticClass:"gov-multiselect__tags"},_vm._l((_vm.selectedState),function(item,index){return _c('li',{key:index,staticClass:"gov-multiselect__tag"},[_c('span',[_vm._v(_vm._s(_vm.getValue(item)))]),_c('button',{staticClass:"gov-button--icon-only",attrs:{"type":"button","aria-label":"Odebrat"},on:{"click":function($event){$event.preventDefault();return _vm.remove(index)}}})])}),0):_vm._e()],1)};
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
export { __vue_component__ as GovMultiselect };
