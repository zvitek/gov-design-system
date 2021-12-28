<template>
    <section class="home">
        <TheNavbar light/>
        <div class="hero is-fullheight is-primary">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <div class="logo-rounded home-hero">
                        <img src="../assets/gov-white.svg" width="140" alt="">
                    </div>
                    <h2 class="subtitle home-hero">
                        <strong>Lightweight</strong> UI components for <strong><a href="https://vuejs.org/" target="_blank">Vue.js</a></strong>
                        based on <strong><a href="https://designsystem.gov.cz/" rel="nofollow" target="_blank">Design systém gov.cz</a></strong>
                    </h2>
                    <pre class="npm home-hero"><code><span class="is-unselectable">$ </span>npm install gov</code></pre>

                    <div class="buttons">
                        <router-link
                            class="button is-medium home-hero"
                            to="/documentation/start">
                            Get started
                        </router-link>
                        <a class="button is-medium is-primary home-hero"
                           href="https://github.com/gowue/gowue/releases"
                           target="_blank">
                            Changelog
                        </a>
                    </div>
                    <small class="home-hero">v{{ version }}</small>
                </div>
            </div>
        </div>

        <section class="hero">
            <div class="hero-body">
                <div class="container">
                    <div class="columns">
                        <div class="column has-text-centered features">
                            <gov-icon icon="github-circle" size="is-large"/>
                            <p class="title is-4"><strong>Free</strong></p>
                            <p class="subtitle">Open source on <strong><a href="https://github.com/gowue/gowue" target="_blank">GitHub</a></strong></p>
                        </div>
                        <div class="column has-text-centered features">
                            <gov-icon icon="cellphone-link" size="is-large"/>
                            <p class="title is-4"><strong>Responsive</strong></p>
                            <p class="subtitle"><b>Every</b> component is responsive</p>
                        </div>
                        <div class="column has-text-centered features">
                            <gov-icon icon="alert-decagram" size="is-large"/>
                            <p class="title is-4"><strong>Modern</strong></p>
                            <p class="subtitle">
                                Built with <strong><a href="https://vuejs.org/" target="_blank">Vue.js</a></strong>
                                and <strong><a href="https://designsystem.gov.cz/" target="_blank">gov.cz</a></strong>
                            </p>
                        </div>
                        <div class="column has-text-centered features">
                            <gov-icon pack="far" icon="paper-plane" size="is-large"/>
                            <p class="title is-4"><strong>Lightweight</strong></p>
                            <p class="subtitle">No other internal dependency</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <TheFooter/>
    </section>
</template>

<script>
    import ScrollReveal from 'scrollreveal'
    import TheNavbar from '../components/TheNavbar'
    import TheFooter from '../components/TheFooter'
    import Package from '../../package.json'

    export default {
        name: 'App',
        components: {
            TheNavbar,
            TheFooter
        },
        data() {
            return {
                version: Package.version,
            }
        },
        mounted() {
            const sr = ScrollReveal({
                duration: 400,
                delay: 200
            })
            sr.reveal('.home-hero', { delay: 0, origin: 'top' }, 200)
            sr.reveal('.features', 200)
        }
    }
</script>
