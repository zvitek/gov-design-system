/*! Gov v0.1.0 | MIT License | github.com/gov/gov */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.Autocomplete = {}));
}(this, function (exports) { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

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

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  /**
   * Get value of an object property/path even if it's nested
   */

  function getValueByPath(obj, path) {
    return path.split('.').reduce(function (o, i) {
      return o ? o[i] : null;
    }, obj);
  }
  function isVueComponent(c) {
    return c && c._isVue;
  }
  /**
   * @param {Object} vm
   * @return {boolean}
   */

  function isCustomElement(vm) {
    return 'shadowRoot' in vm.$root.$options;
  }
  /**
   * @param {Number} length
   * @return {String}
   */

  var makeid = function makeid() {
    var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  var FormErrorMixin = {
    props: {
      validationMessage: {
        type: [String, Array],
        required: false,
        default: null
      }
    },
    mounted: function mounted() {
      var _this = this;

      this.$nextTick(function () {
        return _this.prepareValidity();
      });
    },
    watch: {
      validationMessage: function validationMessage() {
        this.prepareValidity();
      }
    },
    computed: {
      parentField: function parentField() {
        var parent = this.$parent;

        for (var i = 0; i < 3; i++) {
          if (parent && !parent.$data._isField) {
            parent = parent.$parent;
          }
        }

        return parent;
      },
      childField: function childField() {
        var children = this.$children.filter(function (child) {
          return child.$data._isField;
        });

        if (children.length) {
          return children[0];
        }

        return null;
      }
    },
    methods: {
      prepareValidity: function prepareValidity() {
        var msg = this.validationMessage;

        if (Array.isArray(msg) && msg.length || typeof msg === 'string') {
          this.setValidity(msg);
        } else {
          this.setValidity(null);
        }
      },
      setValidity: function setValidity(message) {
        var _this2 = this;

        this.$nextTick(function () {
          var field = _this2.childField || _this2.parentField;

          if (field) {
            field.errorMessage = message;
          }
        });
      }
    }
  };

  var FormElementMixin = {
    mixins: [FormErrorMixin],
    props: {
      autocomplete: {
        type: String,
        required: false,
        default: undefined
      },
      maxlength: {
        type: [Number, String],
        required: false,
        default: undefined
      },
      customUniqueId: {
        type: [String, Number],
        required: false,
        default: null
      }
    },
    data: function data() {
      return {
        uniqueId: null,
        isFocused: false
      };
    },
    mounted: function mounted() {
      this.uniqueId = this.customUniqueId || 'input_' + makeid();
    },
    watch: {
      uniqueId: function uniqueId() {
        this.swtUniqueId();
      }
    },
    computed: {
      /**
       * Find parent Field, max 3 levels deep.
       */
      parentField: function parentField() {
        var parent = this.$parent;

        for (var i = 0; i < 3; i++) {
          if (parent && !parent.$data._isField) {
            parent = parent.$parent;
          }
        }

        return parent;
      }
    },
    methods: {
      /**
       * Focus method that work dynamically depending on the component.
       */
      focus: function focus() {
        var el = this.getElement();
        if (el === undefined) return;
        this.$nextTick(function () {
          if (el) el.focus();
        });
      },
      onBlur: function onBlur($event) {
        this.isFocused = false;
        this.$emit('blur', $event);
      },
      onFocus: function onFocus($event) {
        this.isFocused = true;
        this.$emit('focus', $event);
      },
      getElement: function getElement() {
        var el = this.$refs[this.$data._elementRef];

        while (isVueComponent(el)) {
          el = el.$refs[el.$data._elementRef];
        }

        return el;
      },
      setNotEmpty: function setNotEmpty(status) {
        var _this = this;

        this.$nextTick(function () {
          if (_this.parentField) {
            _this.parentField.notEmpty = status;
          }
        });
      },
      swtUniqueId: function swtUniqueId() {
        var _this2 = this;

        this.$nextTick(function () {
          if (_this2.parentField) {
            _this2.parentField.uniqueId = _this2.uniqueId;
          }
        });
      }
    }
  };

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

  var config = {
    defaultContainerElement: null,
    defaultIconPack: 'mdi',
    defaultIconComponent: null,
    defaultInputAutocomplete: 'on',
    defaultLinkTags: ['a', 'button', 'input', 'router-link', 'nuxt-link', 'n-link', 'RouterLink', 'NuxtLink', 'NLink'],
    defaultBreadcrumbTag: 'a',
    customIconPacks: null
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

  var script$1 = {
    name: 'GovAutocomplete',
    components: _defineProperty({}, __vue_component__.name, __vue_component__),
    mixins: [FormElementMixin],
    inheritAttrs: false,
    props: {
      value: [Number, String],
      data: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      field: {
        type: String,
        default: 'value'
      },
      keepFirst: Boolean,
      clearOnSelect: Boolean,
      openOnFocus: Boolean,
      customFormatter: Function,
      checkInfiniteScroll: Boolean,
      keepOpen: Boolean,
      selectOnClickOutside: Boolean,
      clearable: Boolean,
      maxHeight: [String, Number],
      groupField: String,
      groupOptions: String,
      confirmKeys: {
        type: Array,
        default: function _default() {
          return ['Tab', 'Enter'];
        }
      },
      customUniqueId: {
        type: [String, Number],
        required: false,
        default: null
      }
    },
    data: function data() {
      return {
        selected: null,
        hovered: null,
        isActive: false,
        newValue: this.value,
        newAutocomplete: this.autocomplete || 'off',
        ariaAutocomplete: this.keepFirst ? 'both' : 'list',
        hasFocus: false,
        style: {},
        _isAutocomplete: true,
        _elementRef: 'input'
      };
    },
    computed: {
      computedData: function computedData() {
        var _this = this;

        if (this.groupField) {
          if (this.groupOptions) {
            var newData = [];
            this.data.forEach(function (option) {
              var group = getValueByPath(option, _this.groupField);
              var items = getValueByPath(option, _this.groupOptions);
              newData.push({
                group: group,
                items: items
              });
            });
            return newData;
          } else {
            var tmp = {};
            this.data.forEach(function (option) {
              var group = getValueByPath(option, _this.groupField);
              if (!tmp[group]) tmp[group] = [];
              tmp[group].push(option);
            });
            var _newData = [];
            Object.keys(tmp).forEach(function (group) {
              _newData.push({
                group: group,
                items: tmp[group]
              });
            });
            return _newData;
          }
        }

        return [{
          items: this.data
        }];
      },
      isEmpty: function isEmpty() {
        if (!this.computedData) return true;
        return !this.computedData.some(function (element) {
          return element.items && element.items.length;
        });
      },

      /**
       * White-listed items to not close when clicked.
       * Add input, dropdown and all children.
       */
      whiteList: function whiteList() {
        var whiteList = [];
        whiteList.push(this.$refs.input.$el.querySelector('input'));
        whiteList.push(this.$refs.dropdown); // Add all children from dropdown

        if (this.$refs.dropdown !== undefined) {
          var children = this.$refs.dropdown.querySelectorAll('*');
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var child = _step.value;
              whiteList.push(child);
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
        }

        if (this.$parent.$data._isTaginput) {
          // Add taginput container
          whiteList.push(this.$parent.$el); // Add .tag and .delete

          var tagInputChildren = this.$parent.$el.querySelectorAll('*');
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = tagInputChildren[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var tagInputChild = _step2.value;
              whiteList.push(tagInputChild);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }

        return whiteList;
      },

      /**
       * Check if exists default slot
       */
      hasDefaultSlot: function hasDefaultSlot() {
        return !!this.$scopedSlots.default;
      },

      /**
       * Check if exists group slot
       */
      hasGroupSlot: function hasGroupSlot() {
        return !!this.$scopedSlots.group;
      },

      /**
       * Check if exists "empty" slot
       */
      hasEmptySlot: function hasEmptySlot() {
        return !!this.$slots.empty;
      }
    },
    watch: {
      /**
       * When updating input's value
       *   1. Emit changes
       *   2. If value isn't the same as selected, set null
       *   3. Close dropdown if value is clear or else open it
       */
      newValue: function newValue(value) {
        this.$emit('input', value); // Check if selected is invalid

        var currentValue = this.getValue(this.selected);

        if (currentValue && currentValue !== value) {
          this.setSelected(null, false);
        } // Close dropdown if input is clear or else open it


        if (this.hasFocus && (!this.openOnFocus || value)) {
          this.isActive = !!value;
        }
      },

      /**
       * When v-model is changed:
       *   1. Update internal value.
       *   2. If it's invalid, validate again.
       */
      value: function value(_value) {
        this.newValue = _value;
      },

      /**
       * Select first option if "keep-first
       */
      data: function data() {
        var _this2 = this;

        // Keep first option always pre-selected
        if (this.keepFirst) {
          this.$nextTick(function () {
            if (_this2.isActive) {
              _this2.selectFirstOption(_this2.computedData);
            } else {
              _this2.setHovered(null);
            }
          });
        }
      }
    },
    methods: {
      /**
       * Set which option is currently hovered.
       */
      setHovered: function setHovered(option) {
        if (option === undefined) return;
        this.hovered = option;
      },

      /**
       * Set which option is currently selected, update v-model,
       * update input value and close dropdown.
       */
      setSelected: function setSelected(option) {
        var _this3 = this;

        var closeDropdown = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var event = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        if (option === undefined) return;
        this.selected = option;
        this.$emit('select', this.selected, event);

        if (this.selected !== null) {
          if (this.clearOnSelect) {
            var input = this.$refs.input;
            input.newValue = '';
            input.$refs.input.value = '';
            input.$refs.input.focus();
          } else {
            this.newValue = this.getValue(this.selected);
          }

          this.setHovered(null);
        }

        closeDropdown && this.$nextTick(function () {
          _this3.isActive = false;
        });
      },

      /**
       * Select first option
       */
      selectFirstOption: function selectFirstOption(computedData) {
        var _this4 = this;

        this.$nextTick(function () {
          var nonEmptyElements = computedData.filter(function (element) {
            return element.items && element.items.length;
          });

          if (nonEmptyElements.length) {
            var option = nonEmptyElements[0].items[0];

            _this4.setHovered(option);
          } else {
            _this4.setHovered(null);
          }
        });
      },
      keydown: function keydown(event) {
        var key = event.key; // cannot destructure preventDefault (https://stackoverflow.com/a/49616808/2774496)
        // prevent emit submit event

        if (key === 'Enter') event.preventDefault(); // Close dropdown on Tab & no hovered

        if (key === 'Escape' || key === 'Tab') {
          this.isActive = false;
        }

        if (this.confirmKeys.indexOf(key) >= 0) {
          // If adding by comma, don't add the comma to the input
          if (key === ',') event.preventDefault(); // Close dropdown on select by Tab

          var closeDropdown = !this.keepOpen || key === 'Tab';

          if (this.hovered === null) {
            return;
          }

          this.setSelected(this.hovered, closeDropdown, event);
        }
      },

      /**
       * Close dropdown if clicked outside.
       */
      clickedOutside: function clickedOutside(event) {
        var target = isCustomElement(this) ? event.composedPath()[0] : event.target;

        if (!this.hasFocus && this.whiteList.indexOf(target) < 0) {
          if (this.keepFirst && this.hovered && this.selectOnClickOutside) {
            this.setSelected(this.hovered, true);
          } else {
            this.isActive = false;
          }
        }
      },

      /**
       * Return display text for the input.
       * If object, get value from path, or else just the value.
       */
      getValue: function getValue(option) {
        if (option === null) return;

        if (typeof this.customFormatter !== 'undefined') {
          return this.customFormatter(option);
        }

        return _typeof(option) === 'object' ? getValueByPath(option, this.field) : option;
      },

      /**
       * Check if the scroll list inside the dropdown
       * reached it's end.
       */
      checkIfReachedTheEndOfScroll: function checkIfReachedTheEndOfScroll(list) {
        if (list.clientHeight !== list.scrollHeight && list.scrollTop + list.clientHeight >= list.scrollHeight) {
          this.$emit('infinite-scroll');
        }
      },

      /**
       * Arrows keys listener.
       * If dropdown is active, set hovered option, or else just open.
       */
      keyArrows: function keyArrows(direction) {
        var sum = direction === 'down' ? 1 : -1;

        if (this.isActive) {
          var data = this.computedData.map(function (d) {
            return d.items;
          }).reduce(function (a, b) {
            return [].concat(_toConsumableArray(a), _toConsumableArray(b));
          }, []);
          var index = data.indexOf(this.hovered) + sum;
          index = index > data.length - 1 ? data.length - 1 : index;
          index = index < 0 ? 0 : index;
          this.setHovered(data[index] !== undefined ? data[index] : null);
          var list = this.$refs.dropdown.querySelector('.gov-autocomplete__results');
          var querySelectorText = '.gov-autocomplete__result';
          var element = list.querySelectorAll(querySelectorText)[index];
          if (!element) return;
          var visMin = list.scrollTop;
          var visMax = list.scrollTop + list.clientHeight - element.clientHeight;

          if (element.offsetTop < visMin) {
            list.scrollTop = element.offsetTop;
          } else if (element.offsetTop >= visMax) {
            list.scrollTop = element.offsetTop - list.clientHeight + element.clientHeight;
          }
        } else {
          this.isActive = true;
        }
      },

      /**
       * Focus listener.
       * If value is the same as selected, select all text.
       */
      focused: function focused(event) {
        if (this.getValue(this.selected) === this.newValue) {
          this.$el.querySelector('input').select();
        }

        if (this.openOnFocus) {
          this.isActive = true;

          if (this.keepFirst) {
            // If open on focus, update the hovered
            this.selectFirstOption(this.computedData);
          }
        }

        this.hasFocus = true;
        this.$emit('focus', event);
      },

      /**
       * Blur listener.
       */
      onBlur: function onBlur(event) {
        this.hasFocus = false;
        this.$emit('blur', event);
      },
      onInput: function onInput() {
        var currentValue = this.getValue(this.selected);
        if (currentValue && currentValue === this.newValue) return;
        this.$emit('typing', this.newValue);
      }
    },
    created: function created() {
      if (typeof window !== 'undefined') {
        document.addEventListener('click', this.clickedOutside);
      }
    },
    mounted: function mounted() {
      var _this5 = this;

      if (this.checkInfiniteScroll && this.$refs.dropdown && this.$refs.dropdown.querySelector('.gov-autocomplete__results')) {
        var list = this.$refs.dropdown.querySelector('.gov-autocomplete__results');
        list.addEventListener('scroll', function () {
          return _this5.checkIfReachedTheEndOfScroll(list);
        });
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (typeof window !== 'undefined') {
        document.removeEventListener('click', this.clickedOutside);
      }

      if (this.checkInfiniteScroll && this.$refs.dropdown && this.$refs.dropdown.querySelector('.gov-autocomplete__results')) {
        var list = this.$refs.dropdown.querySelector('.gov-autocomplete__results');
        list.removeEventListener('scroll', this.checkIfReachedTheEndOfScroll);
      }
    }
  };

  /* script */
  const __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gov-autocomplete",attrs:{"role":"combobox","aria-haspopup":"listbox"}},[_c('gov-input',_vm._b({ref:"input",attrs:{"maxlength":_vm.maxlength,"autocomplete":_vm.newAutocomplete,"aria-autocomplete":_vm.ariaAutocomplete,"custom-unique-id":_vm.customUniqueId,"whisperer":true},on:{"input":_vm.onInput,"focus":_vm.focused,"blur":_vm.onBlur},nativeOn:{"keydown":[function($event){return _vm.keydown($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }$event.preventDefault();return _vm.keyArrows('up')},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }$event.preventDefault();return _vm.keyArrows('down')}]},model:{value:(_vm.newValue),callback:function ($$v) {_vm.newValue=$$v;},expression:"newValue"}},'gov-input',_vm.$attrs,false)),_c('div',{ref:"dropdown",style:(_vm.style)},[_c('ul',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive && (!_vm.isEmpty || _vm.hasEmptySlot)),expression:"isActive && (!isEmpty || hasEmptySlot)"}],staticClass:"gov-autocomplete__results"},[_vm._l((_vm.computedData),function(element,groupindex){return [(element.group)?_c('li',{key:groupindex + 'group',staticClass:"gov-autocomplete__result",attrs:{"role":"option"}},[(_vm.hasGroupSlot)?_vm._t("group",null,{"group":element.group,"index":groupindex}):_c('strong',[_vm._v(" "+_vm._s(element.group)+" ")])],2):_vm._e(),_vm._l((element.items),function(option,index){return _c('li',{key:groupindex + ':' + index,staticClass:"gov-autocomplete__result",class:{ 'selected': option === _vm.hovered },attrs:{"role":"option"},on:{"click":function($event){$event.stopPropagation();return _vm.setSelected(option, !_vm.keepOpen, $event)}}},[(_vm.hasDefaultSlot)?_vm._t("default",null,{"option":option,"index":index}):[_vm._v(" "+_vm._s(_vm.getValue(option, true))+" ")]],2)})]}),(_vm.isEmpty && _vm.hasEmptySlot)?_c('li',{staticClass:"gov-autocomplete__empty"},[_vm._t("empty")],2):_vm._e()],2)])],1)};
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
    

    
    const __vue_component__$1 = /*#__PURE__*/normalizeComponent_1(
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
      registerComponent(Vue, __vue_component__$1);
    }
  };
  use(Plugin);

  exports.GovAutocomplete = __vue_component__$1;
  exports.default = Plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
