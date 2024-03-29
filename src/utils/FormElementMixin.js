import { isVueComponent, makeid } from './helpers'
import FormErrorMixin from './FormErrorMixin'

export default {
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
