// What the client sees on the approval link: no login, her logo on top, each post with
// "מאשר" or "צריך תיקון" (with a short note). The real page is built on the server with no scripts.
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Screen } from "@/components/screen";
import { Button, Note } from "@/components/form";
import { useColors } from "@/theme/colors";
import { font, type } from "@/theme/type";
import { client, clientContent } from "@/data/demo";

function Post({ title, kind, date, tone, caption }: { title: string; kind: string; date?: string; tone: string; caption?: string }) {
  const c = useColors();
  const [answer, setAnswer] = useState<"ok" | "fix">();
  return (
    <View style={{ marginHorizontal: 16, backgroundColor: c.cell, borderRadius: 14, overflow: "hidden" }}>
      <View style={{ aspectRatio: 4 / 5, maxHeight: 360, backgroundColor: tone, padding: 14, justifyContent: "flex-end" }}>
        <Text style={{ color: "#fff", fontFamily: font.bold, fontSize: 18 }}>{title}</Text>
        <Text style={{ color: "rgba(255,255,255,0.7)", fontFamily: font.num, fontSize: 12 }}>{kind} · {date}</Text>
      </View>
      <View style={{ padding: 16, gap: 12 }}>
        {caption ? <Text style={[type.body as any, { color: c.label }]}>{caption}</Text> : null}
        {answer === "ok" ? <Text style={{ fontFamily: font.handMedium, fontSize: 18, color: c.green }}>אישרת ✓ תודה!</Text> : (
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Button flex title="מאשר" onPress={() => setAnswer("ok")} />
            <Button flex outline title="צריך תיקון" onPress={() => setAnswer("fix")} />
          </View>
        )}
        {answer === "fix" ? (
          <TextInput placeholder="מה לתקן?" placeholderTextColor={c.tertiaryLabel} multiline accessibilityLabel="מה לתקן"
            style={[type.body as any, { color: c.label, borderWidth: 1, borderColor: c.separator, borderRadius: 6, padding: 10, minHeight: 70, textAlign: "right" }]} />
        ) : null}
      </View>
    </View>
  );
}

export function Approve() {
  const c = useColors();
  const posts = clientContent.filter(i => i.stage === "approved");
  return (
    <Screen back title="אישור תוכן" subtitle={`${client.name}, ${client.business} · שבוע 16.11`}>
      <Note>כך הלקוח רואה את הקישור: בלי התחברות ובלי אפליקציה, עם הלוגו שלך למעלה. התשובות שלו מגיעות לתיק הלקוח.</Note>
      {posts.map(p => <Post key={p.id} {...p} />)}
      <Text style={[type.footnote as any, { color: c.tertiaryLabel, textAlign: "center" }]}>נשלח על ידי שיריאל טורג'מן · ניהול סושיאל</Text>
    </Screen>
  );
}
