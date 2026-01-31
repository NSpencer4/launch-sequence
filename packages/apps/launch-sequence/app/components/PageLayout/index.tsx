import { Box, Flex } from "@chakra-ui/react";
import { PageLayoutProps } from "./PageLayout.types";
import SideBar from "../SideBar";

export default function PageLayout({
  children,
  activeNavItem = "dashboard",
}: PageLayoutProps) {
  return (
    <Flex
      h="100vh"
      w="full"
      bg="radial-gradient(circle at 50% 50%, #0a192f 0%, #060b18 100%)"
      color="typography.secondary"
      fontFamily="body"
      overflow="hidden"
    >
      <SideBar activeItem={activeNavItem} />
      <Box as="main" flex="1" display="flex" flexDirection="column" overflow="hidden">
        {children}
      </Box>
      {/* Background Glow */}
      <Box
        position="fixed"
        top="0"
        left="0"
        w="full"
        h="full"
        pointerEvents="none"
        zIndex="-1"
        overflow="hidden"
        opacity="0.1"
      >
        <Box
          position="absolute"
          w="50%"
          h="50%"
          bg="brand.primary"
          borderRadius="50%"
          filter="blur(150px)"
          top="-10%"
          right="-10%"
        />
        <Box
          position="absolute"
          w="40%"
          h="40%"
          bg="brand.tertiary"
          borderRadius="50%"
          filter="blur(120px)"
          bottom="-10%"
          left="-10%"
        />
      </Box>
    </Flex>
  );
}
