// A scrolling screen on the grouped background. On iPhone/Android the large title comes from the
// native navigation bar; on the web we draw the same large title at the top of the content.
import { Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { Icon } from "./icon";
import type { ReactNode } from "react";
import { useColors } from "@/theme/colors";
import { type } from "@/theme/type";

export function Screen({ title, subtitle, back, children }: { title: string; subtitle?: string; back?: boolean; children: ReactNode }) {
  const c = useColors();
  const web = process.env.EXPO_OS === "web";
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1, backgroundColor: c.groupedBackground }}
      contentContainerStyle={{ paddingBottom: web ? 110 : 32, gap: 28, width: "100%", maxWidth: 680, alignSelf: "center" }}
    >
      {(web || subtitle) && (
        <View style={{ paddingHorizontal: 20, paddingTop: web ? 12 : 0, gap: 4 }}>
          {web && back ? (
            <Pressable onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))} accessibilityRole="button" accessibilityLabel="חזרה"
              style={{ flexDirection: "row", alignItems: "center", gap: 2, alignSelf: "flex-start", paddingVertical: 6 }}>
              <Icon sf="" md="chevron_right" size={26} color={c.tint} />
              <Text style={{ fontSize: 17, color: c.tint }}>חזרה</Text>
            </Pressable>
          ) : null}
          {web && <Text accessibilityRole="header" style={[type.largeTitle as any, { color: c.label }]}>{title}</Text>}
          {subtitle ? <Text style={[type.subhead as any, { color: c.secondaryLabel }]}>{subtitle}</Text> : null}
        </View>
      )}
      {children}
    </ScrollView>
  );
}
