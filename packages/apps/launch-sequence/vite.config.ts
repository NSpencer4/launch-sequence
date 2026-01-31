/// <reference types="vitest/config" />
import { cloudflareDevProxyVitePlugin, vitePlugin as remix } from '@remix-run/dev';
import { defineConfig, PluginOption } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { getLoadContext } from './workers/load-context';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    cloudflareDevProxyVitePlugin({
      getLoadContext
    }),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true
      }
    }),
    tsconfigPaths()
  ] as PluginOption[],
  ssr: {
    resolve: {
      conditions: ['workerd', 'worker', 'browser'],
      externalConditions: ['workerd', 'worker']
    },
    noExternal: true,
    target: 'webworker'
  },
  resolve: {
    mainFields: ['browser', 'module', 'main']
  },
  build: {
    target: 'esnext'
  }
});
