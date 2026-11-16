// "התוכן שלי": social management for her own business page, the same way she manages clients.
// Board (stages), content gantt (by week, Sunday to Saturday), feed (what goes up, as an Instagram grid), and her own campaigns.
import { useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { Press } from "@/components/press";
import { Button, Buttons, Done } from "@/components/form";
import { Icon } from "@/components/icon";
import { Screen } from "@/components/screen";
import { Section, Row } from "@/components/grouped-list";
import { Segmented } from "@/components/segmented";
import { Progress } from "@/components/progress";
import { useColors } from "@/theme/colors";
import { font, type } from "@/theme/type";
import { client, clientContent, content, contentWeek, myCampaign, shekel, stageLabel, type ContentItem, type ContentStage } from "@/data/demo";

type View4 = "board" | "gantt" | "feed" | "track";
const stages: ContentStage[] = ["idea", "script", "shot", "edited", "approved", "live"];

function Feed({ all }: { all: ContentItem[] }) {
  const c = useColors();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const size = (Math.min(width, 680) - 32 - 4) / 3;
  const items = all.filter(i => i.stage === "approved" || i.stage === "live").concat(all.filter(i => i.stage === "edited"));
  return (
    <View style={{ paddingHorizontal: 16, gap: 8 }}>
      <Text style={[type.footnote as any, { color: c.secondaryLabel, paddingHorizontal: 16 }]}>כך ייראה הפיד. לוחצים על פוסט כדי להוסיף קאבר, קישור לסרטון וכיתוב. מה שעוד לא עבר אישור סופי מופיע שקוף.</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 2, borderRadius: 12, borderCurve: "continuous", overflow: "hidden" }}>
        {items.map(i => (
          <Press key={i.id} role="link" label={i.title} onPress={() => router.push(`/item/${i.id}`)}>
          <View style={{ width: size, height: size * 1.25, backgroundColor: i.tone, padding: 8, justifyContent: "space-between", opacity: i.stage === "edited" ? 0.45 : 1 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ color: "#fff", fontSize: 11, fontFamily: font.bold }}>{i.kind}</Text>
              {i.clientAnswer === "fix" ? <Text style={{ color: "#ffd2c4", fontSize: 12, fontFamily: font.handMedium }}>תיקון</Text> : null}
            </View>
            <View style={{ gap: 2 }}>
              <Text numberOfLines={3} style={{ color: "#fff", fontSize: 12, fontFamily: font.bold }}>{i.title}</Text>
              <Text style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, fontVariant: ["tabular-nums"] }}>{i.stage === "live" ? `עלה ${i.date}` : i.date}</Text>
            </View>
          </View>
          </Press>
        ))}
      </View>
    </View>
  );
}

const dayNames = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
const dd = (d: Date) => `${d.getDate()}.${d.getMonth() + 1}`;

