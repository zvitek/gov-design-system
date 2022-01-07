<template>
    <ul
        class="gov-form-group"
        :class="{'gov-form-group--inline': inline}">
        <slot/>
    </ul>
</template>

<script>
import FormErrorMixin from '../../utils/FormErrorMixin'

export default {
    name: 'GovRadioContainer',
    mixins: [FormErrorMixin],
    props: {
        inline: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            _isCustom: true
        }
    }
}
</script>
