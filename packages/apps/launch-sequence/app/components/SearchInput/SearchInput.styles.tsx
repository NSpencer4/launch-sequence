import styled from "styled-components";

export const SearchWrapper = styled.div`
  position: relative;
  flex: 1;
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: ${({ theme }) => theme.spacing[3]};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.functional.grey3};
  font-family: "Material Symbols Outlined";
  font-size: 18px;
  font-variation-settings: "FILL" 0, "wght" 300, "GRAD" 0, "opsz" 20;
`;

export const StyledInput = styled.input`
  width: 100%;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid ${({ theme }) => theme.colors.border.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: ${({ theme }) => theme.spacing[2.5]} ${({ theme }) => theme.spacing[10]};
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.widest};
  color: ${({ theme }) => theme.colors.typography.primary};
  transition: ${({ theme }) => theme.effects.transition.default};

  &::placeholder {
    color: ${({ theme }) => theme.colors.functional.grey4};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brand.primary};
  }
`;
