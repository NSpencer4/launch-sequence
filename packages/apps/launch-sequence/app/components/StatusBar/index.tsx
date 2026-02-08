import { Box, Flex } from "@chakra-ui/react";
import type { StatusBarProps } from './StatusBar.types'

export default function StatusBar({
  syncStatus = "operational",
  showKeyboardShortcuts = true,
}: StatusBarProps) {
  const statusLabels = {
    operational: "Live Sync Status: OPERATIONAL",
    syncing: "Live Sync Status: SYNCING",
    error: "Live Sync Status: ERROR",
  };

  const statusColors = {
    operational: "brand.primary",
    syncing: "brand.secondary",
    error: "status.error",
  };

  return (
    <Flex align="center" gap="6">
      <Flex align="center" gap="2">
        <Box
          w="8px"
          h="8px"
          borderRadius="full"
          bg={statusColors[syncStatus]}
        />
        <Box
          as="span"
          fontFamily="display"
          fontSize="sm"
          textTransform="uppercase"
          letterSpacing="widest"
          color="functional.grey3"
        >
          {statusLabels[syncStatus]}
        </Box>
      </Flex>

      {showKeyboardShortcuts && (
        <Flex align="center" gap="2">
          <Box
            as="span"
            className="material-symbols-outlined"
            fontSize="14px"
            color="functional.grey3"
          >
            info
          </Box>
          <Box
            as="span"
            fontFamily="display"
            fontSize="sm"
            textTransform="uppercase"
            letterSpacing="widest"
            color="functional.grey3"
          >
            Keyboard Shortcuts Active
          </Box>
        </Flex>
      )}
    </Flex>
  );
}
