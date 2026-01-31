import { Box } from "@chakra-ui/react";
import { IconProps } from "./Icon.types";

const sizeMap = {
  xs: "14px",
  sm: "18px",
  md: "20px",
  lg: "24px",
  xl: "32px",
};

export default function Icon({ name, size = "md", className = "" }: IconProps) {
  return (
    <Box
      as="span"
      className={`material-symbols-outlined ${className}`}
      fontSize={sizeMap[size]}
      lineHeight="1"
      display="inline-block"
    >
      {name}
    </Box>
  );
}
