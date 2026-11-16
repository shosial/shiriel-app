// One palette for the whole app. The look: warm and calm. Cream background, white cards with a soft
// shadow, warm black for the brand (the logo is black and white), one blush accent, and a soft tone
// per area (content = blush, leads = sage, calls = lavender, learning = sand) so every area has a feel.
// Every color has a light and a dark version; the app follows the phone setting.
import { useColorScheme } from "react-native";

const light = {
  label: "#1c1814",
  secondaryLabel: "rgba(60,48,38,0.62)",
  tertiaryLabel: "rgba(60,48,38,0.32)",
  separator: "rgba(60,48,38,0.14)",
  groupedBackground: "#f7f3ee",
  cell: "#ffffff",
  fill: "rgba(120,96,72,0.10)",
  tint: "#1c1814",
  onTint: "#ffffff",
  accent: "#c27a63",
  onAccent: "#ffffff",
  green: "#3f9b67",
  orange: "#e08a2e",
  red: "#d9534f",
  blue: "#4a78c2",
  bar: "rgba(250,247,243,0.9)",
  shadow: "0 1px 2px rgba(60,40,20,0.05), 0 4px 14px rgba(60,40,20,0.06)",
  // area tones: a soft background and a stronger ink for icons on it
  blush: "#f6e3dc", blushInk: "#a85a43",
  sage: "#e1ebdf", sageInk: "#4c7a52",
  lavender: "#e7e3f3", lavenderInk: "#6b5ca8",
  sand: "#f3e9d4", sandInk: "#9a7430",
  hero: "#1c1814", onHero: "#fbf6f0",
};

const dark: typeof light = {
  label: "#f5efe8",
  secondaryLabel: "rgba(245,239,232,0.62)",
  tertiaryLabel: "rgba(245,239,232,0.3)",
  separator: "rgba(245,239,232,0.12)",
  groupedBackground: "#13110f",
  cell: "#1f1b18",
  fill: "rgba(245,239,232,0.10)",
  tint: "#f5efe8",
  onTint: "#13110f",
  accent: "#e0a08a",
  onAccent: "#13110f",
  green: "#5cc285",
  orange: "#f0a24a",
  red: "#ef6b66",
  blue: "#7aa2e6",
  bar: "rgba(24,21,19,0.9)",
  shadow: "0 1px 2px rgba(0,0,0,0.3)",
  blush: "#3b2923", blushInk: "#eaa58f",
  sage: "#25302a", sageInk: "#93c79a",
  lavender: "#2b2838", lavenderInk: "#b3a6ec",
  sand: "#352e22", sandInk: "#e3c27e",
  hero: "#2a2420", onHero: "#fbf6f0",
};

export type Palette = Record<keyof typeof light, any>;
export type Tone = "blush" | "sage" | "lavender" | "sand";

export function useColors(): Palette {
  return useColorScheme() === "dark" ? dark : light;
}
