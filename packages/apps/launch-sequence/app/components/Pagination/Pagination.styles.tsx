import styled from "styled-components";

export const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.widest};
  color: ${({ theme }) => theme.colors.functional.grey3};
`;

export const PageInfo = styled.span`
  color: ${({ theme }) => theme.colors.typography.primary};
`;

export const NavButton = styled.button`
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing[1]};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.functional.grey3};
  transition: ${({ theme }) => theme.effects.transition.default};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.brand.primary};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export const NavIcon = styled.span`
  font-family: "Material Symbols Outlined";
  font-size: 14px;
  font-variation-settings: "FILL" 0, "wght" 300, "GRAD" 0, "opsz" 20;
`;
