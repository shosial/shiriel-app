// One content item: cover, links (final video, raw footage), caption, platform, date and stage.
// The same screen for her own page and for a client. Only "final approval" and "live" items show in the feed.
import { useState } from "react";
import { Text, View } from "react-native";
import { Screen } from "@/components/screen";
import { Section, Row } from "@/components/grouped-list";
import { Field, Fields, Button, Buttons, Note, Done } from "@/components/form";
import { Icon } from "@/components/icon";
import { Press } from "@/components/press";
import { useColors } from "@/theme/colors";
import { font, type } from "@/theme/type";
import { clientContent, content, contentDetails, stageLabel, type ContentItem, type ContentStage } from "@/data/demo";

const order: ContentStage[] = ["idea", "script", "shot", "edited", "approved", "live"];

export function findItem(id: string): { item: ContentItem; forClient: boolean } {
  const q = clientContent.find(i => i.id === id);
  if (q) return { item: q, forClient: true };
  const p = content.find(i => i.id === id) ?? content[0];
  return { item: { ...p, ...contentDetails[p.id] } as ContentItem, forClient: false };
}

export function ContentItemScreen({ id }: { id: string }) {
  const c = useColors();
  const { item, forClient } = findItem(id);
  const [stage, setStage] = useState<ContentStage>(item.stage);
  const [done, setDone] = useState<string>();
  const next = order[order.indexOf(stage) + 1];
  const inFeed = stage === "approved" || stage === "live";

  return (
    <Screen back title={item.title} subtitle={`${item.kind}${item.platform ? ` · ${item.platform}` : ""}${forClient ? " · יואב, חנות אופניים" : ""}`}>
      <View style={{ marginHorizontal: 16, flexDirection: "row", gap: 14, alignItems: "flex-end" }}>
        <View style={{ width: 120, aspectRatio: 4 / 5, backgroundColor: item.tone, borderRadius: 6, padding: 10, justifyContent: "space-between" }}>
          <Icon sf={item.kind === "ריל" ? "play.fill" : "square.on.square"} md={item.kind === "ריל" ? "play_arrow" : "filter_none"} size={16} color="#fff" />
          <Text numberOfLines={4} style={{ color: "#fff", fontFamily: font.bold, fontSize: 12 }}>{item.title}</Text>
        </View>
        <View style={{ flex: 1, gap: 10 }}>
          <Text style={[type.footnote as any, { color: c.secondaryLabel }]}>הקאבר: תמונה מהגלריה, או פריים מהסרטון.</Text>
          <Button outline title="החלפת קאבר" sf="photo" md="image" onPress={() => setDone("בדמו לא מעלים תמונה, באפליקציה נפתחת הגלריה")} />
        </View>
      </View>
      <Done text={done} />

      <Fields header="קישורים וכיתוב" footer="הקישור לסרטון יכול להיות מהדרייב, דרופבוקס או כל מקום שהעורכת שמה בו את הקובץ.">
        <Field label="קישור לסרטון הסופי" value={item.videoUrl} placeholder="הדביקי קישור" ltr />
        <Field label="קישור לחומרי הגלם" value={item.rawUrl} placeholder="תיקייה עם מה שצולם" ltr />
        <Field label="כיתוב (קופי)" value={item.caption} placeholder="מה יהיה כתוב בפוסט" multiline last />
      </Fields>

      <Section header="פרטים">
        <Row title="סוג" value={item.kind} />
        <Row title="פלטפורמה" value={item.platform ?? "אינסטגרם"} />
        <Row title="תאריך עלייה" value={item.date ?? "עוד לא נקבע"} />
        <Row title="שלב" value={stageLabel[stage]} valueColor={inFeed ? c.green : undefined} />
      </Section>

      {forClient && item.clientAnswer ? (
        <View style={{ marginHorizontal: 16, backgroundColor: c.cell, borderRadius: 14, padding: 16, gap: 4 }}>
          <Text style={[type.footnote as any, { color: c.secondaryLabel }]}>התשובה של הלקוח</Text>
          <Text style={{ fontFamily: font.handMedium, fontSize: 18, color: item.clientAnswer === "approved" ? c.green : c.orange }}>
            {item.clientAnswer === "approved" ? "מאשר ✓" : "צריך תיקון"}
          </Text>
          {item.fixNote ? <Text style={{ fontFamily: font.hand, fontSize: 16, lineHeight: 24, color: c.label }}>"{item.fixNote}"</Text> : null}
        </View>
      ) : null}

      {next ? (
        <Buttons>
          <Button flex title={`להעביר ל"${stageLabel[next]}"`} onPress={() => setStage(next)} />
        </Buttons>
      ) : null}
      <Note>{inFeed ? "הפריט מופיע בפיד ובגאנט. זה אותו פריט, לא עותק: כל שינוי כאן מתעדכן גם שם." : "הפריט ייכנס לפיד ולגאנט כשיגיע לאישור סופי."}</Note>
    </Screen>
  );
}
