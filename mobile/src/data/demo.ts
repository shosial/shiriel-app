// Sample data for the demo only. All names are made up. The real app will load the user's data from the server.
export type LeadStatus = "new" | "followup" | "meeting" | "closed" | "lost";

export const me = { name: "שיריאל", goal: "8 לקוחות ריטיינר עד סוף פברואר", goalDone: 5, goalTotal: 8 };

export const month = {
  label: "נובמבר",
  clients: 6, newClients: 2, kept: 4, left: 1, newLeads: 14,
  income: 18400, expected: 21000,
};

export const waiting = [
  { id: "w1", title: "2 לקוחות עוד לא סומנו כמשלמים החודש", sf: "creditcard", md: "payments", href: "/leads" as const, tone: "sage" as const },
  { id: "w2", title: "ניתוח חדש מחכה לך", sf: "waveform", md: "graphic_eq", href: "/call/c1" as const, tone: "lavender" as const },
  { id: "w3", title: "סרטון אחד מחכה לאישור סופי", sf: "checkmark.seal", md: "verified", href: "/item/p4" as const, tone: "blush" as const },
];

// Today's steps: small and clear, one thing at a time. The first one not done is "the next step".
export const today = {
  dateLabel: "יום שני, 16 בנובמבר",
  greeting: "ערב טוב",
  streak: 6,
  steps: [
    { id: "s1", text: "לצלם סטורי מאחורי הקלעים", why: "התוכן שלי", done: true },
    { id: "s2", text: "לענות ל-3 הלידים החדשים", why: "לידים", done: true },
    { id: "s3", text: "לחזור לנועה (סטודיו פילאטיס) עם הצעת מחיר", why: "היא ביקשה עד מחר", done: false },
    { id: "s4", text: "להעלות את השיחה עם דניאל לניתוח", why: "שיחות", done: false },
    { id: "s5", text: "לצפות בשיעור 8: איך מתמחרים ריטיינר", why: "למידה · 12 דקות", done: false },
  ],
};

export const tomorrow = [
  { id: "t1", time: "10:00", title: "שיחת מכירה עם נועה", sub: "סטודיו פילאטיס", tone: "sage" as const },
  { id: "t2", time: "13:30", title: "יום צילומים אצל לקוחה", sub: "סטורי לעמוד שלך", tone: "blush" as const },
  { id: "t3", time: "18:00", title: "מפגש ליווי קבוצתי", sub: "בזום", tone: "sand" as const },
];

