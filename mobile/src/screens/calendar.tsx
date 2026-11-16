// "יומן ושיחות שקבעתי": upcoming meetings (from the booking link or added by hand), WhatsApp reminders
// a day before and half an hour before, and a personal calendar feed for Google/Apple without permissions.
import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Screen } from "@/components/screen";
import { Section, Row } from "@/components/grouped-list";
import { Field, Fields, Button, Buttons, Done, Note } from "@/components/form";
import { useColors } from "@/theme/colors";
import { font, type } from "@/theme/type";
import { meetings } from "@/data/demo";

export function Calendar() {
  const c = useColors();
  const [adding, setAdding] = useState(false);
  const [done, setDone] = useState<string>();
  const days = [...new Set(meetings.map(m => m.day))];
  return (
    <Screen back title="יומן" subtitle="השיחות והפגישות שלך. תזכורת בוואטסאפ יום לפני וחצי שעה לפני.">
      {days.map(d => (
        <View key={d} style={{ gap: 4 }}>
          <Text style={[type.headline as any, { color: c.label, fontFamily: font.black, fontSize: 19, paddingHorizontal: 20 }]}>{d}</Text>
          <View style={{ paddingHorizontal: 20 }}>
            {meetings.filter(m => m.day === d).map((m, i) => (
              <View key={m.id} style={{ flexDirection: "row", gap: 16, paddingVertical: 12, borderTopWidth: i ? StyleSheet.hairlineWidth : 0, borderTopColor: c.separator }}>
                <Text style={{ fontFamily: font.num, fontSize: 15, lineHeight: 23, color: c.label, width: 46 }}>{m.time}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[type.body as any, { color: c.label }]}>{m.title}</Text>
                  <Text style={[type.subhead as any, { color: c.secondaryLabel }]}>{m.sub}</Text>
                </View>
                {m.source === "booking" ? <Text style={{ fontFamily: font.hand, fontSize: 14, color: c.accent }}>נקבע בקישור</Text> : null}
              </View>
            ))}
          </View>
        </View>
      ))}

      {adding ? (
        <>
          <Fields header="שיחה חדשה">
            <Field label="עם מי" placeholder="שם הליד או הלקוח" />
            <Field label="תאריך" placeholder="למשל 20.11" />
            <Field label="שעה" placeholder="למשל 10:30" />
            <Field label="הערה" placeholder="על מה מדברים" last />
          </Fields>
          <Buttons><Button flex title="שמירה" onPress={() => { setAdding(false); setDone("נשמר. התזכורות בוואטסאפ מוגדרות"); }} /></Buttons>
        </>
      ) : <Buttons><Button flex title="שיחה חדשה" sf="plus" md="add" onPress={() => setAdding(true)} /></Buttons>}
      <Done text={done} />

      <Section header="היומן שלך בטלפון" footer="בלי לתת הרשאות לחשבון: מוסיפים פעם אחת את הקישור, וכל שיחה חדשה נכנסת לבד ליומן של גוגל או של אפל.">
        <Row title="הוספה ליומן גוגל" sf="calendar.badge.plus" md="event" onPress={() => setDone("הקישור הועתק. מדביקים אותו ביומן גוגל ← הוספת יומן ← מכתובת URL")} />
        <Row title="הוספה ליומן של אפל" sf="calendar.badge.plus" md="event" onPress={() => setDone("נפתח היומן של אפל עם המינוי")} />
      </Section>
      <Section>
        <Row title="קישור לקביעת פגישות" subtitle="הלקוחות בוחרים שעה פנויה לבד" sf="link" md="link" href="/booking" />
      </Section>
    </Screen>
  );
}
