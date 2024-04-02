/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    '@sxzz',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn'], //未使用变量警告
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'no-console': 0,
    'no-unused-vars': 0,
    'no-restricted-syntax': 0,
    'no-undef': 0,
    'vue/html-self-closing': [
      0,
      {
        html: {
          void: 'never',
          normal: 'any',
          component: 'any',
        },
      },
    ],
  },
}
