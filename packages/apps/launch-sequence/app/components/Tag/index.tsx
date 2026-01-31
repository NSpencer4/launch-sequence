import { Box } from "@chakra-ui/react";
import { TagProps } from "./Tag.types";

export default function Tag({
  label,
  variant = "default",
  environment,
}: TagProps) {
  const getVariantStyles = () => {
    if (variant === "environment" && environment) {
      const envStyles = {
        production: {
          bg: "rgba(34, 197, 94, 0.1)",
          color: "#22c55e",
          borderColor: "rgba(34, 197, 94, 0.2)",
        },
        staging: {
          bg: "rgba(234, 179, 8, 0.1)",
          color: "#eab308",
          borderColor: "rgba(234, 179, 8, 0.2)",
        },
        development: {
          bg: "rgba(59, 130, 246, 0.1)",
          color: "#3b82f6",
          borderColor: "rgba(59, 130, 246, 0.2)",
        },
      };
      return {
        ...envStyles[environment],
        border: "1px solid",
      };
    }

    if (variant === "type") {
      return {
        bg: "transparent",
        color: "functional.grey3",
        border: "1px solid",
        borderColor: "functional.grey4",
      };
    }

    return {
      bg: "functional.grey5",
      color: "functional.grey3",
      border: "none",
    };
  };

  const styles = getVariantStyles();

  return (
    <Box
      as="span"
      fontFamily="display"
      fontSize="xs"
      textTransform="uppercase"
      px="1.5"
      py="0.5"
      borderRadius="sm"
      {...styles}
    >
      {label}
    </Box>
  );
}
