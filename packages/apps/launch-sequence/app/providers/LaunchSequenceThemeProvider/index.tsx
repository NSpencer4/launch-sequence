import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from '../../styles/theme/chakra-theme'

export type LaunchSequenceProviderProps = {
  children: React.ReactNode
}

export const LaunchSequenceThemeProvider: React.FC<LaunchSequenceProviderProps> = ({
  children,
}): JSX.Element => {
  return <ChakraProvider value={system}>{children}</ChakraProvider>
}
