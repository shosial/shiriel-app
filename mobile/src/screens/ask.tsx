// The assistant: answers ONLY from Shiriel's own material (courses, guides, her method), and shows where
// the answer comes from. With no material on the question it says so and passes the question to Shiriel.
// Demo: one sample exchange, and the "no material" answer for anything typed.
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Screen } from "@/components/screen";
import { Icon } from "@/components/icon";
import { useColors } from "@/theme/colors";
import { type } from "@/theme/type";
import { sampleQA } from "@/data/demo";

function Bubble({ mine, text, source }: { mine?: boolean; text: string; source?: string }) {
  const c = useColors();
  return (
    <View style={{ alignSelf: mine ? "flex-start" : "flex-end", maxWidth: "82%", backgroundColor: mine ? c.tint : c.cell, borderRadius: 14, borderCurve: "continuous", paddingHorizontal: 14, paddingVertical: 10, gap: 8, boxShadow: mine ? undefined : c.shadow }}>
      <Text selectable style={[type.body as any, { color: mine ? c.onTint : c.label, writingDirection: "rtl" }]}>{text}</Text>
      {source ? (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6, borderTopWidth: 1, borderTopColor: c.separator, paddingTop: 8 }}>
          <Icon sf="book" md="menu_book" size={14} color={c.accent} />
          <Text style={[type.footnote as any, { color: c.accent }]}>{source}</Text>
        </View>
      ) : null}
    </View>
  );
}

export function Ask() {
  const c = useColors();
  const [msgs, setMsgs] = useState<{ mine: boolean; text: string; source?: string }[]>([{ mine: true, text: sampleQA.q }, { mine: false, text: sampleQA.a, source: sampleQA.source }]);
  const [draft, setDraft] = useState("");
  const send = () => {
    if (!draft.trim()) return;
    setMsgs(m => [...m, { mine: true, text: draft.trim() }, { mine: false, text: "על זה עוד אין לי חומר מהקורס, אז אני לא רוצה לנחש. העברתי את השאלה לשיריאל, והיא תענה לך כאן (ראשון עד חמישי, 9:00 עד 19:00)." }]);
    setDraft("");
  };
  return (
    <Screen back title="העוזרת" subtitle="עונה רק מתוך החומרים של הקורס, ומראה מאיפה.">
      <View style={{ paddingHorizontal: 16, gap: 10 }}>
        {msgs.map((m, i) => <Bubble key={i} mine={m.mine} text={m.text} source={m.source} />)}
      </View>
      <View style={{ marginHorizontal: 16, flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: c.cell, borderRadius: 22, paddingStart: 16, paddingEnd: 6, paddingVertical: 6 }}>
        <TextInput value={draft} onChangeText={setDraft} onSubmitEditing={send} placeholder="כתבי שאלה" placeholderTextColor={c.tertiaryLabel}
          style={{ flex: 1, fontSize: 17, color: c.label, textAlign: "right", paddingVertical: 6 }} accessibilityLabel="שאלה לעוזרת" />
        <Pressable onPress={send} accessibilityRole="button" accessibilityLabel="שליחה"
          style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: c.tint, alignItems: "center", justifyContent: "center" }}>
          <Icon sf="arrow.up" md="arrow_upward" size={18} color={c.onTint} weight="bold" />
        </Pressable>
      </View>
    </Screen>
  );
}
