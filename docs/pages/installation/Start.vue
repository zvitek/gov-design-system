<template>
    <div>
        <p :id="slugifyTitle('Icons')" class="title">
            <router-link :to="`#${slugifyTitle('Icons')}`">#</router-link>
            Icons
        </p>
        <p class="subtitle">You can use another icons, and therefore you might want to add a pack</p>
        <CodeView title="Material Design Icons CDN" :code="materialIcons" expanded/>
        <CodeView title="Font Awesome 5 CDN" :code="fontAwesome5" expanded/>
        <div class="content">
            <blockquote>
                <p>Refer to its documentation for latest release / CDN.</p>
                <p>Please note that Gov doesn't include icon packs. You have to import it as you prefer (NPM, CDN, etc.).</p>
                <p>
                    If you opted for Font Awesome, you should update your
                    <router-link to="/documentation/constructor-options">constructor options</router-link>.
                </p>
            </blockquote>
        </div>

        <hr>

        For any installation and usage method, you need
        <strong><a href="https://vuejs.org" target="_blank">Vue.js</a> version 2.6+</strong>.

        <div class="media">
            <div class="media-left">
                <p :id="slugifyTitle('NPM or Yarn')" class="title">
                    <router-link :to="`#${slugifyTitle('NPM or Yarn')}`">#</router-link>
                    1
                </p>
            </div>
            <div class="media-content">
                <p class="title">NPM or Yarn <em>(recommended)</em></p>
                <p class="subtitle is-spaced">After creating a project with vue-cli or custom-made (usually Webpack)</p>
                <p class="title is-4">Installation</p>
                <CodeView code="npm install gowue" lang="bash" expanded/>
                <CodeView title="Full bundle" :code="importingBundle | pre" lang="javascript" expanded/>
                <CodeView title="Individual components as Vue plugins" :code="importingComponentsAsVuePlugins | pre" lang="javascript" expanded/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                importingBundle: `
                import Vue from 'vue'
                import Gowue from 'gowue'
                import 'gowue/dist/gov.css'

                Vue.use(Gowue)
                `,
                importingComponentsAsVuePlugins: `
                import Vue from 'vue'
                import { Button, Input } from 'gowue'
                import 'gowue/dist/gov.css'

                Vue.use(Button)
                Vue.use(Input)
                `,
                materialIcons: '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@5.8.55/css/materialdesignicons.min.css">',
                fontAwesome5: '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css">'
            }
        },
        methods: {
            slugifyTitle(title) {
                if (!title) return ''
                return title.toLowerCase()
                    .replace(/\s+/g, '-') // Replace spaces with -
                    .replace(/[^\w-]+/g, '') // Remove all non-word chars
                    .replace(/--+/g, '-') // Replace multiple - with single -
                    .replace(/^-+/, '') // Trim - from start of text
                    .replace(/-+$/, '') // Trim - from end of text
            }
        }
    }
</script>
