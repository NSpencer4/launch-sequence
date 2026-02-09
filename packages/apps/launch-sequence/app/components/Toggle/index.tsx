import { Box, Flex } from '@chakra-ui/react'
import type { ToggleProps } from './Toggle.types'

export default function Toggle({ checked, onChange, disabled = false, label }: ToggleProps) {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked)
    }
  }

  return (
    <Flex align="center" gap="3">
      <Box
        as="button"
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={handleClick}
        w="8"
        h="4"
        borderRadius="full"
        position="relative"
        cursor={disabled ? 'not-allowed' : 'pointer'}
        border="1px solid"
        transition="all 0.2s ease"
        p="0"
        bg={checked ? 'functional.grey5' : 'functional.grey6'}
        borderColor={checked ? 'border.primaryHover' : 'border.muted'}
        boxShadow={checked ? 'neonCyan' : 'none'}
        opacity={disabled ? 0.5 : 1}
      >
        <Box
          position="absolute"
          top="2px"
          w="10px"
          h="10px"
          borderRadius="full"
          transition="all 0.2s ease"
          right={checked ? '2px' : 'auto'}
          left={checked ? 'auto' : '2px'}
          bg={checked ? 'brand.primary' : 'functional.grey4'}
        />
      </Box>
      {label && (
        <Box
          as="span"
          fontFamily="display"
          fontSize="sm"
          textTransform="uppercase"
          color={checked ? 'brand.primary' : 'functional.grey3'}
        >
          {label}
        </Box>
      )}
    </Flex>
  )
}
