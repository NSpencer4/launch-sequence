import styled from "styled-components";

export const TableContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  background: ${({ theme }) => theme.colors.background.cardAlt};

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 242, 255, 0.3);
    border-radius: 10px;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  text-align: left;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  position: sticky;
  top: 0;
  background: rgba(6, 11, 24, 0.9);
  backdrop-filter: ${({ theme }) => theme.effects.backdrop.blurLight};
  z-index: 10;
  border-bottom: 1px solid rgba(0, 242, 255, 0.2);
`;

export const TableHeaderRow = styled.tr``;

export const TableHeader = styled.th<{ $align?: "left" | "right" | "center" }>`
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.widest};
  color: ${({ theme }) => theme.colors.functional.grey3};
  text-align: ${({ $align }) => $align || "left"};
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.muted};
  cursor: pointer;
  transition: ${({ theme }) => theme.effects.transition.default};

  &:hover {
    background: rgba(0, 242, 255, 0.05);
  }

  &:hover input[type="checkbox"] {
    border-color: rgba(0, 242, 255, 0.5);
  }
`;

export const TableCell = styled.td<{ $align?: "left" | "right" | "center" }>`
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  text-align: ${({ $align }) => $align || "left"};
`;

export const Checkbox = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid ${({ theme }) => theme.colors.functional.grey4};
  background: transparent;
  cursor: pointer;
  transition: ${({ theme }) => theme.effects.transition.default};

  &:checked {
    background: ${({ theme }) => theme.colors.brand.primary};
    border-color: ${({ theme }) => theme.colors.brand.primary};
  }

  &:focus {
    outline: none;
  }
`;

export const FlagInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlagName = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.typography.primary};
  transition: ${({ theme }) => theme.effects.transition.default};

  ${TableRow}:hover & {
    color: ${({ theme }) => theme.colors.brand.primary};
  }
`;

export const FlagKey = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.functional.grey3};
`;

export const TagsWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[1]};
  flex-wrap: wrap;
`;

export const ModifiedInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const ModifiedTime = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.functional.grey3};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tighter};
`;

export const ModifiedBy = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.functional.grey4};
  text-transform: uppercase;
`;

export const EndMessage = styled.tr`
  td {
    padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[6]};
    text-align: center;
    font-family: ${({ theme }) => theme.typography.fontFamily.display};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.functional.grey4};
    letter-spacing: 0.5em;
    text-transform: uppercase;
  }
`;
