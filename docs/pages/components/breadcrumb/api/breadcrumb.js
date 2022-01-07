export default [
    {
        title : 'Breadcrumb Item',
        props: [
            {
                name: '<code>tag</code>',
                description: "a, router-link and it's html attributes like href, to, etc...",
                type: 'String',
                values: '<code>router-link</code>, <code>a</code>',
                default: '<code>a</code>'
            },
             {
                name: '<code>active</code>',
                description: 'is the current breadcrumb is actually the current page.',
                type: 'Boolean',
                values: '<code>false</code>, <code>true</code>',
                default: '<code>false</code>'
            }
        ]
    }
]
