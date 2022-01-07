export default [
    {
        title: 'Tabs',
        props: [
            {
                name: '<code>v-model</code>',
                description: 'Binding value, tab index. Passing undefined will show the first tab, null will show no tab',
                type: 'String, Number, Null',
                values: '—',
                default: '<code>undefined</code>'
            },
            {
                name: '<code>destroy-on-hide</code>',
                description: 'Destroy tabitem on hide',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            }
        ],
        events: [
            {
                name: '<code>input</code>',
                description: 'Triggers when tab is changed',
                parameters: '<code>value: String|Number</code>'
            },
        ]
    },
    {
        title: 'Item',
        props: [
            {
                name: '<code>label</code>',
                description: 'Tab label',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>value</code>',
                description: 'Tab identifier',
                type: 'String',
                values: '—',
                default: 'Vnode uid'
            },
            {
                name: '<code>disabled</code>',
                description: 'Item is disabled',
                type: 'Boolean',
                values: '-',
                default: 'false'
            },
            {
                name: '<code>visible</code>',
                description: 'Item is visible',
                type: 'Boolean',
                values: '-',
                default: 'true'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'Tab item body',
                props: '—'
            }
        ]
    }
]
