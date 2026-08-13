import { execSync } from 'node:child_process'
import path from 'node:path'
import Shiki from '@shikijs/markdown-it'
import { rendererRich, transformerTwoslash } from '@shikijs/twoslash'
import { unheadVueComposablesImports } from '@unhead/vue'
import Vue from '@vitejs/plugin-vue'
import fs from 'fs-extra'
import matter from 'gray-matter'
import anchor from 'markdown-it-anchor'
import LinkAttributes from 'markdown-it-link-attributes'
// @ts-expect-error 7016 - TOC types are missing
import TOC from 'markdown-it-table-of-contents'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite-plus'
import { VitePWA } from 'vite-plugin-pwa'
import Layouts from 'vite-plugin-vue-layouts'
import WebfontDownload from 'vite-plugin-webfont-dl'
import { slugify } from './src/scripts/slugify.js'

const commitHash = (process.env.COMMIT_HASH || execSync('git rev-parse HEAD').toString()).trim()
export default defineConfig({
  lint: {
    plugins: ['oxc', 'typescript', 'unicorn', 'react', 'import'],
    jsPlugins: [
      {
        name: 'vite-plus',
        specifier: 'vite-plus/oxlint-plugin',
      },
    ],
    categories: {
      correctness: 'warn',
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
    env: {
      builtin: true,
      es2026: true,
      browser: true,
      node: true,
    },
    globals: {
      computed: 'readonly',
      createApp: 'readonly',
      useDark: 'readonly',
      usePreferredDark: 'readonly',
      useToggle: 'readonly',
      defineEmits: 'readonly',
      defineExpose: 'readonly',
      defineProps: 'readonly',
      onMounted: 'readonly',
      onUnmounted: 'readonly',
      reactive: 'readonly',
      ref: 'readonly',
      shallowReactive: 'readonly',
      shallowRef: 'readonly',
      toRef: 'readonly',
      toRefs: 'readonly',
      watch: 'readonly',
      watchEffect: 'readonly',
    },
    ignorePatterns: [
      '**/*:Zone.Identifier',
      '**/.DS_Store',
      '**/.eslintcache',
      '**/.idea/',
      '**/.npm/',
      '**/.yarn/',
      '**/auto-imports.d.ts',
      '**/components.d.ts',
      '**/dist/',
      '**/node_modules/',
      '**/vite.config.ts.timestamp-*',
    ],
    rules: {
      'accessor-pairs': [
        'error',
        {
          enforceForClassMembers: true,
          setWithoutGet: true,
        },
      ],
      'array-callback-return': 'error',
      'block-scoped-var': 'error',
      'constructor-super': 'error',
      'default-case-last': 'error',
      eqeqeq: ['error', 'smart'],
      'new-cap': [
        'error',
        {
          capIsNew: false,
          newIsCap: true,
          properties: true,
        },
      ],
      'no-alert': 'error',
      'no-array-constructor': 'error',
      'no-async-promise-executor': 'error',
      'no-caller': 'error',
      'no-case-declarations': 'error',
      'no-class-assign': 'error',
      'no-compare-neg-zero': 'error',
      'no-cond-assign': ['error', 'always'],
      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],
      'no-const-assign': 'error',
      'no-control-regex': 'error',
      'no-debugger': 'error',
      'no-delete-var': 'error',
      'no-dupe-class-members': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty': [
        'error',
        {
          allowEmptyCatch: true,
        },
      ],
      'no-empty-character-class': 'error',
      'no-empty-pattern': 'error',
      'no-eval': 'error',
      'no-ex-assign': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-extra-boolean-cast': 'error',
      'no-fallthrough': 'error',
      'no-func-assign': 'error',
      'no-global-assign': 'error',
      'no-implied-eval': 'error',
      'no-import-assign': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-iterator': 'error',
      'no-labels': [
        'error',
        {
          allowLoop: false,
          allowSwitch: false,
        },
      ],
      'no-lone-blocks': 'error',
      'no-loss-of-precision': 'error',
      'no-misleading-character-class': 'error',
      'no-multi-str': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-native-nonconstructor': 'error',
      'no-new-wrappers': 'error',
      'no-obj-calls': 'error',
      'no-proto': 'error',
      'no-prototype-builtins': 'error',
      'no-redeclare': [
        'error',
        {
          builtinGlobals: false,
        },
      ],
      'no-regex-spaces': 'error',
      'no-restricted-globals': [
        'error',
        {
          message: 'Use `globalThis` instead.',
          name: 'global',
        },
        {
          message: 'Use `globalThis` instead.',
          name: 'self',
        },
      ],
      'no-restricted-properties': [
        'error',
        {
          message: 'Use `Object.getPrototypeOf` or `Object.setPrototypeOf` instead.',
          property: '__proto__',
        },
        {
          message: 'Use `Object.defineProperty` instead.',
          property: '__defineGetter__',
        },
        {
          message: 'Use `Object.defineProperty` instead.',
          property: '__defineSetter__',
        },
        {
          message: 'Use `Object.getOwnPropertyDescriptor` instead.',
          property: '__lookupGetter__',
        },
        {
          message: 'Use `Object.getOwnPropertyDescriptor` instead.',
          property: '__lookupSetter__',
        },
      ],
      'no-self-assign': [
        'error',
        {
          props: true,
        },
      ],
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-shadow-restricted-names': 'error',
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'error',
      'no-this-before-super': 'error',
      'no-throw-literal': 'error',
      'no-undef': 'error',
      'no-unexpected-multiline': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unneeded-ternary': [
        'error',
        {
          defaultAssignment: false,
        },
      ],
      'no-unreachable': 'error',
      'no-unreachable-loop': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',
      'no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTaggedTemplates: true,
          allowTernary: true,
        },
      ],
      'no-unused-vars': [
        'error',
        {
          args: 'none',
          caughtErrors: 'none',
          ignoreRestSiblings: true,
          vars: 'all',
        },
      ],
      'no-use-before-define': [
        'error',
        {
          classes: false,
          functions: false,
          variables: true,
        },
      ],
      'no-useless-backreference': 'error',
      'no-useless-call': 'error',
      'no-useless-catch': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-constructor': 'error',
      'no-useless-rename': 'error',
      'no-useless-return': 'error',
      'no-var': 'error',
      'no-with': 'error',
      'object-shorthand': [
        'error',
        'always',
        {
          avoidQuotes: true,
          ignoreConstructors: false,
        },
      ],
      'prefer-arrow-callback': [
        'error',
        {
          allowNamedFunctions: false,
          allowUnboundThis: true,
        },
      ],
      'prefer-const': [
        'error',
        {
          destructuring: 'all',
          ignoreReadBeforeAssign: true,
        },
      ],
      'prefer-exponentiation-operator': 'error',
      'prefer-promise-reject-errors': 'error',
      'prefer-regex-literals': [
        'error',
        {
          disallowRedundantWrapping: true,
        },
      ],
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'symbol-description': 'error',
      'unicode-bom': ['error', 'never'],
      'use-isnan': [
        'error',
        {
          enforceForIndexOf: true,
          enforceForSwitchCase: true,
        },
      ],
      'valid-typeof': [
        'error',
        {
          requireStringLiterals: true,
        },
      ],
      'vars-on-top': 'error',
      yoda: ['error', 'never'],
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-named-default': 'error',
      'import/newline-after-import': [
        'error',
        {
          count: 1,
        },
      ],
      'typescript/dot-notation': [
        'error',
        {
          allowKeywords: true,
        },
      ],
      'vite-plus/prefer-vite-plus-imports': 'error',
    },
    overrides: [
      {
        files: ['**/*.?([cm])[jt]s?(x)'],
        rules: {
          'node/handle-callback-err': ['error', '^(err|error)$'],
          'node/no-exports-assign': 'error',
          'node/no-new-require': 'error',
          'node/no-path-concat': 'error',
          'jsdoc/check-access': 'warn',
          'jsdoc/check-property-names': 'warn',
          'jsdoc/empty-tags': 'warn',
          'jsdoc/implements-on-classes': 'warn',
          'jsdoc/no-defaults': 'warn',
          'jsdoc/require-param-name': 'warn',
          'jsdoc/require-property': 'warn',
          'jsdoc/require-property-description': 'warn',
          'jsdoc/require-property-name': 'warn',
          'jsdoc/require-returns-description': 'warn',
          'unicorn/consistent-empty-array-spread': 'error',
          'unicorn/error-message': 'error',
          'unicorn/escape-case': 'error',
          'unicorn/new-for-builtins': 'error',
          'unicorn/no-instanceof-builtins': 'error',
          'unicorn/no-new-array': 'error',
          'unicorn/no-new-buffer': 'error',
          'unicorn/number-literal-case': 'error',
          'unicorn/prefer-dom-node-text-content': 'error',
          'unicorn/prefer-includes': 'error',
          'unicorn/prefer-node-protocol': 'error',
          'unicorn/prefer-number-properties': 'error',
          'unicorn/prefer-string-starts-ends-with': 'error',
          'unicorn/prefer-type-error': 'error',
          'unicorn/throw-new-error': 'error',
        },
        plugins: ['node', 'jsdoc'],
      },
      {
        files: ['**/*.?([cm])ts', '**/*.?([cm])tsx', '**/*.vue'],
        rules: {
          'constructor-super': 'off',
          'getter-return': 'off',
          'no-class-assign': 'off',
          'no-const-assign': 'off',
          'no-dupe-keys': 'off',
          'no-func-assign': 'off',
          'no-import-assign': 'off',
          'no-new-native-nonconstructor': 'off',
          'no-obj-calls': 'off',
          'no-redeclare': [
            'error',
            {
              builtinGlobals: false,
            },
          ],
          'no-setter-return': 'off',
          'no-this-before-super': 'off',
          'no-undef': 'off',
          'no-unreachable': 'off',
          'no-unsafe-negation': 'off',
          'no-with': 'off',
          'prefer-const': 'error',
          'no-unused-expressions': [
            'error',
            {
              allowShortCircuit: true,
              allowTaggedTemplates: true,
              allowTernary: true,
            },
          ],
          'no-unused-vars': 'off',
          'no-useless-constructor': 'off',
          'no-use-before-define': [
            'error',
            {
              classes: false,
              functions: false,
              variables: true,
            },
          ],
          'typescript/ban-ts-comment': [
            'error',
            {
              'ts-expect-error': 'allow-with-description',
            },
          ],
          'typescript/no-duplicate-enum-values': 'error',
          'typescript/no-dynamic-delete': 'off',
          'typescript/no-empty-object-type': [
            'error',
            {
              allowInterfaces: 'always',
            },
          ],
          'typescript/no-explicit-any': 'off',
          'typescript/no-extra-non-null-assertion': 'error',
          'typescript/no-extraneous-class': 'off',
          'typescript/no-invalid-void-type': 'off',
          'typescript/no-misused-new': 'error',
          'typescript/no-namespace': 'error',
          'typescript/no-non-null-asserted-nullish-coalescing': 'error',
          'typescript/no-non-null-asserted-optional-chain': 'error',
          'typescript/no-non-null-assertion': 'off',
          'typescript/no-require-imports': 'error',
          'typescript/no-this-alias': 'error',
          'typescript/no-unnecessary-type-constraint': 'error',
          'typescript/no-unsafe-declaration-merging': 'error',
          'typescript/no-unsafe-function-type': 'error',
          'typescript/no-wrapper-object-types': 'error',
          'typescript/prefer-as-const': 'error',
          'typescript/prefer-literal-enum-member': 'error',
          'typescript/prefer-namespace-keyword': 'error',
          'typescript/triple-slash-reference': 'off',
          'typescript/unified-signatures': 'off',
          'typescript/consistent-type-definitions': ['error', 'interface'],
          'typescript/consistent-type-imports': [
            'error',
            {
              disallowTypeAnnotations: false,
              fixStyle: 'separate-type-imports',
              prefer: 'type-imports',
            },
          ],
          'typescript/method-signature-style': ['error', 'property'],
          'typescript/no-import-type-side-effects': 'error',
        },
      },
      {
        files: [
          '**/__tests__/**/*.?([cm])[jt]s?(x)',
          '**/*.spec.?([cm])[jt]s?(x)',
          '**/*.test.?([cm])[jt]s?(x)',
          '**/*.bench.?([cm])[jt]s?(x)',
          '**/*.benchmark.?([cm])[jt]s?(x)',
        ],
        rules: {
          'vitest/consistent-test-it': [
            'error',
            {
              fn: 'it',
              withinDescribe: 'it',
            },
          ],
          'vitest/no-identical-title': 'error',
          'vitest/no-import-node-test': 'error',
          'vitest/prefer-hooks-in-order': 'error',
          'vitest/prefer-lowercase-title': 'error',
          'no-unused-expressions': 'off',
          'typescript/explicit-function-return-type': 'off',
        },
        jsPlugins: [],
        plugins: ['vitest'],
      },
      {
        files: ['**/*.vue'],
        rules: {
          'vue/no-arrow-functions-in-watch': 'error',
          'vue/no-async-in-computed-properties': 'error',
          'vue/no-computed-properties-in-data': 'error',
          'vue/no-deprecated-data-object-declaration': 'error',
          'vue/no-deprecated-delete-set': 'error',
          'vue/no-deprecated-destroyed-lifecycle': 'error',
          'vue/no-deprecated-events-api': 'error',
          'vue/no-deprecated-model-definition': 'error',
          'vue/no-deprecated-props-default-this': 'error',
          'vue/no-deprecated-vue-config-keycodes': 'error',
          'vue/no-dupe-keys': 'off',
          'vue/no-export-in-script-setup': 'error',
          'vue/no-expose-after-await': 'error',
          'vue/no-lifecycle-after-await': 'error',
          'vue/no-reserved-component-names': 'error',
          'vue/no-reserved-keys': 'error',
          'vue/no-reserved-props': 'error',
          'vue/no-shared-component-data': 'error',
          'vue/no-side-effects-in-computed-properties': 'error',
          'vue/no-watch-after-await': 'error',
          'vue/prefer-import-from-vue': 'error',
          'vue/require-prop-type-constructor': 'error',
          'vue/require-render-return': 'error',
          'vue/require-slots-as-functions': 'error',
          'vue/return-in-computed-property': 'error',
          'vue/return-in-emits-validator': 'error',
          'vue/valid-define-emits': 'error',
          'vue/valid-define-options': 'error',
          'vue/valid-define-props': 'error',
          'vue/valid-next-tick': 'error',
          'vue/component-definition-name-casing': 'warn',
          'vue/prop-name-casing': ['error', 'camelCase'],
          'vue/require-default-prop': 'off',
          'vue/require-prop-types': 'off',
          'vue/no-multiple-slot-args': 'warn',
          'vue/no-required-prop-with-default': 'warn',
          'typescript/explicit-function-return-type': 'off',
        },
        jsPlugins: [],
        plugins: ['vue'],
      },
      {
        files: ['**/*.json', '**/*.json5', '**/*.jsonc'],
        rules: {},
        jsPlugins: [],
      },
      {
        files: ['**/package.json'],
        rules: {},
        jsPlugins: [],
      },
      {
        files: ['**/[jt]sconfig.json', '**/[jt]sconfig.*.json'],
        rules: {},
        jsPlugins: [],
      },
      {
        files: ['package.json', '**/package.json'],
        rules: {},
        jsPlugins: [],
      },
      {
        files: ['pnpm-workspace.yaml'],
        rules: {},
        jsPlugins: [],
      },
      {
        files: ['**/*.y?(a)ml'],
        rules: {},
        jsPlugins: [],
      },
      {
        files: ['**/*.toml'],
        rules: {},
        jsPlugins: [],
      },
      {
        files: ['**/*.md'],
        rules: {},
        jsPlugins: [],
      },
      {
        files: ['**/*.md/**/*.?([cm])[jt]s?(x)', '**/*.md/**/*.vue'],
        rules: {
          'no-alert': 'off',
          'no-console': 'off',
          'no-labels': 'off',
          'no-lone-blocks': 'off',
          'no-undef': 'off',
          'no-unused-expressions': 'off',
          'no-unused-labels': 'off',
          'no-unused-vars': 'off',
          'unicode-bom': 'off',
          'no-redeclare': 'off',
          'no-use-before-define': 'off',
          'typescript/consistent-type-imports': 'off',
          'typescript/explicit-function-return-type': 'off',
          'typescript/no-namespace': 'off',
          'typescript/no-require-imports': 'off',
        },
        jsPlugins: [],
      },
      {
        files: ['**/*.css', '**/*.{p,post}css'],
        rules: {
          'format/prettier': [
            'error',
            {
              endOfLine: 'auto',
              printWidth: 120,
              semi: false,
              singleQuote: true,
              tabWidth: 2,
              trailingComma: 'all',
              useTabs: false,
              parser: 'css',
              plugins: [],
            },
          ],
        },
        jsPlugins: ['eslint-plugin-format'],
      },
      {
        files: ['**/*.scss'],
        rules: {
          'format/prettier': [
            'error',
            {
              endOfLine: 'auto',
              printWidth: 120,
              semi: false,
              singleQuote: true,
              tabWidth: 2,
              trailingComma: 'all',
              useTabs: false,
              parser: 'scss',
              plugins: [],
            },
          ],
        },
        jsPlugins: ['eslint-plugin-format'],
      },
      {
        files: ['**/*.less'],
        rules: {
          'format/prettier': [
            'error',
            {
              endOfLine: 'auto',
              printWidth: 120,
              semi: false,
              singleQuote: true,
              tabWidth: 2,
              trailingComma: 'all',
              useTabs: false,
              parser: 'less',
              plugins: [],
            },
          ],
        },
        jsPlugins: ['eslint-plugin-format'],
      },
      {
        files: ['**/*.htm?(l)'],
        rules: {
          'format/prettier': [
            'error',
            {
              endOfLine: 'auto',
              printWidth: 120,
              semi: false,
              singleQuote: true,
              tabWidth: 2,
              trailingComma: 'all',
              useTabs: false,
              parser: 'html',
              plugins: [],
            },
          ],
        },
        jsPlugins: ['eslint-plugin-format'],
      },
      {
        files: ['**/*.md'],
        rules: {
          'format/prettier': [
            'error',
            {
              endOfLine: 'auto',
              printWidth: 120,
              semi: false,
              singleQuote: true,
              tabWidth: 2,
              trailingComma: 'all',
              useTabs: false,
              embeddedLanguageFormatting: 'off',
              parser: 'markdown',
              plugins: [],
            },
          ],
        },
        jsPlugins: ['eslint-plugin-format'],
      },
      {
        files: ['**/*.{g,graph}ql'],
        rules: {
          'format/prettier': [
            'error',
            {
              endOfLine: 'auto',
              printWidth: 120,
              semi: false,
              singleQuote: true,
              tabWidth: 2,
              trailingComma: 'all',
              useTabs: false,
              parser: 'graphql',
              plugins: [],
            },
          ],
        },
        jsPlugins: ['eslint-plugin-format'],
      },
      {
        files: ['**/scripts/**/*.?([cm])[jt]s?(x)'],
        rules: {
          'no-console': 'off',
          'typescript/explicit-function-return-type': 'off',
        },
        jsPlugins: [],
      },
      {
        files: ['**/cli/**/*.?([cm])[jt]s?(x)', '**/cli.?([cm])[jt]s?(x)'],
        rules: {
          'no-console': 'off',
        },
        jsPlugins: [],
      },
      {
        files: ['**/bin/**/*', '**/bin.?([cm])[jt]s?(x)'],
        rules: {},
        jsPlugins: [],
      },
      {
        files: ['**/*.d.?([cm])ts'],
        rules: {},
        jsPlugins: [],
      },
      {
        files: ['**/*.js', '**/*.cjs'],
        rules: {
          'typescript/no-require-imports': 'off',
        },
      },
      {
        files: ['**/*.config.?([cm])[jt]s?(x)', '**/*.config.*.?([cm])[jt]s?(x)'],
        rules: {
          'no-console': 'off',
          'typescript/explicit-function-return-type': 'off',
        },
        jsPlugins: [],
      },
    ],
  },
  resolve: {
    alias: {
      '~/': `${path.resolve(import.meta.dirname, 'src')}/`,
    },
  },

  plugins: [
    // https://vue-macros.dev/guide/getting-started
    VueMacros({
      plugins: {
        vue: Vue({
          include: [/\.vue$/, /\.md$/],
        }),
      },
    }),

    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      extensions: ['.vue', '.md'],
      dts: 'src/typed-router.d.ts',
      extendRoute(route) {
        const path = route.components.get('default') ?? ''

        if (path.endsWith('.md')) {
          const { data } = matter(fs.readFileSync(path, 'utf-8'))
          route.meta = Object.assign(route.meta || {}, { frontmatter: data })
        }
      },
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', '@vueuse/core', unheadVueComposablesImports, VueRouterAutoImports],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables'],
      vueTemplate: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
    }),

    // https://github.com/antfu/unocss
    UnoCSS({
      configDeps: ['src/data/projects.json'],
    }),

    // https://github.com/mdit-vue/unplugin-vue-markdown
    Markdown({
      wrapperComponent: 'Post',
      wrapperClasses: 'prose m-auto',
      headEnabled: true,
      markdownItOptions: {
        quotes: '""\'\'',
      },
      async markdownItSetup(md) {
        md.use(
          await Shiki({
            themes: {
              dark: 'vitesse-dark',
              light: 'vitesse-light',
            },
            defaultColor: false,
            cssVariablePrefix: '--s-',
            transformers: [
              transformerTwoslash({
                explicitTrigger: true,
                renderer: rendererRich(),
              }),
            ],
          }),
        )

        md.use(anchor, {
          slugify,
          permalink: anchor.permalink.linkInsideHeader({
            symbol: '#',
            renderAttrs: () => ({ 'aria-hidden': 'true' }),
          }),
        })
        const linkAttributes = LinkAttributes as unknown as Parameters<typeof md.use>[0]

        md.use(linkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
        md.use(TOC, {
          includeLevel: [1, 2, 3, 4],
          slugify,
        })
      },
    }),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Alec Ibarra',
        short_name: 'Alec Ibarra',
        background_color: '#121212',
        theme_color: '#121212',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),

    // https://github.com/feat-agency/vite-plugin-webfont-dl
    WebfontDownload([
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
      'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500;600;700;800&display=swap',
    ]),
  ],

  ssr: {
    noExternal: ['workbox-window'],
  },

  define: {
    'import.meta.env.COMMIT_HASH': JSON.stringify(commitHash.slice(0, 7)),
  },
})
