// Form pieces in the brand style: a labeled field (one line or several), a black button and an outline button,
// and a quiet note. Used by every edit screen (content item, contract, quote, booking, invoice…).
import type { ReactNode } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Press } from "./press";
import { Icon } from "./icon";
import { useColors } from "@/theme/colors";
import { font, type } from "@/theme/type";

export function Field({ label, value, onChange, placeholder, multiline, ltr, last }: {
  label: string; value?: string; onChange?: (v: string) => void; placeholder?: string; multiline?: boolean; ltr?: boolean; last?: boolean;
}) {
  const c = useColors();
  return (
    <View style={{ paddingHorizontal: 16, paddingVertical: 10, gap: 4, borderBottomWidth: last ? 0 : StyleSheet.hairlineWidth, borderBottomColor: c.separator }}>
      <Text style={[type.footnote as any, { color: c.secondaryLabel }]}>{label}</Text>
      <TextInput defaultValue={value} onChangeText={onChange} placeholder={placeholder} placeholderTextColor={c.tertiaryLabel}
        multiline={multiline} accessibilityLabel={label}
        style={[type.body as any, { color: c.label, textAlign: ltr ? "left" : "right", writingDirection: ltr ? "ltr" : "rtl", minHeight: multiline ? 88 : undefined, textAlignVertical: multiline ? "top" : "center", padding: 0 }]} />
    </View>
  );
}

// a white card that holds fields, like a grouped section
export function Fields({ header, footer, children }: { header?: string; footer?: string; children: ReactNode }) {
  const c = useColors();
  return (
    <View style={{ paddingHorizontal: 16, gap: 8 }}>
      {header ? <Text style={[type.headline as any, { color: c.label, fontFamily: font.black, fontSize: 19, paddingHorizontal: 4 }]}>{header}</Text> : null}
      <View style={{ backgroundColor: c.cell, borderRadius: 14, borderCurve: "continuous", overflow: "hidden" }}>{children}</View>
      {footer ? <Text style={[type.footnote as any, { color: c.secondaryLabel, paddingHorizontal: 16 }]}>{footer}</Text> : null}
    </View>
  );
}

export function Button({ title, onPress, outline, sf, md, flex }: { title: string; onPress?: () => void; outline?: boolean; sf?: string; md?: string; flex?: boolean }) {
  const c = useColors();
  return (
    <Press onPress={onPress} label={title} style={flex ? { flex: 1 } : undefined}>
      <View style={{ backgroundColor: outline ? "transparent" : c.tint, borderWidth: 1, borderColor: c.tint, borderRadius: 4, paddingVertical: 13, paddingHorizontal: 18, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 }}>
        {sf && md ? <Icon sf={sf} md={md} size={18} color={outline ? c.tint : c.onTint} /> : null}
        <Text style={[type.headline as any, { color: outline ? c.tint : c.onTint }]}>{title}</Text>
      </View>
    </Press>
  );
}

export function Buttons({ children }: { children: ReactNode }) {
  return <View style={{ flexDirection: "row", gap: 10, paddingHorizontal: 16, flexWrap: "wrap" }}>{children}</View>;
}

export function Note({ children }: { children: ReactNode }) {
  const c = useColors();
  return (
    <View style={{ marginHorizontal: 16, borderStartWidth: 3, borderStartColor: c.accent, paddingHorizontal: 14, paddingVertical: 6 }}>
      <Text style={[type.subhead as any, { color: c.secondaryLabel }]}>{children}</Text>
    </View>
  );
}

// a short-lived confirmation line ("הקישור הועתק")
export function Done({ text }: { text?: string }) {
  const c = useColors();
  if (!text) return null;
  return <Text style={{ fontFamily: font.handMedium, fontSize: 17, color: c.green, paddingHorizontal: 20 }}>{text} ✓</Text>;
}
