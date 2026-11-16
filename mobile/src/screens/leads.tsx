import { useState } from "react";
import { Screen } from "@/components/screen";
import { Section, Row } from "@/components/grouped-list";
import { Segmented } from "@/components/segmented";
import { useColors } from "@/theme/colors";
import { leads, shekel, statusLabel } from "@/data/demo";

type Filter = "open" | "clients" | "all";

export function Leads() {
  const c = useColors();
  const [filter, setFilter] = useState<Filter>("open");
  const shown = leads.filter(l => filter === "all" || (filter === "clients" ? l.status === "closed" : !["closed", "lost"].includes(l.status)));
  return (
    <Screen title="לידים ולקוחות">
      <Segmented<Filter> value={filter} onChange={setFilter}
        options={[{ key: "open", label: "בתהליך" }, { key: "clients", label: "לקוחות" }, { key: "all", label: "הכול" }]} />
      <Section header={filter === "clients" ? "תשלום לחודש נובמבר" : undefined}>
        {shown.map(l => (
          <Row key={l.id} href={`/lead/${l.id}`} title={l.name} hand
            subtitle={filter === "clients" ? `${l.business} · ${shekel(l.price ?? 0)} לחודש` : `${l.business} · ${l.source}`}
            note={l.next}
            value={l.status === "closed" ? (l.paid ? "שולם" : "לא סומן") : statusLabel[l.status]}
            valueColor={l.status === "closed" ? (l.paid ? c.green : c.orange) : undefined} />
        ))}
      </Section>
    </Screen>
  );
}
