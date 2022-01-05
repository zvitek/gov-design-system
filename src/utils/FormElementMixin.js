import { isVueComponent, makeid } from './helpers'

export default {
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
        validationMessage: {
            type: String,
            required: false,
            default: null
        },
        customUniqueId: {
            type: [String, Number],
            required: false,
            default: null
        }
    },
    data() {
        return {
            uniqueId: null,
            isFocused: false
        }
    },
    mounted() {
        this.uniqueId = this.customUniqueId || 'input_' + makeid()
    },
    watch: {
        validationMessage: function (newValue) {
            if ((Array.isArray(newValue) && newValue.length) || typeof newValue === 'string') {
                this.setValidity(true, newValue)
            } else {
                this.setValidity(false, null)
            }
        },
        uniqueId: function () {
            this.swtUniqueId()
        }
    },
    computed: {
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
    methods: {
        /**
         * Focus method that work dynamically depending on the component.
         */
        focus() {
            const el = this.getElement()
            if (el === undefined) return

            this.$nextTick(() => {
                if (el) el.focus()
            })
        },

        onBlur($event) {
            this.isFocused = false
            this.$emit('blur', $event)
        },

        onFocus($event) {
            this.isFocused = true
            this.$emit('focus', $event)
        },

        getElement() {
            let el = this.$refs[this.$data._elementRef]
            while (isVueComponent(el)) {
                el = el.$refs[el.$data._elementRef]
            }
            return el
        },

        setValidity(status, message) {
            this.$nextTick(() => {
                if (this.parentField) {
                    this.parentField.error = status
                    this.parentField.errorMessage = message
                }
            })
        },

        setNotEmpty(status) {
            this.$nextTick(() => {
                if (this.parentField) {
                    this.parentField.notEmpty = status
                }
            })
        },

        swtUniqueId() {
            this.$nextTick(() => {
                if (this.parentField) {
                    this.parentField.uniqueId = this.uniqueId
                }
            })
        }
    }
}
