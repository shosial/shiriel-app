import { Text, View } from "react-native";
import { Screen } from "@/components/screen";
import { Icon } from "@/components/icon";
import { useColors } from "@/theme/colors";
import { type } from "@/theme/type";

export const soonTitles: Record<string, string> = {
  calendar: "יומן", contracts: "חוזים והצעות מחיר", quotes: "הצעות מחיר", booking: "קביעת פגישות",
  clients: "ניהול לקוחות", campaigns: "ניתוח קמפיינים", invoices: "חשבוניות", settings: "הגדרות",
};

export function Soon({ slug }: { slug: string }) {
  const c = useColors();
  return (
    <Screen back title={soonTitles[slug] ?? "בקרוב"}>
      <View style={{ alignItems: "center", gap: 10, paddingTop: 60, paddingHorizontal: 32 }}>
        <Icon sf="hammer" md="construction" size={44} color={c.tertiaryLabel} />
        <Text style={[type.title3 as any, { color: c.label, textAlign: "center" }]}>בקרוב</Text>
        <Text style={[type.body as any, { color: c.secondaryLabel, textAlign: "center" }]}>המסך הזה נבנה בשלבים הבאים.</Text>
      </View>
    </Screen>
  );
}
