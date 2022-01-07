<template>
    <section>
        <gov-button @click="clickMe">Click Me</gov-button>
    </section>
</template>

<script>
    export default {
        methods: {
            clickMe() {
                this.$gov.notification.open('Clicked!!')
            }
        }
    }
</script>
