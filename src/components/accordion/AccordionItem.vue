<template>
    <div>
        <button
            class="gov-accordion__header"
            :id="ariaId"
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
            :aria-labelledby="ariaId"
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
            default: ''
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
            isOpen: this.open
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
    }
}
</script>
