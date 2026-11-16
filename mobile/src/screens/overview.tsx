// "היום שלי": the home screen. It answers one question first: what is the one thing to do now.
// Then today's progress (small wins, a streak), quick actions, tomorrow, the goal, and the rest.
import { useState } from "react";
import { Text, View } from "react-native";
import Animated, { FadeIn, FadeInDown, LinearTransition } from "react-native-reanimated";
import { useRouter, type Href } from "expo-router";
import { Screen } from "@/components/screen";
import { Section, Row } from "@/components/grouped-list";
import { Progress } from "@/components/progress";
import { Card } from "@/components/card";
import { Press, tap } from "@/components/press";
import { Icon } from "@/components/icon";
import { useColors, type Tone } from "@/theme/colors";
import { type } from "@/theme/type";
import { Tools } from "./tools";
import { me, month, shekel, today, tomorrow, waiting } from "@/data/demo";

function NextStep({ steps, onDone }: { steps: typeof today.steps; onDone: (id: string) => void }) {
  const c = useColors();
  const next = steps.find(s => !s.done);
  return (
    <Card order={0} bg={c.hero} style={{ gap: 14, padding: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Icon sf="sparkle" md="auto_awesome" size={16} color={c.accent} />
        <Text style={[type.footnote as any, { color: c.accent, fontWeight: "600" }]}>{next ? "הצעד הבא שלך" : "סיימת להיום"}</Text>
      </View>
      <Animated.View key={next?.id ?? "done"} entering={FadeIn.duration(300)} style={{ gap: 4 }}>
        <Text style={[type.title2 as any, { color: c.onHero, writingDirection: "rtl" }]}>
          {next ? next.text : "כל הצעדים של היום מאחורייך. מגיע לך ערב רגוע."}
        </Text>
        {next ? <Text style={[type.subhead as any, { color: c.onHero, opacity: 0.65 }]}>{next.why}</Text> : null}
      </Animated.View>
      {next ? (
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Press onPress={() => onDone(next.id)} label="עשיתי" style={{ flex: 1 }}>
            <View style={{ backgroundColor: c.accent, borderRadius: 14, borderCurve: "continuous", paddingVertical: 13, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 6 }}>
              <Icon sf="checkmark" md="check" size={18} color={c.onAccent} weight="bold" />
              <Text style={[type.headline as any, { color: c.onAccent }]}>עשיתי</Text>
            </View>
          </Press>
          <Press onPress={() => {}} label="להעביר למחר">
            <View style={{ backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 14, borderCurve: "continuous", paddingVertical: 13, paddingHorizontal: 18 }}>
              <Text style={[type.headline as any, { color: c.onHero }]}>למחר</Text>
            </View>
          </Press>
        </View>
      ) : null}
    </Card>
  );
}

function TodayProgress({ steps }: { steps: typeof today.steps }) {
  const c = useColors();
  const done = steps.filter(s => s.done).length;
  const left = steps.length - done;
  return (
    <Card order={1}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={[type.headline as any, { color: c.label, fontVariant: ["tabular-nums"] }]}>{done} מתוך {steps.length} צעדים היום</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: c.sand, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 }}>
          <Icon sf="flame.fill" md="local_fire_department" size={14} color={c.sandInk} />
          <Text style={[type.footnote as any, { color: c.sandInk, fontWeight: "600" }]}>{today.streak} ימים ברצף</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 6 }}>
        {steps.map(s => (
          <Animated.View key={s.id} layout={LinearTransition} style={{ flex: 1, height: 8, borderRadius: 4, backgroundColor: s.done ? c.accent : c.fill }} />
        ))}
      </View>
      <Text style={[type.subhead as any, { color: c.secondaryLabel }]}>
        {left === 0 ? "יום מלא. ככה בונים עסק, צעד אחרי צעד." : left === 1 ? "עוד צעד אחד וסיימת להיום." : `את בדרך הנכונה. עוד ${left} צעדים וסיימת להיום.`}
      </Text>
    </Card>
  );
}

