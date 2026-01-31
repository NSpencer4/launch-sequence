import styled from "styled-components";

export const StyledHeader = styled.header`
  height: 80px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.secondary};
  padding: 0 ${({ theme }) => theme.spacing[8]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(6, 11, 24, 0.3);
  backdrop-filter: ${({ theme }) => theme.effects.backdrop.blurLight};
`;

export const StatsSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[12]};
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.widest};
  color: ${({ theme }) => theme.colors.functional.grey3};
`;

export const StatValue = styled.span<{ $highlight?: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  color: ${({ $highlight, theme }) =>
    $highlight ? theme.colors.brand.primary : theme.colors.typography.primary};
  text-shadow: ${({ $highlight, theme }) =>
    $highlight ? "0 0 8px rgba(0, 242, 255, 0.6)" : "none"};
`;

export const EnvironmentSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EnvironmentLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const StatusDot = styled.span`
  width: 6px;
  height: 6px;
  background: ${({ theme }) => theme.colors.status.active};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

export const EnvironmentSelect = styled.select`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.brand.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  padding: 0;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  option {
    background: ${({ theme }) => theme.colors.background.dark};
  }
`;

export const ActionsSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing[2]};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.functional.grey3};
  transition: ${({ theme }) => theme.effects.transition.default};

  &:hover {
    color: ${({ theme }) => theme.colors.brand.primary};
  }
`;

export const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  background: ${({ theme }) => theme.colors.brand.secondary};
  color: ${({ theme }) => theme.colors.functional.black};
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: ${({ theme }) => theme.spacing[2.5]} ${({ theme }) => theme.spacing[6]};
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.widest};
  cursor: pointer;
  transition: ${({ theme }) => theme.effects.transition.default};

  &:hover {
    box-shadow: ${({ theme }) => theme.effects.boxShadow.neonGold};
  }
`;
