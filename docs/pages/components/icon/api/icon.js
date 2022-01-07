export default [
    {
        props: [
            {
                name: '<code>pack</code>',
                description: 'Icon pack to use',
                type: 'String',
                values: '<code>mdi</code>, <code>fa</code>, <code>fas</code>, <code>far</code>, <code>fad</code>, <code>fal</code>',
                default: '<code>mdi</code>'
            },
            {
                name: '<code>icon</code>',
                description: 'Icon name',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>gov</code>',
                description: 'Gov icons',
                type: 'Bool',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>gov-complex</code>',
                description: 'Gov complex icons',
                type: 'Bool',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>custom-size</code>',
                description: 'Overrides icon font size, optional',
                type: 'String',
                values: `Depends on library: <code>null</code> (smallest), <code>fa-lg</code>, <code>fa-2x</code>, <code>fa-3x</code>,
                <code>fa-4x</code>, <code>fa-5x</code>,
                    <code>mdi-18px</code>, <code>mdi-24px</code>, <code>mdi-36px</code>, <code>mdi-48px</code>`,
                default: 'Depends on <code>size</code> prop'
            }
        ]
    }
]
