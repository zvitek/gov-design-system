export default [
    {
        props: [
            {
                name: '<code>v-model</code>',
                description: 'Binding value',
                type: 'Any',
                values: '—',
                default: '—'
            },
            {
                name: '<code>placeholder</code>',
                description: 'Text when nothing is selected',
                type: 'String',
                values: '—',
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
        events: [
            {
                name: '<code>input</code>',
                description: 'Triggers when value is changed',
                parameters: '<code>value: Any</code>'
            },
            {
                name: '<code>focus</code>',
                description: 'Triggers when input has received focus',
                parameters: '<code>event: $event</code>'
            },
            {
                name: '<code>blur</code>',
                description: 'Triggers when input has lost focus',
                parameters: '<code>event: $event</code>'
            },
            {
                name: '<code>[any].native</code>',
                description: 'Listen to any native event, e.g. <code>click.native</code>',
                parameters: '<code>event: $event</code>'
            }
        ],
        methods: [
            {
                name: '<code>focus</code>',
                description: 'Set focus',
                return: '—'
            }
        ]
    }
]
