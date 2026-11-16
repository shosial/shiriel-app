// "היום שלי": the home screen, laid out like a page from the brand, not like a dashboard.
// The logo and the date on top, a big greeting, then the one next step in a black block.
// Below: today's steps as a numbered list (01-05), tomorrow, the goal in big numbers, the month, and the rest.
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Section, Row } from "@/components/grouped-list";
import { Press, tap } from "@/components/press";
import { Icon } from "@/components/icon";
import { useColors } from "@/theme/colors";
import { font, type } from "@/theme/type";
import { useColorScheme } from "react-native";
import { Tools } from "./tools";
import { me, month, shekel, today, tomorrow, waiting } from "@/data/demo";

const two = (n: number) => String(n).padStart(2, "0");

function Rule() {
  const c = useColors();
  return <View style={{ height: StyleSheet.hairlineWidth * 2, backgroundColor: c.label, opacity: 0.85, marginHorizontal: 20 }} />;
}

function Heading({ text, side }: { text: string; side?: string }) {
  const c = useColors();
  return (
    <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", paddingHorizontal: 20 }}>
      <Text style={[type.headline as any, { color: c.label, fontFamily: font.black, fontSize: 19 }]}>{text}</Text>
      {side ? <Text style={[type.footnote as any, { color: c.secondaryLabel }]}>{side}</Text> : null}
    </View>
  );
}

