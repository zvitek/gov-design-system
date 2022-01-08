<template>
    <component
        :is="computedTag"
        ref="input"
        class="gov-form-control__input"
        :class="[customClass]"
        :type="type"
        :autocomplete="newAutocomplete"
        :maxlength="maxlength"
        :value="computedValue"
        v-bind="$attrs"
        :id="uniqueId"
        @input="onInput"
        @change="onChange"
        @blur="newOnBlur"
        @focus="newOnFocus"/>
</template>

<script>
import config from '../../utils/config'
import FormElementMixin from '../../utils/FormElementMixin'

export default {
    name: 'GovInput',
    mixins: [FormElementMixin],
    inheritAttrs: false,
    props: {
        value: [Number, String],
        type: {
            type: String,
            default: 'text'
        },
        textarea: {
            type: Boolean,
            required: false,
            default: false
        },
        lazy: {
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
            _elementRef: 'input'
        }
    },
    computed: {
        computedTag() {
            return this.textarea
                ? 'textarea'
                : 'input'
        },
        newAutocomplete() {
            return this.textarea
                ? undefined
                : this.autocomplete || config.defaultInputAutocomplete
        },
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
            this.setNotEmpty(this.isFocused || (this.valueLength))
        }
    },
    mounted() {
        this.calculateNotEmpty()
        this.$nextTick(() => {
            if (!this.autocomplete) return
            this.$refs.input.addEventListener('blur', () => {
                this.isFocused = false
                this.calculateNotEmpty()
            })
        })
    }
}
</script>
