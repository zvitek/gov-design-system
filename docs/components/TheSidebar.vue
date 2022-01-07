<template>
    <aside class="sidebar">
        <gov-side-menu complex>
            <gov-accordion small no-inner-offset>
                <template v-for="items in data">
                    <gov-accordion-item
                        :open="true"
                        :key="items.category"
                        :label="items.category">
                        <gov-side-menu-item
                            tag="router-link"
                            :to="item.path"
                            :label="item.title"
                            v-for="item in normalizedData(items.pages)"
                            :key="item.title"/>
                    </gov-accordion-item>
                </template>
            </gov-accordion>
        </gov-side-menu>

        <a
            class="sidebar-btt"
            role="button"
            @click="backToTop">
            <gov-icon icon="arrow-expand-up" size="is-small"/>
            <span>Back to top</span>
        </a>
    </aside>
</template>

<script>
import routes from '@/data/routes'

export default {
    props: {
        data: Array
    },
    methods: {
        normalizedData(items) {
            return items.map((item) => {
                return typeof item === 'string'
                    ? routes[item]
                    : item
            })
        },
        backToTop() {
            window.scroll({
                top: 0,
                behavior: 'smooth'
            })
        }
    }
}
</script>
