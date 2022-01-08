<template>
    <section>
        <p class="content"><b>Selected:</b> {{ selected }}</p>
        <gov-field label="Find a JS framework">
            <gov-autocomplete
                v-model="name"
                :data="filteredDataArray"
                @select="option => selected = option">
                <template #empty>No results found</template>
            </gov-autocomplete>
        </gov-field>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                data: [
                    'Angular',
                    'Angular 2',
                    'Aurelia',
                    'Backbone',
                    'Ember',
                    'jQuery',
                    'Meteor',
                    'Node.js',
                    'Polymer',
                    'React',
                    'RxJS',
                    'Vue.js'
                ],
                name: '',
                selected: null
            }
        },
        computed: {
            filteredDataArray() {
                return this.data.filter((option) => {
                    return option
                        .toString()
                        .toLowerCase()
                        .indexOf(this.name.toLowerCase()) >= 0
                })
            }
        }
    }
</script>
