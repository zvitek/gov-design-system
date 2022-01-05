export default [
    {
        props: [
            {
                name: '<code>v-model</code>',
                description: 'Binding value',
                type: 'String, Number',
                values: '—',
                default: '—'
            },
            {
                name: '<code>lazy</code>',
                description: 'Makes the binding lazy. Note: <code>v-model.lazy</code> won\'t work',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>textarea</code>',
                description: '-',
                type: 'Boolean',
                values: '-',
                default: '<code>false</code>'
            },
            {
                name: '<code>type</code>',
                description: 'Input type, like native',
                type: 'String',
                values: 'Any native input type',
                default: '<code>text</code>'
            },
            {
                name: '<code>maxlength</code>',
                description: 'Same as native <code>maxlength</code>, plus character counter',
                type: 'String, Number',
                values: '—',
                default: '—'
            },
            {
                name: '<code>custom-class</code>',
                description: 'CSS classes to be applied on input',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>validation-message</code>',
                description: 'The message which is shown when a validation error occurs',
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
                parameters: '<code>value: String|Number</code>'
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
                description: 'Set focus (internally uses the native <code>.select()</code> method)',
                return: '—'
            }
        ]
    }
]
