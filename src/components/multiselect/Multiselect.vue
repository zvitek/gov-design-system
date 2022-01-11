<template>
    <gov-field :label="label">
        <gov-autocomplete
            v-model="name"
            :data="filteredDataArray"
            :clear-on-select="clearOnSelect"
            :open-on-focus="openOnFocus"
            :field="searchField"
            @select="option => selected = option">
            <template #empty>No results found</template>
        </gov-autocomplete>
        <ul class="gov-multiselect__tags">
            <li
                class="gov-multiselect__tag"
                :key="index"
                v-for="(item, index) in selectedState">
                <span>{{ getValue(item) }}</span>
                <button
                    class="gov-button--icon-only"
                    type="button"
                    @click.prevent="remove(index)"
                    aria-label="Odebrat"/>
            </li>
        </ul>
    </gov-field>
</template>

<script>
import FormElementMixin from '../../utils/FormElementMixin'
import {getValueByPath, isSingleValue, returnAsArray} from '../../utils/helpers'

export default {
    name: 'GovMultiselect',
    mixins: [FormElementMixin],
    props: {
        value: [Array, Number, String],
        data: {
            type: Array,
            required: true
        },
        label: {
            type: String,
            required: false,
            default: null
        },
        searchField: {
            type: String,
            required: false,
            default: null
        },
        uniqueField: {
            type: String,
            required: false,
            default: null
        },
        clearOnSelect: {
            type: Boolean,
            required: false,
            default: true
        },
        openOnFocus: {
            type: Boolean,
            required: false,
            default: false
        },
        multiselect: {
            type: Boolean,
            required: false,
            default: true
        },
        customUniqueId: {
            type: [String, Number],
            required: false,
            default: null
        }
    },
    data() {
        return {
            name: '',
            selectedState: returnAsArray(this.value),
            selected: null
        }
    },
    computed: {
        filteredDataArray() {
            return this.data.filter((option) => {
                let val = option
                if (!isSingleValue(option)) {
                    val = getValueByPath(option, this.searchField)
                }
                return val
                    .toString()
                    .toLowerCase()
                    .indexOf(this.name.toLowerCase()) >= 0
            })
        }
    },
    watch: {
        value: function (newValue) {
            this.selectedState = returnAsArray(newValue)
        },
        selected: function (newValue) {
            if (newValue) {
                let value = newValue
                if (isSingleValue(newValue) === false) {
                    value = getValueByPath(newValue, this.uniqueField)
                }
                if (this.isSelected(value) === false) {
                    if (this.multiselect) {
                        this.selectedState.push(newValue)
                    } else {
                        this.selectedState = [newValue]
                    }
                }
            }
        },
        selectedState: function () {
            if (this.multiselect) {
                this.$emit('input', this.selectedState)
            } else {
                this.$emit('input', this.selectedState.length ? this.selectedState[0] : null)
            }
        }
    },
    methods: {
        isSelected(current) {
            return !!this.selectedState.filter((item) => {
                if (isSingleValue(item)) {
                    return item === current
                } else {
                    return getValueByPath(item, this.uniqueField) === current
                }
            }).length
        },
        getValue(option) {
            if (isSingleValue(option)) {
                return option
            } else {
                return getValueByPath(option, this.searchField)
            }
        },
        remove(index) {
            if (this.selectedState.hasOwnProperty(index)) {
                this.selectedState.splice(index, 1)
            }
            this.name = ''
        }
    }
}
</script>
