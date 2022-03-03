import { _ as __vue_normalize__, r as registerComponent, u as use } from './chunk-000033c2.js';
import { c as config } from './chunk-c8bb346c.js';

//
//
//
//
//
//
//
//
var script = {
  name: 'GovSideMenu',
  props: {
    complex: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      _isMenu: true // Used by MenuItem

    };
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{staticClass:"gov-sidenav",class:{'gov-sidenav--complex': _vm.complex}},[_vm._t("default")],2)};
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
  name: 'GovSideMenuItem',
  inheritAttrs: false,
  model: {
    prop: 'active',
    event: 'update:active'
  },
  props: {
    label: String,
    active: Boolean,
    tag: {
      type: String,
      default: 'a',
      validator: function validator(value) {
        return config.defaultLinkTags.indexOf(value) >= 0;
      }
    },
    ariaRole: {
      type: String,
      default: ''
    }
  },
  computed: {
    ariaRoleMenu: function ariaRoleMenu() {
      return this.ariaRole === 'menuitem' ? this.ariaRole : null;
    }
  },
  methods: {
    onClick: function onClick(event) {
      if (this.disabled) return;
      this.$emit('update:active', event);
    }
  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"gov-sidenav__item",attrs:{"role":_vm.ariaRoleMenu}},[_c(_vm.tag,_vm._g(_vm._b({tag:"component",class:{
            'gov-sidenav__link': true,
        },on:{"click":function($event){return _vm.onClick($event)}}},'component',_vm.$attrs,false),_vm.$listeners),[_vm._t("icon"),(_vm.label)?_c('span',[_vm._v(_vm._s(_vm.label))]):_vm._e(),_vm._t("badge")],2)],1)};
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
export { __vue_component__ as GovSideMenu, __vue_component__$1 as GovSideMenuItem };
