import styled, { css } from "styled-components";

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const ToggleTrack = styled.button<{ $checked: boolean; $disabled?: boolean }>`
  width: 32px;
  height: 16px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  position: relative;
  cursor: pointer;
  border: 1px solid;
  transition: ${({ theme }) => theme.effects.transition.default};
  background: none;
  padding: 0;

  ${({ $checked, $disabled, theme }) =>
    $checked
      ? css`
          background: ${theme.colors.functional.grey5};
          border-color: ${theme.colors.border.primaryHover};
          box-shadow: ${theme.effects.boxShadow.neonCyan};
        `
      : css`
          background: ${theme.colors.functional.grey6};
          border-color: ${theme.colors.border.muted};
        `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
`;

export const ToggleKnob = styled.span<{ $checked: boolean }>`
  position: absolute;
  top: 2px;
  width: 10px;
  height: 10px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: ${({ theme }) => theme.effects.transition.default};

  ${({ $checked, theme }) =>
    $checked
      ? css`
          right: 2px;
          background: ${theme.colors.brand.primary};
        `
      : css`
          left: 2px;
          background: ${theme.colors.functional.grey4};
        `}
`;

export const ToggleLabel = styled.span<{ $checked: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-transform: uppercase;
  color: ${({ $checked, theme }) =>
    $checked ? theme.colors.brand.primary : theme.colors.functional.grey3};
`;
