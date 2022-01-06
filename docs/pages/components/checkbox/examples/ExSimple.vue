<template>
    <section>
        <gov-field>
            <gov-checkbox>Basic</gov-checkbox>
        </gov-field>
        <gov-field>
            <gov-checkbox v-model="checkbox">
                {{ checkbox }}
            </gov-checkbox>
        </gov-field>
        <gov-field>
            <gov-checkbox v-model="checkboxCustom"
                true-value="Yes"
                false-value="No">
                {{ checkboxCustom }}
            </gov-checkbox>
        </gov-field>
        <gov-field>
            <gov-checkbox disabled>Disabled</gov-checkbox>
        </gov-field>
        <gov-field>
            <gov-checkbox validation-message="This is error">Error</gov-checkbox>
        </gov-field>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                checkbox: false,
                checkboxCustom: 'Yes'
            }
        }
    }
</script>
