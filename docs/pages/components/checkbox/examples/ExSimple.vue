<template>
    <section>
        <b-field>
            <gov-checkbox>Basic</gov-checkbox>
        </b-field>
        <b-field>
            <gov-checkbox v-model="checkbox">
                {{ checkbox }}
            </gov-checkbox>
        </b-field>
        <b-field>
            <gov-checkbox v-model="checkboxCustom"
                true-value="Yes"
                false-value="No">
                {{ checkboxCustom }}
            </gov-checkbox>
        </b-field>
        <b-field>
            <gov-checkbox disabled>Disabled</gov-checkbox>
        </b-field>
        <b-field>
            <gov-checkbox error>Error</gov-checkbox>
        </b-field>
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
