/**
 * Server-side environment helpers for Cloudflare Workers
 *
 * Use these helpers in loaders and actions to access environment variables
 * from the Cloudflare Workers context.
 */

interface CloudflareEnv {
  GRAPHQL_ENDPOINT?: string
  DEFAULT_ORG_ID?: string
  [key: string]: string | undefined
}

/**
 * Get the GraphQL endpoint from Cloudflare env
 * Falls back to localhost for development
 */
export function getGraphQLEndpoint(env: CloudflareEnv): string {
  return env.GRAPHQL_ENDPOINT || 'http://localhost:8787/graphql'
}

/**
 * Type-safe access to Cloudflare environment from LoaderFunctionArgs or ActionFunctionArgs
 */
export function getEnv(context: { cloudflare?: { env?: CloudflareEnv } }): CloudflareEnv {
  return context.cloudflare?.env || {}
}
