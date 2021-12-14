<template>
    <header class="docs-header">
        <div class="gov-breadcrumb" aria-label="breadcrumbs">
            <template v-for="(item, index) in breadcrumb">
                <span
                    v-if="routes[item]"
                    :key="item"
                    :class="{ 'gov-breadcrumbs__item': true }">
                    <strong
                        v-if="index === breadcrumb.length - 1"
                        class="gov-title gov-title--delta">
                        {{ routes[item].breadTitle || routes[item].title }}
                    </strong>
                    <router-link
                        v-else
                        :to="routes[item].path"
                        class="gov-link gov-link--standalone">
                        {{ routes[item].breadTitle || routes[item].title }}
                    </router-link>
                </span>
            </template>
        </div>

        <div class="columns">
            <div class="column">
                <h1 class="title" v-html="title"/>
                <h2 class="subtitle" v-html="subtitle"/>
            </div>
        </div>
    </header>
</template>

<script>
import routes from '@/data/routes'

export default {
    props: {
        breadcrumb: Array,
        title: String,
        subtitle: String
    },
    data() {
        return {
            routes
        }
    }
}
</script>
