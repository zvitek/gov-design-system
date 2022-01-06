<template>
    <li class="gov-form-group__item">
        <input
            v-model="computedValue"
            class="gov-form-control__radio"
            type="radio"
            ref="input"
            @click.stop
            :id="uniqueId"
            :disabled="disabled"
            :required="required"
            :name="name"
            :value="nativeValue">
        <label
            class="gov-form-control__label"
            ref="label"
            :for="uniqueId"
            :disabled="disabled"
            @click="focus"
            @keydown.prevent.enter="$refs.label.click()">
            <slot/>
        </label>
        <span class="gov-form-control__indicator"/>
    </li>
</template>

<script>
import CheckRadioMixin from '../../utils/CheckRadioMixin.js'

export default {
    name: 'GovRadio',
    mixins: [CheckRadioMixin],
    data() {
        return {
            _isCustom: true
        }
    }
}
</script>
