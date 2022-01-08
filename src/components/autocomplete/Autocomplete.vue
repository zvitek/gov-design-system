<template>
    <div
        class="gov-autocomplete"
        role="combobox"
        aria-haspopup="listbox">
        <gov-input
            v-model="newValue"
            ref="input"
            :maxlength="maxlength"
            :autocomplete="newAutocomplete"
            :aria-autocomplete="ariaAutocomplete"
            :custom-unique-id="customUniqueId"
            v-bind="$attrs"
            @input="onInput"
            @focus="focused"
            @blur="onBlur"
            @keydown.native="keydown"
            @keydown.native.up.prevent="keyArrows('up')"
            @keydown.native.down.prevent="keyArrows('down')"
        />
        <div
            :style="style"
            ref="dropdown">
            <ul
                class="gov-autocomplete__results"
                v-show="isActive && (!isEmpty || hasEmptySlot)">
                <template v-for="(element, groupindex) in computedData">
                    <li
                        class="gov-autocomplete__result"
                        role="option"
                        v-if="element.group"
                        :key="groupindex + 'group'">
                        <slot
                            v-if="hasGroupSlot"
                            name="group"
                            :group="element.group"
                            :index="groupindex" />
                        <strong v-else>
                            {{ element.group }}
                        </strong>
                    </li>
                    <li
                        class="gov-autocomplete__result"
                        :class="{ 'selected': option === hovered }"
                        v-for="(option, index) in element.items"
                        :key="groupindex + ':' + index"
                        @click.stop="setSelected(option, !keepOpen, $event)"
                        role="option">
                        <slot
                            v-if="hasDefaultSlot"
                            :option="option"
                            :index="index" />
                        <template v-else>
                            {{ getValue(option, true) }}
                        </template>
                    </li>
                </template>
                <li class="gov-autocomplete__empty" v-if="isEmpty && hasEmptySlot">
                    <slot name="empty" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getValueByPath, isCustomElement } from '../../utils/helpers'
import FormElementMixin from '../../utils/FormElementMixin'
import Input from '../input/Input'

