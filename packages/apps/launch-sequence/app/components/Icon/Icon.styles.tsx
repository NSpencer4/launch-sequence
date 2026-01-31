import styled, { css } from "styled-components";

const sizeStyles = {
  xs: css`
    font-size: 14px;
  `,
  sm: css`
    font-size: 18px;
  `,
  md: css`
    font-size: 20px;
  `,
  lg: css`
    font-size: 24px;
  `,
  xl: css`
    font-size: 32px;
  `,
};

export const StyledIcon = styled.span<{ $size: "xs" | "sm" | "md" | "lg" | "xl" }>`
  font-family: "Material Symbols Outlined";
  font-weight: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: "liga";
  font-feature-settings: "liga";
  -webkit-font-smoothing: antialiased;
  font-variation-settings: "FILL" 0, "wght" 300, "GRAD" 0, "opsz" 20;
  ${({ $size }) => sizeStyles[$size]}
`;
