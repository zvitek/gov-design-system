<template>
    <span
        :class="[newPack, newIcon]"
        v-if="gov || govComplex" />
    <span
        class="icon"
        :class="[size]"
        v-else>
        <i
            v-if="!useIconComponent"
            :class="[newPack, newIcon, newCustomSize, customClass]"/>

        <component
            v-else
            :is="useIconComponent"
            :icon="[newPack, newIcon]"
            :size="newCustomSize"
            :class="[customClass]"/>
    </span>
</template>

<script>
import config from '../../utils/config'
import getIcons from '../../utils/icons'

export default {
    name: 'GovIcon',
    props: {
        component: String,
        pack: String,
        icon: String,
        size: String,
        customSize: String,
        customClass: String,
        both: Boolean, // This is used internally to show both MDI and FA icon
        gov: {
            type: Boolean,
            default: false
        },
        govComplex: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        iconConfig() {
            let allIcons = getIcons()
            return allIcons[this.newPack]
        },
        iconPrefix() {
            if (this.iconConfig && this.iconConfig.iconPrefix) {
                return this.iconConfig.iconPrefix
            }
            return ''
        },
        /**
        * Internal icon name based on the pack.
        * If pack is 'fa', gets the equivalent FA icon name of the MDI,
        * internal icons are always MDI.
        */
        newIcon() {
            return `${this.iconPrefix}${this.getEquivalentIconOf(this.icon)}`
        },
        newPack() {
            if (this.gov) return 'gov-icon'
            else if (this.govComplex) return 'gov-complex-icon'
            else return this.pack || config.defaultIconPack
        },
        newCustomSize() {
            return this.customSize || this.customSizeByPack
        },
        customSizeByPack() {
            if (this.iconConfig && this.iconConfig.sizes) {
                if (this.size && this.iconConfig.sizes[this.size] !== undefined) {
                    return this.iconConfig.sizes[this.size]
                } else if (this.iconConfig.sizes.default) {
                    return this.iconConfig.sizes.default
                }
            }
            return null
        },
        useIconComponent() {
            return this.component || config.defaultIconComponent
        }
    },
    methods: {
        /**
        * Equivalent icon name of the MDI.
        */
        getEquivalentIconOf(value) {
            // Only transform the class if the both prop is set to true
            if (!this.both) {
                return value
            }

            if (this.iconConfig &&
                this.iconConfig.internalIcons &&
                this.iconConfig.internalIcons[value]) {
                return this.iconConfig.internalIcons[value]
            }
            return value
        }
    }
}
</script>
