// The same tab bar on the web: translucent bar at the bottom, icon over label, like iOS.
import { Tabs, TabList, TabTrigger, TabSlot, type TabTriggerSlotProps } from "expo-router/ui";
import { Pressable, Text } from "react-native";
import { Icon } from "./icon";
import { useColors } from "@/theme/colors";

const tabs = [
  { name: "(home)", href: "/", label: "סקירה", md: "home" },
  { name: "(posts)", href: "/posts", label: "פוסטים", md: "grid_view" },
  { name: "(leads)", href: "/leads", label: "לידים", md: "group" },
  { name: "(calls)", href: "/calls", label: "שיחות", md: "graphic_eq" },
  { name: "(more)", href: "/more", label: "עוד", md: "more_horiz" },
] as const;

type ButtonProps = Omit<TabTriggerSlotProps, "ref"> & { label: string; md: string };
function TabButton({ label, md, isFocused, ...props }: ButtonProps) {
  const c = useColors();
  const color = isFocused ? c.tint : "#999999";
  return (
    <Pressable {...props} style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 2, paddingTop: 6 }}>
      <Icon sf="" md={md} size={25} color={color} weight={isFocused ? "semibold" as any : undefined} />
      <Text style={{ fontSize: 10, fontWeight: "500", color }}>{label}</Text>
    </Pressable>
  );
}

export default function AppTabs() {
  const c = useColors();
  return (
    <Tabs>
      <TabSlot style={{ flex: 1 }} />
      <TabList style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 56, paddingBottom: 4,
        flexDirection: "row", backgroundColor: c.bar,
        borderTopWidth: 0.5, borderTopColor: c.separator,
        backdropFilter: "saturate(180%) blur(20px)",
      } as any}>
        {tabs.map(t => (
          <TabTrigger key={t.name} name={t.name} href={t.href} asChild>
            <TabButton label={t.label} md={t.md} />
          </TabTrigger>
        ))}
      </TabList>
    </Tabs>
  );
}
