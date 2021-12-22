import {default as InjectedChildMixin, Sorted} from './InjectedChildMixin'

export default (parentCmp) => ({
    mixins: [InjectedChildMixin(parentCmp, Sorted)],
    props: {
        label: String,
        visible: {
            type: Boolean,
            default: true
        },
        value: {
            type: String,
            default() { return this._uid.toString() }
        }
    },
    data() {
        return {
            elementClass: 'item',
            elementRole: null
        }
    },
    computed: {
        isActive() {
            return this.parent.activeItem === this
        }
    },
    render(createElement) {
        // if destroy apply v-if
        if (this.parent.destroyOnHide) {
            if (!this.isActive || !this.visible) {
                return
            }
        }
        const vnode = createElement('div', {
            directives: [{
                name: 'show',
                value: this.isActive && this.visible
            }],
            attrs: {
                'class': this.elementClass,
                'role': this.elementRole,
                'id': `${this.value}-content`,
                'aria-labelledby': this.elementRole ? `${this.value}-label` : null,
                'tabindex': this.isActive ? 0 : -1
            }
        }, this.$slots.default)

        return vnode
    }
})
