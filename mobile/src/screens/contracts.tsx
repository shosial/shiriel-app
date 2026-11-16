// Contracts: list, edit (pick a template, fill the fields, read the wording, send), and the signing page
// the client opens (reads, writes a name, signs with a finger). Saved: signature, time, IP and a fingerprint
// (SHA-256) of the wording. Sending opens HER WhatsApp with a ready message.
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Press } from "@/components/press";
import { useRouter } from "expo-router";
import { Screen } from "@/components/screen";
import { Section, Row } from "@/components/grouped-list";
import { Field, Fields, Button, Buttons, Done, Note } from "@/components/form";
import { Segmented } from "@/components/segmented";
import { useColors } from "@/theme/colors";
import { font, type } from "@/theme/type";
import { contractClauses, contracts, contractStatusLabel, contractTemplates, quote } from "@/data/demo";

export function Contracts() {
  const c = useColors();
  const router = useRouter();
  return (
    <Screen back title="חוזים והצעות מחיר" subtitle="שולחים, הלקוח חותם בטלפון, ואת מקבלת הודעה.">
      <Buttons>
        <Button flex title="חוזה חדש" sf="plus" md="add" onPress={() => router.push("/contract/k3")} />
      </Buttons>
      <Section header="חוזים">
        {contracts.map(k => (
          <Row key={k.id} hand title={k.client} subtitle={`${k.kind} · ${k.date}`} href={`/contract/${k.id}`}
            value={contractStatusLabel[k.status]} valueColor={k.status === "signed" ? c.green : k.status === "sent" ? c.orange : undefined} />
        ))}
      </Section>
      <Section header="הצעות מחיר">
        <Row hand title={quote.lead} subtitle={`${quote.business} · 3 חבילות · בתוקף עד ${quote.validUntil}`} value="מחכה לבחירה" valueColor={c.orange} href="/quote" />
      </Section>
      <Section header="נוסחים" footer="נוסח ששמרת עם ❤ חוזר בכל חוזה חדש. ההסכם עם ספק (צלמת, עורך) כולל צ'קליסט משימות שהספק מסמן.">
        <Row title="ניהול סושיאל חודשי" subtitle="הנוסח של שיריאל" sf="doc.text" md="description" />
        <Row title="ניהול קמפיינים ממומנים" subtitle="דמי ניהול, תקציב פרסום, גישה כשותפה" sf="chart.bar" md="insights" />
        <Row title="הסכם עם ספק חיצוני" subtitle="צילום, עריכה" sf="person.badge.clock" md="engineering" />
        <Row title="הנוסח שלי ❤" subtitle="שמרת ב-02.11" sf="heart" md="favorite" />
      </Section>
    </Screen>
  );
}

