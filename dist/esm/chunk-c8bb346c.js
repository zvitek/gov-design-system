var config = {
  defaultContainerElement: null,
  defaultIconPack: 'mdi',
  defaultIconComponent: null,
  defaultInputAutocomplete: 'on',
  defaultLinkTags: ['a', 'button', 'input', 'router-link', 'nuxt-link', 'n-link', 'RouterLink', 'NuxtLink', 'NLink'],
  defaultBreadcrumbTag: 'a',
  customIconPacks: null
};
var setOptions = function setOptions(options) {
  config = options;
};
var setVueInstance = function setVueInstance(Vue) {
  VueInstance = Vue;
};
var VueInstance;

export { VueInstance as V, setOptions as a, config as c, setVueInstance as s };
