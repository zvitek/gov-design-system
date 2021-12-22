<template>
    <div
        class="gov-form-control gov-form-control--custom"
        :class="wrapperClass">
        <input
            class="gov-form-control__checkbox"
            v-model="computedValue"
            :indeterminate.prop="indeterminate"
            type="checkbox"
            ref="input"
            @click.stop
            :autocomplete="autocomplete"
            :checked="computedValue === trueValue"
            :disabled="disabled"
            :required="required"
            :name="name"
            :value="nativeValue"
            :true-value="trueValue"
            :false-value="falseValue"
            :aria-labelledby="ariaLabelledby">
        <label
            class="gov-form-control__label"
            ref="label"
            :id="ariaLabelledby"
            :disabled="disabled"
            @click="focus"
            @keydown.prevent.enter="$refs.label.click()">
            <slot/>
        </label>
        <span class="gov-form-control__indicator"/>
    </div>
</template>

<script>
import CheckRadioMixin from '../../utils/CheckRadioMixin.js'

export default {
    name: 'GovCheckbox',
    mixins: [CheckRadioMixin],
    props: {
        indeterminate: Boolean,
        ariaLabelledby: String,
        trueValue: {
            type: [String, Number, Boolean, Function, Object, Array],
            default: true
        },
        falseValue: {
            type: [String, Number, Boolean, Function, Object, Array],
            default: false
        },
        autocomplete: {
            type: String,
            default: 'on'
        }
    }
}
</script>
