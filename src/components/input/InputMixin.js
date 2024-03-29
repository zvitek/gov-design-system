import FormElementMixin from '../../utils/FormElementMixin'

export default {
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
    data() {
        return {
            newValue: this.value,
            enforceEmptyValue: false,
            _elementRef: 'input'
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
        /**
        * Get value length
        */
        valueLength() {
            if (typeof this.computedValue === 'string') {
                return this.computedValue.length
            } else if (typeof this.computedValue === 'number') {
                return this.computedValue.toString().length
            }
            return 0
        }
    },
    watch: {
        /**
        * When v-model is changed:
        *   1. Set internal value.
        */
        value(value) {
            this.newValue = value

            this.calculateNotEmpty()
        }
    },
    methods: {
        onInput(event) {
            if (!this.lazy) {
                const value = event.target.value
                this.updateValue(value)
            }
        },

        onChange(event) {
            if (this.lazy) {
                const value = event.target.value
                this.updateValue(value)
            }
        },

        newOnBlur(event) {
            this.onBlur(event)
            this.calculateNotEmpty()
        },

        newOnFocus(event) {
            this.onFocus(event)
            this.calculateNotEmpty()
        },

        updateValue(value) {
            this.computedValue = value
        },

        calculateNotEmpty() {
            this.setNotEmpty(this.isFocused || (this.valueLength) || this.enforceEmptyValue)
        }
    },
    mounted() {
        this.calculateNotEmpty()
    }
}
