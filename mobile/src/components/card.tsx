// A warm card: white on the cream background, rounded, soft shadow. Cards enter with a short fade-up,
// staggered by their order, so the screen settles in instead of popping.
import type { ReactNode } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useColors } from "@/theme/colors";

export function Card({ children, order = 0, bg, style }: { children: ReactNode; order?: number; bg?: any; style?: any }) {
  const c = useColors();
  return (
    <Animated.View entering={FadeInDown.duration(380).delay(order * 60)}
      style={[{ marginHorizontal: 16, backgroundColor: bg ?? c.cell, borderRadius: 20, borderCurve: "continuous", padding: 18, gap: 12, boxShadow: c.shadow }, style]}>
      {children}
    </Animated.View>
  );
}