// The wording, clause by clause: tap a clause to edit it, add, delete, move up or down, and save the
// result as "my wording ❤" for next time. Numbering is automatic. Fields in {braces} are filled from the details.
// A signed contract is locked (its fingerprint must match what was signed).
function ClauseEditor({ initial, locked, onSaved }: { initial: string[]; locked?: boolean; onSaved: (t: string) => void }) {
  const c = useColors();
  const [clauses, setClauses] = useState(initial);
  const [editing, setEditing] = useState<number | null>(null);
  const update = (i: number, t: string) => setClauses(l => l.map((x, j) => (j === i ? t : x)));
  const move = (i: number, d: number) => setClauses(l => { const n = [...l]; const j = i + d; if (j < 0 || j >= n.length) return l; [n[i], n[j]] = [n[j], n[i]]; return n; });
  const remove = (i: number) => { setClauses(l => l.filter((_, j) => j !== i)); setEditing(null); };
  const add = () => { setClauses(l => [...l, ""]); setEditing(clauses.length); };
  const Small = ({ t, onPress, color }: { t: string; onPress: () => void; color?: any }) => (
    <Press onPress={onPress} label={t}><Text style={[type.subhead as any, { color: color ?? c.label, textDecorationLine: "underline" }]}>{t}</Text></Press>
  );
  return (
    <View style={{ paddingHorizontal: 16, gap: 8 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", paddingHorizontal: 4 }}>
        <Text style={[type.headline as any, { color: c.label, fontFamily: font.black, fontSize: 19 }]}>הנוסח</Text>
        {!locked ? <Text style={[type.footnote as any, { color: c.secondaryLabel }]}>לוחצים על סעיף כדי לערוך</Text> : null}
      </View>
      <View style={{ backgroundColor: c.cell, borderRadius: 14, overflow: "hidden" }}>
        {clauses.map((t, i) => (
          <View key={i} style={{ padding: 14, gap: 8, borderTopWidth: i ? StyleSheet.hairlineWidth : 0, borderTopColor: c.separator, backgroundColor: editing === i ? c.fill : "transparent" }}>
            {editing === i ? (
              <>
                <Text style={{ fontFamily: font.num, color: c.accent }}>סעיף {i + 1}</Text>
                <TextInput defaultValue={t} onChangeText={v => update(i, v)} multiline autoFocus accessibilityLabel={`סעיף ${i + 1}`}
                  placeholder="כתבי את הסעיף. שדות משתנים בסוגריים, למשל {שם הלקוח}" placeholderTextColor={c.tertiaryLabel}
                  style={[type.callout as any, { color: c.label, minHeight: 70, textAlign: "right", textAlignVertical: "top", backgroundColor: c.cell, borderRadius: 6, padding: 10 }]} />
                <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap" }}>
                  <Small t="סיום" onPress={() => setEditing(null)} />
                  <Small t="למעלה" onPress={() => { move(i, -1); setEditing(Math.max(0, i - 1)); }} />
                  <Small t="למטה" onPress={() => { move(i, 1); setEditing(Math.min(clauses.length - 1, i + 1)); }} />
                  <Small t="מחיקת הסעיף" color={c.red} onPress={() => remove(i)} />
                </View>
              </>
            ) : (
              <Press onPress={() => !locked && setEditing(i)} label={`סעיף ${i + 1}`}>
                <Text style={[type.callout as any, { color: c.label }]}><Text style={{ fontFamily: font.num }}>{i + 1}. </Text>{t || "(סעיף ריק)"}</Text>
              </Press>
            )}
          </View>
        ))}
      </View>
      {!locked ? (
        <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
          <Button outline title="הוספת סעיף" sf="plus" md="add" onPress={add} />
          <Button outline title="שמירה כנוסח שלי ❤" onPress={() => onSaved("הנוסח נשמר. הוא יחכה לך בכל חוזה חדש")} />
        </View>
      ) : null}
    </View>
  );
}

export function ContractEdit({ id }: { id: string }) {
  const c = useColors();
  const router = useRouter();
  const k = contracts.find(x => x.id === id) ?? contracts[1];
  const [done, setDone] = useState<string>();
  const [tpl, setTpl] = useState(k.supplier ? "supplier" : k.kind.includes("קמפיינים") ? "ads" : "social");
  return (
    <Screen back title={`חוזה: ${k.client}`} subtitle={contractStatusLabel[k.status]}>
      <Fields header="פרטים" footer="הפרטים נכנסים לנוסח במקומות שמסומנים בסוגריים.">
        <Field label="שם העסק" value={k.client === "נועה כהן" ? "סטודיו פילאטיס" : k.client === "רוני שמש" ? "מאפייה" : "חנות אופניים"} />
        <Field label="מחיר לחודש" value="3,500" ltr />
        {tpl === "ads" ? <Field label="פלטפורמות" value="פייסבוק ואינסטגרם" /> : null}
        {tpl === "ads" ? <Field label="תקציב פרסום לחודש" value="2,000" ltr /> : null}
        <Field label="תאריך התחלה" value="01.12.26" last />
      </Fields>
      {k.status !== "signed" ? (
        <Section header="בחירת נוסח" footer="בוחרים נוסח, ואז אפשר לערוך כל סעיף.">
          {contractTemplates.map(t => (
            <Row key={t.id} title={t.name} onPress={() => setTpl(t.id)}
              accessory={tpl === t.id ? <Text style={{ fontFamily: font.handMedium, fontSize: 16, color: c.accent }}>נבחר ✓</Text> : undefined} />
          ))}
        </Section>
      ) : null}
      <ClauseEditor key={tpl} initial={contractTemplates.find(t => t.id === tpl)!.clauses} locked={k.status === "signed"} onSaved={setDone} />
      {k.status === "signed" ? (
        <Note>{`נחתם ב-${k.signedAt}. נשמרו החתימה, השעה, כתובת ה-IP וטביעת אצבע של הנוסח, כך שאי אפשר לשנות אותו אחרי החתימה.`}</Note>
      ) : (
        <Buttons>
          <Button title="שליחה בוואטסאפ" sf="paperplane" md="send" onPress={() => setDone("נפתח הוואטסאפ שלך עם הודעה מוכנה וקישור לחתימה")} />
          <Button outline title="מה הלקוח רואה" onPress={() => router.push("/sign/demo")} />
        </Buttons>
      )}
      <Done text={done} />
    </Screen>
  );
}

// The page the client signs on (no login).
export function Sign() {
  const c = useColors();
  const [name, setName] = useState("");
  const [signed, setSigned] = useState(false);
  const [sent, setSent] = useState(false);
  return (
    <Screen back title="חוזה לחתימה" subtitle="שיריאל טורג'מן · ניהול סושיאל">
      <Note>כך הלקוח רואה את הקישור: קורא, כותב שם, חותם באצבע. בלי התחברות.</Note>
      <View style={{ marginHorizontal: 16, backgroundColor: c.cell, borderRadius: 14, padding: 16, gap: 10 }}>
        {contractClauses.map((t, i) => (
          <Text key={i} style={[type.callout as any, { color: c.label }]}>{i + 1}. {t.replace("{שם העסק}", "סטודיו פילאטיס").replace("{מחיר}", "3,500").replace("{תאריך התחלה}", "01.12.26")}</Text>
        ))}
      </View>
      {sent ? <Done text="החוזה נחתם. עותק נשלח אלייך במייל" /> : (
        <>
          <Fields header="חתימה">
            <Field label="שם מלא" placeholder="כתבי את שמך" onChange={setName} last />
          </Fields>
          <Pressable onPress={() => setSigned(true)} accessibilityRole="button" accessibilityLabel="חתימה"
            style={{ marginHorizontal: 16, height: 130, backgroundColor: c.cell, borderRadius: 14, borderWidth: 1, borderStyle: "dashed", borderColor: c.separator, alignItems: "center", justifyContent: "center" }}>
            {signed ? <Text style={{ fontFamily: font.handMedium, fontSize: 38, color: c.label }}>{name || "נועה כהן"}</Text>
              : <Text style={[type.subhead as any, { color: c.tertiaryLabel }]}>חתמי כאן באצבע</Text>}
          </Pressable>
          <Buttons><Button flex title="אני מאשרת וחותמת" onPress={() => signed && setSent(true)} /></Buttons>
        </>
      )}
    </Screen>
  );
}

// Quote: up to 3 packages. The client picks one, a contract is created and goes to signing.
export function Quote() {
  const c = useColors();
  const [view, setView] = useState<"edit" | "client">("edit");
  const [picked, setPicked] = useState<string>();
  return (
    <Screen back title={`הצעת מחיר: ${quote.lead}`} subtitle={`${quote.business} · בתוקף עד ${quote.validUntil}`}>
      <Segmented<"edit" | "client"> value={view} onChange={setView} options={[{ key: "edit", label: "ההצעה שלי" }, { key: "client", label: "מה הלקוח רואה" }]} />
      {quote.packages.map(p => (
        <View key={p.id} style={{ marginHorizontal: 16, backgroundColor: c.cell, borderRadius: 14, padding: 16, gap: 10, borderWidth: picked === p.id || (view === "edit" && p.recommended) ? 1.5 : 0, borderColor: c.tint }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
            <Text style={[type.title3 as any, { color: c.label }]}>{p.name}{p.recommended ? <Text style={{ fontFamily: font.hand, fontSize: 15, color: c.accent }}>  מומלץ</Text> : null}</Text>
            <Text style={{ fontFamily: font.numLight, fontSize: 26, color: c.label }}>₪{p.price.toLocaleString("he-IL")}</Text>
          </View>
          {p.items.map(it => <Text key={it} style={[type.callout as any, { color: c.secondaryLabel }]}>· {it}</Text>)}
          {view === "edit" ? <Text style={[type.footnote as any, { color: c.secondaryLabel }]}>חוזה: ניהול סושיאל חודשי (אפשר לערוך את הנוסח לחבילה)</Text>
            : picked === p.id ? <Done text="בחרת. החוזה נוצר ומחכה לחתימה שלך" /> : <Button title="בוחרת בחבילה הזו" onPress={() => setPicked(p.id)} />}
        </View>
      ))}
      {view === "edit" ? (
        <Buttons><Button flex title="שליחה בוואטסאפ" sf="paperplane" md="send" onPress={() => setView("client")} /></Buttons>
      ) : null}
    </Screen>
  );
}
