<template>
    <section>
        <div class="block">
            <gov-switch v-model="showMusic"> Show Music item (using <code>v-if</code>) </gov-switch>
        </div>
        <div class="block">
            <gov-switch v-model="showBooks"> Show books item (by adding / removing from the array) </gov-switch>
        </div>
        <gov-tabs v-model="activeTab">
            <template v-for="tab in tabs">
                <gov-tab-item
                    v-if="tab.displayed"
                    :key="tab.id"
                    :value="tab.id"
                    :label="tab.label">
                    <div v-html="tab.content"/>
                </gov-tab-item>
            </template>
        </gov-tabs>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                activeTab: 'pictures',
                showMusic: true,
                showBooks: false
            }
        },
        computed: {
            baseTabs() {
                return [
                    {
                        id: 'pictures',
                        label: 'Pictures',
                        content: '<p>Pictures: Lorem ipsum dolor sit amet.</p>',
                        displayed: true,
                    },
                    {
                        id: 'music',
                        label: 'Music',
                        content: '<p>Music: Lorem ipsum dolor sit amet.</p>',
                        displayed: this.showMusic,
                    },
                    {
                        id: 'videos',
                        label: 'Videos',
                        content: '<p>Videos: Lorem ipsum dolor sit amet.</p>',
                        displayed: true,
                    },
                    {
                        id: 'games',
                        label: 'Games',
                        content: '<p>Games: Lorem ipsum dolor sit amet.</p>',
                        displayed: true,
                    },
                    {
                        id: 'comics',
                        label: 'Comics',
                        content: '<p>Comics: Lorem ipsum dolor sit amet.</p>',
                        displayed: true,
                    },
                    {
                        id: 'movies',
                        label: 'Movies',
                        content: '<p>Movies: Lorem ipsum dolor sit amet.</p>',
                        displayed: true,
                    }
                ]
            },
            tabs() {
                const tabs = [...this.baseTabs]
                if (this.showBooks) {
                    tabs.splice(tabs.length - 2, 0, this.bookTab);
                }
                return tabs
            },
            bookTab() {
                return {
                    id: 'books',
                    label: 'Books',
                    content: '<p>Books: Lorem ipsum dolor sit amet.</p>',
                    displayed: true,
                }
            }
        }
    }
</script>
