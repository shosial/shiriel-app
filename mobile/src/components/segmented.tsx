// iOS-style segmented control.
import { Pressable, Text, View } from "react-native";
import { useColors } from "@/theme/colors";
import { font } from "@/theme/type";

export function Segmented<T extends string>({ options, value, onChange }: { options: { key: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  const c = useColors();
  return (
    <View style={{ flexDirection: "row", backgroundColor: c.fill, borderRadius: 9, borderCurve: "continuous", padding: 2, marginHorizontal: 16 }} accessibilityRole="tablist">
      {options.map(o => {
        const on = o.key === value;
        return (
          <Pressable key={o.key} onPress={() => onChange(o.key)} accessibilityRole="tab" accessibilityState={{ selected: on }}
            style={{ flex: 1, paddingVertical: 6, borderRadius: 7, borderCurve: "continuous", backgroundColor: on ? c.cell : "transparent", boxShadow: on ? "0 3px 8px rgba(0,0,0,0.12), 0 3px 1px rgba(0,0,0,0.04)" : undefined }}>
            <Text style={{ textAlign: "center", fontSize: 13, fontFamily: on ? font.bold : font.medium, color: c.label }}>{o.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
