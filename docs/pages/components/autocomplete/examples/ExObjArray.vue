<template>
    <section>
        <p class="content"><b>Selected:</b> {{ selected }}</p>
        <gov-field label="Find a name">
            <gov-autocomplete
                v-model="name"
                :data="filteredDataObj"
                field="user.first_name"
                @select="option => (selected = option)"
                clearable>
            </gov-autocomplete>
        </gov-field>
    </section>
</template>

<script>
const data = require('@/data/sample.json')

export default {
    data() {
        return {
            data,
            name: '',
            selected: null
        }
    },
    computed: {
        filteredDataObj() {
            return this.data.filter(option => {
                return (
                    option.user.first_name
                        .toString()
                        .toLowerCase()
                        .indexOf(this.name.toLowerCase()) >= 0
                )
            })
        }
    }
}
</script>
