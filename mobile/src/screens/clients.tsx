// The clients she manages (closed leads). Each opens a client folder: board, gantt, feed and the rest.
import { Screen } from "@/components/screen";
import { Section, Row } from "@/components/grouped-list";
import { useColors } from "@/theme/colors";
import { leads, shekel } from "@/data/demo";

export function Clients() {
  const c = useColors();
  const mine = leads.filter(l => l.status === "closed");
  return (
    <Screen back title="ניהול הלקוחות שלי" subtitle="תיק לכל לקוח: תוכן, אישורים, דוחות, בוסטים וקמפיינים.">
      <Section header="נובמבר">
        {mine.map(l => (
          <Row key={l.id} hand title={l.name} subtitle={`${l.business} · ${shekel(l.price ?? 0)} לחודש`} note={l.next}
            value={l.paid ? "שולם" : "לא סומן"} valueColor={l.paid ? c.green : c.orange} href={`/client/${l.id}`} />
        ))}
      </Section>
    </Screen>
  );
}
