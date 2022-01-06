<template>
    <select
        v-model="computedValue"
        ref="select"
        :id="uniqueId"
        :multiple="multiple"
        v-bind="$attrs"
        @blur="onBlur"
        @focus="onFocus">

        <template v-if="placeholder">
            <option
                v-if="computedValue == null"
                :value="null"
                disabled
                hidden>
                {{ placeholder }}
            </option>
        </template>

        <slot/>

    </select>
</template>

<script>
import FormElementMixin from '../../utils/FormElementMixin'

export default {
    name: 'GovSelect',
    mixins: [FormElementMixin],
    inheritAttrs: false,
    props: {
        value: {
            type: [String, Number, Boolean, Object, Array, Function, Date],
            default: null
        },
        placeholder: String,
        multiple: Boolean
    },
    data() {
        return {
            selected: this.value,
            _elementRef: 'select',
            _isSelect: true
        }
    },
    computed: {
        computedValue: {
            get() {
                return this.selected
            },
            set(value) {
                this.selected = value
                this.$emit('input', value)
                this.calculateNotEmpty()
            }
        }
    },
    watch: {
        /**
        * When v-model is changed:
        *   1. Set the selected option.
        *   2. If it's invalid, validate again.
        */
        value(value) {
            this.selected = value
        }
    },
    methods: {
        calculateNotEmpty() {
            console.log(this.selected)
            this.setNotEmpty(this.isFocused || (this.selected))
        }
    },
    mounted() {
        this.calculateNotEmpty()
    }
}
</script>
