import styled, { css } from "styled-components";

export const StyledTag = styled.span<{
  $variant: "default" | "type" | "environment";
  $environment?: "production" | "staging" | "development";
}>`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  text-transform: uppercase;
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};

  ${({ $variant, $environment, theme }) => {
    if ($variant === "environment" && $environment) {
      const envColors = {
        production: css`
          background: ${theme.colors.environment.productionBackground};
          color: ${theme.colors.environment.production};
          border: 1px solid ${theme.colors.environment.productionBorder};
        `,
        staging: css`
          background: ${theme.colors.environment.stagingBackground};
          color: ${theme.colors.environment.staging};
          border: 1px solid ${theme.colors.environment.stagingBorder};
        `,
        development: css`
          background: ${theme.colors.environment.developmentBackground};
          color: ${theme.colors.environment.development};
          border: 1px solid ${theme.colors.environment.developmentBorder};
        `,
      };
      return envColors[$environment];
    }

    if ($variant === "type") {
      return css`
        background: transparent;
        color: ${theme.colors.functional.grey3};
        border: 1px solid ${theme.colors.functional.grey4};
      `;
    }

    return css`
      background: ${theme.colors.functional.grey5};
      color: ${theme.colors.functional.grey3};
      border: none;
    `;
  }}
`;
