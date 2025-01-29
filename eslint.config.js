const eslint = require('@eslint/js')
const tseslint = require('typescript-eslint')
const prettier = require('eslint-config-prettier')
const importPlugin = require('eslint-plugin-import')

module.exports = tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, prettier, {
  files: ['src/**/*.ts'],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      project: './tsconfig.json',
    },
  },
  plugins: {
    import: importPlugin,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-mismatched-promises': 'off',

    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    // Import rules
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-unresolved': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/prefer-default-export': 'off',
    'import/no-unused-modules': 'error',
    'import/no-cycle': 'error',
    'no-console': 'error',
  },
})
