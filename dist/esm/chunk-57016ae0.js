import { F as FormErrorMixin } from './chunk-3ab30214.js';
import { makeid, isVueComponent } from './helpers.js';

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

export { FormElementMixin as F };
