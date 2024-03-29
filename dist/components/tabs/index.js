/*! Gov v0.1.0 | MIT License | github.com/gov/gov */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.Tabs = {}));
}(this, function (exports) { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  /**
   * Checks if the flag is set
   * @param val
   * @param flag
   * @returns {boolean}
   */

  function hasFlag(val, flag) {
    return (val & flag) === flag;
  }
  /**
   * Asserts a value is beetween min and max
   * @param val
   * @param min
   * @param max
   * @returns {number}
   */


  function bound(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }
  function isVueComponent(c) {
    return c && c._isVue;
  }

  var SlotComponent = {
    name: 'GovSlotComponent',
    props: {
      component: {
        type: Object,
        required: true
      },
      name: {
        type: String,
        default: 'default'
      },
      scoped: {
        type: Boolean
      },
      props: {
        type: Object
      },
      tag: {
        type: String,
        default: 'div'
      },
      event: {
        type: String,
        default: 'hook:updated'
      }
    },
    methods: {
      refresh: function refresh() {
        this.$forceUpdate();
      }
    },
    created: function created() {
      if (isVueComponent(this.component)) {
        this.component.$on(this.event, this.refresh);
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (isVueComponent(this.component)) {
        this.component.$off(this.event, this.refresh);
      }
    },
    render: function render(createElement) {
      if (isVueComponent(this.component)) {
        return createElement(this.tag, {}, this.scoped ? this.component.$scopedSlots[this.name](this.props) : this.component.$slots[this.name]);
      }
    }
  };

  var items = 1;
  var sorted = 3;
  var Sorted = sorted;
  var ProviderParentMixin = (function (itemName) {
    var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var mixin = {
      provide: function provide() {
        return _defineProperty({}, 'b' + itemName, this);
      }
    };

    if (hasFlag(flags, items)) {
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

      if (hasFlag(flags, sorted)) {
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
      components: _defineProperty({}, SlotComponent.name, SlotComponent),
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
          var value = bound(this.value, 0, this.items.length - 1);
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
            _value = bound(_value, 0, this.items.length - 1);
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

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

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
    

    
    const __vue_component__ = /*#__PURE__*/normalizeComponent_1(
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
          if (!hasFlag(flags, optional)) {
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

    if (hasFlag(flags, sorted$1)) {
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
    

    
    const __vue_component__$1 = /*#__PURE__*/normalizeComponent_1(
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

  var use = function use(plugin) {
    if (typeof window !== 'undefined' && window.Vue) {
      window.Vue.use(plugin);
    }
  };
  var registerComponent = function registerComponent(Vue, component) {
    Vue.component(component.name, component);
  };

  var Plugin = {
    install: function install(Vue) {
      registerComponent(Vue, __vue_component__);
      registerComponent(Vue, __vue_component__$1);
    }
  };
  use(Plugin);

  exports.GovTabItem = __vue_component__$1;
  exports.GovTabs = __vue_component__;
  exports.default = Plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
