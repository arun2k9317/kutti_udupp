import { createTheme, MantineColorsTuple, rem } from "@mantine/core";

const warmAccent: MantineColorsTuple = [
  "#fbf6f1",
  "#f4e9de",
  "#e8d2bc",
  "#dcba98",
  "#d1a57a",
  "#c89b72",
  "#be8b5e",
  "#a5754c",
  "#8f6440",
  "#775133",
];

const blushAccent: MantineColorsTuple = [
  "#fdf7f7",
  "#faeded",
  "#f4dbdb",
  "#ebcbcb",
  "#e0b2b2",
  "#d59999",
  "#ca8181",
  "#b46b6b",
  "#9e5a5a",
  "#874a4a",
];

const sageAccent: MantineColorsTuple = [
  "#f6f8f5",
  "#ebf0e8",
  "#d6e0d0",
  "#bfd0b7",
  "#a9b8a0",
  "#93a588",
  "#7e9172",
  "#687b5d",
  "#54654b",
  "#414f3a",
];

const espresso: MantineColorsTuple = [
  "#f7f6f5",
  "#ebe8e6",
  "#d5d0cc",
  "#bdb6b0",
  "#a69e97",
  "#8e857e",
  "#77716c",
  "#5c5652",
  "#46413e",
  "#35312f",
];

export const brandTokens = {
  bgPrimary: "#F8F5F0",
  bgSecondary: "#FFFFFF",
  bgSubtle: "#F2ECE3",
  accentBlush: "#EBCBCB",
  accentSage: "#A9B8A0",
  accentWarm: "#C89B72",
  textPrimary: "#35312F",
  textSecondary: "#77716C",
  border: "#EAE4DC",
} as const;

export const kuttiTheme = createTheme({
  primaryColor: "espresso",
  primaryShade: 9,
  colors: {
    warm: warmAccent,
    blush: blushAccent,
    sage: sageAccent,
    espresso,
  },
  fontFamily: "var(--font-dm-sans), -apple-system, BlinkMacSystemFont, sans-serif",
  headings: {
    fontFamily: "var(--font-playfair), Georgia, serif",
    fontWeight: "600",
    sizes: {
      h1: { fontSize: rem(44), lineHeight: "1.14" },
      h2: { fontSize: rem(34), lineHeight: "1.2" },
      h3: { fontSize: rem(24), lineHeight: "1.28" },
      h4: { fontSize: rem(20), lineHeight: "1.35" },
    },
  },
  defaultRadius: "sm",
  radius: {
    xs: rem(4),
    sm: rem(6),
    md: rem(10),
    lg: rem(14),
    xl: rem(20),
  },
  spacing: {
    xs: rem(8),
    sm: rem(12),
    md: rem(20),
    lg: rem(32),
    xl: rem(48),
  },
  black: brandTokens.textPrimary,
  white: brandTokens.bgSecondary,
  components: {
    Button: {
      defaultProps: {
        radius: "sm",
      },
      styles: {
        root: {
          fontWeight: 500,
          letterSpacing: "0.02em",
          transition: "all 180ms ease",
        },
      },
    },
    Container: {
      defaultProps: {
        size: 1320,
      },
    },
    Badge: {
      styles: {
        root: {
          fontWeight: 500,
          letterSpacing: "0.04em",
        },
      },
    },
    Drawer: {
      styles: {
        content: {
          backgroundColor: brandTokens.bgSecondary,
        },
        header: {
          backgroundColor: brandTokens.bgSecondary,
          borderBottom: `1px solid ${brandTokens.border}`,
        },
      },
    },
    Modal: {
      styles: {
        content: {
          backgroundColor: brandTokens.bgSecondary,
        },
      },
    },
  },
});
