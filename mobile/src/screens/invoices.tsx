// Invoices: per client, status (draft, sent, paid, late). "Paid" also marks that month as paid.
// Without an account: a payment request (not a tax document). With Morning connected: real documents,
// pulled from the last 12 months and matched to clients. A legal document is never deleted; a credit note fixes it.
import { useState } from "react";
import { Text, View } from "react-native";
import { Screen } from "@/components/screen";
import { Section, Row } from "@/components/grouped-list";
import { Field, Fields, Button, Buttons, Done, Note } from "@/components/form";
import { useColors } from "@/theme/colors";
import { font, type } from "@/theme/type";
import { invoices, shekel } from "@/data/demo";

export function Invoices() {
  const c = useColors();
  const [adding, setAdding] = useState(false);
  const [done, setDone] = useState<string>();
  const color = (s: string) => (s === "שולמה" ? c.green : s === "באיחור" ? c.red : s === "טיוטה" ? c.secondaryLabel : c.orange);
  return (
    <Screen back title="חשבוניות" subtitle="מחובר למורנינג · עוסקת פטורה">
      <Section header="נובמבר">
        {invoices.map(i => (
          <Row key={i.id} hand title={i.client} subtitle={`${i.date}${i.note ? ` · ${i.note}` : ""}`} value={`${shekel(i.sum)} · ${i.status}`} valueColor={color(i.status)}
            onPress={i.status === "באיחור" ? () => setDone("נפתח וואטסאפ עם תזכורת עדינה ללקוח") : undefined} />
        ))}
      </Section>
      <Done text={done} />
      {adding ? (
        <>
          <Fields header="מסמך חדש">
            <Field label="לקוח" placeholder="בחרי לקוח" />
            <Field label="סכום" placeholder="₪" ltr />
            <Field label="תיאור" placeholder="ניהול סושיאל, דצמבר" last />
          </Fields>
          <Section>
            <Row title="קבלה" value="✓" valueColor={c.green} />
            <Row title="דרישת תשלום (לא מסמך מס)" />
          </Section>
          <Buttons><Button flex title="הפקה במורנינג" onPress={() => { setAdding(false); setDone("המסמך הופק ונשלח ללקוח במייל"); }} /></Buttons>
        </>
      ) : <Buttons><Button flex title="מסמך חדש" sf="plus" md="add" onPress={() => setAdding(true)} /></Buttons>}
      <Section header="מורנינג" footer="המפתח נשמר מוצפן. מושכים מסמכים מ-12 החודשים האחרונים ומשייכים ללקוח לפי מייל או שם.">
        <Row title="חיבור" value="מחובר ✓" valueColor={c.green} />
        <Row title="סוג עוסק" value="עוסקת פטורה" />
        <Row title="משיכת מסמכים" subtitle="פעם אחרונה: היום 08:00" sf="arrow.down.circle" md="download" onPress={() => setDone("נמשכו 3 מסמכים חדשים ושויכו ללקוחות")} />
      </Section>
      <Note>מקדמה ויתרה: מפיקים שתי קבלות שמקושרות לאותה עסקה. טעות בחשבונית מתקנים בחשבונית זיכוי, לא במחיקה.</Note>
    </Screen>
  );
}
