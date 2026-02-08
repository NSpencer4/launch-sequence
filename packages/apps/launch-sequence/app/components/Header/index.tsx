import { Box, Flex } from "@chakra-ui/react";
import type { HeaderProps } from './Header.types'
import Icon from "../Icon";

const defaultEnvironments = [
  "PRODUCTION_GLOBAL",
  "STAGING_US_EAST",
  "DEV_LOCAL",
];

export default function Header({
  stats = { totalFlags: 1248, activeFlags: 912 },
  environment = "PRODUCTION_GLOBAL",
  environments = defaultEnvironments,
  onEnvironmentChange,
  onCreateFlag,
}: HeaderProps) {
  return (
    <Flex
      as="header"
      h="20"
      borderBottom="1px solid"
      borderColor="border.dark"
      px="8"
      align="center"
      justify="space-between"
      bg="rgba(6, 11, 24, 0.3)"
      backdropFilter="blur(8px)"
    >
      {/* Stats Section */}
      <Flex align="center" gap="12">
        {/* Total Flags */}
        <Flex direction="column">
          <Box
            as="span"
            fontFamily="display"
            fontSize="sm"
            textTransform="uppercase"
            letterSpacing="widest"
            color="functional.grey3"
          >
            Total Flags
          </Box>
          <Box
            as="span"
            fontFamily="display"
            fontSize="2xl"
            color="brand.primary"
            textShadow="0 0 8px rgba(0, 242, 255, 0.6)"
          >
            {stats.totalFlags.toLocaleString()}
          </Box>
        </Flex>

        {/* Active Flags */}
        <Flex direction="column">
          <Box
            as="span"
            fontFamily="display"
            fontSize="sm"
            textTransform="uppercase"
            letterSpacing="widest"
            color="functional.grey3"
          >
            Active Flags
          </Box>
          <Box
            as="span"
            fontFamily="display"
            fontSize="2xl"
            color="typography.secondary"
          >
            {stats.activeFlags.toLocaleString()}
          </Box>
        </Flex>

        {/* Environment Section */}
        <Flex direction="column">
          <Flex align="center" gap="2">
            <Box
              as="span"
              fontFamily="display"
              fontSize="sm"
              textTransform="uppercase"
              letterSpacing="widest"
              color="functional.grey3"
            >
              Environment
            </Box>
            <Box
              w="1.5"
              h="1.5"
              bg="status.active"
              borderRadius="full"
              animation="pulse 2s infinite"
            />
          </Flex>
          <Box
            as="select"
            value={environment}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onEnvironmentChange?.(e.target.value)
            }
            bg="transparent"
            border="none"
            color="brand.primary"
            fontFamily="display"
            fontSize="md"
            p="0"
            cursor="pointer"
            _focus={{ outline: "none" }}
            css={{
              "& option": {
                background: "#060b18",
              },
            }}
          >
            {environments.map((env) => (
              <option key={env} value={env}>
                {env}
              </option>
            ))}
          </Box>
        </Flex>
      </Flex>

      {/* Actions Section */}
      <Flex align="center" gap="6">
        <Box
          as="button"
          bg="transparent"
          border="none"
          p="2"
          cursor="pointer"
          color="functional.grey3"
          transition="all 0.2s ease"
          _hover={{ color: "brand.primary" }}
        >
          <Icon name="settings" size="md" />
        </Box>
        <Flex
          as="button"
          onClick={onCreateFlag}
          align="center"
          gap="2"
          bg="brand.secondary"
          color="functional.black"
          border="1px solid rgba(255, 255, 255, 0.2)"
          px="6"
          py="2.5"
          fontFamily="display"
          fontSize="md"
          fontWeight="bold"
          letterSpacing="widest"
          cursor="pointer"
          transition="all 0.2s ease"
          _hover={{ boxShadow: "neonGold" }}
        >
          <Icon name="add_circle" size="sm" />
          CREATE NEW FLAG
        </Flex>
      </Flex>
    </Flex>
  );
}
