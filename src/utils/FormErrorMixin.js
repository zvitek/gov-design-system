export default {
    props: {
        validationMessage: {
            type: [String, Array],
            required: false,
            default: null
        }
    },
    mounted() {
        this.$nextTick(() => this.prepareValidity())
    },
    watch: {
        validationMessage: function () {
            this.prepareValidity()
        }
    },
    computed: {
        parentField() {
            let parent = this.$parent
            for (let i = 0; i < 3; i++) {
                if (parent && !parent.$data._isField) {
                    parent = parent.$parent
                }
            }
            return parent
        },
        childField() {
            let children = this.$children.filter((child) => {
                return child.$data._isField
            })
            if (children.length) {
                return children[0]
            }
            return null
        }
    },
    methods: {
        prepareValidity() {
            const msg = this.validationMessage
            if ((Array.isArray(msg) && msg.length) || typeof msg === 'string') {
                this.setValidity(msg)
            } else {
                this.setValidity(null)
            }
        },

        setValidity(message) {
            this.$nextTick(() => {
                const field = this.childField || this.parentField
                if (field) {
                    field.errorMessage = message
                }
            })
        }
    }
}
