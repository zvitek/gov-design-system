<template>
    <div>
        <input
            class="gov-form-control__toggle"
            v-model="computedValue"
            type="checkbox"
            ref="input"
            :disabled="disabled"
            :name="name"
            :checked="computedValue === trueValue"
            :required="required"
            :value="nativeValue"
            :true-value="trueValue"
            :false-value="falseValue"
            :aria-labelledby="ariaLabelledby">
        <label
            class="gov-form-control__label"
            ref="label"
            :disabled="disabled"
            @click="focus"
            :id="ariaLabelledby"
            @keydown.prevent.enter="$refs.label.click()"
            @mousedown="isMouseDown = true"
            @mouseup="isMouseDown = false"
            @mouseout="isMouseDown = false"
            @blur="isMouseDown = false">
            <template v-if="showControlLabel"><slot/></template>
        </label>
        <span class="gov-form-control__indicator"/>
    </div>
</template>

<script>
import FormErrorMixin from '../../utils/FormErrorMixin'

export default {
    name: 'GovSwitch',
    mixins: [FormErrorMixin],
    props: {
        value: [String, Number, Boolean, Function, Object, Array, Date],
        nativeValue: [String, Number, Boolean, Function, Object, Array, Date],
        disabled: Boolean,
        name: String,
        required: Boolean,
        ariaLabelledby: String,
        trueValue: {
            type: [String, Number, Boolean, Function, Object, Array, Date],
            default: true
        },
        falseValue: {
            type: [String, Number, Boolean, Function, Object, Array, Date],
            default: false
        },
        error: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            newValue: this.value,
            isMouseDown: false,
            _isSwitch: true
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
        showControlLabel() {
            return !!this.$slots.default
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
</script>
