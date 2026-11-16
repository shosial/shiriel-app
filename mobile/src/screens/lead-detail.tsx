import { Text, View } from "react-native";
import { Screen } from "@/components/screen";
import { useColors } from "@/theme/colors";
import { font, type } from "@/theme/type";
import { Section, Row } from "@/components/grouped-list";
import { leads, shekel, statusLabel } from "@/data/demo";

export function LeadDetail({ id }: { id: string }) {
  const c = useColors();
  const l = leads.find(x => x.id === id) ?? leads[0];
  return (
    <Screen title={l.name} back>
      {l.note ? (
        <View style={{ marginHorizontal: 16, backgroundColor: c.cell, borderRadius: 14, padding: 18, gap: 6, borderStartWidth: 3, borderStartColor: c.accent }}>
          <Text style={[type.footnote as any, { color: c.secondaryLabel }]}>הפתק שלי</Text>
          <Text style={{ fontFamily: font.hand, fontSize: 18, lineHeight: 28, color: c.label, writingDirection: "rtl" }}>{l.note}</Text>
        </View>
      ) : null}
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
