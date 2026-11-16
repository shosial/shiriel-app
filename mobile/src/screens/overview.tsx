import { Text, View } from "react-native";
import { Screen } from "@/components/screen";
import { Section, Row } from "@/components/grouped-list";
import { Progress } from "@/components/progress";
import { Icon } from "@/components/icon";
import { useColors } from "@/theme/colors";
import { type } from "@/theme/type";
import { AskBar } from "./learn";
import { Tools } from "./tools";
import { actions, me, month, shekel, waiting } from "@/data/demo";

function Stat({ label, value }: { label: string; value: string }) {
  const c = useColors();
  return (
    <View style={{ flexBasis: "30%", flexGrow: 1, gap: 2, paddingVertical: 4 }}>
      <Text selectable style={[type.title2 as any, { color: c.label, fontVariant: ["tabular-nums"], writingDirection: "rtl" }]}>{value}</Text>
      <Text style={[type.footnote as any, { color: c.secondaryLabel }]}>{label}</Text>
    </View>
  );
}

export function Overview() {
  const c = useColors();
  return (
    <Screen title="סקירה" subtitle={`ערב טוב, ${me.name}`}>
      <View style={{ marginHorizontal: 16, backgroundColor: c.cell, borderRadius: 12, borderCurve: "continuous", padding: 16, gap: 12 }}>
        <Text style={[type.footnote as any, { color: c.secondaryLabel }]}>היעד ל-3 חודשים</Text>
        <Text style={[type.title3 as any, { color: c.label }]}>{me.goal}</Text>
        <Progress value={me.goalDone / me.goalTotal} />
        <Text style={[type.subhead as any, { color: c.secondaryLabel, fontVariant: ["tabular-nums"] }]}>{me.goalDone} מתוך {me.goalTotal}</Text>
      </View>

      <AskBar />

      <Section header="מחכה לטיפול">
        {waiting.map(w => <Row key={w.id} title={w.title} sf={w.sf} md={w.md} href={w.href} />)}
      </Section>

      <Section header={`${month.label} במספרים`}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", padding: 16, rowGap: 14, columnGap: 8 }}>
          <Stat label="לקוחות" value={String(month.clients)} />
          <Stat label="חדשים" value={String(month.newClients)} />
          <Stat label="נשמרו" value={String(month.kept)} />
          <Stat label="לידים חדשים" value={String(month.newLeads)} />
          <Stat label="הכנסה" value={shekel(month.income)} />
          <Stat label="מתוך הצפוי" value={`${Math.round((month.income / month.expected) * 100)}%`} />
        </View>
      </Section>

      <Section header="הפעולות שלי">
        {actions.map(a => (
          <Row key={a.id} title={a.text}
            accessory={<Icon sf={a.done ? "checkmark.circle.fill" : "circle"} md={a.done ? "check_circle" : "radio_button_unchecked"} size={22} color={a.done ? c.green : c.tertiaryLabel} />} />
        ))}
      </Section>

      <Tools />
    </Screen>
  );
}
