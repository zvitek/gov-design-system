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
                route('documentation/start', 'installation/Start'),
                route('documentation/constructor-options', 'installation/ConstructorOptions'),
                route('documentation/icon', 'components/icon/Icon'),
                route('documentation/tabs', 'components/tabs/Tabs'),
                route('documentation/accordion', 'components/accordion/Accordion'),
                route('documentation/autocomplete', 'components/autocomplete/Autocomplete'),
                route('documentation/badge', 'components/badge/Badge'),
                route('documentation/field', 'components/field/Field'),
                route('documentation/input', 'components/input/Input'),
                route('documentation/select', 'components/select/Select'),
                route('documentation/multiselect', 'components/multiselect/Multiselect'),
                route('documentation/checkbox', 'components/checkbox/Checkbox'),
                route('documentation/radio', 'components/radio/Radio'),
                route('documentation/switch', 'components/switch/Switch'),
                route('documentation/breadcrumb', 'components/breadcrumb/Breadcrumb'),
                route('documentation/button', 'components/button/Button'),
                route('documentation/sidemenu', 'components/sidemenu/SideMenu')
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