export const leads = [
  { id: "l1", name: "נועה כהן", business: "סטודיו פילאטיס", source: "אינסטגרם", status: "meeting" as LeadStatus, next: "שיחה מחר 10:00", price: 3500, note: "אוהבת רילס מאחורי הקלעים של הסטודיו. לשלוח לה דוגמאות מלקוחות כושר לפני השיחה." },
  { id: "l2", name: "דניאל לוי", business: "מסעדה שכונתית", source: "המלצה", status: "followup" as LeadStatus, next: "פולו-אפ ביום חמישי", note: "מתלבט בגלל התקציב. לשאול מה כבר ניסה ומה לא עבד." },
  { id: "l3", name: "מיכל אברהם", business: "קליניקה לקוסמטיקה", source: "פייסבוק", status: "new" as LeadStatus },
  { id: "l4", name: "יואב פרץ", business: "חנות אופניים", source: "טיקטוק", status: "closed" as LeadStatus, price: 2800, paid: true, next: "לשלוח דוח חודשי עד ה-24", note: "לקוח מקסים. הכי עובדים אצלו סרטוני רכיבה בטבע." },
  { id: "l5", name: "רוני שמש", business: "מאפייה", source: "אינסטגרם", status: "closed" as LeadStatus, price: 3200, paid: false, next: "להזכיר על התשלום של נובמבר" },
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

// ---- my content: social management for my own business page ----
export type ContentStage = "idea" | "script" | "shot" | "edited" | "approved" | "live";
export const stageLabel: Record<ContentStage, string> = {
  idea: "רעיונות", script: "תסריט מאושר", shot: "צולם", edited: "ערוך", approved: "אישור סופי", live: "עלה",
};
export const content = [
  { id: "p1", title: "3 טעויות שעסקים עושים באינסטגרם", kind: "ריל", stage: "live" as ContentStage, date: "10.11", tone: "#1c1c1e" },
  { id: "p2", title: "לפני ואחרי: סטודיו פילאטיס", kind: "קרוסלה", stage: "live" as ContentStage, date: "12.11", tone: "#3a3a3c" },
  { id: "p3", title: "איך בוחרים קהל יעד לקמפיין", kind: "ריל", stage: "live" as ContentStage, date: "14.11", tone: "#636366" },
  { id: "p4", title: "יום צילומים אצל לקוחה", kind: "סטורי", stage: "approved" as ContentStage, date: "17.11", tone: "#8e8e93" },
  { id: "p5", title: "כמה עולה ניהול סושיאל באמת", kind: "ריל", stage: "edited" as ContentStage, date: "19.11", tone: "#aeaeb2" },
  { id: "p6", title: "המלצה של יואב (חנות אופניים)", kind: "פוסט", stage: "shot" as ContentStage, date: "21.11" , tone: "#c7c7cc" },
  { id: "p7", title: "5 רעיונות לתוכן לעסק מקומי", kind: "קרוסלה", stage: "script" as ContentStage, tone: "#d1d1d6" },
  { id: "p8", title: "שאלות ותשובות על קמפיינים", kind: "ריל", stage: "idea" as ContentStage, tone: "#e5e5ea" },
  { id: "p9", title: "מאחורי הקלעים של העסק", kind: "סטורי", stage: "idea" as ContentStage, tone: "#e5e5ea" },
];
export const contentWeek = { reels: 3, goalReels: 4, posts: 2, goalPosts: 3, stories: 9, goalStories: 10 };
export const myCampaign = { name: "לידים לניהול סושיאל", spend: 1240, leads: 31, cpl: 40, budget: 2000 };

// ---- learning portal and AI ----
export const courses = [
  { id: "k1", title: "גיוס לקוחות מאפס", lessons: 12, done: 7 },
  { id: "k2", title: "שיחת מכירה שסוגרת", lessons: 8, done: 2 },
  { id: "k3", title: "קמפיינים ממומנים למתחילות", lessons: 10, done: 0 },
];
export const agents = [
  { id: "g1", title: "כותבת תסריטים לרילס", subtitle: "נותנים נושא, מקבלים תסריט לפי השלבים", sf: "film", md: "movie" },
  { id: "g2", title: "רעיונות לתוכן לחודש", subtitle: "גאנט רעיונות לפי התחום והקהל שלך", sf: "lightbulb", md: "lightbulb" },
  { id: "g3", title: "ניסוח הצעת מחיר", subtitle: "הצעה מסודרת מהפרטים של הליד", sf: "doc.richtext", md: "request_quote" },
];
export const sampleQA = {
  q: "לקוחה אמרה שהיא צריכה לחשוב על זה. מה עונים?",
  a: "קודם לשאול על מה בדיוק היא רוצה לחשוב: המחיר, התזמון, או אם זה יעבוד אצלה. ברוב המקרים מאחורי \"לחשוב\" יש התנגדות אחת ספציפית. אחרי שהיא אומרת אותה, עונים עליה ישירות, ומציעים צעד קטן וברור להמשך (למשל שיחה קצרה ביום שנקבע עכשיו).",
  source: "מתוך: שיחת מכירה שסוגרת, שיעור 5",
};

// A content item in full: what the edit screen shows. Cover is a picture she uploads from the phone;
// in the demo it is drawn as a dark block. Only items at "final approval" or "live" show in the feed.
export type ContentItem = {
  id: string; title: string; kind: string; stage: ContentStage; date?: string; tone: string;
  platform?: string; caption?: string; videoUrl?: string; rawUrl?: string;
  clientAnswer?: "approved" | "fix"; fixNote?: string;
};

export const contentDetails: Record<string, Partial<ContentItem>> = {
  p4: { platform: "אינסטגרם", caption: "יום צילומים אצל לקוחה ✨ ככה נראה מאחורי הקלעים של סרטון אחד שמביא לקוחות. שמרי את זה לפעם הבאה שתצלמי.", videoUrl: "drive.google.com/file/…/final", rawUrl: "drive.google.com/drive/folders/…" },
  p1: { platform: "אינסטגרם", caption: "3 טעויות שאני רואה כמעט בכל עמוד עסקי. איזו מהן את עושה? כתבי לי בתגובות 👇", videoUrl: "instagram.com/reel/…" },
};

// One client's folder (demo). Same board, gantt and feed as "התוכן שלי", plus links for the client.
export const client = {
  id: "l4", name: "יואב פרץ", business: "חנות אופניים",
  approvalLink: "app.shiriel/a/7KQ2M", reportLink: "app.shiriel/r/R9X4P",
};
export const clientContent: ContentItem[] = [
  { id: "q1", title: "רכיבת בוקר בכרמל", kind: "ריל", stage: "live", date: "10.11", tone: "#1c1c1e", platform: "אינסטגרם", clientAnswer: "approved" },
  { id: "q2", title: "איך בוחרים אופניים לילדים", kind: "קרוסלה", stage: "live", date: "13.11", tone: "#3a3a3c", platform: "אינסטגרם", clientAnswer: "approved" },
  { id: "q3", title: "מבצע סוף עונה", kind: "פוסט", stage: "approved", date: "18.11", tone: "#48484a", platform: "פייסבוק", caption: "סוף עונה בחנות 🚲 20% על כל אופני העיר עד סוף החודש. מחכים לכם ברחוב הנביאים.", videoUrl: "drive.google.com/file/…/sale", clientAnswer: "approved" },
  { id: "q4", title: "טיפול שנתי לאופניים ב-60 שניות", kind: "ריל", stage: "approved", date: "20.11", tone: "#636366", platform: "אינסטגרם", caption: "כמה זמן לא עשיתם טיפול לאופניים? 60 שניות של בדיקה שחוסכות תקלה בדרך.", videoUrl: "drive.google.com/file/…/service", clientAnswer: "fix", fixNote: "להוריד את המחיר מהסוף, הוא השתנה" },
  { id: "q5", title: "הכירו את הצוות", kind: "ריל", stage: "edited", date: "24.11", tone: "#8e8e93", platform: "אינסטגרם" },
  { id: "q6", title: "שאלות ותשובות על אופניים חשמליים", kind: "סטורי", stage: "script", tone: "#aeaeb2" },
];

// Calendar, contracts, quotes, booking (demo).
export const meetings = [
  { id: "m1", day: "מחר, שלישי 17.11", time: "10:00", title: "שיחת מכירה עם נועה", sub: "סטודיו פילאטיס · בטלפון", source: "booking" },
  { id: "m2", day: "מחר, שלישי 17.11", time: "13:30", title: "יום צילומים אצל לקוחה", sub: "יואב, חנות אופניים" },
  { id: "m3", day: "חמישי 19.11", time: "11:00", title: "פולו-אפ עם דניאל", sub: "מסעדה שכונתית", source: "booking" },
  { id: "m4", day: "ראשון 22.11", time: "18:00", title: "מפגש ליווי קבוצתי", sub: "בזום" },
];

export type ContractStatus = "draft" | "sent" | "signed";
export const contracts = [
  { id: "k1", client: "יואב פרץ", kind: "ניהול סושיאל חודשי", status: "signed" as ContractStatus, date: "02.11", signedAt: "02.11 · 21:14" },
  { id: "k2", client: "נועה כהן", kind: "ניהול סושיאל חודשי", status: "sent" as ContractStatus, date: "15.11" },
  { id: "k4", client: "רוני שמש", kind: "ניהול קמפיינים ממומנים", status: "draft" as ContractStatus, date: "16.11" },
  { id: "k3", client: "דנה (צלמת)", kind: "הסכם עם ספק: צילום", status: "draft" as ContractStatus, date: "16.11", supplier: true },
];
export const contractStatusLabel: Record<ContractStatus, string> = { draft: "טיוטה", sent: "נשלח, מחכה לחתימה", signed: "נחתם ✓" };
export const contractClauses = [
  "השירות: ניהול עמוד האינסטגרם והפייסבוק של {שם העסק}, כולל 12 פוסטים ו-8 רילס בחודש.",
  "התמורה: {מחיר} ₪ לחודש בתוספת מע\"מ, בתשלום עד ה-5 בכל חודש.",
  "תקופה: 3 חודשים מ-{תאריך התחלה}, ואחר כך מתחדש מחודש לחודש.",
  "אישורים: כל תוכן נשלח לאישור הלקוח לפני העלייה. תיקון אחד לכל פריט כלול במחיר.",
  "ביטול: בהודעה של 30 יום מראש.",
];

export const quote = {
  lead: "נועה כהן", business: "סטודיו פילאטיס", validUntil: "30.11",
  packages: [
    { id: "a", name: "בסיס", price: 2500, items: ["8 פוסטים בחודש", "4 רילס", "דוח חודשי"] },
    { id: "b", name: "צמיחה", price: 3500, items: ["12 פוסטים בחודש", "8 רילס", "יום צילום אחד", "דוח חודשי + פגישה"], recommended: true },
    { id: "c", name: "מלא", price: 5200, items: ["16 פוסטים בחודש", "12 רילס", "2 ימי צילום", "ניהול בוסטים"] },
  ],
};

export const booking = {
  link: "app.shiriel/b/shiriel", duration: 30, prep: 10, gap: 15, maxPerDay: 4, minNotice: "12 שעות", daysAhead: 21,
  hours: [
    { day: "ראשון", from: "09:00", to: "14:00" }, { day: "שני", from: "09:00", to: "14:00" },
    { day: "שלישי", from: "16:00", to: "20:00" }, { day: "רביעי", from: "09:00", to: "14:00" },
    { day: "חמישי", from: "09:00", to: "13:00" },
  ],
  calendars: ["יומן גוגל (אישי)", "iCloud"],
  slots: ["09:00", "09:45", "10:30", "11:15", "12:00", "13:15"],
};

// Client folder parts (demo numbers for one client, November).
export const boosts = {
  budget: 1500, spent: 1260, payer: "הלקוח (החזר בסוף חודש)", forecast: "התקציב ייגמר בערך ב-26.11",
  rows: [
    { id: "b1", video: "רכיבת בוקר בכרמל", goal: "הודעות", spend: 420, reach: 18400, clicks: 312, leads: 14 },
    { id: "b2", video: "מבצע סוף עונה", goal: "לידים", spend: 640, reach: 26100, clicks: 520, leads: 22 },
    { id: "b3", video: "איך בוחרים אופניים לילדים", goal: "חשיפה", spend: 200, reach: 31000, clicks: 96, leads: 0 },
  ],
};
export const campaignReport = {
  file: "meta-export-november.csv", platform: "Meta",
  metrics: [
    { label: "הוצאה", value: "₪1,260", change: "+12%" }, { label: "תוצאות (לידים)", value: "36", change: "+29%" },
    { label: "עלות לתוצאה", value: "₪35", change: "-13%" }, { label: "CTR", value: "1.9%", change: "+0.4" },
    { label: "CPM", value: "₪16.8", change: "-2.1" }, { label: "תדירות", value: "1.7", change: "+0.2" },
  ],
  bottomLine: "חודש טוב: יותר לידים בפחות כסף לליד. המבצע עבד הכי טוב, סרטון החינוך כמעט לא הביא פניות.",
  worked: ["מודעה עם מחיר ברור (מבצע סוף עונה)", "קהל של 5 ק\"מ מהחנות"],
  didnt: ["סרטון הסבר ארוך: הרבה צפיות, אפס פניות"],
  next: ["להעביר 30% מהתקציב לגרסה חדשה של המבצע", "לנסות סרטון קצר עם המלצה של לקוח"],
};
export const campaignLeads = {
  link: "app.shiriel/in/l/Y4P2", total: 41, closed: 9,
  bySource: [{ name: "פייסבוק", n: 22 }, { name: "אינסטגרם", n: 12 }, { name: "גוגל", n: 5 }, { name: "וואטסאפ", n: 2 }],
  recent: [
    { id: "x1", name: "ליד מ-16.11, 20:41", source: "פייסבוק · מבצע סוף עונה", status: "חדש" },
    { id: "x2", name: "ליד מ-16.11, 18:02", source: "אינסטגרם · טיפול שנתי", status: "חזרו אליו" },
    { id: "x3", name: "ליד מ-15.11, 11:15", source: "גוגל · טופס באתר", status: "קנה ✓" },
  ],
};
export const fixes = [
  { id: "f1", video: "טיפול שנתי לאופניים", text: "להוריד את המחיר מהסוף, הוא השתנה", from: "הלקוח", done: false },
  { id: "f2", video: "הכירו את הצוות", text: "להוסיף כתוביות", from: "את", done: false },
  { id: "f3", video: "רכיבת בוקר בכרמל", text: "מוזיקה פחות חזקה", from: "הלקוח", done: true },
];
export const hours = { thisMonth: "14:20", rate: 3200, perHour: 223, sessions: [
  { id: "h1", date: "16.11", what: "עריכה: טיפול שנתי", time: "1:40" },
  { id: "h2", date: "14.11", what: "יום צילומים", time: "4:00" },
  { id: "h3", date: "12.11", what: "קופי ותזמון", time: "1:10" },
] };
export const platforms = [
  { id: "pl1", name: "אינסטגרם", user: "@yoav.bikes", link: "instagram.com/yoav.bikes" },
  { id: "pl2", name: "פייסבוק", user: "יואב אופניים", link: "facebook.com/yoavbikes" },
  { id: "pl3", name: "מנהל מודעות", user: "יש לך גישה כשותפה", link: "business.facebook.com" },
];
export const reach = { month: "נובמבר", followers: 4210, followersChange: "+186", reach: 48200, reachChange: "+22%", top: "רכיבת בוקר בכרמל · 19.4 אלף צפיות" };
export const money = { income: 3200, costs: [{ what: "בוסטים (מוחזר מהלקוח)", sum: 1260 }, { what: "צלמת, חצי יום", sum: 450 }], refund: 1260 };

// Invoices (Morning connected) and admin tracking (no client names reach the admin).
export const invoices = [
  { id: "i1", client: "יואב פרץ", sum: 3200, date: "01.11", status: "שולמה" },
  { id: "i2", client: "רוני שמש", sum: 3200, date: "01.11", status: "באיחור" },
  { id: "i3", client: "יואב פרץ", sum: 1260, date: "16.11", status: "טיוטה", note: "החזר בוסטים" },
];
export const students = [
  { id: "s1", name: "נוי א.", clients: 2, calls: 3, lastActive: "היום", status: "פעילה" },
  { id: "s2", name: "מאיה ל.", clients: 1, calls: 7, lastActive: "אתמול", status: "פעילה" },
  { id: "s3", name: "עדי כ.", clients: 0, calls: 1, lastActive: "לפני 9 ימים", status: "לא פעילה" },
];

// Contract templates (demo wording; Shiriel will supply her own). {braces} are filled from the details.
export const contractTemplates = [
  { id: "social", name: "ניהול סושיאל חודשי", clauses: contractClauses },
  { id: "ads", name: "ניהול קמפיינים ממומנים", clauses: [
    "השירות: הקמה וניהול של קמפיינים ממומנים ל-{שם העסק} בפלטפורמות: {פלטפורמות}.",
    "דמי ניהול: {מחיר} ₪ לחודש בתוספת מע\"מ. דמי הניהול לא כוללים את תקציב הפרסום.",
    "תקציב הפרסום: {תקציב} ₪ לחודש, משולם ישירות לפלטפורמה מאמצעי התשלום של הלקוח.",
    "גישה: הלקוח מוסיף את מנהלת הקמפיינים כשותפה בחשבון המודעות. סיסמאות לא נמסרות.",
    "דיווח: דוח ביצועים חודשי עם המלצות לחודש הבא, עד ה-5 בכל חודש.",
    "תוצאות: הפלטפורמות לא מתחייבות לתוצאות, ולכן אין התחייבות למספר לידים או מכירות.",
    "תקופה וביטול: 3 חודשים מ-{תאריך התחלה}, ואחר כך ביטול בהודעה של 30 יום מראש.",
  ] },
  { id: "supplier", name: "הסכם עם ספק חיצוני (צילום, עריכה)", clauses: [
    "העבודה: {סוג העבודה} עבור {שם הלקוח}, לפי רשימת המשימות המצורפת.",
    "תשלום: {מחיר} ₪, תוך 7 ימים ממסירת החומרים.",
    "זכויות: כל החומרים שייכים ללקוח, והספק לא יפרסם אותם בלי אישור.",
    "סודיות: פרטי הלקוח והעסק נשארים חסויים.",
  ] },
];
