import { F as FormErrorMixin } from './chunk-3ab30214.js';
import { makeid } from './helpers.js';

var CheckRadioMixin = {
  mixins: [FormErrorMixin],
  props: {
    value: [String, Number, Boolean, Function, Object, Array],
    nativeValue: [String, Number, Boolean, Function, Object, Array],
    disabled: Boolean,
    required: Boolean,
    error: Boolean,
    name: String,
    customUniqueId: {
      type: String,
      required: false,
      default: null
    }
  },
  data: function data() {
    return {
      newValue: this.value,
      uniqueId: null
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
    wrapperClass: function wrapperClass() {
      return {
        'gov-form-control--error': this.error
      };
    },

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
  watch: {
    /**
    * When v-model change, set internal value.
    */
    value: function value(_value) {
      this.newValue = _value;
    },
    uniqueId: function uniqueId() {
      this.swtUniqueId();
    }
  },
  mounted: function mounted() {
    this.uniqueId = this.customUniqueId || 'radio_' + makeid();
  },
  methods: {
    focus: function focus() {
      if (this.disabled) {
        return;
      } // MacOS FireFox and Safari do not focus when clicked


      this.$refs.input.focus();
      this.change();
    },
    change: function change() {
      if (this.$refs.input.checked) {
        this.newValue = this.falseValue;
      } else {
        this.newValue = this.trueValue;
      }

      this.computedValue = this.newValue;
    },
    swtUniqueId: function swtUniqueId() {
      var _this = this;

      this.$nextTick(function () {
        if (_this.parentField) {
          _this.parentField.uniqueId = _this.uniqueId;
        }
      });
    }
  }
};

export { CheckRadioMixin as C };