function Tile({ title, sf, md, tone, href, order }: { title: string; sf: string; md: string; tone: Tone; href: Href; order: number }) {
  const c = useColors();
  const router = useRouter();
  return (
    <Animated.View entering={FadeInDown.duration(380).delay(order * 60)} style={{ flexBasis: "47%", flexGrow: 1 }}>
      <Press role="link" onPress={() => router.push(href)} label={title}>
        <View style={{ backgroundColor: c[tone], borderRadius: 18, borderCurve: "continuous", padding: 14, gap: 18, minHeight: 92, justifyContent: "space-between" }}>
          <Icon sf={sf} md={md} size={24} color={c[`${tone}Ink`]} />
          <Text style={[type.headline as any, { color: c.label }]}>{title}</Text>
        </View>
      </Press>
    </Animated.View>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  const c = useColors();
  return (
    <View style={{ flexBasis: "30%", flexGrow: 1, gap: 2 }}>
      <Text selectable style={[type.title2 as any, { color: c.label, fontVariant: ["tabular-nums"], writingDirection: "rtl" }]}>{value}</Text>
      <Text style={[type.footnote as any, { color: c.secondaryLabel }]}>{label}</Text>
    </View>
  );
}

export function Overview() {
  const c = useColors();
  const [steps, setSteps] = useState(today.steps);
  const markDone = (id: string) => { tap(); setSteps(list => list.map(s => (s.id === id ? { ...s, done: true } : s))); };

  return (
    <Screen title="היום שלי" subtitle={`${today.dateLabel} · ${today.greeting}, ${me.name}`}>
      <NextStep steps={steps} onDone={markDone} />
      <TodayProgress steps={steps} />

      <View style={{ marginHorizontal: 16, flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        <Tile order={2} title="להעלות שיחה" sf="waveform" md="graphic_eq" tone="lavender" href="/calls" />
        <Tile order={2} title="ליד חדש" sf="person.badge.plus" md="person_add" tone="sage" href="/leads" />
        <Tile order={3} title="רעיון לתוכן" sf="lightbulb" md="lightbulb" tone="blush" href="/content" />
        <Tile order={3} title="לשאול את העוזרת" sf="sparkles" md="auto_awesome" tone="sand" href="/ask" />
      </View>

      <Section header="מחר ביומן">
        {tomorrow.map(t => (
          <View key={t.id} style={{ flexDirection: "row", alignItems: "center", gap: 14, paddingHorizontal: 16, paddingVertical: 12 }}>
            <View style={{ width: 4, alignSelf: "stretch", borderRadius: 2, backgroundColor: c[`${t.tone}Ink`] }} />
            <Text style={[type.headline as any, { color: c.label, fontVariant: ["tabular-nums"], minWidth: 52 }]} numberOfLines={1}>{t.time}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[type.body as any, { color: c.label }]}>{t.title}</Text>
              <Text style={[type.subhead as any, { color: c.secondaryLabel }]}>{t.sub}</Text>
            </View>
          </View>
        ))}
      </Section>

      <Card order={4}>
        <Text style={[type.footnote as any, { color: c.secondaryLabel }]}>היעד שלך ל-3 חודשים</Text>
        <Text style={[type.title3 as any, { color: c.label }]}>{me.goal}</Text>
        <Progress value={me.goalDone / me.goalTotal} color={c.accent} />
        <Text style={[type.subhead as any, { color: c.secondaryLabel, fontVariant: ["tabular-nums"] }]}>{me.goalDone} מתוך {me.goalTotal}. עוד {me.goalTotal - me.goalDone} לקוחות והגעת.</Text>
      </Card>

      <Section header="מחכה לך">
        {waiting.map(w => <Row key={w.id} title={w.title} sf={w.sf} md={w.md} tone={w.tone} href={w.href} />)}
      </Section>

      <Section header={`${month.label} במספרים`}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", padding: 16, rowGap: 14, columnGap: 8 }}>
          <Stat label="לקוחות" value={String(month.clients)} />
          <Stat label="חדשים" value={String(month.newClients)} />
          <Stat label="לידים חדשים" value={String(month.newLeads)} />
          <Stat label="הכנסה" value={shekel(month.income)} />
          <Stat label="מתוך הצפוי" value={`${Math.round((month.income / month.expected) * 100)}%`} />
          <Stat label="נשמרו" value={String(month.kept)} />
        </View>
      </Section>

      <Tools />
    </Screen>
  );
}
