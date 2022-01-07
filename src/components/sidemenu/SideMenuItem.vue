<template>
    <li :role="ariaRoleMenu" class="gov-sidenav__item">
        <component
            :is="tag"
            v-bind="$attrs"
            :class="{
                'gov-sidenav__link': true,
            }"
            @click="onClick($event)"
            v-on="$listeners">
            <slot name="icon"/>
            <span v-if="label">{{ label }}</span>
            <slot name="badge"/>
        </component>
    </li>
</template>

<script>
import config from '../../utils/config'

export default {
    name: 'GovSideMenuItem',
    inheritAttrs: false,
    model: {
        prop: 'active',
        event: 'update:active'
    },
    props: {
        label: String,
        active: Boolean,
        tag: {
            type: String,
            default: 'a',
            validator: (value) => {
                return config.defaultLinkTags.indexOf(value) >= 0
            }
        },
        ariaRole: {
            type: String,
            default: ''
        }
    },
    computed: {
        ariaRoleMenu() {
            return this.ariaRole === 'menuitem' ? this.ariaRole : null
        }
    },
    methods: {
        onClick(event) {
            if (this.disabled) return
            this.$emit('update:active', event)
        }
    }
}
</script>
