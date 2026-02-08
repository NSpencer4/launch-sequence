import { Box, Flex, Table } from "@chakra-ui/react";
import type { FlagTableProps } from './FlagTable.types'
import Toggle from "../Toggle";
import Tag from "../Tag";

export default function FlagTable({
  flags,
  selectedIds = [],
  onSelectFlag,
  onSelectAll,
  onToggleFlag,
  onFlagClick,
}: FlagTableProps) {
  const allSelected = flags.length > 0 && selectedIds.length === flags.length;

  return (
    <Box
      flex="1"
      overflowY="auto"
      border="1px solid"
      borderColor="border.primary"
      bg="background.cardAlt"
      css={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          background: "rgba(0, 0, 0, 0.2)",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "rgba(0, 242, 255, 0.3)",
          borderRadius: "10px",
        },
      }}
    >
      <Table.Root size="md">
        <Table.Header>
          <Table.Row
            position="sticky"
            top="0"
            bg="rgba(6, 11, 24, 0.9)"
            backdropFilter="blur(8px)"
            zIndex="10"
            borderBottom="1px solid rgba(0, 242, 255, 0.2)"
          >
            <Table.ColumnHeader
              w="12"
              px="6"
              py="4"
              fontFamily="display"
              fontSize="sm"
              fontWeight="normal"
              textTransform="uppercase"
              letterSpacing="widest"
              color="functional.grey3"
            >
              <Box
                as="input"
                type="checkbox"
                checked={allSelected}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onSelectAll?.(e.target.checked)
                }
                appearance="none"
                w="4"
                h="4"
                border="1px solid"
                borderColor="functional.grey4"
                bg="transparent"
                cursor="pointer"
                transition="all 0.2s ease"
                css={{
                  "&:checked": {
                    background: "#00f2ff",
                    borderColor: "#00f2ff",
                  },
                  "&:focus": {
                    outline: "none",
                  },
                }}
              />
            </Table.ColumnHeader>
            <Table.ColumnHeader
              px="6"
              py="4"
              fontFamily="display"
              fontSize="sm"
              fontWeight="normal"
              textTransform="uppercase"
              letterSpacing="widest"
              color="functional.grey3"
            >
              Flag Name &amp; Key
            </Table.ColumnHeader>
            <Table.ColumnHeader
              px="6"
              py="4"
              fontFamily="display"
              fontSize="sm"
              fontWeight="normal"
              textTransform="uppercase"
              letterSpacing="widest"
              color="functional.grey3"
            >
              Type
            </Table.ColumnHeader>
            <Table.ColumnHeader
              px="6"
              py="4"
              fontFamily="display"
              fontSize="sm"
              fontWeight="normal"
              textTransform="uppercase"
              letterSpacing="widest"
              color="functional.grey3"
            >
              Environment Status
            </Table.ColumnHeader>
            <Table.ColumnHeader
              px="6"
              py="4"
              fontFamily="display"
              fontSize="sm"
              fontWeight="normal"
              textTransform="uppercase"
              letterSpacing="widest"
              color="functional.grey3"
            >
              Tags
            </Table.ColumnHeader>
            <Table.ColumnHeader
              px="6"
              py="4"
              fontFamily="display"
              fontSize="sm"
              fontWeight="normal"
              textTransform="uppercase"
              letterSpacing="widest"
              color="functional.grey3"
              textAlign="right"
            >
              Last Modified
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {flags.map((flag) => (
            <Table.Row
              key={flag.id}
              onClick={() => onFlagClick?.(flag)}
              borderBottom="1px solid"
              borderColor="border.muted"
              cursor="pointer"
              transition="all 0.2s ease"
              _hover={{
                bg: "rgba(0, 242, 255, 0.05)",
                "& .flag-name": {
                  color: "brand.primary",
                },
                "& .checkbox": {
                  borderColor: "rgba(0, 242, 255, 0.5)",
                },
              }}
            >
              <Table.Cell px="6" py="4" onClick={(e) => e.stopPropagation()}>
                <Box
                  as="input"
                  type="checkbox"
                  className="checkbox"
                  checked={selectedIds.includes(flag.id)}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onSelectFlag?.(flag.id, e.target.checked)
                  }
                  appearance="none"
                  w="4"
                  h="4"
                  border="1px solid"
                  borderColor="functional.grey4"
                  bg="transparent"
                  cursor="pointer"
                  transition="all 0.2s ease"
                  css={{
                    "&:checked": {
                      background: "#00f2ff",
                      borderColor: "#00f2ff",
                    },
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                />
              </Table.Cell>
              <Table.Cell px="6" py="4">
                <Flex direction="column">
                  <Box
                    as="span"
                    className="flag-name"
                    fontSize="lg"
                    fontWeight="semibold"
                    color="typography.secondary"
                    transition="all 0.2s ease"
                  >
                    {flag.name}
                  </Box>
                  <Box
                    as="span"
                    fontFamily="mono"
                    fontSize="sm"
                    color="functional.grey3"
                  >
                    {flag.key}
                  </Box>
                </Flex>
              </Table.Cell>
              <Table.Cell px="6" py="4">
                <Tag label={flag.type} variant="type" />
              </Table.Cell>
              <Table.Cell px="6" py="4" onClick={(e) => e.stopPropagation()}>
                <Toggle
                  checked={flag.active}
                  onChange={(active) => onToggleFlag?.(flag.id, active)}
                  label={flag.active ? "Active" : "Inactive"}
                />
              </Table.Cell>
              <Table.Cell px="6" py="4">
                <Flex gap="1" flexWrap="wrap">
                  {flag.tags.map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </Flex>
              </Table.Cell>
              <Table.Cell px="6" py="4" textAlign="right">
                <Flex direction="column" align="flex-end">
                  <Box
                    as="span"
                    fontFamily="mono"
                    fontSize="sm"
                    color="functional.grey3"
                    textTransform="uppercase"
                    letterSpacing="tighter"
                  >
                    {flag.lastModified}
                  </Box>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
          <Table.Row>
            <Table.Cell
              colSpan={6}
              px="6"
              py="8"
              textAlign="center"
              fontFamily="display"
              fontSize="sm"
              color="functional.grey4"
              letterSpacing="0.5em"
              textTransform="uppercase"
            >
              End of initial viewport - more flags available
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
