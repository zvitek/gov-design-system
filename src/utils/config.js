let config = {
    defaultContainerElement: null,
    defaultIconPack: 'mdi',
    defaultIconComponent: null,
    defaultInputAutocomplete: 'on',
    defaultLinkTags: [
        'a',
        'button',
        'input',
        'router-link',
        'nuxt-link',
        'n-link',
        'RouterLink',
        'NuxtLink',
        'NLink'
    ],
    defaultBreadcrumbTag: 'a',
    customIconPacks: null
}

export { config as default }

export const setOptions = (options) => { config = options }

export const setVueInstance = (Vue) => { VueInstance = Vue }

export let VueInstance
