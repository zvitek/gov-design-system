'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_1 = require('./chunk-459e6915.js');
var __chunk_4 = require('./chunk-5094d8df.js');
var helpers = require('./helpers.js');
var __chunk_10 = require('./chunk-a0a1c199.js');

var items = 1;
var sorted = 3;
var Sorted = sorted;
var ProviderParentMixin = (function (itemName) {
  var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var mixin = {
    provide: function provide() {
      return __chunk_4._defineProperty({}, 'b' + itemName, this);
    }
  };

  if (helpers.hasFlag(flags, items)) {
    mixin.data = function () {
      return {
        childItems: []
      };
    };

    mixin.methods = {
      _registerItem: function _registerItem(item) {
        this.childItems.push(item);
      },
      _unregisterItem: function _unregisterItem(item) {
        this.childItems = this.childItems.filter(function (i) {
          return i !== item;
        });
      }
    };

    if (helpers.hasFlag(flags, sorted)) {
      mixin.watch = {
        /**
         * When items are added/removed deep search in the elements default's slot
         * And mark the items with their index
         */
        childItems: function childItems(items) {
          if (items.length > 0 && this.$scopedSlots.default) {
            var tag = items[0].$vnode.tag;
            var index = 0;

            var deepSearch = function deepSearch(children) {
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                var _loop = function _loop() {
                  var child = _step.value;

                  if (child.tag === tag) {
                    // An item with the same tag will for sure be found
                    var it = items.find(function (i) {
                      return i.$vnode === child;
                    });

                    if (it) {
                      it.index = index++;
                    }
                  } else if (child.tag) {
                    var sub = child.componentInstance ? child.componentInstance.$scopedSlots.default ? child.componentInstance.$scopedSlots.default() : child.componentInstance.$children : child.children;

                    if (Array.isArray(sub) && sub.length > 0) {
                      deepSearch(sub.map(function (e) {
                        return e.$vnode;
                      }));
                    }
                  }
                };

                for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  _loop();
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }

              return false;
            };

            deepSearch(this.$scopedSlots.default());
          }
        }
      };
      mixin.computed = {
        /**
         * When items are added/removed sort them according to their position
         */
        sortedItems: function sortedItems() {
          return this.childItems.slice().sort(function (i1, i2) {
            return i1.index - i2.index;
          });
        }
      };
    }
  }

  return mixin;
});

var TabbedMixin = (function (cmp) {
  return {
    mixins: [ProviderParentMixin(cmp, Sorted)],
    components: __chunk_4._defineProperty({}, __chunk_10.SlotComponent.name, __chunk_10.SlotComponent),
    props: {
      value: {
        type: [String, Number],
        default: undefined
      },
      position: String,
      destroyOnHide: {
        type: Boolean,
        default: false
      }
    },
    data: function data() {
      return {
        activeId: this.value,
        // Internal state
        defaultSlots: [],
        contentHeight: 0,
        isTransitioning: false
      };
    },
    mounted: function mounted() {
      if (typeof this.value === 'number') {
        // Backward compatibility: converts the index value to an id
        var value = helpers.bound(this.value, 0, this.items.length - 1);
        this.activeId = this.items[value].value;
      } else {
        this.activeId = this.value;
      }
    },
    computed: {
      activeItem: function activeItem() {
        var _this = this;

        return this.activeId === undefined ? this.items[0] : this.activeId === null ? null : this.childItems.find(function (i) {
          return i.value === _this.activeId;
        });
      },
      items: function items() {
        return this.sortedItems;
      }
    },
    watch: {
      /**
       * When v-model is changed set the new active tab.
       */
      value: function value(_value) {
        if (typeof _value === 'number') {
          // Backward compatibility: converts the index value to an id
          _value = helpers.bound(_value, 0, this.items.length - 1);
          this.activeId = this.items[_value].value;
        } else {
          this.activeId = _value;
        }
      },

      /**
       * Sync internal state with external state
       */
      activeId: function activeId(val, oldValue) {
        val = this.activeItem ? typeof this.value === 'number' ? this.items.indexOf(this.activeItem) : this.activeItem.value : undefined;

        if (val !== this.value) {
          this.$emit('input', val);
        }
      }
    },
    methods: {
      /**
      * Child click listener, emit input event and change active child.
      */
      childClick: function childClick(child) {
        this.activeId = child.value;
      },
      getNextItemIdx: function getNextItemIdx(fromIdx) {
        var skipDisabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var nextItemIdx = null;
        var idx = fromIdx + 1;

        for (; idx < this.items.length; idx++) {
          var item = this.items[idx];

          if (item.visible && (!skipDisabled || skipDisabled && !item.disabled)) {
            nextItemIdx = idx;
            break;
          }
        }

        return nextItemIdx;
      },
      getPrevItemIdx: function getPrevItemIdx(fromIdx) {
        var skipDisabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var prevItemIdx = null;

        for (var idx = fromIdx - 1; idx >= 0; idx--) {
          var item = this.items[idx];

          if (item.visible && (!skipDisabled || skipDisabled && !item.disabled)) {
            prevItemIdx = idx;
            break;
          }
        }

        return prevItemIdx;
      }
    }
  };
});

