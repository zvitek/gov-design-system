<template>
    <footer class="gov-container u-bg-color--grey-dark gov-footer">
        <div class="gov-container__content">
            <section class="gov-footer__upper u-screen--only">
                <div class="gov-footer__col">
                    <ul class="gov-list--plain">
                        <li>
                            <a
                                class="gov-link gov-link--standalone
                                gov-link--inversed gov-link--external-unset"
                                href="https://github.com/gowue/gowue"
                                target="_blank">
                                GitHub
                            </a>
                        </li>
                        <li>
                            <router-link
                                to="/"
                                exact
                                class="gov-link gov-link--standalone
                                gov-link--inversed gov-link--external-unset">
                                Home
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                to="/documentation"
                                class="gov-link gov-link--standalone
                                gov-link--inversed gov-link--external-unset">
                                Documentation
                            </router-link>
                        </li>
                    </ul>
                </div>
            </section>
            <hr>
            <section class="gov-footer__lower">
                <p class="gov-footnote">
                    gowue source code is licensed under MIT.<br>
                    This site is powered by <a href="https://www.netlify.com">Netlify</a>
                </p>
                <p class="gov-footnote">0.1.0</p>
            </section>
            <button
                class="gov-button gov-button--primary-outlined
                gov-button--inversed gov-footer__scroll-up gov-js--scroll-up">
                <span class="u-sr-only gov-button__label"/>
            </button>
        </div>
    </footer>
</template>
