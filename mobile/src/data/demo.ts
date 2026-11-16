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
  { id: "w3", title: "סרטון אחד מחכה לאישור סופי", sf: "checkmark.seal", md: "verified", href: "/content" as const, tone: "blush" as const },
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
