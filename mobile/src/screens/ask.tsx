// The assistant: she asks a question and gets an answer in plain Hebrew. Demo: one sample exchange.
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Screen } from "@/components/screen";
import { Icon } from "@/components/icon";
import { useColors } from "@/theme/colors";
import { type } from "@/theme/type";
import { sampleQA } from "@/data/demo";

function Bubble({ mine, text }: { mine?: boolean; text: string }) {
  const c = useColors();
  return (
    <View style={{ alignSelf: mine ? "flex-start" : "flex-end", maxWidth: "82%", backgroundColor: mine ? c.tint : c.cell, borderRadius: 18, borderCurve: "continuous", paddingHorizontal: 14, paddingVertical: 9 }}>
      <Text selectable style={[type.body as any, { color: mine ? c.onTint : c.label, writingDirection: "rtl" }]}>{text}</Text>
    </View>
  );
}

export function Ask() {
  const c = useColors();
  const [msgs, setMsgs] = useState([{ mine: true, text: sampleQA.q }, { mine: false, text: sampleQA.a }]);
  const [draft, setDraft] = useState("");
  const send = () => {
    if (!draft.trim()) return;
    setMsgs(m => [...m, { mine: true, text: draft.trim() }, { mine: false, text: "בדמו אין עדיין חיבור לעוזרת. באפליקציה עצמה תקבלי כאן תשובה." }]);
    setDraft("");
  };
  return (
    <Screen back title="העוזרת" subtitle="שאלות על מכירה, תוכן, קמפיינים ולקוחות.">
      <View style={{ paddingHorizontal: 16, gap: 10 }}>
        {msgs.map((m, i) => <Bubble key={i} mine={m.mine} text={m.text} />)}
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
