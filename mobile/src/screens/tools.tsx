// "All tools": the screens that used to sit under the "more" tab, now a section on the overview.
import { Section, Row } from "@/components/grouped-list";

export function Tools() {
  return (
    <Section header="כל הכלים">
      <Row title="יומן ושיחות שקבעתי" sf="calendar" md="calendar_month" tone="sage" href="/soon/calendar" />
      <Row title="חוזים, הצעות מחיר וחתימות" sf="signature" md="draw" tone="blush" href="/soon/contracts" />
      <Row title="קישור לקביעת פגישות" sf="link" md="link" tone="lavender" href="/soon/booking" />
      <Row title="ניהול הלקוחות שלי" subtitle="גאנט תוכן, אישורים, דוחות ובוסטים" sf="folder" md="folder" tone="sand" href="/clients" />
      <Row title="חשבוניות" sf="doc.text" md="receipt_long" tone="sage" href="/soon/invoices" />
      <Row title="הגדרות" sf="gearshape" md="settings" href="/soon/settings" />
    </Section>
  );
}
