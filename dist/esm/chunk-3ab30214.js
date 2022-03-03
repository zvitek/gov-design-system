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

export { FormErrorMixin as F };
