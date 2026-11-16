// Upload a recorded sales call: pick the file, write who it was with, and follow the status:
// uploading → waiting for analysis → analysed (she gets a WhatsApp message when it is ready).
import { useState } from "react";
import { Text, View } from "react-native";
import { Screen } from "@/components/screen";
import { Field, Fields, Button, Buttons, Note } from "@/components/form";
import { Progress } from "@/components/progress";
import { useColors } from "@/theme/colors";
import { font, type } from "@/theme/type";

export function UploadCall() {
  const c = useColors();
  const [step, setStep] = useState<"pick" | "picked" | "uploading" | "waiting">("pick");
  const start = () => { setStep("uploading"); setTimeout(() => setStep("waiting"), 1600); };
  return (
    <Screen back title="העלאת הקלטה" subtitle="כל אורך, כל פורמט. הקובץ עולה ישר לאחסון המאובטח.">
      {step === "pick" ? (
        <Buttons><Button flex title="בחירת קובץ מהטלפון" sf="waveform" md="graphic_eq" onPress={() => setStep("picked")} /></Buttons>
      ) : (
        <View style={{ marginHorizontal: 16, backgroundColor: c.cell, borderRadius: 14, padding: 16, gap: 8 }}>
          <Text style={{ fontFamily: font.num, fontSize: 14, color: c.label, writingDirection: "ltr", textAlign: "right" }}>call-2026-11-16.m4a · 34:02</Text>
          {step === "uploading" ? <><Progress value={0.6} /><Text style={{ fontFamily: font.hand, fontSize: 16, color: c.secondaryLabel }}>מעלה…</Text></> : null}
          {step === "waiting" ? <Text style={{ fontFamily: font.handMedium, fontSize: 18, color: c.orange }}>הועלתה ✓ ממתינה לניתוח…</Text> : null}
        </View>
      )}
      {step === "picked" ? (
        <>
          <Fields>
            <Field label="עם מי השיחה" placeholder="למשל: דניאל, מסעדה" />
            <Field label="איך הסתיימה" placeholder="נסגרה / לא נסגרה / עוד לא יודעת" last />
          </Fields>
          <Buttons><Button flex title="העלאה" onPress={start} /></Buttons>
        </>
      ) : null}
      {step === "waiting" ? <Note>כשהניתוח מוכן מגיעה אלייך הודעה בוואטסאפ, והוא מופיע ברשימת השיחות עם הדקות שאפשר ללחוץ עליהן.</Note> : null}
    </Screen>
  );
}
