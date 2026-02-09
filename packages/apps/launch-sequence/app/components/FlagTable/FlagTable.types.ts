export type FlagTableProps = {
  flags: Flag[]
  selectedIds?: string[]
  onSelectFlag?: (id: string, selected: boolean) => void
  onSelectAll?: (selected: boolean) => void
  onToggleFlag?: (id: string, active: boolean) => void
  onFlagClick?: (flag: Flag) => void
}

export type Flag = {
  id: string
  name: string
  key: string
  type: FlagType
  active: boolean
  tags: string[]
  lastModified: string
  modifiedBy?: string
}

export type FlagType = 'Boolean' | 'String' | 'Number' | 'JSON' | 'Multivariate'
