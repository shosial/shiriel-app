// One palette for the whole app, built on the brand: black on light gray (the logo), white surfaces,
// and one warm terracotta accent used sparingly (the next step, progress, a few highlights).
// The soft area tones (blush, sage, lavender, sand) are kept for small marks only, never big blocks.
// Every color has a light and a dark version; the app follows the phone setting.
import { useColorScheme } from "react-native";

const light = {
  label: "#0a0a0a",
  secondaryLabel: "rgba(10,10,10,0.58)",
  tertiaryLabel: "rgba(10,10,10,0.3)",
  separator: "rgba(10,10,10,0.12)",
  groupedBackground: "#f2f2f2",
  cell: "#ffffff",
  fill: "rgba(10,10,10,0.07)",
  tint: "#0a0a0a",
  onTint: "#ffffff",
  accent: "#b8674f",
  onAccent: "#ffffff",
  green: "#3f8f5f",
  orange: "#d0802a",
  red: "#cc4b44",
  blue: "#4a6fae",
  bar: "rgba(242,242,242,0.92)",
  shadow: "none",
  blush: "#f3e1da", blushInk: "#a85a43",
  sage: "#e1e9df", sageInk: "#4c7a52",
  lavender: "#e6e3f0", lavenderInk: "#6b5ca8",
  sand: "#f1e8d6", sandInk: "#8f6c2c",
  hero: "#0a0a0a", onHero: "#ffffff",
};

const dark: typeof light = {
  label: "#f2f2f2",
  secondaryLabel: "rgba(242,242,242,0.6)",
  tertiaryLabel: "rgba(242,242,242,0.3)",
  separator: "rgba(242,242,242,0.13)",
  groupedBackground: "#0a0a0a",
  cell: "#171717",
  fill: "rgba(242,242,242,0.09)",
  tint: "#f2f2f2",
  onTint: "#0a0a0a",
  accent: "#d98d74",
  onAccent: "#0a0a0a",
  green: "#5cb27e",
  orange: "#e89c4a",
  red: "#e56a63",
  blue: "#7d9bd6",
  bar: "rgba(14,14,14,0.92)",
  shadow: "none",
  blush: "#33241f", blushInk: "#e3a28c",
  sage: "#202a23", sageInk: "#93c29a",
  lavender: "#25232f", lavenderInk: "#b0a4e6",
  sand: "#2e281e", sandInk: "#dcbd7c",
  hero: "#f2f2f2", onHero: "#0a0a0a",
};

export type Palette = Record<keyof typeof light, any>;
export type Tone = "blush" | "sage" | "lavender" | "sand";

export function useColors(): Palette {
  return useColorScheme() === "dark" ? dark : light;
}
