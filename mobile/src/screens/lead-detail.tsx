import { Screen } from "@/components/screen";
import { Section, Row } from "@/components/grouped-list";
import { leads, shekel, statusLabel } from "@/data/demo";

export function LeadDetail({ id }: { id: string }) {
  const l = leads.find(x => x.id === id) ?? leads[0];
  return (
    <Screen title={l.name} back>
      <Section header="פרטים">
        <Row title="עסק" value={l.business} />
        <Row title="מקור" value={l.source} />
        <Row title="סטטוס" value={statusLabel[l.status]} />
        {l.price ? <Row title="מחיר חודשי" value={shekel(l.price)} /> : null}
        {l.next ? <Row title="הצעד הבא" value={l.next} /> : null}
      </Section>
      <Section header="פעולות">
        <Row title="קביעת שיחה" sf="calendar.badge.plus" md="event" onPress={() => {}} />
        <Row title="הצעת מחיר" sf="doc.richtext" md="request_quote" onPress={() => {}} />
        <Row title="שליחת חוזה לחתימה" sf="signature" md="draw" onPress={() => {}} />
      </Section>
    </Screen>
  );
}
