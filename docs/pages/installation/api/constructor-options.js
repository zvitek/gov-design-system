export default [
    {
        props: [
            {
                name: '<code>defaultIconPack</code>',
                description: `Icon pack used internally and on the Icon component attribute —
                    <a href="https://materialdesignicons.com/" target="_blank">Material Design Icons</a> or
                    <a href="http://fontawesome.io/" target="_blank">FontAwesome 4</a> or
                    <a href="https://fontawesome.com/" target="_blank">FontAwesome 5</a>`,
                type: 'String',
                values: '<code>mdi</code>, <code>fa</code>, <code>fas</code>, <code>far</code>, <code>fad</code>',
                default: '<code>mdi</code>'
            },
            {
                name: '<code>defaultIconComponent</code>',
                description: `Component used to render the Icon.
                    Can be used to render FontAwesome 5 icons with the
                    <a href="https://www.npmjs.com/package/@fortawesome/vue-fontawesome" target="_blank">vue-fontawesome</a> component`,
                type: 'Component',
                values: 'FontAwesomeIcon component name',
                default: '—'
            },
            {
                name: '<code>defaultContainerElement</>',
                description: `Default container attribute for floating Notices (Toasts & Snackbars). Note that this also
                    changes the <code>position</code> of the Notices from <code>fixed</code> to <code>absolute</code>.
                    Meaning that the container <em>should</em> be <code>fixed</code>.`,
                type: 'String',
                values: '—',
                default: '<code>body</code>'
            },
            {
                name: '<code>customIconPacks</code>',
                description: 'Allows you to define your own custom icon pack to be used in Gov.',
                type: 'Object',
                values: '—',
                default: '—'
            },
            {
                name: '<code>defaultLinkTags</code>',
                description: 'Default link tags accepted as tag in some component (Button, MenuItem, PaginationButton). Can be used when using custom component or other Vue Router plugin like inertia.',
                type: 'string',
                values: '—',
                default: '<code>[a, button, input, router-link, nuxt-link, n-link, RouterLink, NuxtLink, NLink]</code>'
            },
            {
                name: '<code>defaultBreadcrumbTag</code>',
                description: 'Default link tags accepted as tag in Breadcrumb component. Can be used when using custom component or other Vue Router plugin like inertia.',
                type: 'string',
                values: '—',
                default: '<code>[a, button, input, router-link, nuxt-link, n-link, RouterLink, NuxtLink, NLink]</code>'
            }
        ]
    }
]
