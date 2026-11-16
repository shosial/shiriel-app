// Settings: profile and brand (her logo and color go on reports and client pages), WhatsApp notifications,
// automatic call recording, Google Drive, data restore, and logging out.
import { useState } from "react";
import { Switch, Text, View } from "react-native";
import { Screen } from "@/components/screen";
import { Section, Row } from "@/components/grouped-list";
import { Done, Note } from "@/components/form";
import { useColors } from "@/theme/colors";
import { font, type } from "@/theme/type";

function Toggle({ title, subtitle, on }: { title: string; subtitle?: string; on?: boolean }) {
  const c = useColors();
  const [v, setV] = useState(!!on);
  return <Row title={title} subtitle={subtitle} accessory={<Switch value={v} onValueChange={setV} trackColor={{ true: c.tint }} />} />;
}

export function Settings() {
  const c = useColors();
  const [done, setDone] = useState<string>();
  return (
    <Screen back title="הגדרות">
      <Section header="אני והמותג שלי" footer="הלוגו והצבע שלך מופיעים בדוחות, בחוזים ובדפים שהלקוחות רואים.">
        <Row title="השם שלי" value="שיריאל" />
        <Row title="הלוגו שלי" sf="photo" md="image" value="הועלה ✓" valueColor={c.green} onPress={() => {}} />
        <Row title="הצבע שלי" value="נלקח מהלוגו" onPress={() => {}} />
      </Section>
      <Section header="הודעות בוואטסאפ" footer="ההודעות מגיעות רק בשעות שבחרת, ובלי שמות או טלפונים של הלקוחות שלך.">
        <Toggle title="ניתוח שיחה מוכן" on />
        <Toggle title="תזכורת לפני שיחה" subtitle="יום לפני וחצי שעה לפני" on />
        <Toggle title="ליד חדש מהקמפיינים" on />
        <Toggle title="לקוח חתם, בחר הצעה או אישר תוכן" on />
        <Toggle title="תזכורת לסמן תשלומים (1-3 בחודש)" on />
        <Toggle title="תזכורת לדוחות חודשיים (25-27)" />
        <Row title="שעות הודעות" value="09:00–20:00" />
      </Section>
      <Section header="הקלטה אוטומטית של שיחות" footer="מחברים פעם אחת את אפליקציית ההקלטה (Mobile2CRM או CCAgent), וכל שיחה נכנסת לבד. שיחה של פחות מ-45 שניות נשארת אצלך ולא נשלחת לניתוח.">
        <Row title="הקישור האישי שלי" subtitle="סודי, לא לשתף" value="העתקה" valueColor={c.accent} onPress={() => setDone("הקישור הועתק")} />
        <Row title="שיחות קצרות שלא נשלחו" value="3" onPress={() => {}} />
        <Row title="אני רוצה עזרה בחיבור" sf="questionmark.circle" md="help" onPress={() => setDone("שלחנו בקשה. נחזור אלייך בהקדם")} />
      </Section>
      <Section header="גוגל דרייב">
        <Row title="שמירה לדרייב שלי" subtitle="רק לקבצים שהאפליקציה יוצרת" value="מחובר ✓" valueColor={c.green} />
        <Row title="גיליונות משותפים עם לקוחות" subtitle="לידים, תיקונים וגאנט, מסתנכרנים כל 5 דקות" value="2" onPress={() => {}} />
      </Section>
      <Section header="הנתונים שלי">
        <Row title="שחזור" subtitle="גרסאות קודמות, מחזירים רק מה שחסר" sf="clock.arrow.circlepath" md="history" onPress={() => setDone("לא חסר כלום. הכול שמור")} />
        <Row title="ייצוא הכול לאקסל" sf="square.and.arrow.down" md="download" onPress={() => {}} />
      </Section>
      <Done text={done} />
      <Section header="המנוי">
        <Row title="המייל שלי" value="נשמר אצלך" />
        <Row title="התנתקות" valueColor={c.red} onPress={() => {}} />
      </Section>
      <Note>המסך "מעקב" (כל המשתמשות, תור הניתוחים, גיבויים) מופיע רק לך כמנהלת.</Note>
    </Screen>
  );
}
