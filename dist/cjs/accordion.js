'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_1 = require('./chunk-459e6915.js');
require('./chunk-5094d8df.js');
var helpers = require('./helpers.js');

//
var script = {
  name: 'GovAccordionItem',
  model: {
    prop: 'open',
    event: 'update:open'
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    ariaId: {
      type: String,
      required: false,
      default: null
    },
    label: {
      type: String,
      required: true
    },
    noBorder: {
      type: Boolean,
      required: false
    }
  },
  data: function data() {
    return {
      isOpen: this.open,
      uniqueId: null
    };
  },
  watch: {
    open: function open(value) {
      this.isOpen = value;
    }
  },
  methods: {
    /**
     * Toggle and emit events
     */
    toggle: function toggle() {
      this.isOpen = !this.isOpen;
      this.$emit('update:open', this.isOpen);
      this.$emit(this.isOpen ? 'open' : 'close');
    }
  },
  mounted: function mounted() {
    this.uniqueId = this.ariaId || 'accordion_' + helpers.makeid();
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('button',{staticClass:"gov-accordion__header",class:{
            'is-expanded': _vm.isOpen,
            'gov-accordion__header--noborder': _vm.noBorder},attrs:{"id":_vm.uniqueId,"aria-expanded":_vm.isOpen},on:{"click":_vm.toggle}},[_c('h3',[_vm._t("icon"),_vm._v(" "+_vm._s(_vm.label)+" ")],2)]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isOpen),expression:"isOpen"}],staticClass:"gov-accordion__content",class:{
        'is-expanded': _vm.isOpen},attrs:{"aria-labelledby":_vm.uniqueId,"tabindex":"-1"}},[_c('div',{staticClass:"gov-accordion__content-inner"},[_vm._t("default")],2)])])};
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
var script$1 = {
  name: 'GovAccordion',
  props: {
    small: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    noInnerOffset: {
      type: Boolean,
      default: false
    }
  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gov-accordion",class:{
        'gov-accordion--large': _vm.large,
        'gov-accordion--no-inner-offset': _vm.noInnerOffset,
        'gov-accordion--small': _vm.small}},[_vm._t("default")],2)};
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
    __chunk_1.registerComponent(Vue, __vue_component__$1);
    __chunk_1.registerComponent(Vue, __vue_component__);
  }
};
__chunk_1.use(Plugin);

exports.GovAccordion = __vue_component__$1;
exports.GovAccordionItem = __vue_component__;
exports.default = Plugin;
