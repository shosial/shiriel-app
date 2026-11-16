// A pressable that gives feedback: shrinks a little while pressed, and a light tap on the phone.
import type { ReactNode } from "react";
import { Pressable } from "react-native";
import * as Haptics from "expo-haptics";

export function tap() {
  if (process.env.EXPO_OS === "ios" || process.env.EXPO_OS === "android") Haptics.selectionAsync().catch(() => {});
}

export function Press({ onPress, children, style, label, role = "button" }: { onPress?: () => void; children: ReactNode; style?: any; label?: string; role?: "button" | "link" }) {
  return (
    <Pressable accessibilityRole={role} accessibilityLabel={label} onPress={() => { tap(); onPress?.(); }}
      style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.97 : 1 }], opacity: pressed ? 0.92 : 1 }, style]}>
      {children}
    </Pressable>
  );
}