//
var script = {
  name: 'GovTabs',
  mixins: [TabbedMixin('tab')],
  data: function data() {
    return {
      currentFocus: this.value
    };
  },
  methods: {
    giveFocusToTab: function giveFocusToTab(tab) {
      if (tab.$el && tab.$el.focus) {
        tab.$el.focus();
      } else if (tab.focus) {
        tab.focus();
      }
    },
    manageTablistKeydown: function manageTablistKeydown(event) {
      // https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key/Key_Values#Navigation_keys
      var key = event.key;

      switch (key) {
        case 'ArrowLeft':
        case 'Left':
          {
            var prevIdx = this.getPrevItemIdx(this.currentFocus, true);

            if (prevIdx === null) {
              // We try to give focus back to the last visible element
              prevIdx = this.getPrevItemIdx(this.items.length, true);
            }

            if (prevIdx !== null && this.$refs.tabLink && prevIdx < this.$refs.tabLink.length && !this.items[prevIdx].disabled) {
              this.giveFocusToTab(this.$refs.tabLink[prevIdx]);
            }

            event.preventDefault();
            break;
          }

        case 'ArrowRight':
        case 'Right':
          {
            var nextIdx = this.getNextItemIdx(this.currentFocus, true);

            if (nextIdx === null) {
              // We try to give focus back to the first visible element
              nextIdx = this.getNextItemIdx(-1, true);
            }

            if (nextIdx !== null && this.$refs.tabLink && nextIdx < this.$refs.tabLink.length && !this.items[nextIdx].disabled) {
              this.giveFocusToTab(this.$refs.tabLink[nextIdx]);
            }

            event.preventDefault();
            break;
          }
      }
    },
    manageTabKeydown: function manageTabKeydown(event, childItem) {
      // https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key/Key_Values#Navigation_keys
      var key = event.key;

      switch (key) {
        case ' ':
        case 'Space':
        case 'Spacebar':
        case 'Enter':
          {
            this.childClick(childItem);
            event.preventDefault();
            break;
          }
      }
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gov-tabs"},[_c('nav',{staticClass:"gov-tabs__links-holder",attrs:{"role":"tablist","aria-orientation":"horizontal"},on:{"keydown":_vm.manageTablistKeydown}},_vm._l((_vm.items),function(childItem,childIdx){return _c('button',{directives:[{name:"show",rawName:"v-show",value:(childItem.visible),expression:"childItem.visible"}],key:childItem.value,ref:"tabLink",refInFor:true,class:['gov-tabs__link',
                     childItem.headerClass, { 'is-active': childItem.isActive,
                                              'is-disabled': childItem.disabled }],attrs:{"role":"tab","id":((childItem.value) + "-tab"),"aria-controls":((childItem.value) + "-content"),"aria-selected":("" + (childItem.isActive)),"tabindex":childItem.isActive ? 0 : -1},on:{"click":function($event){return _vm.childClick(childItem)},"focus":function($event){_vm.currentFocus = childIdx;},"keydown":function($event){return _vm.manageTabKeydown($event, childItem)}}},[_vm._v(" "+_vm._s(childItem.label)+" ")])}),0),_c('div',{staticClass:"gov-tabs__content-holder"},[_c('div',{staticClass:"gov-tabs__content is-active"},[_vm._t("default")],2)])])};
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

var sorted$1 = 1;
var optional = 2;
var Sorted$1 = sorted$1;
var InjectedChildMixin = (function (parentItemName) {
  var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var mixin = {
    inject: {
      parent: {
        from: 'b' + parentItemName,
        default: false
      }
    },
    created: function created() {
      if (!this.parent) {
        if (!helpers.hasFlag(flags, optional)) {
          this.$destroy();
          throw new Error('You should wrap ' + this.$options.name + ' in a ' + parentItemName);
        }
      } else if (this.parent._registerItem) {
        this.parent._registerItem(this);
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (this.parent && this.parent._unregisterItem) {
        this.parent._unregisterItem(this);
      }
    }
  };

  if (helpers.hasFlag(flags, sorted$1)) {
    mixin.data = function () {
      return {
        index: null
      };
    };
  }

  return mixin;
});

var TabbedChildMixin = (function (parentCmp) {
  return {
    mixins: [InjectedChildMixin(parentCmp, Sorted$1)],
    props: {
      label: String,
      visible: {
        type: Boolean,
        default: true
      },
      value: {
        type: String,
        default: function _default() {
          return this._uid.toString();
        }
      }
    },
    data: function data() {
      return {
        elementClass: 'item',
        elementRole: null
      };
    },
    computed: {
      isActive: function isActive() {
        return this.parent.activeItem === this;
      }
    },
    render: function render(createElement) {
      // if destroy apply v-if
      if (this.parent.destroyOnHide) {
        if (!this.isActive || !this.visible) {
          return;
        }
      }

      var vnode = createElement('div', {
        directives: [{
          name: 'show',
          value: this.isActive && this.visible
        }],
        attrs: {
          'class': this.elementClass,
          'role': this.elementRole,
          'id': "".concat(this.value, "-content"),
          'aria-labelledby': this.elementRole ? "".concat(this.value, "-label") : null,
          'tabindex': this.isActive ? 0 : -1
        }
      }, this.$slots.default);
      return vnode;
    }
  };
});

var script$1 = {
  name: 'GovTabItem',
  mixins: [TabbedChildMixin('tab')],
  props: {
    disabled: Boolean
  },
  data: function data() {
    return {
      elementClass: 'gov-tabs__content is-active',
      elementRole: 'tabpanel'
    };
  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/__chunk_1.__vue_normalize__(
    {},
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
    __chunk_1.registerComponent(Vue, __vue_component__);
    __chunk_1.registerComponent(Vue, __vue_component__$1);
  }
};
__chunk_1.use(Plugin);

exports.GovTabItem = __vue_component__$1;
exports.GovTabs = __vue_component__;
exports.default = Plugin;
