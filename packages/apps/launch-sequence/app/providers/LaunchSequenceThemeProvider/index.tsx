import * as React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import {
  LaunchSequenceProviderProps,
  LaunchSequenceTheme,
} from "./LaunchSequenceThemeProvider.types";

const GlobalStyle = createGlobalStyle<{ theme: LaunchSequenceTheme }>`
  html {
    font-size: 16px;
  }

  body {
    background: ${({ theme }) => theme.effects.gradient.background};
    color: ${({ theme }) => theme.colors.typography.secondary};
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  }
`;

export const LaunchSequenceThemeProvider: React.FC<
  LaunchSequenceProviderProps
> = ({ children, theme }: LaunchSequenceProviderProps): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
      {children}
    </ThemeProvider>
  );
};
