<template>
    <header class="gov-container gov-container--no-y-offset gov-header">
        <div class="gov-container__content">
            <div class="gov-header__holder">
                <div class="gov-header__left">
                    <router-link
                        to="/"
                        class="gov-logo gov-logo--inversed"
                        title="
                        Gowue: lightweight UI components for Vue.js based on Gov.cz design system"
                        active-class="">
                        <div class="gov-pictogram gov-pictogram--inversed">
                            <img
                                src="../assets/gov-white.svg"
                                width="52"
                                alt="Gov">
                        </div>
                        <span class="gov-logo__sitename">gowue</span>
                    </router-link>
                </div>
                <div class="gov-header__right">
                    <div class="gov-header__item gov-header__item--login">
                        <a
                            href="https://designsystem.gov.cz/"
                            target="_blank"
                            class="
                            gov-button
                            gov-button--primary-outlined
                            gov-button--inversed gov-link--external-unset">
                            Design systém gov.cz
                        </a>
                    </div>
                </div>
            </div>
            <hr class="gov-header__separator">

            <nav class="gov-header__nav">
                <div class="gov-header__nav-holder">
                    <div class="gov-header__link">
                        <router-link
                            to="/"
                            exact
                            class="gov-link
                            gov-link--standalone  gov-link--large  gov-link--inversed">
                            Home
                        </router-link>
                    </div>
                    <div class="gov-header__link">
                        <router-link
                            to="/documentation"
                            class="gov-link
                            gov-link--standalone  gov-link--large  gov-link--inversed">
                            Documentation
                        </router-link>
                    </div>
                    <!--
                    <div class="navbar-item has-dropdown is-hoverable">
                        <div class="navbar-link">Info</div>

                        <div class="navbar-dropdown is-boxed">
                            <strong class="navbar-item is-version">
                                <span class="has-text-primary">Gowue version</span>
                                <span class="has-text-grey">{{version}}</span>
                            </strong>
                            <strong class="navbar-item is-version">
                                <span class="has-text-bulma">Design system version</span>
                                <span class="has-text-grey">{{govDsVersion}}</span>
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
                    -->
                </div>
            </nav>
        </div>
    </header>
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
        }
    },
    mounted() {
        this.$eventHub.$on('navigate', this.closeMenu)
    }
}
</script>
