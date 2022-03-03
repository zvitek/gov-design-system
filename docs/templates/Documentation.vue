<template>
    <div>
        <TheNavbar/>
        <div class="gov-container">
            <div class="gov-container__content">
                <div class="gov-layout">
                    <div class="gov-layout__col gov-layout__col--pos-left">
                        <TheSidebar :data="menu"/>
                    </div>
                    <div
                        class="gov-layout__col gov-layout__col--pos-right
                        gov-layout__col--spread-3">
                        <TheHeader v-bind="meta"/>
                        <router-view/>
                    </div>
                </div>
            </div>
        </div>
        <TheFooter/>
    </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheNavbar from '@/components/TheNavbar'
import TheFooter from '@/components/TheFooter'
import TheSidebar from '@/components/TheSidebar'
import menuData from '@/data/menu'

export default {
    components: {
        TheHeader,
        TheNavbar,
        TheFooter,
        TheSidebar
    },
    data() {
        return {
            menu: [],
            meta: {}
        }
    },
    methods: {
        setMeta(meta) {
            this.meta = meta
            this.menu = menuData[this.meta.menu]
        },
        scrollTo(hash) {
            location.href = hash
        }
    },
    mounted() {
        this.$eventHub.$on('navigate', this.setMeta)
        this.setMeta(this.$router.currentRoute.meta)
        if (this.$route.hash) {
            this.$nextTick(() => this.scrollTo(this.$route.hash))
        }
    }
}
</script>
