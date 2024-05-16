/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: ['@antfu'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'vue/component-tags-order': ['error', {
      order: [['template', 'script'], 'style'],
    }],
  },
  ignorePatterns: ['node_modules/listr2/dist/index.js', 'dist'],
}
