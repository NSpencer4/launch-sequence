import styled from "styled-components";

export const StyledStatusBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};
`;

export const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const StatusDot = styled.span<{ $status: "operational" | "syncing" | "error" }>`
  width: 8px;
  height: 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ $status, theme }) => {
    switch ($status) {
      case "operational":
        return theme.colors.brand.primary;
      case "syncing":
        return theme.colors.brand.secondary;
      case "error":
        return theme.colors.status.error;
      default:
        return theme.colors.functional.grey3;
    }
  }};
`;

export const StatusText = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.widest};
  color: ${({ theme }) => theme.colors.functional.grey3};
`;

export const StatusIcon = styled.span`
  font-family: "Material Symbols Outlined";
  font-size: 14px;
  color: ${({ theme }) => theme.colors.functional.grey3};
  font-variation-settings: "FILL" 0, "wght" 300, "GRAD" 0, "opsz" 20;
`;
