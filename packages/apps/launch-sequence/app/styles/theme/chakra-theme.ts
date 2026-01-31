import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          primary: { value: "#00f2ff" },
          primaryAccent: { value: "#00d4e0" },
          secondary: { value: "#ffcc00" },
          tertiary: { value: "#1e3a8a" },
          tertiaryAccent: { value: "#2563eb" },
        },
        background: {
          dark: { value: "#060b18" },
          darkAlt: { value: "#0a192f" },
          light: { value: "#f0f9ff" },
          card: { value: "rgba(11, 23, 42, 0.8)" },
          cardAlt: { value: "rgba(11, 23, 42, 0.4)" },
          overlay: { value: "rgba(0, 0, 0, 0.4)" },
        },
        functional: {
          white: { value: "#FFFFFF" },
          black: { value: "#000000" },
          grey1: { value: "#f8fafc" },
          grey2: { value: "#e2e8f0" },
          grey3: { value: "#94a3b8" },
          grey4: { value: "#475569" },
          grey5: { value: "#1e293b" },
          grey6: { value: "#0f172a" },
        },
        status: {
          active: { value: "#22c55e" },
          activeBackground: { value: "rgba(34, 197, 94, 0.2)" },
          activeBorder: { value: "rgba(34, 197, 94, 0.3)" },
          warning: { value: "#eab308" },
          warningBackground: { value: "rgba(234, 179, 8, 0.2)" },
          warningBorder: { value: "rgba(234, 179, 8, 0.3)" },
          error: { value: "#ef4444" },
          errorBackground: { value: "rgba(239, 68, 68, 0.1)" },
          errorBorder: { value: "rgba(239, 68, 68, 0.3)" },
          info: { value: "#3b82f6" },
          infoBackground: { value: "rgba(59, 130, 246, 0.2)" },
          infoBorder: { value: "rgba(59, 130, 246, 0.3)" },
        },
        environment: {
          production: { value: "#ef4444" },
          productionBackground: { value: "rgba(239, 68, 68, 0.1)" },
          productionBorder: { value: "rgba(239, 68, 68, 0.2)" },
          staging: { value: "#00f2ff" },
          stagingBackground: { value: "rgba(0, 242, 255, 0.1)" },
          stagingBorder: { value: "rgba(0, 242, 255, 0.2)" },
          development: { value: "#22c55e" },
          developmentBackground: { value: "rgba(34, 197, 94, 0.1)" },
          developmentBorder: { value: "rgba(34, 197, 94, 0.2)" },
        },
        notification: {
          success: { value: "#22c55e" },
          error: { value: "#ef4444" },
          warning: { value: "#ffcc00" },
          info: { value: "#00f2ff" },
        },
        typography: {
          primary: { value: "#FFFFFF" },
          secondary: { value: "#e2e8f0" },
          muted: { value: "#94a3b8" },
          dark: { value: "#0f172a" },
          accent: { value: "#00f2ff" },
          success: { value: "#22c55e" },
          error: { value: "#ef4444" },
          warning: { value: "#ffcc00" },
        },
        border: {
          primary: { value: "rgba(0, 242, 255, 0.2)" },
          primaryHover: { value: "rgba(0, 242, 255, 0.4)" },
          secondary: { value: "rgba(0, 242, 255, 0.1)" },
          muted: { value: "rgba(255, 255, 255, 0.05)" },
          dark: { value: "#1e293b" },
        },
      },
      fonts: {
        display: { value: '"Orbitron", sans-serif' },
        body: { value: '"Inter", sans-serif' },
        mono: {
          value:
            'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
        },
      },
      fontSizes: {
        xs: { value: "0.5625rem" },
        sm: { value: "0.625rem" },
        base: { value: "0.6875rem" },
        md: { value: "0.75rem" },
        lg: { value: "0.875rem" },
        xl: { value: "1rem" },
        "2xl": { value: "1.25rem" },
        "3xl": { value: "1.875rem" },
        "4xl": { value: "2.25rem" },
      },
      fontWeights: {
        light: { value: "300" },
        normal: { value: "400" },
        medium: { value: "500" },
        semibold: { value: "600" },
        bold: { value: "700" },
        extrabold: { value: "800" },
      },
      letterSpacings: {
        tighter: { value: "-0.05em" },
        tight: { value: "-0.025em" },
        normal: { value: "0" },
        wide: { value: "0.025em" },
        wider: { value: "0.05em" },
        widest: { value: "0.2em" },
      },
      lineHeights: {
        none: { value: "1" },
        tight: { value: "1.25" },
        snug: { value: "1.375" },
        normal: { value: "1.5" },
        relaxed: { value: "1.625" },
        loose: { value: "2" },
      },
      radii: {
        none: { value: "0" },
        sm: { value: "2px" },
        base: { value: "4px" },
        md: { value: "6px" },
        lg: { value: "8px" },
        xl: { value: "12px" },
        "2xl": { value: "16px" },
        full: { value: "9999px" },
      },
      shadows: {
        neonCyan: {
          value:
            "0 0 10px rgba(0, 242, 255, 0.3), 0 0 20px rgba(0, 242, 255, 0.1)",
        },
        neonGold: { value: "0 0 15px rgba(255, 204, 0, 0.4)" },
        card: {
          value:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
        elevated: {
          value:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
      },
      zIndex: {
        dropdown: { value: 1000 },
        sticky: { value: 1020 },
        fixed: { value: 1030 },
        modalBackdrop: { value: 1040 },
        modal: { value: 1050 },
        popover: { value: 1060 },
        tooltip: { value: 1070 },
      },
      sizes: {
        sidebar: { value: "256px" },
        sidebarCollapsed: { value: "64px" },
        header: { value: "64px" },
      },
    },
    semanticTokens: {
      colors: {
        "bg.canvas": { value: "{colors.background.dark}" },
        "bg.subtle": { value: "{colors.background.darkAlt}" },
        "bg.muted": { value: "{colors.background.card}" },
        "fg.default": { value: "{colors.typography.primary}" },
        "fg.muted": { value: "{colors.typography.muted}" },
        "fg.subtle": { value: "{colors.typography.secondary}" },
        "border.default": { value: "{colors.border.dark}" },
        "border.muted": { value: "{colors.border.muted}" },
      },
    },
  },
  globalCss: {
    "html, body": {
      bg: "background.dark",
      color: "typography.secondary",
      fontFamily: "body",
      fontSize: "16px",
    },
    body: {
      background:
        "radial-gradient(circle at 50% 50%, {colors.background.darkAlt} 0%, {colors.background.dark} 100%)",
    },
    "*::selection": {
      bg: "brand.primary",
      color: "background.dark",
    },
    a: {
      color: "brand.primary",
      textDecoration: "none",
      transition: "all 0.2s ease",
      _hover: {
        color: "brand.primaryAccent",
      },
    },
    "button, input, select, textarea": {
      fontFamily: "body",
    },
  },
});

export const system = createSystem(defaultConfig, config);
