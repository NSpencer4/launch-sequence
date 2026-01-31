import { ReactNode } from "react";

export type LaunchSequenceProviderProps = {
  children: ReactNode;
  theme: LaunchSequenceTheme;
};

// Theme Type Def
export type LaunchSequenceTheme = {
  name: string;
  colors: LaunchSequenceThemeColors;
  effects: LaunchSequenceThemeEffects;
  typography: LaunchSequenceThemeTypography;
  spacing: LaunchSequenceThemeSpacing;
  borderRadius: LaunchSequenceThemeBorderRadius;
  grid: LaunchSequenceThemeGrid;
  zIndex: LaunchSequenceThemeZIndex;
};

// Color Type Defs
export type LaunchSequenceThemeColors = {
  brand: LaunchSequenceThemeBrandColors;
  background: LaunchSequenceThemeBackgroundColors;
  functional: LaunchSequenceThemeFunctionalColors;
  status: LaunchSequenceThemeStatusColors;
  environment: LaunchSequenceThemeEnvironmentColors;
  notification: LaunchSequenceThemeNotificationColors;
  typography: LaunchSequenceThemeTypographyColors;
  border: LaunchSequenceThemeBorderColors;
};

export type LaunchSequenceThemeBrandColors = {
  primary: string;
  primaryAccent: string;
  secondary: string;
  tertiary: string;
  tertiaryAccent: string;
};

export type LaunchSequenceThemeBackgroundColors = {
  dark: string;
  darkAlt: string;
  light: string;
  card: string;
  cardAlt: string;
  overlay: string;
};

export type LaunchSequenceThemeFunctionalColors = {
  white: string;
  black: string;
  grey1: string;
  grey2: string;
  grey3: string;
  grey4: string;
  grey5: string;
  grey6: string;
};

export type LaunchSequenceThemeStatusColors = {
  active: string;
  activeBackground: string;
  activeBorder: string;
  warning: string;
  warningBackground: string;
  warningBorder: string;
  error: string;
  errorBackground: string;
  errorBorder: string;
  info: string;
  infoBackground: string;
  infoBorder: string;
};

export type LaunchSequenceThemeEnvironmentColors = {
  production: string;
  productionBackground: string;
  productionBorder: string;
  staging: string;
  stagingBackground: string;
  stagingBorder: string;
  development: string;
  developmentBackground: string;
  developmentBorder: string;
};

export type LaunchSequenceThemeNotificationColors = {
  success: string;
  error: string;
  warning: string;
  info: string;
};

export type LaunchSequenceThemeTypographyColors = {
  primary: string;
  secondary: string;
  muted: string;
  dark: string;
  accent: string;
  success: string;
  error: string;
  warning: string;
};

export type LaunchSequenceThemeBorderColors = {
  primary: string;
  primaryHover: string;
  secondary: string;
  muted: string;
  dark: string;
};

// Effects Type Defs
export type LaunchSequenceThemeEffects = {
  boxShadow: {
    neonCyan: string;
    neonGold: string;
    card: string;
    elevated: string;
  };
  gradient: {
    background: string;
    primaryBorder: string;
    glowCyan: string;
    glowBlue: string;
  };
  backdrop: {
    blur: string;
    blurLight: string;
  };
  transition: {
    fast: string;
    default: string;
    slow: string;
  };
};

// Theme Typography Type Def
export type LaunchSequenceThemeTypography = {
  fontFamily: {
    display: string;
    primary: string;
    mono: string;
  };
  fontWeight: {
    light: string;
    regular: string;
    medium: string;
    semibold: string;
    bold: string;
    extraBold: string;
  };
  letterSpacing: {
    tighter: string;
    tight: string;
    normal: string;
    wide: string;
    wider: string;
    widest: string;
  };
  lineHeight: {
    none: string;
    tight: string;
    snug: string;
    normal: string;
    relaxed: string;
    loose: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    "4xl": string;
  };
};

// Theme Spacing Type Def
export type LaunchSequenceThemeSpacing = {
  px: string;
  0: string;
  0.5: string;
  1: string;
  1.5: string;
  2: string;
  2.5: string;
  3: string;
  3.5: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
  14: string;
  16: string;
  20: string;
  24: string;
  28: string;
  32: string;
};

// Border Radius Type Def
export type LaunchSequenceThemeBorderRadius = {
  none: string;
  sm: string;
  default: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  full: string;
};

// Theme Grid Type Def
export type LaunchSequenceThemeGrid = {
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
  };
  container: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  sidebar: {
    width: string;
    collapsedWidth: string;
  };
  header: {
    height: string;
  };
};

// Z-Index Type Def
export type LaunchSequenceThemeZIndex = {
  dropdown: string;
  sticky: string;
  fixed: string;
  modalBackdrop: string;
  modal: string;
  popover: string;
  tooltip: string;
};
