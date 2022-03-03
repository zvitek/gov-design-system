'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_1 = require('./chunk-459e6915.js');
var __chunk_2 = require('./chunk-f9ad6937.js');

//
var script = {
  name: 'GovButton',
  inheritAttrs: false,
  props: {
    type: [String, Object],
    size: String,
    label: String,
    primaryOutlined: Boolean,
    primary: Boolean,
    inversed: Boolean,
    small: Boolean,
    large: Boolean,
    active: Boolean,
    nativeType: {
      type: String,
      default: 'button',
      validator: function validator(value) {
        return ['button', 'submit', 'reset'].indexOf(value) >= 0;
      }
    },
    tag: {
      type: String,
      default: 'button',
      validator: function validator(value) {
        return __chunk_2.config.defaultLinkTags.indexOf(value) >= 0;
      }
    }
  },
  computed: {
    computedTag: function computedTag() {
      var disabled = this.$attrs.disabled;

      if (disabled !== undefined && disabled !== false) {
        return 'button';
      }

      return this.tag;
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.computedTag,_vm._g(_vm._b({tag:"component",staticClass:"gov-button",class:[_vm.size, _vm.type, {
        'gov-button--primary': _vm.primary,
        'gov-button--primary-outlined': _vm.primaryOutlined,
        'gov-button--inversed': _vm.inversed,
        'gov-button--large': _vm.large,
        'gov-button--small': _vm.small,
        'gov-button--is-active': _vm.active,
    }],attrs:{"type":_vm.nativeType}},'component',_vm.$attrs,false),_vm.$listeners),[(_vm.label)?[_vm._v(_vm._s(_vm.label))]:(_vm.$slots.default)?[_vm._t("default")]:_vm._e()],2)};
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

exports.GovButton = __vue_component__;
exports.default = Plugin;
