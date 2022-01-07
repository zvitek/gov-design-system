<template>
    <nav
        class="gov-sidenav"
        :class="{'gov-sidenav--complex': complex}">
        <slot />
    </nav>
</template>

<script>
export default {
    name: 'GovSideMenu',
    props: {
        complex: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            _isMenu: true // Used by MenuItem
        }
    }
}
</script>
