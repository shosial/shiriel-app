// Sample data for the demo only. All names are made up. The real app will load the user's data from the server.
export type LeadStatus = "new" | "followup" | "meeting" | "closed" | "lost";

export const me = { name: "שיריאל", goal: "8 לקוחות ריטיינר עד סוף פברואר", goalDone: 5, goalTotal: 8 };

export const month = {
  label: "נובמבר",
  clients: 6, newClients: 2, kept: 4, left: 1, newLeads: 14,
  income: 18400, expected: 21000,
};

export const waiting = [
  { id: "w1", title: "2 לקוחות עוד לא סומנו כמשלמים החודש", sf: "creditcard", md: "payments", href: "/leads" as const },
  { id: "w2", title: "ניתוח חדש מחכה לך", sf: "waveform", md: "graphic_eq", href: "/call/c1" as const },
  { id: "w3", title: "דוח חודשי ללקוח אחד (עד ה-7)", sf: "doc.text", md: "description", href: "/more" as const },
];

export const actions = [
  { id: "a1", text: "לחזור לנועה (סטודיו פילאטיס) עם הצעת מחיר", done: false },
  { id: "a2", text: "להעלות 2 שיחות מכירה מוקלטות השבוע", done: false },
  { id: "a3", text: "לשאול על התקציב כבר בתחילת השיחה (מהניתוח האחרון)", done: true },
];

export const postGoal = { morning: 5, evening: 5 };
export const week = [
  { day: "ראשון", date: "16.11", morning: 5, evening: 5 },
  { day: "שבת", date: "15.11", morning: 3, evening: 2 },
  { day: "שישי", date: "14.11", morning: 5, evening: 5 },
  { day: "חמישי", date: "13.11", morning: 5, evening: 3 },
  { day: "רביעי", date: "12.11", morning: 5, evening: 5 },
];

export const leads = [
  { id: "l1", name: "נועה כהן", business: "סטודיו פילאטיס", source: "אינסטגרם", status: "meeting" as LeadStatus, next: "שיחה מחר 10:00", price: 3500 },
  { id: "l2", name: "דניאל לוי", business: "מסעדה שכונתית", source: "המלצה", status: "followup" as LeadStatus, next: "פולו-אפ ביום חמישי" },
  { id: "l3", name: "מיכל אברהם", business: "קליניקה לקוסמטיקה", source: "פייסבוק", status: "new" as LeadStatus },
  { id: "l4", name: "יואב פרץ", business: "חנות אופניים", source: "טיקטוק", status: "closed" as LeadStatus, price: 2800, paid: true },
  { id: "l5", name: "רוני שמש", business: "מאפייה", source: "אינסטגרם", status: "closed" as LeadStatus, price: 3200, paid: false },
  { id: "l6", name: "תמר גולן", business: "משרד עורכי דין", source: "לינקדאין", status: "lost" as LeadStatus },
];

export const statusLabel: Record<LeadStatus, string> = {
  new: "חדש", followup: "פולו-אפ", meeting: "נקבעה שיחה", closed: "לקוח", lost: "לא המשיך",
};

export type CallStatus = "waiting" | "done";
export const calls = [
  {
    id: "c1", label: "נועה, סטודיו פילאטיס", date: "14.11", duration: "28:41", status: "done" as CallStatus, result: "סגירה חלקית",
    metrics: { me: 46, them: 54, longestMonologue: "2:10", silences: 3 },
    tasks: ["לשאול על התקציב כבר בשלב ההיכרות", "לסכם במשפט אחד מה היא קונה לפני שמציגים מחיר"],
    parts: [
      { title: "חלק 2 - היכרות מעמיקה", fields: [["כאבים", "מעלה תוכן כל יום ולא מגיעות פניות (דקה 03:12)"], ["מה רוצה", "שהסטודיו יהיה מלא בבוקר, שתי קבוצות נוספות"], ["פחדים", "\"כבר שילמתי לסוכנות ולא ראיתי כלום\" (דקה 05:40)"]] },
      { title: "חלק 4 - התנגדויות", fields: [["1", "\"אני צריכה לחשוב על זה\" (דקה 21:05) - נענתה בשאלה על מה בדיוק - נפתרה חלקית"], ["2", "\"זה יותר ממה שתכננתי\" (דקה 23:48) - הוצעה חבילה מצומצמת - נשארה פתוחה"]] },
      { title: "חלק 5 - כסף", fields: [["מתי הוצג המחיר", "דקה 19:30, אחרי סיכום הצרכים"], ["תגובה", "שתיקה של 6 שניות, ואז שאלה על תשלומים"]] },
      { title: "חלק 7 - נקודת השבירה", fields: [["המפנה", "כשהוצגה דוגמה של סטודיו דומה (דקה 15:53)"], ["מה הייתי עושה אחרת", "לשאול על התקציב כבר בדקה 5"]] },
    ],
  },
  { id: "c2", label: "דניאל, מסעדה", date: "16.11", duration: "34:02", status: "waiting" as CallStatus },
  { id: "c3", label: "יואב, חנות אופניים", date: "09.11", duration: "22:15", status: "done" as CallStatus, result: "נסגרה", metrics: { me: 38, them: 62, longestMonologue: "1:25", silences: 1 }, tasks: [], parts: [] },
];

export const shekel = (n: number) => `₪${n.toLocaleString("he-IL")}`;
