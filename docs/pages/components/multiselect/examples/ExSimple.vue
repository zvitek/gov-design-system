<template>
    <section>
        <pre>{{ selectedSingle }}</pre>
        <gov-multiselect
            label="Select the name"
            :multiselect="false"
            v-model="selectedSingle"
            :data="dataSingle"/>

        <pre>{{ selected }}</pre>
        <gov-multiselect
            label="Select the name"
            v-model="selected"
            :data="data"
            clear-on-select
            search-field="user.first_name"
            unique-field="id"/>
    </section>
</template>

<script>
    const data = require('@/data/sample.json')

    export default {
        data() {
            return {
                dataSingle: ["Jesse", "John", "Charles", "Melissa"],
                selectedSingle: null,
                selected: [],
                data
            }
        }
    }
</script>
