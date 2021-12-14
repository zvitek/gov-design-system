import Vue from 'vue'
import Router from 'vue-router'

import { afterEachGlobal } from './guards'
import routes from '@/data/routes'

Vue.use(Router)

function route(path, component) {
    return {
        path,
        name: path,
        meta: routes[path],
        component: () => import(`@/pages/${component}`)
    }
}

// Templates
const Documentation = () => import('@/templates/Documentation')
const NotFound = () => import('@/pages/404')

const router = new Router({
    mode: 'history',
    linkActiveClass: 'is-active',
    base: __dirname,
    routes: [
        route('/', 'Home'),
        {
            path: '/',
            component: Documentation,
            children: [
                // Documentation
                route('documentation', 'Documentation'),
                route('documentation/breadcrumb', 'components/breadcrumb/Breadcrumb'),
                route('documentation/button', 'components/button/Button'),
                // Extensions
                route('extensions', 'Extensions'),
                route('extensions/cleavejs', 'extensions/cleavejs/Cleavejs'),
                route('extensions/sortablejs', 'extensions/sortablejs/Sortablejs'),
                route('extensions/veevalidate', 'extensions/veevalidate/VeeValidate'),
                route('extensions/bulmacssvars', 'extensions/bulmacssvars/BulmaCssVars'),
                // Expo
                route('expo', 'Expo')
            ]
        },
        // Global redirect
        // { path: '*', redirect: '404' }
        // 404 page
        {
            path: '*',
            name: 'notfound',
            meta: routes['notfound'],
            component: NotFound
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash
            }
        }
    }
})

router.afterEach(afterEachGlobal)

export default router
