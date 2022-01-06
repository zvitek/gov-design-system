<template>
    <section>
        <gov-field message="ddd" error>
            <ul class="gov-form-group">
                <gov-radio v-model="radio"
                           size="is-small"
                           native-value="small">
                    Small
                </gov-radio>
                <gov-radio v-model="radio"
                           native-value="default">
                    Default
                </gov-radio>
                <gov-radio v-model="radio"
                           size="is-medium"
                           native-value="medium">
                    Medium
                </gov-radio>
            </ul>
        </gov-field>
    </section>
</template>

<script>
export default {
    data() {
        return {
            radio: 'default'
        }
    }
}
</script>
