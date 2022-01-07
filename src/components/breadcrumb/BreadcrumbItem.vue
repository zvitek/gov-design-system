<template>
    <span
        class="gov-breadcrumbs__item">
        <component
            :is="computedTag"
            v-bind="$attrs"
            v-on="$listeners"
            :class="computedClasses"
        >
            <slot />
        </component>
    </span>
</template>

<script>
import config from '../../utils/config'

export default {

    name: 'GovBreadcrumbItem',

    inheritAttrs: false,

    props: {
        tag: {
            type: String,
            default: () => {
                return config.defaultBreadcrumbTag
            }
        },
        active: Boolean
    },

    computed: {
        computedTag() {
            if (this.active) {
                return 'strong'
            }
            return this.tag
        },
        computedClasses() {
            const table = {
                'strong': 'gov-title gov-title--delta'
            }

            return table[this.computedTag] || 'gov-link gov-link--standalone'
        }
    }
}
</script>
