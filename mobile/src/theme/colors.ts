// One palette for the whole app, following Apple's Human Interface Guidelines.
// On iPhone and Android the colors come from the system (they follow light/dark mode and accessibility
// settings by themselves). On the web they come from the matching iOS values below.
import { Platform, useColorScheme } from "react-native";
import { Color } from "expo-router";

const web = {
  light: {
    label: "#000000",
    secondaryLabel: "rgba(60,60,67,0.6)",
    tertiaryLabel: "rgba(60,60,67,0.3)",
    separator: "rgba(60,60,67,0.29)",
    groupedBackground: "#f2f2f7",
    cell: "#ffffff",
    fill: "rgba(118,118,128,0.12)",
    tint: "#000000",
    onTint: "#ffffff",
    green: "#34c759",
    orange: "#ff9500",
    red: "#ff3b30",
    blue: "#007aff",
    bar: "rgba(249,249,249,0.85)",
  },
  dark: {
    label: "#ffffff",
    secondaryLabel: "rgba(235,235,245,0.6)",
    tertiaryLabel: "rgba(235,235,245,0.3)",
    separator: "rgba(84,84,88,0.6)",
    groupedBackground: "#000000",
    cell: "#1c1c1e",
    fill: "rgba(118,118,128,0.24)",
    tint: "#ffffff",
    onTint: "#000000",
    green: "#30d158",
    orange: "#ff9f0a",
    red: "#ff453a",
    blue: "#0a84ff",
    bar: "rgba(22,22,22,0.85)",
  },
};

export type Palette = Record<keyof typeof web.light, any>;

function nativePalette(dark: boolean): Palette {
  const w = dark ? web.dark : web.light;
  return {
    label: Platform.select({ ios: Color.ios.label, android: Color.android.dynamic.onSurface, default: w.label })!,
    secondaryLabel: Platform.select({ ios: Color.ios.secondaryLabel, android: Color.android.dynamic.onSurfaceVariant, default: w.secondaryLabel })!,
    tertiaryLabel: Platform.select({ ios: Color.ios.tertiaryLabel, android: Color.android.dynamic.outline, default: w.tertiaryLabel })!,
    separator: Platform.select({ ios: Color.ios.separator, android: Color.android.dynamic.outlineVariant, default: w.separator })!,
    groupedBackground: Platform.select({ ios: Color.ios.systemGroupedBackground, android: Color.android.dynamic.surface, default: w.groupedBackground })!,
    cell: Platform.select({ ios: Color.ios.secondarySystemGroupedBackground, android: Color.android.dynamic.surfaceContainer, default: w.cell })!,
    fill: Platform.select({ ios: Color.ios.tertiarySystemFill, android: Color.android.dynamic.surfaceVariant, default: w.fill })!,
    // the brand is black and white: black in light mode, white in dark mode
    tint: w.tint,
    onTint: w.onTint,
    green: Platform.select({ ios: Color.ios.systemGreen, default: w.green })!,
    orange: Platform.select({ ios: Color.ios.systemOrange, default: w.orange })!,
    red: Platform.select({ ios: Color.ios.systemRed, default: w.red })!,
    blue: Platform.select({ ios: Color.ios.systemBlue, default: w.blue })!,
    bar: w.bar,
  };
}

export function useColors(): Palette {
  const dark = useColorScheme() === "dark";
  return process.env.EXPO_OS === "web" ? (dark ? web.dark : web.light) : nativePalette(dark);
}
