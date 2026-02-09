import type { ReactNode } from 'react'
import type { NavItem } from '../SideBar/SideBar.types'

export type PageLayoutProps = {
  children: ReactNode
  activeNavItem?: NavItem
}
