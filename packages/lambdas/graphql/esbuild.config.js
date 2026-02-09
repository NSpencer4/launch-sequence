import { build } from 'esbuild'

await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node22',
  format: 'esm',
  outfile: 'dist/index.mjs',
  minify: true,
  sourcemap: true,
  external: ['@aws-sdk/*'],
})
