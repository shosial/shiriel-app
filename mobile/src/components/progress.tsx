import { View } from "react-native";
import { useColors } from "@/theme/colors";

export function Progress({ value, color }: { value: number; color?: any }) {
  const c = useColors();
  const pct = Math.max(0, Math.min(1, value));
  return (
    <View style={{ height: 6, borderRadius: 3, backgroundColor: c.fill, overflow: "hidden" }} accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: Math.round(pct * 100) }}>
      <View style={{ width: `${pct * 100}%`, height: "100%", borderRadius: 3, backgroundColor: color ?? c.tint }} />
    </View>
  );
}
