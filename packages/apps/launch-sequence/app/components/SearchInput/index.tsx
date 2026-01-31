import { Box, Input } from "@chakra-ui/react";
import { SearchInputProps } from "./SearchInput.types";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}: SearchInputProps) {
  return (
    <Box position="relative" flex="1">
      <Box
        as="span"
        className="material-symbols-outlined"
        position="absolute"
        left="3"
        top="50%"
        transform="translateY(-50%)"
        color="functional.grey3"
        fontSize="18px"
        zIndex="1"
        pointerEvents="none"
      >
        search
      </Box>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        w="full"
        bg="rgba(15, 23, 42, 0.5)"
        border="1px solid"
        borderColor="border.dark"
        borderRadius="base"
        py="2.5"
        pl="10"
        pr="4"
        fontFamily="display"
        fontSize="md"
        letterSpacing="widest"
        color="typography.secondary"
        transition="all 0.2s ease"
        _placeholder={{ color: "functional.grey4" }}
        _focus={{
          outline: "none",
          borderColor: "brand.primary",
        }}
      />
    </Box>
  );
}
