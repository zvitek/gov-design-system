'use strict';

exports.config = {
  defaultContainerElement: null,
  defaultIconPack: 'mdi',
  defaultIconComponent: null,
  defaultInputAutocomplete: 'on',
  defaultLinkTags: ['a', 'button', 'input', 'router-link', 'nuxt-link', 'n-link', 'RouterLink', 'NuxtLink', 'NLink'],
  defaultBreadcrumbTag: 'a',
  customIconPacks: null
};
var setOptions = function setOptions(options) {
  exports.config = options;
};
var setVueInstance = function setVueInstance(Vue) {
  exports.VueInstance = Vue;
};

exports.setOptions = setOptions;
exports.setVueInstance = setVueInstance;
