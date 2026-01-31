import { LaunchSequenceTheme } from "../../../providers/LaunchSequenceThemeProvider/LaunchSequenceThemeProvider.types";

export const LaunchSequenceTheme: LaunchSequenceTheme = {
  name: "LAUNCHSEQUENCE Mission Control",
  colors: {
    brand: {
      primary: "#00f2ff", // Glowing Cyan
      primaryAccent: "#00d4e0",
      secondary: "#ffcc00", // Golden Yellow
      tertiary: "#1e3a8a", // Accent Blue
      tertiaryAccent: "#2563eb",
    },
    background: {
      dark: "#060b18", // Deep Space Blue
      darkAlt: "#0a192f", // Gradient start
      light: "#f0f9ff",
      card: "rgba(11, 23, 42, 0.8)",
      cardAlt: "rgba(11, 23, 42, 0.4)",
      overlay: "rgba(0, 0, 0, 0.4)",
    },
    functional: {
      white: "#FFFFFF",
      black: "#000000",
      grey1: "#f8fafc", // slate-50
      grey2: "#e2e8f0", // slate-200
      grey3: "#94a3b8", // slate-400
      grey4: "#475569", // slate-600
      grey5: "#1e293b", // slate-800
      grey6: "#0f172a", // slate-900
    },
    status: {
      active: "#22c55e", // green-500
      activeBackground: "rgba(34, 197, 94, 0.2)",
      activeBorder: "rgba(34, 197, 94, 0.3)",
      warning: "#eab308", // yellow-500
      warningBackground: "rgba(234, 179, 8, 0.2)",
      warningBorder: "rgba(234, 179, 8, 0.3)",
      error: "#ef4444", // red-500
      errorBackground: "rgba(239, 68, 68, 0.1)",
      errorBorder: "rgba(239, 68, 68, 0.3)",
      info: "#3b82f6", // blue-500
      infoBackground: "rgba(59, 130, 246, 0.2)",
      infoBorder: "rgba(59, 130, 246, 0.3)",
    },
    environment: {
      production: "#ef4444",
      productionBackground: "rgba(239, 68, 68, 0.1)",
      productionBorder: "rgba(239, 68, 68, 0.2)",
      staging: "#00f2ff",
      stagingBackground: "rgba(0, 242, 255, 0.1)",
      stagingBorder: "rgba(0, 242, 255, 0.2)",
      development: "#22c55e",
      developmentBackground: "rgba(34, 197, 94, 0.1)",
      developmentBorder: "rgba(34, 197, 94, 0.2)",
    },
    notification: {
      success: "#22c55e",
      error: "#ef4444",
      warning: "#ffcc00",
      info: "#00f2ff",
    },
    typography: {
      primary: "#FFFFFF",
      secondary: "#e2e8f0", // slate-200
      muted: "#94a3b8", // slate-400
      dark: "#0f172a",
      accent: "#00f2ff",
      success: "#22c55e",
      error: "#ef4444",
      warning: "#ffcc00",
    },
    border: {
      primary: "rgba(0, 242, 255, 0.2)",
      primaryHover: "rgba(0, 242, 255, 0.4)",
      secondary: "rgba(0, 242, 255, 0.1)",
      muted: "rgba(255, 255, 255, 0.05)",
      dark: "#1e293b",
    },
  },
  effects: {
    boxShadow: {
      neonCyan:
        "0 0 10px rgba(0, 242, 255, 0.3), 0 0 20px rgba(0, 242, 255, 0.1)",
      neonGold: "0 0 15px rgba(255, 204, 0, 0.4)",
      card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      elevated:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    },
    gradient: {
      background: "radial-gradient(circle at 50% 50%, #0a192f 0%, #060b18 100%)",
      primaryBorder:
        "linear-gradient(90deg, transparent, rgba(0, 242, 255, 0.5), transparent)",
      glowCyan:
        "radial-gradient(circle, rgba(0, 242, 255, 0.3) 0%, transparent 70%)",
      glowBlue:
        "radial-gradient(circle, rgba(30, 58, 138, 0.4) 0%, transparent 70%)",
    },
    backdrop: {
      blur: "blur(12px)",
      blurLight: "blur(8px)",
    },
    transition: {
      fast: "all 0.15s ease",
      default: "all 0.2s ease",
      slow: "all 0.3s ease",
    },
  },
  typography: {
    fontFamily: {
      display: '"Orbitron", sans-serif',
      primary: '"Inter", sans-serif',
      mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
    },
    fontWeight: {
      light: "300",
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extraBold: "800",
    },
    letterSpacing: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.2em",
    },
    lineHeight: {
      none: "1",
      tight: "1.25",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2",
    },
    fontSize: {
      xs: "0.5625rem", // 9px - micro labels
      sm: "0.625rem", // 10px - small labels
      base: "0.6875rem", // 11px - code/small text
      md: "0.75rem", // 12px - body text
      lg: "0.875rem", // 14px - larger body
      xl: "1rem", // 16px - subheadings
      "2xl": "1.25rem", // 20px - headings
      "3xl": "1.875rem", // 30px - large headings
      "4xl": "2.25rem", // 36px - hero text
    },
  },
  spacing: {
    px: "1px",
    0: "0",
    0.5: "0.125rem",
    1: "0.25rem",
    1.5: "0.375rem",
    2: "0.5rem",
    2.5: "0.625rem",
    3: "0.75rem",
    3.5: "0.875rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem",
    11: "2.75rem",
    12: "3rem",
    14: "3.5rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    28: "7rem",
    32: "8rem",
  },
  borderRadius: {
    none: "0",
    sm: "2px",
    default: "4px",
    md: "6px",
    lg: "8px",
    xl: "12px",
    "2xl": "16px",
    full: "9999px",
  },
  grid: {
    breakpoints: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    sidebar: {
      width: "256px", // 16rem / w-64
      collapsedWidth: "64px",
    },
    header: {
      height: "64px", // 4rem / h-16
    },
  },
  zIndex: {
    dropdown: "1000",
    sticky: "1020",
    fixed: "1030",
    modalBackdrop: "1040",
    modal: "1050",
    popover: "1060",
    tooltip: "1070",
  },
};
