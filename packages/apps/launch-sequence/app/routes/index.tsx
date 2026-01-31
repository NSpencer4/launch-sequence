import type { Route } from './+types/home'
import { redirect } from 'react-router'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Launch Sequence' },
    { name: 'description', content: 'Welcome to Launch Sequence' },
  ]
}

export function loader({ context }: Route.LoaderArgs) {
  return redirect('/flags')
}

export default function Index({ loaderData }: Route.ComponentProps) {
  return null
}
