export default [
    {
        title: 'Menu',
        props: [
            {
                name: '<code>complex</code>',
                description: '-',
                type: 'Boolean',
                values: '—',
                default: 'false'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'Menu list elements',
                props: '—'
            }
        ]
    },
    {
        title: 'Item',
        props: [
            {
                name: '<code>label</code>',
                description: 'Menu item label',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>active</code>',
                description: 'Item is active, use the .sync modifier to make it two-way binding',
                type: 'Boolean',
                values: '-',
                default: 'false'
            },
            {
                name: '<code>tag</code>',
                description: 'Button tag name',
                type: 'String',
                values: '<code>a</code>, <code>router-link</code>, <code>nuxt-link</code> or other nuxt alias',
                default: '<code>a</code>'
            },
            {
                name: '<code>aria-role</code>',
                description: 'Role attribute to be passed to list item for better accessibility. Use <code>menuitem</code> only in situations where your sidemenu item is really related to navigation.',
                type: 'String',
                values: '<code>menuitem</code>',
                default: '—'
            },
            {
                name: 'Any native attribute',
                description: '—',
                type: '—',
                values: '—',
                default: '—'
            }
        ],
        slots: [
            {
                name: '<code>badge</code>',
                description: 'Menu list badge',
                props: '-'
            },
            {
                name: '<code>icon</code>',
                description: 'Menu list icon',
                props: '-'
            }
        ]
    }
]
