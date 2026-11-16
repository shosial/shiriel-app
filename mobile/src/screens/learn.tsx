// Learning portal + AI: courses, ready-made AI agents, and an assistant she can ask anything.
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "@/components/screen";
import { Section, Row } from "@/components/grouped-list";
import { Progress } from "@/components/progress";
import { Icon } from "@/components/icon";
import { useColors } from "@/theme/colors";
import { type } from "@/theme/type";
import { agents, courses } from "@/data/demo";

export function AskBar() {
  const c = useColors();
  const router = useRouter();
  return (
    <Pressable accessibilityRole="link" onPress={() => router.push("/ask")} style={({ pressed }) => ({ marginHorizontal: 16, flexDirection: "row", alignItems: "center", gap: 10, borderWidth: 1, borderColor: c.label, opacity: pressed ? 0.7 : 1, borderRadius: 4, borderCurve: "continuous", paddingHorizontal: 14, paddingVertical: 12 })}>
        <Icon sf="text.bubble" md="chat_bubble" size={20} color={c.label} />
        <Text style={[type.body as any, { color: c.label, flex: 1 }]}>שאלי את העוזרת שלך…</Text>
    </Pressable>
  );
}

export function Learn() {
  const c = useColors();
  return (
    <Screen title="למידה">
      <AskBar />
      <Section header="הקורסים שלי">
        {courses.map(k => (
          <Row key={k.id} title={k.title} subtitle={k.done ? `${k.done} מתוך ${k.lessons} שיעורים` : `${k.lessons} שיעורים`} onPress={() => {}}
            accessory={<View style={{ width: 56 }}><Progress value={k.done / k.lessons} color={c.accent} /></View>} />
        ))}
      </Section>
      <Section header="סוכני AI" footer="כל סוכן עושה עבודה אחת, לפי השיטה שלמדת בקורס. העוזרת עונה רק מתוך החומרים של הקורס.">
        {agents.map(g => <Row key={g.id} title={g.title} subtitle={g.subtitle} sf={g.sf} md={g.md} tone="sand" onPress={() => {}} />)}
      </Section>
    </Screen>
  );
}
