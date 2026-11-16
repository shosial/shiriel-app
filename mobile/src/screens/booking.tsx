// "קישור לקביעת פגישות" (like Calendly): her settings, and the page the client books on.
// Busy times come from up to 5 personal calendars (secret iCal address, read every 5 minutes; only start/end kept).
import { useState } from "react";
import { Text, View } from "react-native";
import { Screen } from "@/components/screen";
import { Section, Row } from "@/components/grouped-list";
import { Segmented } from "@/components/segmented";
import { Field, Fields, Button, Buttons, Done } from "@/components/form";
import { Press } from "@/components/press";
import { useColors } from "@/theme/colors";
import { font, type } from "@/theme/type";
import { booking } from "@/data/demo";

export function Booking() {
  const c = useColors();
  const [view, setView] = useState<"settings" | "client">("settings");
  const [slot, setSlot] = useState<string>();
  const [booked, setBooked] = useState(false);
  const [done, setDone] = useState<string>();
  return (
    <Screen back title="קביעת פגישות" subtitle="הלקוחות בוחרים שעה פנויה, ואת מקבלת הודעה.">
      <Segmented<"settings" | "client"> value={view} onChange={setView} options={[{ key: "settings", label: "ההגדרות שלי" }, { key: "client", label: "מה הלקוח רואה" }]} />
      {view === "settings" ? (
        <>
          <View style={{ marginHorizontal: 16, backgroundColor: c.cell, borderRadius: 14, padding: 16, gap: 10 }}>
            <Text style={[type.footnote as any, { color: c.secondaryLabel }]}>הקישור שלך</Text>
            <Text selectable style={{ fontFamily: font.num, fontSize: 15, color: c.label, writingDirection: "ltr", textAlign: "right" }}>{booking.link}</Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Button title="העתקה" outline sf="doc.on.doc" md="content_copy" onPress={() => setDone("הקישור הועתק")} />
              <Button title="לביו באינסטגרם" outline onPress={() => setDone("הקישור הועתק. מדביקים אותו בביו")} />
            </View>
          </View>
          <Done text={done} />
          <Section header="הפגישה">
            <Row title="משך" value={`${booking.duration} דקות`} />
            <Row title="זמן הכנה לפני" value={`${booking.prep} דקות`} />
            <Row title="הפסקה בין פגישות" value={`${booking.gap} דקות`} />
            <Row title="מקסימום ביום" value={String(booking.maxPerDay)} />
            <Row title="כמה זמן מראש" value={booking.minNotice} />
            <Row title="ימים קדימה" value={String(booking.daysAhead)} />
          </Section>
          <Section header="השעות שלי" footer="ימי חופש מסמנים ביומן, והם נחסמים לבד.">
            {booking.hours.map(h => <Row key={h.day} title={h.day} value={`${h.from}–${h.to}`} />)}
            <Row title="שישי ושבת" value="סגור" />
          </Section>
          <Section header="יומנים מחוברים" footer="רק זמני התחלה וסיום נשמרים, כדי לא לקבוע על פגישה קיימת. עד 5 יומנים.">
            {booking.calendars.map(k => <Row key={k} title={k} sf="calendar" md="calendar_month" value="מחובר" valueColor={c.green} />)}
            <Row title="חיבור יומן נוסף" sf="plus" md="add" onPress={() => {}} />
          </Section>
        </>
      ) : booked ? (
        <View style={{ marginHorizontal: 16, backgroundColor: c.cell, borderRadius: 14, padding: 20, gap: 10 }}>
          <Text style={{ fontFamily: font.handMedium, fontSize: 22, color: c.green }}>נקבע ✓</Text>
          <Text style={[type.body as any, { color: c.label }]}>יום שלישי 17.11, {slot}, שיחת היכרות של 30 דקות עם שיריאל.</Text>
          <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
            <Button outline title="הוספה ליומן" />
            <Button outline title="שינוי או ביטול" onPress={() => { setBooked(false); setSlot(undefined); }} />
          </View>
        </View>
      ) : (
        <>
          <View style={{ paddingHorizontal: 20, gap: 4 }}>
            <Text style={[type.title3 as any, { color: c.label }]}>שיחת היכרות עם שיריאל</Text>
            <Text style={[type.subhead as any, { color: c.secondaryLabel }]}>30 דקות · בטלפון</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 8, paddingHorizontal: 16 }}>
            {["ג׳ 17", "ד׳ 18", "ה׳ 19", "א׳ 22"].map((d, i) => (
              <View key={d} style={{ flex: 1, paddingVertical: 10, borderRadius: 6, alignItems: "center", backgroundColor: i === 0 ? c.tint : c.cell }}>
                <Text style={{ fontFamily: font.bold, color: i === 0 ? c.onTint : c.label }}>{d}</Text>
              </View>
            ))}
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, paddingHorizontal: 16 }}>
            {booking.slots.map(s => (
              <Press key={s} onPress={() => setSlot(s)} label={s} style={{ flexBasis: "30%", flexGrow: 1 }}>
                <View style={{ paddingVertical: 12, borderRadius: 6, alignItems: "center", borderWidth: 1, borderColor: slot === s ? c.tint : c.separator, backgroundColor: slot === s ? c.tint : c.cell }}>
                  <Text style={{ fontFamily: font.num, fontSize: 15, color: slot === s ? c.onTint : c.label }}>{s}</Text>
                </View>
              </Press>
            ))}
          </View>
          {slot ? (
            <>
              <Fields>
                <Field label="שם" placeholder="השם שלך" />
                <Field label="טלפון" placeholder="050…" ltr last />
              </Fields>
              <Buttons><Button flex title={`לקבוע ל-${slot}`} onPress={() => setBooked(true)} /></Buttons>
            </>
          ) : null}
        </>
      )}
    </Screen>
  );
}