export default {
    name: 'GovAutocomplete',
    components: {
        [Input.name]: Input
    },
    mixins: [FormElementMixin],
    inheritAttrs: false,
    props: {
        value: [Number, String],
        data: {
            type: Array,
            default: () => []
        },
        field: {
            type: String,
            default: 'value'
        },
        keepFirst: Boolean,
        clearOnSelect: Boolean,
        openOnFocus: Boolean,
        customFormatter: Function,
        checkInfiniteScroll: Boolean,
        keepOpen: Boolean,
        selectOnClickOutside: Boolean,
        clearable: Boolean,
        maxHeight: [String, Number],
        groupField: String,
        groupOptions: String,
        confirmKeys: {
            type: Array,
            default: () => ['Tab', 'Enter']
        },
        customUniqueId: {
            type: [String, Number],
            required: false,
            default: null
        }
    },
    data() {
        return {
            selected: null,
            hovered: null,
            isActive: false,
            newValue: this.value,
            newAutocomplete: this.autocomplete || 'off',
            ariaAutocomplete: this.keepFirst ? 'both' : 'list',
            hasFocus: false,
            style: {},
            _isAutocomplete: true,
            _elementRef: 'input'
        }
    },
    computed: {
        computedData() {
            if (this.groupField) {
                if (this.groupOptions) {
                    const newData = []
                    this.data.forEach((option) => {
                        const group = getValueByPath(option, this.groupField)
                        const items = getValueByPath(option, this.groupOptions)
                        newData.push({ group, items })
                    })
                    return newData
                } else {
                    const tmp = {}
                    this.data.forEach((option) => {
                        const group = getValueByPath(option, this.groupField)
                        if (!tmp[group]) tmp[group] = []
                        tmp[group].push(option)
                    })
                    const newData = []
                    Object.keys(tmp).forEach((group) => {
                        newData.push({ group, items: tmp[group] })
                    })
                    return newData
                }
            }
            return [{ items: this.data }]
        },
        isEmpty() {
            if (!this.computedData) return true
            return !this.computedData.some((element) => element.items && element.items.length)
        },
        /**
         * White-listed items to not close when clicked.
         * Add input, dropdown and all children.
         */
        whiteList() {
            const whiteList = []
            whiteList.push(this.$refs.input.$el.querySelector('input'))
            whiteList.push(this.$refs.dropdown)
            // Add all children from dropdown
            if (this.$refs.dropdown !== undefined) {
                const children = this.$refs.dropdown.querySelectorAll('*')
                for (const child of children) {
                    whiteList.push(child)
                }
            }
            if (this.$parent.$data._isTaginput) {
                // Add taginput container
                whiteList.push(this.$parent.$el)
                // Add .tag and .delete
                const tagInputChildren = this.$parent.$el.querySelectorAll('*')
                for (const tagInputChild of tagInputChildren) {
                    whiteList.push(tagInputChild)
                }
            }

            return whiteList
        },

        /**
         * Check if exists default slot
         */
        hasDefaultSlot() {
            return !!this.$scopedSlots.default
        },

        /**
         * Check if exists group slot
         */
        hasGroupSlot() {
            return !!this.$scopedSlots.group
        },

        /**
         * Check if exists "empty" slot
         */
        hasEmptySlot() {
            return !!this.$slots.empty
        }
    },
    watch: {
        /**
         * When updating input's value
         *   1. Emit changes
         *   2. If value isn't the same as selected, set null
         *   3. Close dropdown if value is clear or else open it
         */
        newValue(value) {
            this.$emit('input', value)
            // Check if selected is invalid
            const currentValue = this.getValue(this.selected)
            if (currentValue && currentValue !== value) {
                this.setSelected(null, false)
            }
            // Close dropdown if input is clear or else open it
            if (this.hasFocus && (!this.openOnFocus || value)) {
                this.isActive = !!value
            }
        },

        /**
         * When v-model is changed:
         *   1. Update internal value.
         *   2. If it's invalid, validate again.
         */
        value(value) {
            this.newValue = value
        },

        /**
         * Select first option if "keep-first
         */
        data() {
            // Keep first option always pre-selected
            if (this.keepFirst) {
                this.$nextTick(() => {
                    if (this.isActive) {
                        this.selectFirstOption(this.computedData)
                    } else {
                        this.setHovered(null)
                    }
                })
            }
        }
    },
    methods: {
        /**
         * Set which option is currently hovered.
         */
        setHovered(option) {
            if (option === undefined) return

            this.hovered = option
        },

        /**
         * Set which option is currently selected, update v-model,
         * update input value and close dropdown.
         */
        setSelected(option, closeDropdown = true, event = undefined) {
            if (option === undefined) return
            this.selected = option
            this.$emit('select', this.selected, event)
            if (this.selected !== null) {
                if (this.clearOnSelect) {
                    const input = this.$refs.input
                    input.newValue = ''
                    input.$refs.input.value = ''
                    input.$refs.input.focus()
                } else {
                    this.newValue = this.getValue(this.selected)
                }
                this.setHovered(null)
            }
            closeDropdown && this.$nextTick(() => {
                this.isActive = false
            })
        },

        /**
         * Select first option
         */
        selectFirstOption(computedData) {
            this.$nextTick(() => {
                const nonEmptyElements = computedData.filter(
                    (element) => element.items && element.items.length
                )
                if (nonEmptyElements.length) {
                    const option = nonEmptyElements[0].items[0]
                    this.setHovered(option)
                } else {
                    this.setHovered(null)
                }
            })
        },

        keydown(event) {
            const { key } = event // cannot destructure preventDefault (https://stackoverflow.com/a/49616808/2774496)
            // prevent emit submit event
            if (key === 'Enter') event.preventDefault()
            // Close dropdown on Tab & no hovered
            if (key === 'Escape' || key === 'Tab') {
                this.isActive = false
            }

            if (this.confirmKeys.indexOf(key) >= 0) {
                // If adding by comma, don't add the comma to the input
                if (key === ',') event.preventDefault()
                // Close dropdown on select by Tab
                const closeDropdown = !this.keepOpen || key === 'Tab'
                if (this.hovered === null) {
                    return
                }
                this.setSelected(this.hovered, closeDropdown, event)
            }
        },

        /**
         * Close dropdown if clicked outside.
         */
        clickedOutside(event) {
            const target = isCustomElement(this) ? event.composedPath()[0] : event.target
            if (!this.hasFocus && this.whiteList.indexOf(target) < 0) {
                if (this.keepFirst && this.hovered && this.selectOnClickOutside) {
                    this.setSelected(this.hovered, true)
                } else {
                    this.isActive = false
                }
            }
        },

        /**
         * Return display text for the input.
         * If object, get value from path, or else just the value.
         */
        getValue(option) {
            if (option === null) return

            if (typeof this.customFormatter !== 'undefined') {
                return this.customFormatter(option)
            }
            return typeof option === 'object' ? getValueByPath(option, this.field) : option
        },

        /**
         * Check if the scroll list inside the dropdown
         * reached it's end.
         */
        checkIfReachedTheEndOfScroll(list) {
            if (list.clientHeight !== list.scrollHeight &&
                list.scrollTop + list.clientHeight >= list.scrollHeight
            ) {
                this.$emit('infinite-scroll')
            }
        },

        /**
         * Arrows keys listener.
         * If dropdown is active, set hovered option, or else just open.
         */
        keyArrows(direction) {
            const sum = direction === 'down' ? 1 : -1
            if (this.isActive) {
                const data = this.computedData.map(
                    (d) => d.items).reduce((a, b) => ([...a, ...b]), [])
                let index = data.indexOf(this.hovered) + sum
                index = index > data.length - 1 ? data.length - 1 : index
                index = index < 0 ? 0 : index

                this.setHovered(data[index] !== undefined ? data[index] : null)

                const list = this.$refs.dropdown.querySelector('.gov-autocomplete__results')
                let querySelectorText = '.gov-autocomplete__result'
                const element = list.querySelectorAll(querySelectorText)[index]

                if (!element) return

                const visMin = list.scrollTop
                const visMax = list.scrollTop + list.clientHeight - element.clientHeight

                if (element.offsetTop < visMin) {
                    list.scrollTop = element.offsetTop
                } else if (element.offsetTop >= visMax) {
                    list.scrollTop = element.offsetTop - list.clientHeight + element.clientHeight
                }
            } else {
                this.isActive = true
            }
        },

        /**
         * Focus listener.
         * If value is the same as selected, select all text.
         */
        focused(event) {
            if (this.getValue(this.selected) === this.newValue) {
                this.$el.querySelector('input').select()
            }
            if (this.openOnFocus) {
                this.isActive = true
                if (this.keepFirst) {
                    // If open on focus, update the hovered
                    this.selectFirstOption(this.computedData)
                }
            }
            this.hasFocus = true
            this.$emit('focus', event)
        },

        /**
         * Blur listener.
         */
        onBlur(event) {
            this.hasFocus = false
            this.$emit('blur', event)
        },
        onInput() {
            const currentValue = this.getValue(this.selected)
            if (currentValue && currentValue === this.newValue) return
            this.$emit('typing', this.newValue)
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('click', this.clickedOutside)
        }
    },
    mounted() {
        if (this.checkInfiniteScroll &&
            this.$refs.dropdown && this.$refs.dropdown.querySelector('.gov-autocomplete__results')
        ) {
            const list = this.$refs.dropdown.querySelector('.gov-autocomplete__results')
            list.addEventListener('scroll', () => this.checkIfReachedTheEndOfScroll(list))
        }
    },
    beforeDestroy() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('click', this.clickedOutside)
        }
        if (this.checkInfiniteScroll &&
            this.$refs.dropdown && this.$refs.dropdown.querySelector('.gov-autocomplete__results')
        ) {
            const list = this.$refs.dropdown.querySelector('.gov-autocomplete__results')
            list.removeEventListener('scroll', this.checkIfReachedTheEndOfScroll)
        }
    }
}
</script>
