<template>
    <div
        class="gov-form-control"
        :class="{
            'gov-form-control--error': error || errorMessage,
            'gov-form-control--custom': custom,
            'not-empty': notEmpty}">
        <div :class="{'gov-select': select}">
            <slot/>
            <label
                class="gov-form-control__label"
                v-if="hasLabel"
                :for="uniqueId">
                <slot v-if="$slots.label" name="label"/>
                <template v-else>
                    {{ label }}
                </template>
            </label>
            <span v-if="hasMessage" class="gov-form-control__message">
                <slot v-if="$slots.message" name="message"/>
                <template v-else>
                    <template v-for="(mess, i) in formattedMessage">
                        {{ mess }}
                        <br :key="i" v-if="(i + 1) < formattedMessage.length">
                    </template>
                </template>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GovField',
    props: {
        message: {
            type: [String, Array, Object],
            required: false
        },
        error: {
            type: Boolean,
            required: false,
            default: false
        },
        label: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            errorMessage: null,
            newMessage: this.message,
            newLabel: this.label,
            notEmpty: false,
            uniqueId: null,
            select: false,
            custom: false,
            _isField: true // Used internally by Input and Select
        }
    },
    computed: {
        /**
        * Formatted message in case it's an array
        * (each element is separated by <br> tag)
        */
        formattedMessage() {
            if (typeof this.errorMessage === 'string') {
                return [this.errorMessage]
            } else if (Array.isArray(this.errorMessage)) {
                return this.errorMessage
            }
            if (typeof this.newMessage === 'string') {
                return [this.newMessage]
            }
            let messages = []
            if (Array.isArray(this.newMessage)) {
                this.newMessage.forEach((message) => {
                    if (typeof message === 'string') {
                        messages.push(message)
                    } else {
                        for (let key in message) {
                            if (message[key]) {
                                messages.push(key)
                            }
                        }
                    }
                })
            } else {
                for (let key in this.newMessage) {
                    if (this.newMessage[key]) {
                        messages.push(key)
                    }
                }
            }
            return messages.filter((m) => { if (m) return m })
        },
        hasMessage() {
            return this.newMessage || this.$slots.message || this.errorMessage
        },
        hasLabel() {
            return this.newLabel || this.$slots.label
        }
    },
    watch: {
        /**
        * Set internal message when prop change.
        */
        message(value) {
            this.newMessage = value
        },
        /**
        * Set internal label when prop change.
        */
        label(value) {
            this.newLabel = value
        }
    },
    mounted() {
        const isSelect = this.$children.filter((children) => children.$data._isSelect)
        const isCheckbox = this.$children.filter((children) => children.$data._isCheckbox)
        const isSwitch = this.$children.filter((children) => children.$data._isSwitch)
        const isCustom = this.$children.filter((children) => children.$data._isCustom)
        if (isSelect.length) {
            this.select = true
        }
        if (isCheckbox.length || isSwitch.length || isCustom.length) {
            this.custom = true
        }
    }
}

</script>
