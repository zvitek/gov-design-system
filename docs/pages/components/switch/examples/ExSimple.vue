<template>
    <section>
        <b-field>
            <gov-switch>Default</gov-switch>
        </b-field>
        <b-field>
            <gov-switch v-model="isSwitched">
                {{ isSwitched }}
            </gov-switch>
        </b-field>
        <b-field>
            <gov-switch v-model="isSwitchedCustom"
                true-value="Yes"
                false-value="No">
                {{ isSwitchedCustom }}
            </gov-switch>
        </b-field>
        <b-field>
            <gov-switch disabled>Disabled</gov-switch>
        </b-field>
        <b-field>
            <gov-switch error>Error</gov-switch>
        </b-field>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                isSwitched: false,
                isSwitchedCustom: 'Yes'
            }
        }
    }
</script>
