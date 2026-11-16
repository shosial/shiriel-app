// Inset grouped list, like iOS Settings: a section with a small header, rounded white rows,
// hairline separators that start after the icon, and a chevron on rows that open something.
import { Children, isValidElement, type ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link, type Href } from "expo-router";
import { useColors, type Tone } from "@/theme/colors";
import { font, type } from "@/theme/type";
import { Icon } from "./icon";

export function Section({ header, footer, children }: { header?: string; footer?: string; children: ReactNode }) {
  const c = useColors();
  const rows = Children.toArray(children).filter(isValidElement);
  return (
    <View style={{ paddingHorizontal: 16, gap: 8 }}>
      {header ? <Text style={[type.headline as any, { color: c.label, fontFamily: font.black, fontSize: 19, paddingHorizontal: 4, paddingBottom: 2 }]}>{header}</Text> : null}
      <View style={{ backgroundColor: c.cell, borderRadius: 14, borderCurve: "continuous", overflow: "hidden" }}>
        {rows.map((row, i) => (
          <View key={i}>
            {i > 0 && <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: c.separator, marginStart: (row.props as any).sf ? 58 : 16 }} />}
            {row}
          </View>
        ))}
      </View>
      {footer ? <Text style={[type.footnote as any, { color: c.secondaryLabel, paddingHorizontal: 16 }]}>{footer}</Text> : null}
    </View>
  );
}

type RowProps = {
  title: string;
  subtitle?: string;
  value?: string;
  valueColor?: any;
  sf?: string;
  md?: string;
  iconBg?: any;
  tone?: Tone;
  href?: Href;
  onPress?: () => void;
  accessory?: ReactNode;
};

export function Row({ title, subtitle, value, valueColor, sf, md, iconBg, tone, href, onPress, accessory }: RowProps) {
  const c = useColors();
  const pressable = !!(href || onPress);
  const body = (pressed: boolean) => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 14, minHeight: 44, paddingVertical: subtitle ? 10 : 11, paddingHorizontal: 16, backgroundColor: pressed ? c.fill : "transparent" }}>
      {sf && md ? (
        <View style={{ width: 28, alignItems: "center", justifyContent: "center" }}>
          <Icon sf={sf} md={md} size={21} color={iconBg ?? c.label} />
        </View>
      ) : null}
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={[type.body as any, { color: c.label, writingDirection: "rtl" }]} numberOfLines={3}>{title}</Text>
        {subtitle ? <Text style={[type.subhead as any, { color: c.secondaryLabel, writingDirection: "rtl" }]} numberOfLines={2}>{subtitle}</Text> : null}
      </View>
      {value ? <Text selectable style={[type.body as any, { color: valueColor ?? c.secondaryLabel, fontVariant: ["tabular-nums"], writingDirection: "rtl" }]}>{value}</Text> : null}
      {accessory}
      {pressable ? <Icon sf="chevron.forward" md="chevron_left" size={14} color={c.tertiaryLabel} weight="semibold" /> : null}
    </View>
  );
  if (href) {
    return (
      <Link href={href} asChild>
        <Pressable accessibilityRole="link">{({ pressed }) => body(pressed)}</Pressable>
      </Link>
    );
  }
  if (onPress) return <Pressable accessibilityRole="button" onPress={onPress}>{({ pressed }) => body(pressed)}</Pressable>;
  return body(false);
}
