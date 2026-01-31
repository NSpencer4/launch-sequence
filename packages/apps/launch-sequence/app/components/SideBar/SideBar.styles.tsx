import styled, { css } from "styled-components";

export const StyledSideBar = styled.aside`
  width: ${({ theme }) => theme.grid.sidebar.width};
  border-right: 1px solid ${({ theme }) => theme.colors.border.secondary};
  background: rgba(6, 11, 24, 0.5);
  backdrop-filter: ${({ theme }) => theme.effects.backdrop.blur};
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing[6]};
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[12]};
`;

export const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(0, 242, 255, 0.2);
  border: 1px solid rgba(0, 242, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.brand.primary};
`;

export const LogoText = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tighter};
  color: ${({ theme }) => theme.colors.typography.primary};

  span {
    color: ${({ theme }) => theme.colors.brand.primary};
  }
`;

export const NavSection = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const NavLink = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  text-decoration: none;
  transition: ${({ theme }) => theme.effects.transition.default};

  ${({ $active, theme }) =>
    $active
      ? css`
          color: ${theme.colors.brand.primary};
          background: rgba(0, 242, 255, 0.1);
          border-left: 2px solid ${theme.colors.brand.primary};
        `
      : css`
          color: ${theme.colors.functional.grey3};
          border-left: 2px solid transparent;

          &:hover {
            color: ${theme.colors.brand.primary};
            background: rgba(0, 242, 255, 0.05);
          }
        `}
`;

export const NavIcon = styled.span`
  font-family: "Material Symbols Outlined";
  font-size: 20px;
  font-variation-settings: "FILL" 0, "wght" 300, "GRAD" 0, "opsz" 20;
`;

export const NavLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.widest};
  text-transform: uppercase;
`;

export const UserSection = styled.div`
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacing[6]};
  border-top: 1px solid ${({ theme }) => theme.colors.border.secondary};
`;

export const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[2]};
  background: rgba(15, 23, 42, 0.5);
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

export const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.functional.grey4};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 242, 255, 0.3);
  color: ${({ theme }) => theme.colors.brand.primary};
`;

export const UserInfo = styled.div`
  overflow: hidden;
`;

export const UserRole = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.widest};
  color: ${({ theme }) => theme.colors.functional.grey3};
`;

export const UserName = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.typography.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
