import { Screen } from "@/components/screen";
import { Section, Row } from "@/components/grouped-list";
import { useColors } from "@/theme/colors";
import { calls } from "@/data/demo";

export function Calls() {
  const c = useColors();
  return (
    <Screen title="שיחות מכירה" subtitle="מעלים הקלטה, ומקבלים ניתוח מלא בפורמט של 8 החלקים.">
      <Section>
        <Row title="העלאת הקלטה חדשה" sf="plus" md="add" tone="lavender" onPress={() => {}} />
      </Section>
      <Section header="השיחות שלי">
        {calls.map(call => (
          <Row key={call.id} href={call.status === "done" ? `/call/${call.id}` : undefined} title={call.label}
            subtitle={`${call.date} · ${call.duration}${call.result ? ` · ${call.result}` : ""}`}
            value={call.status === "done" ? "מנותחת" : "ממתינה לניתוח"} valueColor={call.status === "done" ? c.green : c.orange} />
        ))}
      </Section>
    </Screen>
  );
}
