import * as eslint from '@eslint/js'
import * as tseslint from 'typescript-eslint'
import * as eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/testing/**',
      '**/scripts/**',
      '**/*.config.js',
      '**/*.config.mjs',
    ],
  },
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.ts', '.tsx', '.js'],
          moduleDirectory: ['node_modules', 'src'],
        },
      },
    },
    rules: {
      'linebreak-style': 'off',
      'spaced-comment': 'off',
      'no-return-assign': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          functions: false,
        },
      ],
      'no-plusplus': [
        'error',
        {
          allowForLoopAfterthoughts: true,
        },
      ],
      'no-else-return': [
        'error',
        {
          allowElseIf: true,
        },
      ],
      'no-console': 'warn',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
    },
  },
)
