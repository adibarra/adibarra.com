// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  rules: {
    'antfu/consistent-list-newline': 'off',
    'antfu/if-newline': 'off',
    'antfu/no-top-level-await': 'off',
    'no-console': 'warn',
  },
  typescript: true,
  unocss: true,
  vue: true,
})
