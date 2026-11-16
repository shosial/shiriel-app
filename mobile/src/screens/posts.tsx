import { Text, View } from "react-native";
import { Screen } from "@/components/screen";
import { Section, Row } from "@/components/grouped-list";
import { Progress } from "@/components/progress";
import { useColors } from "@/theme/colors";
import { type } from "@/theme/type";
import { postGoal, week } from "@/data/demo";

export function Posts() {
  const c = useColors();
  const today = week[0];
  const goal = postGoal.morning + postGoal.evening;
  return (
    <Screen title="פוסטים" subtitle={`היעד היומי: ${postGoal.morning} בבוקר ו-${postGoal.evening} בערב`}>
      <View style={{ marginHorizontal: 16, backgroundColor: c.cell, borderRadius: 12, borderCurve: "continuous", padding: 16, gap: 10 }}>
        <Text style={[type.headline as any, { color: c.label }]}>היום</Text>
        <Progress value={(today.morning + today.evening) / goal} color={c.green} />
        <Text style={[type.subhead as any, { color: c.secondaryLabel, fontVariant: ["tabular-nums"] }]}>
          {today.morning + today.evening} מתוך {goal}. עמדת ביעד 🎉
        </Text>
      </View>

      <Section header="השבוע" footer="פוסטים של שבוע שהסתיים ננעלים. מנטורית יכולה לסמן פוסט כלא תקין, והוא לא נספר.">
        {week.map(d => {
          const missM = Math.max(0, postGoal.morning - d.morning);
          const missE = Math.max(0, postGoal.evening - d.evening);
          const ok = !missM && !missE;
          const miss = [missM && `${missM} בבוקר`, missE && `${missE} בערב`].filter(Boolean).join(", ");
          return (
            <Row key={d.date} title={`${d.day} ${d.date}`} subtitle={`בוקר ${d.morning} · ערב ${d.evening}`}
              value={ok ? "עמד ביעד" : `חסר: ${miss}`} valueColor={ok ? c.green : c.orange} />
          );
        })}
      </Section>
    </Screen>
  );
}
