export default [
    {
        title: 'Radio',
        props: [
            {
                name: '<code>v-model</code>',
                description: 'Binding value',
                type: 'Any',
                values: '—',
                default: '—'
            },
            {
                name: '<code>native-value</code>',
                description: 'Same as native <code>value</code>',
                type: 'Any',
                values: '—',
                default: '—'
            },
            {
                name: '<code>disabled</code>',
                description: 'Same as native <code>disabled</code>',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>required</code>',
                description: 'Same as native <code>required</code>',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>name</code>',
                description: 'Same as native <code>name</code>',
                type: 'String',
                values: '—',
                default: '—'
            }
        ],
        events: [
            {
                name: '<code>input</code>',
                description: 'Triggers when the value of checkbox is changed',
                parameters: '<code>value: Boolean</code>'
            },
            {
                name: '<code>[any].native</code>',
                description: 'Listen to any event using this syntax, e.g <code>click.native</code>',
                parameters: '<code>event: $event</code>'
            }
        ]
    }
]
