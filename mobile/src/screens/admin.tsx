// Shiriel's own screen ("מעקב"): all users at a glance, the queue of calls waiting for analysis,
// open feedback requests, recording-help requests, contract templates, monthly numbers and backups.
// Privacy: she sees calls and analyses, but never her users' client names or private notes.
import { useState } from "react";
import { Text, View, TextInput } from "react-native";
import { Screen } from "@/components/screen";
import { Section, Row } from "@/components/grouped-list";
import { Segmented } from "@/components/segmented";
import { Button, Buttons, Done, Note } from "@/components/form";
import { useColors } from "@/theme/colors";
import { font, type } from "@/theme/type";
import { students } from "@/data/demo";

const template = `ניתוח שיחה - [שם הליד] ([נסגרה / לא נסגרה / סגירה חלקית])
חלק 1 - דמוגרפיה
מצב משפחתי: / גיל: / מגורים: / עבודה:
חלק 2 - היכרות מעמיקה
כאבים: / מה רוצה: / פחדים: / אמונות מגבילות:
…
חלק 8 - מה שעלה בשיחה ולא נכלל`;

export function Admin() {
  const c = useColors();
  const [tab, setTab] = useState<"people" | "queue" | "more">("queue");
  const [writing, setWriting] = useState(false);
  const [done, setDone] = useState<string>();
  return (
    <Screen back title="מעקב" subtitle="רק את רואה את המסך הזה">
      <Segmented value={tab} onChange={setTab} options={[{ key: "queue", label: "לטיפול" }, { key: "people", label: "משתמשות" }, { key: "more", label: "עוד" }]} />
      {tab === "queue" ? (
        <>
          <Section header="שיחות שמחכות לניתוח · 2">
            <Row hand title="מאיה ל. · שיחה 7" subtitle="16.11 · 34:02 · הועלתה לפני שעתיים" value="לנתח" valueColor={c.accent} onPress={() => setWriting(true)} />
            <Row hand title="נוי א. · שיחה 3" subtitle="16.11 · 22:15" value="לנתח" valueColor={c.accent} onPress={() => setWriting(true)} />
          </Section>
          {writing ? (
            <View style={{ marginHorizontal: 16, backgroundColor: c.cell, borderRadius: 14, padding: 16, gap: 10 }}>
              <Text style={[type.headline as any, { color: c.label }]}>הניתוח (התבנית של 8 החלקים כבר בפנים)</Text>
              <TextInput multiline defaultValue={template} accessibilityLabel="ניתוח"
                style={[type.callout as any, { color: c.label, minHeight: 200, textAlign: "right", borderWidth: 1, borderColor: c.separator, borderRadius: 6, padding: 10, textAlignVertical: "top" }]} />
              <Button title="שמירה ושליחה למשתמשת" onPress={() => { setWriting(false); setDone("נשמר. היא קיבלה הודעה בוואטסאפ"); }} />
            </View>
          ) : null}
          <Done text={done} />
          <Section header="בקשות פידבק פתוחות · 1" footer="נסגרות לבד אחרי 24 שעות. את רואה רק את הפוסט, בלי לדעת של איזה לקוח.">
            <Row title="ריל: טיפול שנתי ב-60 שניות" subtitle={'"הפתיח חזק מספיק?"'} sf="bubble.left" md="chat" onPress={() => {}} />
          </Section>
          <Section header="בקשות ליווי בחיבור הקלטה">
            <Row hand title="עדי כ." subtitle="ביקשה עזרה בחיבור הקלטה אוטומטית" value="להתקשר" valueColor={c.accent} />
          </Section>
        </>
      ) : tab === "people" ? (
        <Section header="המשתמשות" footer="לקוחות מוצגים כמספרים בלבד (לקוח 1, לקוח 2). שמות, טלפונים ותיקי לקוח לא מגיעים אלייך.">
          {students.map(s => (
            <Row key={s.id} hand title={s.name} subtitle={`${s.clients} לקוחות · ${s.calls} שיחות · נכנסה ${s.lastActive}`}
              value={s.status} valueColor={s.status === "פעילה" ? c.green : c.orange} onPress={() => {}} />
          ))}
        </Section>
      ) : (
        <>
          <Section header="ניהול">
            <Row title="מיילים עם גישה" subtitle="מתעדכן לבד מהתשלום במורנינג, ואפשר גם ידנית" sf="person.badge.key" md="key" value="38" onPress={() => {}} />
            <Row title="נוסח החוזה" sf="doc.text" md="description" onPress={() => {}} />
            <Row title="החומרים של העוזרת" subtitle="קורסים, מדריכים והשיטה שלך" sf="books.vertical" md="library_books" onPress={() => {}} />
            <Row title="הקורסים בפורטל הלמידה" sf="play.rectangle" md="smart_display" onPress={() => {}} />
          </Section>
          <Section header="נובמבר במספרים (בלי שמות)">
            <Row title="לקוחות חדשים אצל המשתמשות" value="9" />
            <Row title="לקוחות שנשמרו" value="21" />
            <Row title="שיחות שנותחו" value="17" />
          </Section>
          <Section header="גיבוי">
            <Row title="גיבוי אחרון" value="היום 03:12" />
            <Row title="גיבוי עכשיו" sf="arrow.clockwise" md="backup" onPress={() => setDone("הגיבוי נשמר בדרייב שלך")} />
            <Row title="שחזור פריטים שנעלמו" subtitle="לכל משתמשת, מגרסאות קודמות" sf="clock.arrow.circlepath" md="history" onPress={() => {}} />
          </Section>
          <Done text={done} />
        </>
      )}
    </Screen>
  );
}
