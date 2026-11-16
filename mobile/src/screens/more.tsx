import { Screen } from "@/components/screen";
import { Section, Row } from "@/components/grouped-list";

export function More() {
  return (
    <Screen title="עוד">
      <Section header="יומן וחוזים">
        <Row title="יומן ושיחות שקבעתי" sf="calendar" md="calendar_month" href="/soon/calendar" />
        <Row title="חוזים וחתימות" sf="signature" md="draw" href="/soon/contracts" />
        <Row title="הצעות מחיר" sf="doc.richtext" md="request_quote" href="/soon/quotes" />
        <Row title="קישור לקביעת פגישות" sf="link" md="link" href="/soon/booking" />
      </Section>
      <Section header="הלקוחות שלי">
        <Row title="ניהול לקוחות" subtitle="גאנט תוכן, אישורים, דוחות ובוסטים" sf="folder" md="folder" href="/soon/clients" />
        <Row title="ניתוח קמפיינים" sf="chart.bar" md="insights" href="/soon/campaigns" />
        <Row title="חשבוניות" sf="doc.text" md="receipt_long" href="/soon/invoices" />
      </Section>
      <Section header="העסק שלי">
        <Row title="התוכן שלי" sf="square.grid.2x2" md="grid_view" href="/soon/content" />
        <Row title="הגדרות" sf="gearshape" md="settings" href="/soon/settings" />
      </Section>
    </Screen>
  );
}
