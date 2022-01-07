<template>
    <component
        :is="computedTag"
        class="gov-button"
        v-bind="$attrs"
        :type="nativeType"
        :class="[size, type, {
            'gov-button--primary': primary,
            'gov-button--primary-outlined': primaryOutlined,
            'gov-button--inversed': inversed,
            'gov-button--large': large,
            'gov-button--small': small,
            'gov-button--is-active': active,
        }]"
        v-on="$listeners"
    >
        <template v-if="label">{{ label }}</template>
        <template v-else-if="$slots.default">
            <slot />
        </template>
    </component>
</template>

<script>
import config from '../../utils/config'

export default {
    name: 'GovButton',
    inheritAttrs: false,
    props: {
        type: [String, Object],
        size: String,
        label: String,
        primaryOutlined: Boolean,
        primary: Boolean,
        inversed: Boolean,
        small: Boolean,
        large: Boolean,
        active: Boolean,
        nativeType: {
            type: String,
            default: 'button',
            validator: (value) => {
                return [ 'button', 'submit', 'reset' ].indexOf(value) >= 0
            }
        },
        tag: {
            type: String,
            default: 'button',
            validator: (value) => {
                return config.defaultLinkTags.indexOf(value) >= 0
            }
        }
    },
    computed: {
        computedTag() {
            const {disabled} = this.$attrs
            if (disabled !== undefined && disabled !== false) {
                return 'button'
            }
            return this.tag
        }
    }
}
</script>
