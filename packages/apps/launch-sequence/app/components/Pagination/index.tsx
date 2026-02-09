import { Box, Flex } from '@chakra-ui/react'
import type { PaginationProps } from './Pagination.types'

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <Flex
      align="center"
      gap="4"
      fontFamily="display"
      fontSize="sm"
      letterSpacing="widest"
      color="functional.grey3"
    >
      <Box as="span">Rows per page: {itemsPerPage}</Box>
      <Flex align="center" gap="2">
        <Box
          as="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          bg="none"
          border="none"
          p="1"
          cursor={currentPage <= 1 ? 'not-allowed' : 'pointer'}
          color="functional.grey3"
          transition="all 0.2s ease"
          display="flex"
          alignItems="center"
          justifyContent="center"
          opacity={currentPage <= 1 ? 0.3 : 1}
          _hover={{
            color: currentPage <= 1 ? 'functional.grey3' : 'brand.primary',
          }}
        >
          <Box as="span" className="material-symbols-outlined" fontSize="14px">
            chevron_left
          </Box>
        </Box>
        <Box as="span" color="typography.primary">
          {startItem} - {endItem} of {totalItems.toLocaleString()}
        </Box>
        <Box
          as="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          bg="none"
          border="none"
          p="1"
          cursor={currentPage >= totalPages ? 'not-allowed' : 'pointer'}
          color="functional.grey3"
          transition="all 0.2s ease"
          display="flex"
          alignItems="center"
          justifyContent="center"
          opacity={currentPage >= totalPages ? 0.3 : 1}
          _hover={{
            color: currentPage >= totalPages ? 'functional.grey3' : 'brand.primary',
          }}
        >
          <Box as="span" className="material-symbols-outlined" fontSize="14px">
            chevron_right
          </Box>
        </Box>
      </Flex>
    </Flex>
  )
}
