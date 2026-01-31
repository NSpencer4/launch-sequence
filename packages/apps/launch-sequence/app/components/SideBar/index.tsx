import { Box, Flex, VStack } from "@chakra-ui/react";
import { SideBarProps, NavItemConfig } from "./SideBar.types";

const navItems: NavItemConfig[] = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard", href: "/" },
  { id: "flag-explorer", label: "Flags Index", icon: "list_alt", href: "/flags" },
  { id: "applications", label: "Applications", icon: "apps", href: "/applications" },
  { id: "experiments", label: "Experiments", icon: "science", href: "/experiments" },
  { id: "audit-logs", label: "Audit Logs", icon: "history_edu", href: "/audit-logs" },
];

export default function SideBar({ activeItem = "dashboard" }: SideBarProps) {
  return (
    <Flex
      as="aside"
      w="64"
      borderRight="1px solid"
      borderColor="border.dark"
      bg="rgba(6, 11, 24, 0.5)"
      backdropFilter="blur(12px)"
      direction="column"
      p="6"
    >
      {/* Logo Section */}
      <Flex align="center" gap="3" mb="12">
        <Flex
          w="10"
          h="10"
          bg="rgba(0, 242, 255, 0.2)"
          border="1px solid rgba(0, 242, 255, 0.4)"
          align="center"
          justify="center"
          borderRadius="sm"
          color="brand.primary"
        >
          <Box as="span" className="material-symbols-outlined" fontSize="24px">
            layers
          </Box>
        </Flex>
        <Box
          as="h1"
          fontFamily="display"
          fontSize="2xl"
          letterSpacing="tighter"
          color="typography.secondary"
        >
          LAUNCH<Box as="span" color="brand.primary">SEQUENCE</Box>
        </Box>
      </Flex>

      {/* Navigation Section */}
      <VStack as="nav" flex="1" gap="2" align="stretch">
        {navItems.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <Box
              key={item.id}
              as="a"
              href={item.href}
              display="flex"
              alignItems="center"
              gap="4"
              px="4"
              py="3"
              borderRadius="base"
              textDecoration="none"
              transition="all 0.2s ease"
              borderLeft="2px solid"
              color={isActive ? "brand.primary" : "functional.grey3"}
              bg={isActive ? "rgba(0, 242, 255, 0.1)" : "transparent"}
              borderLeftColor={isActive ? "brand.primary" : "transparent"}
              _hover={{
                color: "brand.primary",
                bg: isActive ? "rgba(0, 242, 255, 0.1)" : "rgba(0, 242, 255, 0.05)",
              }}
            >
              <Box as="span" className="material-symbols-outlined" fontSize="20px">
                {item.icon}
              </Box>
              <Box
                as="span"
                fontFamily="display"
                fontSize="md"
                letterSpacing="widest"
                textTransform="uppercase"
              >
                {item.label}
              </Box>
            </Box>
          );
        })}
      </VStack>

      {/* User Section */}
      <Box mt="auto" pt="6" borderTop="1px solid" borderColor="border.dark">
        <Flex
          align="center"
          gap="3"
          p="2"
          bg="rgba(15, 23, 42, 0.5)"
          borderRadius="sm"
        >
          <Flex
            w="8"
            h="8"
            borderRadius="full"
            bg="functional.grey4"
            align="center"
            justify="center"
            border="1px solid rgba(0, 242, 255, 0.3)"
            color="brand.primary"
          >
            <Box as="span" className="material-symbols-outlined" fontSize="14px">
              person
            </Box>
          </Flex>
          <Box overflow="hidden">
            <Box
              as="p"
              fontFamily="display"
              fontSize="sm"
              textTransform="uppercase"
              letterSpacing="widest"
              color="functional.grey3"
            >
              Operator
            </Box>
            <Box
              as="p"
              fontSize="md"
              fontWeight="semibold"
              color="typography.secondary"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              ADMIN_0X92A
            </Box>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
