// http://eslint.org/docs/user-guide/configuring

module.exports = {
  env: {
    jest: true,
  },
  extends: [
    'gov',
  ],
  rules: {
    'vue/attributes-order': 'off',
    'vue/html-self-closing': ['error', {
      'html': {
        'void': 'never',
        'normal': 'always',
        'component': 'always'
      },
      'svg': 'always',
      'math': 'always'
    }]
  }
}
