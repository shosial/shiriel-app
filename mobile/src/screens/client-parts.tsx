// The parts of a client's folder, one screen each. Parts not drawn yet fall back to "בקרוב".
import { Soon } from "./soon";

export const partTitles: Record<string, string> = {
  boosts: "בוסטים", campaigns: "ניתוח קמפיינים", leads: "לידים מהקמפיינים", report: "דוח סיכום חודשי",
  reach: "מעקב חשיפה", money: "הכנסות והוצאות", fixes: "תיקוני סרטונים", hours: "שעות עבודה",
  platforms: "פרטי פלטפורמות", portal: "תיק הלקוח לבעל העסק",
};

export function ClientPart({ slug }: { slug: string }) {
  return <Soon slug={slug} title={partTitles[slug]} />;
}
