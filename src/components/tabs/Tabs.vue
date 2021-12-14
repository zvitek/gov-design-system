<template>
    <div class="gov-tabs" :class="mainClasses">
        <nav
            class="gov-tabs__links-holder"
            role="tablist"
            aria-orientation="horizontal"
            @keydown="manageTablistKeydown"
        >
            <button
                v-for="(childItem, childIdx) in items"
                ref="tabLink"
                role="tab"
                :key="childItem.value"
                v-show="childItem.visible"
                :id="`${childItem.value}-tab`"
                :aria-controls="`${childItem.value}-content`"
                :aria-selected="`${childItem.isActive}`"
                @click="childClick(childItem)"
                @focus="currentFocus = childIdx"
                :tabindex="childItem.isActive ? 0 : -1"
                @keydown="manageTabKeydown($event, childItem)"
                :class="['gov-tabs__link',
                         childItem.headerClass, { 'is-active': childItem.isActive,
                                                  'is-disabled': childItem.disabled }]"
            >
                {{ childItem.label }}
            </button>
        </nav>
        <div class="gov-tabs__content-holder" :class="{'is-transitioning': isTransitioning}">
            <div class="gov-tabs__content is-active">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script>
import config from '../../utils/config'
import TabbedMixin from '../../utils/TabbedMixin.js'

export default {
    name: 'BTabs',
    mixins: [TabbedMixin('tab')],
    props: {
        expanded: {
            type: Boolean,
            default: () => {
                return config.defaultTabsExpanded
            }
        },
        type: {
            type: [String, Object],
            default: () => {
                return config.defaultTabsType
            }
        },
        animated: {
            type: Boolean,
            default: () => {
                return config.defaultTabsAnimated
            }
        },
        multiline: Boolean
    },
    data() {
        return {
            currentFocus: this.value
        }
    },
    computed: {
        mainClasses() {
            return {
                'is-fullwidth': this.expanded,
                'is-vertical': this.vertical,
                'is-multiline': this.multiline,
                [this.position]: this.position && this.vertical
            }
        }
    },
    methods: {
        giveFocusToTab(tab) {
            if (tab.$el && tab.$el.focus) {
                tab.$el.focus()
            } else if (tab.focus) {
                tab.focus()
            }
        },
        manageTablistKeydown(event) {
            // https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key/Key_Values#Navigation_keys
            const { key } = event
            switch (key) {
                case this.vertical ? 'ArrowUp' : 'ArrowLeft':
                case this.vertical ? 'Up' : 'Left': {
                    let prevIdx = this.getPrevItemIdx(this.currentFocus, true)
                    if (prevIdx === null) {
                        // We try to give focus back to the last visible element
                        prevIdx = this.getPrevItemIdx(this.items.length, true)
                    }
                    if (
                        prevIdx !== null &&
                        this.$refs.tabLink &&
                        prevIdx < this.$refs.tabLink.length &&
                        !this.items[prevIdx].disabled
                    ) {
                        this.giveFocusToTab(this.$refs.tabLink[prevIdx])
                    }
                    event.preventDefault()
                    break
                }
                case this.vertical ? 'ArrowDown' : 'ArrowRight':
                case this.vertical ? 'Down' : 'Right': {
                    let nextIdx = this.getNextItemIdx(this.currentFocus, true)
                    if (nextIdx === null) {
                        // We try to give focus back to the first visible element
                        nextIdx = this.getNextItemIdx(-1, true)
                    }
                    if (
                        nextIdx !== null &&
                        this.$refs.tabLink &&
                        nextIdx < this.$refs.tabLink.length &&
                        !this.items[nextIdx].disabled
                    ) {
                        this.giveFocusToTab(this.$refs.tabLink[nextIdx])
                    }
                    event.preventDefault()
                    break
                }
            }
        },

        manageTabKeydown(event, childItem) {
            // https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key/Key_Values#Navigation_keys
            const { key } = event
            switch (key) {
                case ' ':
                case 'Space':
                case 'Spacebar':
                case 'Enter': {
                    this.childClick(childItem)
                    event.preventDefault()
                    break
                }
            }
        }
    }
}
</script>
