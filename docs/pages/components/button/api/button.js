export default [
    {
        props: [
            {
                name: '<code>type</code>',
                description: 'Type (color) of the control, optional',
                type: 'String',
                values: `<code>gov-button--primary</code>, <code>gov-button--primary-outlined</code>, <code>gov-button--inversed</code>`,
                default: '—'
            },
            {
                name: '<code>size</code>',
                description: 'Vertical size of button, optional',
                type: 'String',
                values: '<code>gov-button--small</code>, <code>gov-button--large</code>',
                default: '—'
            },
            {
                name: '<code>label</code>',
                description: 'Button label, optional when default slot',
                type: 'String',
                values: '',
                default: '—'
            },
            {
                name: '<code>outlined</code>',
                description: 'Outlined style',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>primary</code>',
                description: 'Primary style',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>inversed</code>',
                description: 'Inversed style',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: 'Any native attribute',
                description: '—',
                type: '—',
                values: '—',
                default: '—'
            }
        ],
        events: [
            {
                name: '<code>click</code>',
                description: 'Triggers on click',
                parameters: '<code>event: $event</code>'
            },
            {
                name: '<code>[any].native</code>',
                description: 'Listen to any event using this syntax, e.g <code>mousedown.native</code>',
                parameters: '<code>event: $event</code>'
            }
        ]
    }
]
