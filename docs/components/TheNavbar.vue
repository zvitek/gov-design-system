<template>
    <nav
        class="navbar docs-navbar is-spaced has-shadow"
        :class="{ 'is-primary is-transparent': light }">
        <div class="container">
            <div class="navbar-brand">
                <router-link
                    to="/"
                    class="navbar-item"
                    title="Gov: lightweight UI components for Vue.js based on Bulma"
                    active-class="">
                    <img
                        v-if="light"
                        src="../assets/gowue-light.svg"
                        alt="Gov">
                    <img
                        v-else
                        src="../assets/gov.png"
                        alt="Gov">
                </router-link>

                <a
                    class="navbar-item gov-link--external-unset"
                    :class="{ 'has-text-dark': !light }"
                    href="https://github.com/gowue/gowue"
                    target="_blank"
                    title="Github">
                    <gov-icon icon="github-circle"/>
                </a>

                <span
                    class="navbar-burger burger"
                    :class="{ 'is-active': isMenuActive }"
                    @click="isMenuActive = !isMenuActive">
                    <span/>
                    <span/>
                    <span/>
                </span>
            </div>

            <div class="navbar-menu" :class="{ 'is-active': isMenuActive }">
                <div class="navbar-end">
                    <router-link
                        to="/"
                        exact
                        class="navbar-item">
                        Home
                    </router-link>

                    <router-link to="/documentation" class="navbar-item">
                        Documentation
                    </router-link>

                    <div class="navbar-item has-dropdown is-hoverable">
                        <div class="navbar-link">Info</div>

                        <div class="navbar-dropdown is-boxed">
                            <strong class="navbar-item is-version">
                                <span class="has-text-primary">Gowue version</span>
                                <span class="has-text-grey">{{ version }}</span>
                            </strong>
                            <strong class="navbar-item is-version">
                                <span class="has-text-bulma">Design system version</span>
                                <span class="has-text-grey">{{ govDsVersion }}</span>
                            </strong>

                            <hr class="navbar-divider">
                            <a
                                class="navbar-item"
                                href="https://github.com/gowue/gowue/releases"
                                target="_blank">
                                Changelogs
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import govPackage from '../../package'
// import bulmaPackage from 'bulma/package'

export default {
    props: {
        light: Boolean
    },
    data() {
        return {
            isMenuActive: false,
            version: govPackage.version,
            govDsVersion: 0 // bulmaPackage.version
        }
    },
    methods: {
        closeMenu() {
            this.isMenuActive = false
        },
        toggleHtmlClip() {
            document
                .documentElement
                .classList
                .toggle('is-clipped-touch', this.isMenuActive)
        }
    },
    mounted() {
        this.$eventHub.$on('navigate', this.closeMenu)
    }
}
</script>
