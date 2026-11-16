// "All tools": the screens that used to sit under the "more" tab, now a section on the overview.
import { Section, Row } from "@/components/grouped-list";

export function Tools() {
  return (
    <Section header="כל הכלים">
      <Row title="יומן ושיחות שקבעתי" sf="calendar" md="calendar_month" tone="sage" href="/calendar" />
      <Row title="חוזים, הצעות מחיר וחתימות" sf="signature" md="draw" tone="blush" href="/contracts" />
      <Row title="קישור לקביעת פגישות" sf="link" md="link" tone="lavender" href="/booking" />
      <Row title="ניהול הלקוחות שלי" subtitle="גאנט תוכן, אישורים, דוחות ובוסטים" sf="folder" md="folder" tone="sand" href="/clients" />
      <Row title="חשבוניות" sf="doc.text" md="receipt_long" tone="sage" href="/invoices" />
      <Row title="מעקב (רק לך כמנהלת)" subtitle="משתמשות, תור ניתוחים וגיבויים" sf="chart.bar.doc.horizontal" md="monitoring" href="/admin" />
      <Row title="הגדרות" sf="gearshape" md="settings" href="/settings" />
    </Section>
  );
}
