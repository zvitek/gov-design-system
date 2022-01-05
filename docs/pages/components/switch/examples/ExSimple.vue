<template>
    <section>
        <gov-field>
            <gov-switch>Default</gov-switch>
        </gov-field>
        <gov-field>
            <gov-switch v-model="isSwitched">
                {{ isSwitched }}
            </gov-switch>
        </gov-field>
        <gov-field>
            <gov-switch v-model="isSwitchedCustom"
                true-value="Yes"
                false-value="No">
                {{ isSwitchedCustom }}
            </gov-switch>
        </gov-field>
        <gov-field>
            <gov-switch disabled>Disabled</gov-switch>
        </gov-field>
        <gov-field>
            <gov-switch error>Error</gov-switch>
        </gov-field>
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
