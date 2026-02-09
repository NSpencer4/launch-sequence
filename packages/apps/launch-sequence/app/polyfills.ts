// Polyfill for CommonJS module global in Cloudflare Workers environment
if (typeof (globalThis as any).module === 'undefined') {
  ;(globalThis as any).module = { exports: {} }
}
