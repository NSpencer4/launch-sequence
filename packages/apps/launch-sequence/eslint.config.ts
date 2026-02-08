import baseConfig from '../../../packages/ui/eslint.config'
import * as reactHooks from 'eslint-plugin-react-hooks'
import * as reactRefresh from 'eslint-plugin-react-refresh'
import * as globals from 'globals'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig(
  ...baseConfig,
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
)
