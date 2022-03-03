'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_1 = require('./chunk-459e6915.js');
require('./chunk-f9ad6937.js');
require('./chunk-44abe813.js');
var __chunk_4 = require('./chunk-5094d8df.js');
var helpers = require('./helpers.js');
var __chunk_7 = require('./chunk-6815e880.js');
var __chunk_8 = require('./chunk-035d0231.js');

var script = {
  name: 'GovAutocomplete',
  components: __chunk_4._defineProperty({}, __chunk_8.Input.name, __chunk_8.Input),
  mixins: [__chunk_7.FormElementMixin],
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
            var group = helpers.getValueByPath(option, _this.groupField);
            var items = helpers.getValueByPath(option, _this.groupOptions);
            newData.push({
              group: group,
              items: items
            });
          });
          return newData;
        } else {
          var tmp = {};
          this.data.forEach(function (option) {
            var group = helpers.getValueByPath(option, _this.groupField);
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
      var target = helpers.isCustomElement(this) ? event.composedPath()[0] : event.target;

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

      return __chunk_4._typeof(option) === 'object' ? helpers.getValueByPath(option, this.field) : option;
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
          return [].concat(__chunk_4._toConsumableArray(a), __chunk_4._toConsumableArray(b));
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
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gov-autocomplete",attrs:{"role":"combobox","aria-haspopup":"listbox"}},[_c('gov-input',_vm._b({ref:"input",attrs:{"maxlength":_vm.maxlength,"autocomplete":_vm.newAutocomplete,"aria-autocomplete":_vm.ariaAutocomplete,"custom-unique-id":_vm.customUniqueId,"whisperer":true},on:{"input":_vm.onInput,"focus":_vm.focused,"blur":_vm.onBlur},nativeOn:{"keydown":[function($event){return _vm.keydown($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }$event.preventDefault();return _vm.keyArrows('up')},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }$event.preventDefault();return _vm.keyArrows('down')}]},model:{value:(_vm.newValue),callback:function ($$v) {_vm.newValue=$$v;},expression:"newValue"}},'gov-input',_vm.$attrs,false)),_c('div',{ref:"dropdown",style:(_vm.style)},[_c('ul',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive && (!_vm.isEmpty || _vm.hasEmptySlot)),expression:"isActive && (!isEmpty || hasEmptySlot)"}],staticClass:"gov-autocomplete__results"},[_vm._l((_vm.computedData),function(element,groupindex){return [(element.group)?_c('li',{key:groupindex + 'group',staticClass:"gov-autocomplete__result",attrs:{"role":"option"}},[(_vm.hasGroupSlot)?_vm._t("group",null,{"group":element.group,"index":groupindex}):_c('strong',[_vm._v(" "+_vm._s(element.group)+" ")])],2):_vm._e(),_vm._l((element.items),function(option,index){return _c('li',{key:groupindex + ':' + index,staticClass:"gov-autocomplete__result",class:{ 'selected': option === _vm.hovered },attrs:{"role":"option"},on:{"click":function($event){$event.stopPropagation();return _vm.setSelected(option, !_vm.keepOpen, $event)}}},[(_vm.hasDefaultSlot)?_vm._t("default",null,{"option":option,"index":index}):[_vm._v(" "+_vm._s(_vm.getValue(option, true))+" ")]],2)})]}),(_vm.isEmpty && _vm.hasEmptySlot)?_c('li',{staticClass:"gov-autocomplete__empty"},[_vm._t("empty")],2):_vm._e()],2)])],1)};
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

exports.GovAutocomplete = __vue_component__;
exports.default = Plugin;
