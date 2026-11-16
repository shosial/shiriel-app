// The parts of a client's folder (spec 3.8), one screen each, with demo numbers for one client.
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/screen";
import { Section, Row } from "@/components/grouped-list";
import { Progress } from "@/components/progress";
import { Segmented } from "@/components/segmented";
import { Field, Fields, Button, Buttons, Done, Note } from "@/components/form";
import { useColors } from "@/theme/colors";
import { font, type } from "@/theme/type";
import { boosts, campaignLeads, campaignReport, client, fixes, hours, money, platforms, reach, shekel } from "@/data/demo";
import { Soon } from "./soon";

export const partTitles: Record<string, string> = {
  boosts: "בוסטים", campaigns: "ניתוח קמפיינים", leads: "לידים מהקמפיינים", report: "דוח סיכום חודשי",
  reach: "מעקב חשיפה", money: "הכנסות והוצאות", fixes: "תיקוני סרטונים", hours: "שעות עבודה",
  platforms: "פרטי פלטפורמות", portal: "תיק הלקוח לבעל העסק",
};

function Big({ value, label, sub }: { value: string; label: string; sub?: string }) {
  const c = useColors();
  return (
    <View style={{ flexBasis: "45%", flexGrow: 1, paddingVertical: 10, gap: 2 }}>
      <Text selectable style={{ fontFamily: font.numLight, fontSize: 28, lineHeight: 34, color: c.label, writingDirection: "ltr", textAlign: "right" }}>{value}</Text>
      <Text style={[type.footnote as any, { color: c.secondaryLabel }]}>{label}{sub ? <Text style={{ color: sub.startsWith("-") ? c.green : c.accent }}>{`  ${sub}`}</Text> : null}</Text>
    </View>
  );
}
function Bigs({ children }: { children: React.ReactNode }) {
  return <View style={{ flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 20, columnGap: 12 }}>{children}</View>;
}
function Exports() {
  const [done, setDone] = useState<string>();
  return (
    <>
      <Buttons>
        <Button outline title="PDF" onPress={() => setDone("נוצר PDF עם הלוגו שלך")} />
        <Button outline title="אקסל" onPress={() => setDone("הקובץ ירד")} />
        <Button outline title="לדרייב" onPress={() => setDone("נשמר בדרייב שלך")} />
        <Button title="שליחה ללקוח" onPress={() => setDone("נפתח וואטסאפ עם קישור לעמוד מסודר")} />
      </Buttons>
      <Done text={done} />
    </>
  );
}

