import { isRouteErrorResponse, Outlet, useRouteError } from 'react-router'

import { LaunchSequenceThemeProvider } from './providers/LaunchSequenceThemeProvider'

export function RootLayout() {
  return (
    <LaunchSequenceThemeProvider>
      <Outlet />
    </LaunchSequenceThemeProvider>
  )
}

export function RootErrorBoundary() {
  const error = useRouteError()
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404 ? 'The requested page could not be found.' : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
