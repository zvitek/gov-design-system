import FormErrorMixin from './FormErrorMixin'

export default {
    mixins: [FormErrorMixin],
    props: {
        value: [String, Number, Boolean, Function, Object, Array],
        nativeValue: [String, Number, Boolean, Function, Object, Array],
        type: String,
        disabled: Boolean,
        required: Boolean,
        error: Boolean,
        name: String,
        size: String
    },
    data() {
        return {
            newValue: this.value
        }
    },
    computed: {
        computedValue: {
            get() {
                return this.newValue
            },
            set(value) {
                this.newValue = value
                this.$emit('input', value)
            }
        },
        wrapperClass() {
            return {
                'gov-form-control--error': this.error
            }
        },
        /**
         * Find parent Field, max 3 levels deep.
         */
        parentField() {
            let parent = this.$parent
            for (let i = 0; i < 3; i++) {
                if (parent && !parent.$data._isField) {
                    parent = parent.$parent
                }
            }
            return parent
        }
    },
    watch: {
        /**
        * When v-model change, set internal value.
        */
        value(value) {
            this.newValue = value
        }
    },
    methods: {
        focus() {
            if (this.disabled) {
                return
            }
            // MacOS FireFox and Safari do not focus when clicked
            this.$refs.input.focus()
            this.change()
        },

        change() {
            if (this.$refs.input.checked) {
                this.newValue = this.falseValue
            } else {
                this.newValue = this.trueValue
            }
            this.computedValue = this.newValue
        }
    }
}
