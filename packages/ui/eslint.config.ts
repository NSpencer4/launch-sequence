import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import { defineConfig, globalIgnores } from 'eslint/config'

const config = defineConfig(
    // Base ESLint recommended rules
    eslint.configs.recommended,

    // TypeScript ESLint recommended rules
    ...tseslint.configs.recommended,

    // Prettier compatibility (disables conflicting rules)
    eslintPluginPrettierRecommended,

    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts',
    ]),

    // Global ignores
    {
        ignores: [
            '**/node_modules/**',
            '**/dist/**',
            '**/build/**',
            '**/.wrangler/**',
            '**/drizzle/**',
            '**/coverage/**',
            '**/*.d.ts',
            '**/docker/**',
        ],
    },

    // TypeScript files configuration
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.es2022,
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            // TypeScript-specific rules
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/no-require-imports': 'error',

            // General code quality
            'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
            'no-debugger': 'error',
            'no-duplicate-imports': 'error',
            eqeqeq: ['error', 'always', { null: 'ignore' }],
            curly: ['error', 'all'],

            // Best practices
            'no-var': 'error',
            'prefer-const': 'error',
            'prefer-template': 'warn',
            'object-shorthand': 'warn',
        },
    },

    // JavaScript/config files
    {
        files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
)

export default config
