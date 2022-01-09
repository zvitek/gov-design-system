<template>
    <textarea
        ref="input"
        class="gov-form-control__input"
        :class="[customClass]"
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
import FormElementMixin from '../../utils/FormElementMixin'
import InputMixin from './InputMixin'

export default {
    name: 'GovTextarea',
    mixins: [InputMixin, FormElementMixin]
}
</script>
