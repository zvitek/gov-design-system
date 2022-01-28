<template>
    <input
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
        @focus="newOnFocus">
</template>

<script>
import FormElementMixin from '../../utils/FormElementMixin'
import InputMixin from './InputMixin'
import config from '../../utils/config'

export default {
    name: 'GovInput',
    mixins: [InputMixin, FormElementMixin],
    computed: {
        newAutocomplete() {
            return this.autocomplete || config.defaultInputAutocomplete
        }
    },
    watch: {
        type: function () {
            this.resolveNativeTypes()
        }
    },
    methods: {
        resolveNativeTypes() {
            if (['date', 'time'].indexOf(this.type) !== -1) {
                this.enforceEmptyValue = true
                this.calculateNotEmpty()
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (!this.whisperer) return
            this.$refs.input.addEventListener('blur', () => {
                this.isFocused = false
                this.calculateNotEmpty()
            })
        })
        this.resolveNativeTypes()
    }
}
</script>
