// Native tab bar (UITabBar on iPhone, Material bar on Android) with SF Symbols / Material icons.
import { NativeTabs } from "expo-router/native-tabs";
import { useColors } from "@/theme/colors";

export default function AppTabs() {
  const c = useColors();
  return (
    <NativeTabs tintColor={c.tint}>
      <NativeTabs.Trigger name="(home)">
        <NativeTabs.Trigger.Icon sf={{ default: "house", selected: "house.fill" }} md="home" />
        <NativeTabs.Trigger.Label>סקירה</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(posts)">
        <NativeTabs.Trigger.Icon sf={{ default: "square.grid.2x2", selected: "square.grid.2x2.fill" }} md="grid_view" />
        <NativeTabs.Trigger.Label>פוסטים</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(leads)">
        <NativeTabs.Trigger.Icon sf={{ default: "person.2", selected: "person.2.fill" }} md="group" />
        <NativeTabs.Trigger.Label>לידים</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(calls)">
        <NativeTabs.Trigger.Icon sf={{ default: "waveform", selected: "waveform" }} md="graphic_eq" />
        <NativeTabs.Trigger.Label>שיחות</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(more)">
        <NativeTabs.Trigger.Icon sf={{ default: "ellipsis.circle", selected: "ellipsis.circle.fill" }} md="more_horiz" />
        <NativeTabs.Trigger.Label>עוד</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
