<template>
    <span
        class="gov-badge"
        :class="[{
            'gov-badge--inversed': inversed,
            'gov-badge--warning': warning,
            'gov-badge--error': error
    }]">
        <slot/>
    </span>
</template>

<script>
export default {
    name: 'GovBadge',
    props: {
        inversed: {
            type: Boolean,
            default: false
        },
        warning: {
            type: Boolean,
            default: false
        },
        error: {
            type: Boolean,
            default: false
        }
    }
}
</script>
