// One analyzed call: a player, call metrics, the analysis, and next-call tasks.
// Every minute written in the analysis (like 15:53) is a button that plays the recording from there.
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Screen } from "@/components/screen";
import { Section, Row } from "@/components/grouped-list";
import { Progress } from "@/components/progress";
import { Icon } from "@/components/icon";
import { useColors } from "@/theme/colors";
import { font, type } from "@/theme/type";
import { calls } from "@/data/demo";

function Minutes({ text, onSeek }: { text: string; onSeek: (t: string) => void }) {
  const c = useColors();
  const parts = text.split(/(\d{1,2}:\d{2})/);
  return (
    <Text style={[type.body as any, { color: c.label, writingDirection: "rtl" }]}>
      {parts.map((p, i) => /^\d{1,2}:\d{2}$/.test(p)
        ? <Text key={i} onPress={() => onSeek(p)} accessibilityRole="button" style={{ color: c.accent, fontFamily: font.bold, fontVariant: ["tabular-nums"] }}>{p}</Text>
        : <Text key={i}>{i > 0 ? `\u200F\u2060${p}` : p}</Text>)}
    </Text>
  );
}

export function CallDetail({ id }: { id: string }) {
  const c = useColors();
  const call = calls.find(x => x.id === id) ?? calls[0];
  const [at, setAt] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const seek = (t: string) => { setAt(t); setPlaying(true); };
  const [mm, ss] = (at ?? "0:00").split(":").map(Number);
  const [dm, ds] = call.duration.split(":").map(Number);
  const pos = (mm * 60 + ss) / (dm * 60 + ds);

  return (
    <Screen back title={call.label} subtitle={`${call.date} · ${call.duration}${call.result ? ` · ${call.result}` : ""}`}>
      <View style={{ marginHorizontal: 16, backgroundColor: c.cell, borderRadius: 12, borderCurve: "continuous", padding: 16, gap: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
          <Pressable onPress={() => setPlaying(p => !p)} accessibilityRole="button" accessibilityLabel={playing ? "השהיה" : "ניגון"}
            style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: c.tint, alignItems: "center", justifyContent: "center" }}>
            <Icon sf={playing ? "pause.fill" : "play.fill"} md={playing ? "pause" : "play_arrow"} size={20} color={c.onTint} />
          </Pressable>
          <View style={{ flex: 1, gap: 6 }}>
            <Progress value={pos} />
            <Text style={[type.footnote as any, { color: c.secondaryLabel, fontVariant: ["tabular-nums"] }]}>{at ?? "0:00"} / {call.duration}</Text>
          </View>
        </View>
      </View>

      {call.metrics ? (
        <Section header="מדדי השיחה">
          <Row title="את דיברת" value={`${call.metrics.me}%`} />
          <Row title="הלקוחה דיברה" value={`${call.metrics.them}%`} />
          <Row title="הקטע הרצוף הארוך ביותר" value={call.metrics.longestMonologue} />
          <Row title="שתיקות ארוכות" value={String(call.metrics.silences)} />
        </Section>
      ) : null}

      {call.parts?.map(p => (
        <Section key={p.title} header={p.title}>
          {p.fields.map(([k, v]) => (
            <View key={k} style={{ paddingHorizontal: 16, paddingVertical: 11, gap: 2 }}>
              <Text style={[type.footnote as any, { color: c.secondaryLabel }]}>{k}</Text>
              <Minutes text={v} onSeek={seek} />
            </View>
          ))}
        </Section>
      ))}

      {call.tasks?.length ? (
        <Section header="משימות לשיחה הבאה" footer="המשימות נכנסות לרשימת הפעולות שלך, ובניתוח הבא בודקים אם יושמו.">
          {call.tasks.map(t => <Row key={t} title={t} sf="target" md="flag" />)}
        </Section>
      ) : null}
    </Screen>
  );
}