function Boosts() {
  const c = useColors();
  const pct = boosts.spent / boosts.budget;
  return (
    <Screen back title="בוסטים" subtitle={`${client.name} · נובמבר`}>
      <View style={{ marginHorizontal: 16, backgroundColor: c.cell, borderRadius: 14, padding: 16, gap: 10 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[type.headline as any, { color: c.label }]}>תקציב חודשי</Text>
          <Text style={{ fontFamily: font.num, color: c.label }}>{shekel(boosts.spent)} / {shekel(boosts.budget)}</Text>
        </View>
        <Progress value={pct} color={pct >= 0.8 ? c.orange : c.tint} />
        <Text style={{ fontFamily: font.hand, fontSize: 16, color: c.orange }}>{Math.round(pct * 100)}% מהתקציב · {boosts.forecast}</Text>
        <Text style={[type.footnote as any, { color: c.secondaryLabel }]}>מי משלם: {boosts.payer}</Text>
      </View>
      {boosts.rows.map(b => (
        <Section key={b.id} header={b.video}>
          <Row title="מטרה" value={b.goal} />
          <Row title="הוצאה" value={shekel(b.spend)} />
          <Row title="חשיפות" value={b.reach.toLocaleString("he-IL")} />
          <Row title="קליקים" value={String(b.clicks)} />
          <Row title="לידים" value={String(b.leads)} />
          <Row title="עלות לליד" value={b.leads ? shekel(Math.round(b.spend / b.leads)) : "—"} valueColor={b.leads ? c.green : c.red} />
        </Section>
      ))}
      <Buttons><Button flex title="בוסט חדש" sf="plus" md="add" /></Buttons>
    </Screen>
  );
}

function Campaigns() {
  const c = useColors();
  const r = campaignReport;
  return (
    <Screen back title="ניתוח קמפיינים" subtitle={`${client.name} · ${r.platform} · נובמבר`}>
      <Note>{`מעלים פעם בחודש קובץ ייצוא (CSV או אקסל) ממנהל המודעות. הוא נקרא לבד, גם בעברית וגם באנגלית. לניתוח נשלחים רק המספרים, בלי שם הלקוח.`}</Note>
      <Section><Row title={r.file} subtitle="הועלה היום" sf="doc" md="description" value="נקרא ✓" valueColor={c.green} /></Section>
      <Bigs>{r.metrics.map(m => <Big key={m.label} value={m.value} label={m.label} sub={m.change} />)}</Bigs>
      <View style={{ paddingHorizontal: 20, gap: 8 }}>
        <Text style={[type.headline as any, { color: c.label, fontFamily: font.black, fontSize: 19 }]}>השורה התחתונה</Text>
        <Text style={[type.body as any, { color: c.label }]}>{r.bottomLine}</Text>
      </View>
      <Section header="מה עבד">{r.worked.map(t => <Row key={t} title={t} sf="checkmark" md="check" />)}</Section>
      <Section header="מה פחות">{r.didnt.map(t => <Row key={t} title={t} sf="xmark" md="close" />)}</Section>
      <Section header="תוכנית לחודש הבא">{r.next.map(t => <Row key={t} title={t} sf="arrow.left" md="arrow_back" />)}</Section>
      <Exports />
    </Screen>
  );
}

function Leads() {
  const c = useColors();
  const l = campaignLeads;
  const [done, setDone] = useState<string>();
  return (
    <Screen back title="לידים מהקמפיינים" subtitle={`${client.name} · נובמבר`}>
      <View style={{ marginHorizontal: 16, backgroundColor: c.cell, borderRadius: 14, padding: 16, gap: 8 }}>
        <Text style={[type.headline as any, { color: c.label }]}>קישור קליטה</Text>
        <Text style={[type.subhead as any, { color: c.secondaryLabel }]}>מחברים אותו לטופס של פייסבוק, גוגל, Zapier, Make, אלמנטור או לבוט בוואטסאפ, וכל ליד נכנס לכאן לבד.</Text>
        <Text selectable style={{ fontFamily: font.num, fontSize: 14, color: c.label, writingDirection: "ltr", textAlign: "right" }}>{l.link}</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Button outline title="העתקה" onPress={() => setDone("הקישור הועתק")} />
          <Button outline title="ייבוא מאקסל" onPress={() => setDone("בוחרים קובץ, והלידים נכנסים בלי כפילויות")} />
        </View>
      </View>
      <Done text={done} />
      <Bigs>
        <Big value={String(l.total)} label="לידים החודש" />
        <Big value={`${Math.round((l.closed / l.total) * 100)}%`} label="אחוז סגירה" />
      </Bigs>
      <Section header="לפי מקור">{l.bySource.map(s => <Row key={s.name} title={s.name} value={String(s.n)} />)}</Section>
      <Section header="אחרונים" footer="על ליד חדש מגיעה אלייך הודעה בוואטסאפ, בלי השם של הלקוח.">
        {l.recent.map(x => <Row key={x.id} hand title={x.name} subtitle={x.source} value={x.status} valueColor={x.status.includes("✓") ? c.green : undefined} />)}
      </Section>
    </Screen>
  );
}

function Report() {
  const c = useColors();
  return (
    <Screen back title="דוח סיכום חודשי" subtitle={`${client.name} · נובמבר`}>
      <Note>הדוח מתמלא לבד מהתוכן, הבוסטים והלידים של החודש. את מוסיפה רק כמה מילים משלך.</Note>
      <Bigs>
        <Big value="14" label="פריטים עלו" />
        <Big value={reach.reach.toLocaleString("he-IL")} label="חשיפה" sub={reach.reachChange} />
        <Big value={String(campaignLeads.total)} label="לידים" />
        <Big value={shekel(boosts.spent)} label="הוצאה על בוסטים" />
      </Bigs>
      <Fields header="המילים שלך">
        <Field label="סיכום" value="חודש חזק. המבצע הביא הכי הרבה פניות, ובדצמבר נתמקד ברילס קצרים עם לקוחות." multiline last />
      </Fields>
      <Exports />
    </Screen>
  );
}

function Reach() {
  return (
    <Screen back title="מעקב חשיפה" subtitle={`${client.name} · ${reach.month}`}>
      <Bigs>
        <Big value={reach.followers.toLocaleString("he-IL")} label="עוקבים" sub={reach.followersChange} />
        <Big value={reach.reach.toLocaleString("he-IL")} label="חשיפה בחודש" sub={reach.reachChange} />
      </Bigs>
      <Section header="הכי חזק החודש"><Row hand title={reach.top} /></Section>
      <Buttons><Button flex outline title="עדכון מספרים לחודש" /></Buttons>
    </Screen>
  );
}

function Money() {
  const c = useColors();
  const costs = money.costs.reduce((a, x) => a + x.sum, 0);
  return (
    <Screen back title="הכנסות והוצאות" subtitle={`${client.name} · נובמבר`}>
      <Bigs>
        <Big value={shekel(money.income)} label="הכנסה מהלקוח" />
        <Big value={shekel(money.income - costs + money.refund)} label="נשאר לך (אחרי החזר)" />
      </Bigs>
      <Section header="הוצאות">{money.costs.map(x => <Row key={x.what} title={x.what} value={shekel(x.sum)} />)}</Section>
      <Section><Row title="החזר מהלקוח על בוסטים" value={shekel(money.refund)} valueColor={c.green} /></Section>
    </Screen>
  );
}

function Fixes() {
  const c = useColors();
  const [list, setList] = useState(fixes);
  return (
    <Screen back title="תיקוני סרטונים" subtitle={`${client.name} · הלקוח יכול להוסיף בקשות מהתיק שלו`}>
      <Section header="פתוחים">
        {list.filter(f => !f.done).map(f => (
          <Row key={f.id} title={f.video} subtitle={`ביקש/ה: ${f.from}`} note={`"${f.text}"`} value="סיימתי" valueColor={c.accent}
            onPress={() => setList(l => l.map(x => (x.id === f.id ? { ...x, done: true } : x)))} />
        ))}
      </Section>
      <Section header="בוצעו">{list.filter(f => f.done).map(f => <Row key={f.id} title={f.video} subtitle={f.text} value="✓" valueColor={c.green} />)}</Section>
      <Fields header="בקשה חדשה"><Field label="מה לתקן" placeholder="למשל: לקצר את הפתיחה" last /></Fields>
    </Screen>
  );
}

function Hours() {
  const c = useColors();
  const [running, setRunning] = useState(false);
  return (
    <Screen back title="שעות עבודה" subtitle={`${client.name} · רק את רואה את זה`}>
      <View style={{ alignItems: "center", gap: 14, paddingVertical: 10 }}>
        <Text style={{ fontFamily: font.numLight, fontSize: 56, color: running ? c.accent : c.label }}>{running ? "00:12" : "00:00"}</Text>
        <Button title={running ? "עצירה" : "התחלת טיימר"} onPress={() => setRunning(r => !r)} />
      </View>
      <Bigs>
        <Big value={hours.thisMonth} label="שעות החודש" />
        <Big value={shekel(hours.perHour)} label="יוצא לך לשעה" />
      </Bigs>
      <Section header="פעמים אחרונות">{hours.sessions.map(h => <Row key={h.id} title={h.what} subtitle={h.date} value={h.time} />)}</Section>
    </Screen>
  );
}

function Platforms() {
  return (
    <Screen back title="פרטי פלטפורמות" subtitle={client.name}>
      <Note>שומרים כאן שם משתמש וקישור. סיסמאות לא נשמרות באפליקציה אף פעם.</Note>
      <Section>{platforms.map(p => <Row key={p.id} title={p.name} subtitle={p.link} value={p.user} />)}</Section>
      <Buttons><Button flex outline title="הוספת פלטפורמה" /></Buttons>
    </Screen>
  );
}

// What the business owner gets: a private link, and what each part allows (hidden / view / view and add).
function Portal() {
  const c = useColors();
  const [view, setView] = useState<"perm" | "client">("perm");
  const parts = [
    { name: "גאנט ופיד", perm: "צפייה" }, { name: "אישור תוכן", perm: "צפייה ותשובה" },
    { name: "לידים מהקמפיינים", perm: "צפייה והזנה" }, { name: "תיקוני סרטונים", perm: "צפייה והזנה" },
    { name: "דוח חודשי", perm: "צפייה" }, { name: "בוסטים", perm: "לא לשתף" }, { name: "חשבוניות", perm: "העלאה בלבד" },
  ];
  return (
    <Screen back title="תיק הלקוח לבעל העסק" subtitle={`${client.name} · קישור פרטי, בלי סיסמה`}>
      <Segmented<"perm" | "client"> value={view} onChange={setView} options={[{ key: "perm", label: "מה משותף" }, { key: "client", label: "מה הוא רואה" }]} />
      {view === "perm" ? (
        <>
          <Section header="הרשאות" footer="שעות העבודה, פרטי הפלטפורמות והחשבון שלך במורנינג לא נפתחים אף פעם. מה שהלקוח מזין מחכה לך עד שאת פותחת את התיק.">
            {parts.map(p => <Row key={p.name} title={p.name} value={p.perm} valueColor={p.perm === "לא לשתף" ? c.tertiaryLabel : undefined} onPress={() => {}} />)}
          </Section>
          <Section header="הקישור">
            <Row title="גישה" value="תמידית" />
            <Row title="כניסות" value="12 (אחרונה אתמול)" />
            <Row title="החלפת קישור" subtitle="הקישור הישן מפסיק לעבוד" sf="arrow.triangle.2.circlepath" md="sync" onPress={() => {}} />
          </Section>
        </>
      ) : (
        <>
          <View style={{ paddingHorizontal: 20, gap: 4 }}>
            <Text style={[type.title2 as any, { color: c.label }]}>שלום יואב</Text>
            <Text style={[type.subhead as any, { color: c.secondaryLabel }]}>כל מה שקורה עם הסושיאל של חנות האופניים, במקום אחד.</Text>
          </View>
          <Section>
            <Row title="התוכן של החודש" subtitle="2 פוסטים מחכים לאישור שלך" sf="square.grid.2x2" md="grid_view" href="/approve/7KQ2M" />
            <Row title="לידים" subtitle="41 החודש · אפשר לעדכן סטטוס" sf="person.2" md="group" />
            <Row title="בקשת תיקון לסרטון" sf="scissors" md="content_cut" />
            <Row title="דוח נובמבר" sf="doc.text" md="description" />
            <Row title="העלאת חשבונית" subtitle="תמונה או PDF, עד 4MB" sf="arrow.up.doc" md="upload_file" />
          </Section>
        </>
      )}
    </Screen>
  );
}

export function ClientPart({ slug }: { slug: string }) {
  switch (slug) {
    case "boosts": return <Boosts />;
    case "campaigns": return <Campaigns />;
    case "leads": return <Leads />;
    case "report": return <Report />;
    case "reach": return <Reach />;
    case "money": return <Money />;
    case "fixes": return <Fixes />;
    case "hours": return <Hours />;
    case "platforms": return <Platforms />;
    case "portal": return <Portal />;
    default: return <Soon slug={slug} title={partTitles[slug]} />;
  }
}