// Two weeks of the content calendar, Sunday to Saturday (demo dates are in 2026).
function Gantt({ all }: { all: ContentItem[] }) {
  const c = useColors();
  const firstSunday = new Date(2026, 10, 8);
  return (
    <>
      {[0, 1].map(w => {
        const days = Array.from({ length: 7 }, (_, i) => new Date(2026, 10, firstSunday.getDate() + w * 7 + i));
        return (
          <Section key={w} header={`שבוע ${dd(days[0])} עד ${dd(days[6])}`}>
            {days.map(d => {
              const items = all.filter(i => i.date === dd(d));
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

// The client's side: one link to approve content (no login), one link to a tidy report.
function ShareWithClient() {
  const c = useColors();
  const router = useRouter();
  const [done, setDone] = useState<string>();
  return (
    <View style={{ gap: 10 }}>
      <View style={{ marginHorizontal: 16, backgroundColor: c.cell, borderRadius: 14, padding: 16, gap: 12 }}>
        <Text style={[type.headline as any, { color: c.label }]}>שליחה ללקוח לאישור</Text>
        <Text style={[type.subhead as any, { color: c.secondaryLabel }]}>הלקוח פותח את הקישור בלי להתחבר, ומסמן על כל פוסט "מאשר" או "צריך תיקון". התשובות מגיעות לכאן.</Text>
        <Text selectable style={{ fontFamily: font.num, fontSize: 14, color: c.label, writingDirection: "ltr", textAlign: "right" }}>{client.approvalLink}</Text>
        <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
          <Button title="שליחה בוואטסאפ" sf="paperplane" md="send" onPress={() => setDone("נפתח הוואטסאפ שלך עם הודעה מוכנה")} />
          <Button outline title="העתקה" sf="doc.on.doc" md="content_copy" onPress={() => setDone("הקישור הועתק")} />
        </View>
        <Press role="link" label="מה הלקוח רואה" onPress={() => router.push("/approve/7KQ2M")}>
          <Text style={[type.body as any, { color: c.label, textDecorationLine: "underline" }]}>לראות מה הלקוח רואה</Text>
        </Press>
      </View>
      <Done text={done} />
    </View>
  );
}

// Everything else in a client's folder (spec 3.8), each part a screen of its own.
function ClientMore() {
  return (
    <>
      <Section header="קמפיינים ובוסטים">
        <Row title="בוסטים" subtitle="תקציב חודשי, הוצאה ועלות לליד" sf="flame" md="local_fire_department" href="/cp/boosts" />
        <Row title="ניתוח קמפיינים" subtitle="מעלים ייצוא מ-Meta, Google או TikTok" sf="chart.bar" md="insights" href="/cp/campaigns" />
        <Row title="לידים מהקמפיינים" subtitle="קישור קליטה, מקורות ואחוז סגירה" sf="person.2" md="group" href="/cp/leads" />
      </Section>
      <Section header="דוחות">
        <Row title="דוח סיכום חודשי" sf="doc.text" md="description" href="/cp/report" />
        <Row title="מעקב חשיפה" sf="eye" md="visibility" href="/cp/reach" />
        <Row title="הכנסות והוצאות" sf="shekelsign" md="payments" href="/cp/money" />
      </Section>
      <Section header="עבודה שוטפת">
        <Row title="תיקוני סרטונים" sf="scissors" md="content_cut" href="/cp/fixes" />
        <Row title="שעות עבודה" subtitle="טיימר, וכמה יוצא לשעה" sf="timer" md="timer" href="/cp/hours" />
        <Row title="פרטי פלטפורמות" subtitle="שמות משתמש וקישורים, אף פעם לא סיסמאות" sf="at" md="alternate_email" href="/cp/platforms" />
        <Row title="חשבוניות" sf="doc.plaintext" md="receipt_long" href="/invoices" />
      </Section>
      <Section header="הלקוח">
        <Row title="תיק הלקוח לבעל העסק" subtitle="מה הוא רואה, ומה מותר לו לעדכן" sf="person.crop.square" md="badge" href="/cp/portal" />
        <Row title="חוזה והצעת מחיר" sf="signature" md="draw" href="/contracts" />
      </Section>
    </>
  );
}

export function Content({ forClient }: { forClient?: boolean }) {
  const c = useColors();
  const [view, setView] = useState<View4>(forClient ? "feed" : "board");
  const all: ContentItem[] = forClient ? clientContent : content;
  const router = useRouter();
  return (
    <Screen back={forClient} title={forClient ? client.name : "התוכן שלי"} subtitle={forClient ? `${client.business} · נובמבר` : "ניהול הסושיאל של העסק שלך, בדיוק כמו של לקוחה."}>
      <Segmented<View4> value={view} onChange={setView}
        options={[{ key: "board", label: "לוח" }, { key: "gantt", label: "גאנט" }, { key: "feed", label: "פיד" }, { key: "track", label: forClient ? "עוד" : "מעקב" }]} />
      {forClient && view === "feed" ? <ShareWithClient /> : null}

      {view === "board" && stages.map(st => {
        const items = all.filter(i => i.stage === st);
        if (!items.length) return null;
        return (
          <Section key={st} header={`${stageLabel[st]} · ${items.length}`}>
            {items.map(i => <Row key={i.id} title={i.title} subtitle={i.kind} value={i.date} href={`/item/${i.id}`} />)}
          </Section>
        );
      })}

      {view === "gantt" && <Gantt all={all} />}

      {view === "feed" && <Feed all={all} />}

      {view === "track" && forClient && <ClientMore />}

      {view === "track" && !forClient && (
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
            <Row title={myCampaign.name} subtitle={`${shekel(myCampaign.spend)} מתוך ${shekel(myCampaign.budget)} · ${myCampaign.leads} לידים`} value={`${shekel(myCampaign.cpl)} לליד`} sf="chart.bar" md="insights" href="/cp/campaigns" />
            <Row title="קמפיין חדש: תכנון בטלפון" subtitle="מטרה, קהל, תקציב ומודעות, שלב אחרי שלב" sf="square.and.pencil" md="edit_note" tone="blush" onPress={() => {}} />
            <Row title="להרים מהמחשב" subtitle="צ'קליסט מוכן + קישור שנשלח אלייך למייל" sf="laptopcomputer" md="laptop" tone="lavender" onPress={() => {}} />
          </Section>
        </>
      )}
    </Screen>
  );
}