function Masthead() {
  const c = useColors();
  const dark = useColorScheme() === "dark";
  const left = today.steps.filter(s => !s.done).length;
  return (
    <View style={{ paddingHorizontal: 20, gap: 18 }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Image source={dark ? require("../../assets/brand/wordmark-white.png") : require("../../assets/brand/wordmark-black.png")}
          style={{ width: 150, height: 20.5 }} contentFit="contain" accessibilityLabel="Shiriel Turgeman" />
        <Text style={[type.eyebrow as any, { color: c.secondaryLabel }]}>16.11.26</Text>
      </View>
      <View style={{ gap: 6 }}>
        <Text accessibilityRole="header" style={{ fontFamily: font.black, fontSize: 36, lineHeight: 42, color: c.label }}>{today.greeting}, {me.name}.</Text>
        <Text style={[type.callout as any, { color: c.secondaryLabel }]}>{today.dateLabel}. נשארו {left} צעדים קטנים להיום.</Text>
      </View>
    </View>
  );
}

function NextStep({ steps, onDone }: { steps: typeof today.steps; onDone: (id: string) => void }) {
  const c = useColors();
  const i = steps.findIndex(s => !s.done);
  const next = steps[i];
  return (
    <Animated.View entering={FadeInDown.duration(380)} style={{ marginHorizontal: 20, backgroundColor: c.hero, borderRadius: 6, padding: 22, gap: 18 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={[type.footnote as any, { color: c.accent, fontFamily: font.bold }]}>{next ? "הצעד הבא" : "סיימת להיום"}</Text>
        {next ? <Text style={{ fontFamily: font.num, fontSize: 13, color: c.onHero, opacity: 0.55 }}>{two(i + 1)} / {two(steps.length)}</Text> : null}
      </View>
      <Animated.View key={next?.id ?? "done"} entering={FadeIn.duration(300)} style={{ gap: 6 }}>
        <Text style={{ fontFamily: font.bold, fontSize: 25, lineHeight: 32, color: c.onHero, writingDirection: "rtl" }}>
          {next ? next.text : "כל הצעדים של היום מאחורייך. מגיע לך ערב רגוע."}
        </Text>
        {next ? <Text style={[type.subhead as any, { color: c.onHero, opacity: 0.6 }]}>{next.why}</Text> : null}
      </Animated.View>
      {next ? (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <Press onPress={() => onDone(next.id)} label="עשיתי">
            <View style={{ backgroundColor: c.onHero, borderRadius: 4, paddingVertical: 12, paddingHorizontal: 26 }}>
              <Text style={[type.headline as any, { color: c.hero }]}>עשיתי</Text>
            </View>
          </Press>
          <Press onPress={() => {}} label="להעביר למחר">
            <Text style={[type.headline as any, { color: c.onHero, fontFamily: font.medium, textDecorationLine: "underline" }]}>להעביר למחר</Text>
          </Press>
        </View>
      ) : null}
    </Animated.View>
  );
}

function Steps({ steps }: { steps: typeof today.steps }) {
  const c = useColors();
  const nextId = steps.find(s => !s.done)?.id;
  return (
    <View style={{ paddingHorizontal: 20 }}>
      {steps.map((s, i) => {
        const isNext = s.id === nextId;
        return (
          <View key={s.id} style={{ flexDirection: "row", alignItems: "flex-start", gap: 16, paddingVertical: 13, borderTopWidth: i ? StyleSheet.hairlineWidth : 0, borderTopColor: c.separator }}>
            <Text style={{ fontFamily: isNext ? font.numMedium : font.numLight, fontSize: 15, lineHeight: 23, color: isNext ? c.accent : c.tertiaryLabel, width: 22 }}>{two(i + 1)}</Text>
            <Text style={[type.body as any, {
              flex: 1, writingDirection: "rtl",
              color: s.done ? c.tertiaryLabel : c.label,
              fontFamily: isNext ? font.bold : font.regular,
              textDecorationLine: s.done ? "line-through" : "none",
            }]}>{s.text}</Text>
            {s.done ? <Icon sf="checkmark" md="check" size={18} color={c.accent} weight="semibold" /> : null}
          </View>
        );
      })}
    </View>
  );
}

function Big({ value, label }: { value: string; label: string }) {
  const c = useColors();
  return (
    <View style={{ flexBasis: "33%", flexGrow: 1, paddingVertical: 14, gap: 2 }}>
      <Text selectable style={{ fontFamily: font.numLight, fontSize: 28, lineHeight: 34, color: c.label, writingDirection: "ltr", textAlign: "right" }}>{value}</Text>
      <Text style={[type.footnote as any, { color: c.secondaryLabel }]}>{label}</Text>
    </View>
  );
}

export function Overview() {
  const c = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const web = process.env.EXPO_OS === "web";
  const [steps, setSteps] = useState(today.steps);
  const markDone = (id: string) => { tap(); setSteps(list => list.map(s => (s.id === id ? { ...s, done: true } : s))); };
  const done = steps.filter(s => s.done).length;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: c.groupedBackground }}
      contentContainerStyle={{ paddingTop: insets.top + 14, paddingBottom: web ? 110 : 40, gap: 30, width: "100%", maxWidth: 680, alignSelf: "center" }}>
      <Masthead />
      <NextStep steps={steps} onDone={markDone} />

      <View style={{ gap: 6 }}>
        <Heading text="היום" side={`${done} מתוך ${steps.length} · ${today.streak} ימים ברצף`} />
        <Steps steps={steps} />
      </View>

      <Press role="link" onPress={() => router.push("/ask")} label="שאלי את העוזרת" style={{ marginHorizontal: 20 }}>
        <View style={{ borderWidth: 1, borderColor: c.label, borderRadius: 4, paddingVertical: 14, paddingHorizontal: 16, flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Text style={[type.body as any, { color: c.label, flex: 1 }]}>נתקעת? <Text style={{ fontFamily: font.bold }}>שאלי את העוזרת</Text></Text>
          <Icon sf="arrow.left" md="arrow_back" size={18} color={c.label} />
        </View>
      </Press>

      <Rule />

      <View style={{ gap: 6 }}>
        <Heading text="מחר" side="יום שלישי, 17.11" />
        <View style={{ paddingHorizontal: 20 }}>
          {tomorrow.map((t, i) => (
            <View key={t.id} style={{ flexDirection: "row", gap: 16, paddingVertical: 12, borderTopWidth: i ? StyleSheet.hairlineWidth : 0, borderTopColor: c.separator }}>
              <Text style={{ fontFamily: font.num, fontSize: 15, lineHeight: 23, color: c.label, width: 46 }}>{t.time}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[type.body as any, { color: c.label }]}>{t.title}</Text>
                <Text style={[type.subhead as any, { color: c.secondaryLabel }]}>{t.sub}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <Rule />

      <View style={{ paddingHorizontal: 20, gap: 10 }}>
        <Text style={[type.footnote as any, { color: c.secondaryLabel }]}>היעד שלך ל-3 חודשים</Text>
        <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 14 }}>
          <Text style={{ fontFamily: font.numLight, fontSize: 64, lineHeight: 68, color: c.label, writingDirection: "ltr" }}>{me.goalDone}<Text style={{ color: c.tertiaryLabel }}>/{me.goalTotal}</Text></Text>
          <Text style={[type.headline as any, { color: c.label, flex: 1, paddingBottom: 8 }]}>{me.goal}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 4 }}>
          {Array.from({ length: me.goalTotal }, (_, i) => (
            <View key={i} style={{ flex: 1, height: 4, backgroundColor: i < me.goalDone ? c.label : c.fill }} />
          ))}
        </View>
        <Text style={[type.subhead as any, { color: c.secondaryLabel }]}>עוד {me.goalTotal - me.goalDone} לקוחות והגעת.</Text>
      </View>

      <Rule />

      <View style={{ gap: 4 }}>
        <Heading text={`${month.label} במספרים`} />
        <View style={{ flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 20 }}>
          <Big value={shekel(month.income)} label="הכנסה" />
          <Big value={`${Math.round((month.income / month.expected) * 100)}%`} label="מתוך הצפוי" />
          <Big value={String(month.clients)} label="לקוחות" />
          <Big value={String(month.newClients)} label="חדשים" />
          <Big value={String(month.kept)} label="נשמרו" />
          <Big value={String(month.newLeads)} label="לידים חדשים" />
        </View>
      </View>

      <Section header="מחכה לך">
        {waiting.map(w => <Row key={w.id} title={w.title} sf={w.sf} md={w.md} href={w.href} />)}
      </Section>

      <Tools />
    </ScrollView>
  );
}
