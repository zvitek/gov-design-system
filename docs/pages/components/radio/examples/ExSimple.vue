<template>
    <section>
        <gov-field>
            <gov-radio-container inline>
                <template v-for="value in values">
                    <gov-radio v-model="inline" :native-value="value">
                        {{ value }}
                    </gov-radio>
                </template>
            </gov-radio-container>
        </gov-field>

        <gov-field message="Which value do you want">
            <gov-radio-container>
                <template v-for="value in values">
                    <gov-radio v-model="block" :native-value="value">
                        {{ value }}
                    </gov-radio>
                </template>
            </gov-radio-container>
        </gov-field>

        <gov-field>
            <gov-radio-container validation-message="This field is required">
                <template v-for="value in values">
                    <gov-radio v-model="error" :native-value="value">
                        {{ value }}
                    </gov-radio>
                </template>
            </gov-radio-container>
        </gov-field>
    </section>
</template>

<script>
export default {
    data() {
        return {
            inline: null,
            error: null,
            block: null,
            values: [
                'First value', 'Second value', 'Third value'
            ]
        }
    }
}
</script>
