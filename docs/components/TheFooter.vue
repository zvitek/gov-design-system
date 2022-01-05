<template>
    <footer class="footer">
        <div class="container">
            <div class="content">
                <div class="columns">
                    <div class="column">
                        <p>
                            <small>
                                Gov's source code is licensed under
                                <a href="http://opensource.org/licenses/mit-license.php" target="_blank">MIT</a>.
                            </small>
                        </p>

                        <gov-field>
                            <p class="control">
                                <a
                                    class="button gov-link--external-unset"
                                    href="https://github.com/gowue/gowue"
                                    target="_blank">
                                    <gov-icon icon="github-circle"/>
                                    <span>GitHub</span>
                                </a>
                            </p>
                        </gov-field>
                        <small>
                            This site is powered by <a href="https://www.netlify.com">Netlify</a>
                        </small>
                    </div>

                    <div class="column">
                        <router-link
                            to="/"
                            exact
                            class="navbar-item has-text-weight-semibold">
                            Home
                        </router-link>

                        <router-link
                            to="/documentation"
                            class="navbar-item has-text-weight-semibold">
                            Documentation
                        </router-link>

                        <router-link
                            to="/extensions"
                            class="navbar-item has-text-weight-semibold">
                            Extensions
                        </router-link>

                        <router-link
                            to="/expo"
                            class="navbar-item has-text-weight-semibold">
                            Expo
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
