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
                name: '<code>data</code>',
                description: 'Options / suggestions',
                type: 'Array<String>, Array<Number>, Array<Object>',
                values: '—',
                default: '—'
            },
            {
                name: '<code>field</code>',
                description: 'Property of the object (if <code>data</code> is array of objects) to use as display text, and to keep track of selected option',
                type: 'String',
                values: '—',
                default: '<code>value</code>'
            },
            {
                name: '<code>custom-formatter</code>',
                description: 'Function to format an option to a string for display in the input as alternative to <code>field</code> prop)',
                type: 'Function',
                values: '—',
                default: ''
            },
            {
                name: '<code>group-field</code>',
                description: 'Property of the object (if <code>data</code> is array of objects) to use as display text of group',
                type: 'String',
                values: '—',
                default: ''
            },
            {
                name: '<code>group-options</code>',
                description: 'Property of the object (if <code>data</code> is array of objects) to use as key to get items array of each group, optional',
                type: 'String',
                values: '—',
                default: ''
            },
            {
                name: '<code>clear-on-select</code>',
                description: 'Clear input text on select',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>open-on-focus</code>',
                description: 'Open dropdown list on focus',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>keep-first</code>',
                description: 'The first option will always be pre-selected (easier to just hit enter or tab)',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>confirm-keys</code>',
                description: 'Array of keys (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) which will select an option when typing (default tab and enter)',
                type: 'Array',
                values: '—',
                default: '<code>["Tab", "Enter"]</code>'
            },
            {
                name: '<code>clearable</code>',
                description: 'Add a button to clear the inputed text',
                type: 'Boolean',
                values: '—',
                default: 'false'
            },
            {
                name: '<code>maxlength</code>',
                description: 'Same as native <code>maxlength</code>, plus character counter',
                type: 'String, Number',
                values: '—',
                default: '—'
            },
            {
                name: '<code>check-infinite-scroll</code>',
                description: 'Makes the component check if list reached scroll end and emit <code>infinite-scroll</code> event.',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>select-on-click-outside</code>',
                description: 'Trigger the <code>@select</code> event for the first pre-selected option when clicking outside and <code>keep-first</code> is enabled',
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
        slots: [
            {
                name: 'default',
                description: '',
                props: '<code>option: String|Object</code>, <code>index: Number</code>'
            },
            {
                name: '<code>empty</code>',
                description: 'Show like an option if <code>data</code> array prop is empty',
                props: '—'
            },
            {
                name: '<code>group</code>',
                description: 'Control how the group header is output',
                props: '—'
            }
        ],
        events: [
            {
                name: '<code>input</code>',
                description: 'Triggers when value is changed',
                parameters: '<code>value: String|Number</code>'
            },
            {
                name: '<code>select</code>',
                description: 'Triggers when an option is selected or unset',
                parameters: '<code>option: String|Number|Object, event: $event</code>'
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
                name: '<code>typing</code>',
                description: 'Triggers when user is typing',
                parameters: '<code>value: String</code>'
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
            },
            {
                name: '<code>setSelected(selected: Any)</code>',
                description: 'Select an option by an object (same type of <code>data</code> property)',
                return: '—'
            }
        ]
    }
]
