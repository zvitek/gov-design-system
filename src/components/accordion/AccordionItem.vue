<template>
    <div>
        <button
            class="gov-accordion__header"
            :id="uniqueId"
            :aria-expanded="isOpen"
            @click="toggle"
            :class="{
                'is-expanded': isOpen,
                'gov-accordion__header--noborder': noBorder}">
            <h3>
                <slot name="icon"/>
                {{ label }}
            </h3>
        </button>
        <div
            class="gov-accordion__content"
            :aria-labelledby="uniqueId"
            v-show="isOpen"
            tabindex="-1"
            :class="{
            'is-expanded': isOpen}">
            <div class="gov-accordion__content-inner">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script>
import { makeid } from '../../utils/helpers'

export default {
    name: 'GovAccordionItem',
    model: {
        prop: 'open',
        event: 'update:open'
    },
    props: {
        open: {
            type: Boolean,
            default: false
        },
        ariaId: {
            type: String,
            required: false,
            default: null
        },
        label: {
            type: String,
            required: true
        },
        noBorder: {
            type: Boolean,
            required: false
        }
    },
    data() {
        return {
            isOpen: this.open,
            uniqueId: null
        }
    },
    watch: {
        open(value) {
            this.isOpen = value
        }
    },
    methods: {
        /**
         * Toggle and emit events
         */
        toggle() {
            this.isOpen = !this.isOpen
            this.$emit('update:open', this.isOpen)
            this.$emit(this.isOpen ? 'open' : 'close')
        }
    },
    mounted() {
        this.uniqueId = this.ariaId || 'accordion_' + makeid()
    }
}
</script>
