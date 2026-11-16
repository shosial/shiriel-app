// "התוכן שלי": social management for her own business page, the same way she manages clients.
// Board (stages), content gantt (by week, Sunday to Saturday), feed (what goes up, as an Instagram grid), and her own campaigns.
import { useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { Screen } from "@/components/screen";
import { Section, Row } from "@/components/grouped-list";
import { Segmented } from "@/components/segmented";
import { Progress } from "@/components/progress";
import { useColors } from "@/theme/colors";
import { type } from "@/theme/type";
import { content, contentWeek, myCampaign, shekel, stageLabel, type ContentStage } from "@/data/demo";

type View4 = "board" | "gantt" | "feed" | "track";
const stages: ContentStage[] = ["idea", "script", "shot", "edited", "approved", "live"];

function Feed() {
  const c = useColors();
  const { width } = useWindowDimensions();
  const size = (Math.min(width, 680) - 32 - 4) / 3;
  const items = content.filter(i => i.stage === "approved" || i.stage === "live").concat(content.filter(i => i.stage === "edited"));
  return (
    <View style={{ paddingHorizontal: 16, gap: 8 }}>
      <Text style={[type.footnote as any, { color: c.secondaryLabel, paddingHorizontal: 16 }]}>כך ייראה הפיד. מה שעוד לא עבר אישור סופי מופיע שקוף.</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 2, borderRadius: 12, borderCurve: "continuous", overflow: "hidden" }}>
        {items.map(i => (
          <View key={i.id} style={{ width: size, height: size * 1.25, backgroundColor: i.tone, padding: 8, justifyContent: "space-between", opacity: i.stage === "edited" ? 0.45 : 1 }}>
            <Text style={{ color: "#fff", fontSize: 11, fontWeight: "600" }}>{i.kind}</Text>
            <View style={{ gap: 2 }}>
              <Text numberOfLines={3} style={{ color: "#fff", fontSize: 12, fontWeight: "600" }}>{i.title}</Text>
              <Text style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, fontVariant: ["tabular-nums"] }}>{i.stage === "live" ? `עלה ${i.date}` : i.date}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const dayNames = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
const dd = (d: Date) => `${d.getDate()}.${d.getMonth() + 1}`;

// Two weeks of the content calendar, Sunday to Saturday (demo dates are in 2026).
function Gantt() {
  const c = useColors();
  const firstSunday = new Date(2026, 10, 8);
  return (
    <>
      {[0, 1].map(w => {
        const days = Array.from({ length: 7 }, (_, i) => new Date(2026, 10, firstSunday.getDate() + w * 7 + i));
        return (
          <Section key={w} header={`שבוע ${dd(days[0])} עד ${dd(days[6])}`}>
            {days.map(d => {
              const items = content.filter(i => i.date === dd(d));
              return (
                <View key={d.getDate()} style={{ flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 16, paddingVertical: 10, minHeight: 44 }}>
                  <View style={{ width: 52 }}>
                    <Text style={[type.subhead as any, { color: c.label }]}>{dayNames[d.getDay()]}</Text>
                    <Text style={[type.caption as any, { color: c.secondaryLabel, fontVariant: ["tabular-nums"] }]}>{dd(d)}</Text>
                  </View>
                  <View style={{ flex: 1, gap: 6 }}>
                    {items.length ? items.map(i => (
                      <View key={i.id} style={{ backgroundColor: i.stage === "live" ? c.fill : c.tint, borderRadius: 8, borderCurve: "continuous", paddingHorizontal: 10, paddingVertical: 6 }}>
                        <Text numberOfLines={1} style={[type.subhead as any, { color: i.stage === "live" ? c.label : c.onTint }]}>{i.kind} · {i.title}</Text>
                        <Text style={[type.caption as any, { color: i.stage === "live" ? c.secondaryLabel : c.onTint, opacity: 0.8 }]}>{stageLabel[i.stage]}</Text>
                      </View>
                    )) : <Text style={[type.footnote as any, { color: c.tertiaryLabel }]}>פנוי</Text>}
                  </View>
                </View>
              );
            })}
          </Section>
        );
      })}
    </>
  );
}

export function Content() {
  const c = useColors();
  const [view, setView] = useState<View4>("board");
  return (
    <Screen title="התוכן שלי" subtitle="ניהול הסושיאל של העסק שלך, בדיוק כמו של לקוחה.">
      <Segmented<View4> value={view} onChange={setView}
        options={[{ key: "board", label: "לוח" }, { key: "gantt", label: "גאנט" }, { key: "feed", label: "פיד" }, { key: "track", label: "מעקב" }]} />

      {view === "board" && stages.map(st => {
        const items = content.filter(i => i.stage === st);
        if (!items.length) return null;
        return (
          <Section key={st} header={`${stageLabel[st]} · ${items.length}`}>
            {items.map(i => <Row key={i.id} title={i.title} subtitle={i.kind} value={i.date} onPress={() => {}} />)}
          </Section>
        );
      })}

      {view === "gantt" && <Gantt />}

      {view === "feed" && <Feed />}

      {view === "track" && (
        <>
          <Section header="השבוע">
            {[["רילס", contentWeek.reels, contentWeek.goalReels], ["פוסטים וקרוסלות", contentWeek.posts, contentWeek.goalPosts], ["סטוריז", contentWeek.stories, contentWeek.goalStories]].map(([label, n, goal]) => (
              <View key={label as string} style={{ paddingHorizontal: 16, paddingVertical: 12, gap: 8 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={[type.body as any, { color: c.label }]}>{label}</Text>
                  <Text style={[type.body as any, { color: c.secondaryLabel, fontVariant: ["tabular-nums"], writingDirection: "rtl" }]}>{n} מתוך {goal}</Text>
                </View>
                <Progress value={(n as number) / (goal as number)} color={(n as number) >= (goal as number) ? c.green : c.tint} />
              </View>
            ))}
          </Section>
          <Section header="הקמפיינים שלי" footer="כאן מתכננות, עוקבות ומנתחות. את הקמפיין עצמו מרימים מהמחשב, במנהל המודעות. מעלים קובץ ייצוא פעם בחודש ומקבלים ניתוח עם המלצות.">
            <Row title={myCampaign.name} subtitle={`${shekel(myCampaign.spend)} מתוך ${shekel(myCampaign.budget)} · ${myCampaign.leads} לידים`} value={`${shekel(myCampaign.cpl)} לליד`} sf="chart.bar" md="insights" tone="sand" onPress={() => {}} />
            <Row title="קמפיין חדש: תכנון בטלפון" subtitle="מטרה, קהל, תקציב ומודעות, שלב אחרי שלב" sf="square.and.pencil" md="edit_note" tone="blush" onPress={() => {}} />
            <Row title="להרים מהמחשב" subtitle="צ'קליסט מוכן + קישור שנשלח אלייך למייל" sf="laptopcomputer" md="laptop" tone="lavender" onPress={() => {}} />
          </Section>
        </>
      )}
    </Screen>
  );
}
