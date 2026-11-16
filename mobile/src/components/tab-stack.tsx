// The navigation stack inside each tab: iOS large titles on the tab's main screen,
// a regular title with a back button on the screens it opens. On the web the bar is hidden and
// the screen draws the large title and a back button itself (right to left, like iOS in Hebrew).
import { Stack } from "expo-router/stack";
import { useColors } from "@/theme/colors";
import { font } from "@/theme/type";

const web = process.env.EXPO_OS === "web";

// bare: the root screen draws its own header (the home screen, with the logo)
export function TabStack({ root, title, bare }: { root: string; title: string; bare?: boolean }) {
  const c = useColors();
  return (
    <Stack
      screenOptions={{
        headerTransparent: !web,
        headerShadowVisible: false,
        headerLargeTitleShadowVisible: false,
        headerLargeStyle: { backgroundColor: "transparent" },
        headerTitleStyle: { color: c.label, fontFamily: font.bold },
        headerLargeTitleStyle: { color: c.label, fontFamily: font.black },
        headerTintColor: c.tint,
        headerBlurEffect: "systemMaterial",
        headerBackButtonDisplayMode: "minimal",
        headerShown: !web,
        contentStyle: { backgroundColor: c.groupedBackground },
      }}
    >
      <Stack.Screen name={root} options={{ title, headerLargeTitleEnabled: true, ...(bare ? { headerShown: false } : null) }} />
    </Stack>
  );
}
