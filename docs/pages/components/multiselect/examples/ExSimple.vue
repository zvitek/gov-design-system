<template>
    <section>
        {{ selected }}
        <gov-multiselect label="Select the name" :multiselect="false" v-model="selected" :data="data" search-field="user.first_name" unique-field="id"/>
    </section>
</template>

<script>
    // const data = require('@/data/sample.json')

    export default {
        data() {
            return { data: ["karel", "pepa", "katka", "zdenda"], selected: "karel" }
        }
    }
</script>
