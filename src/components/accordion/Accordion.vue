<template>
    <div
        class="gov-accordion"
        :class="{
            'gov-accordion--large': large,
            'gov-accordion--no-inner-offset': noInnerOffset,
            'gov-accordion--small': small}">
        <slot/>
    </div>
</template>

<script>
export default {
    name: 'GovAccordion',
    props: {
        small: {
            type: Boolean,
            default: false
        },
        large: {
            type: Boolean,
            default: false
        },
        noInnerOffset: {
            type: Boolean,
            default: false
        }
    }
}
</script>
