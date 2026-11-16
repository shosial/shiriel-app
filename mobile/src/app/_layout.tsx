import { useColorScheme, View } from "react-native";
import { ThemeProvider, DarkTheme, DefaultTheme } from "expo-router/react-navigation";
import AppTabs from "@/components/app-tabs";

// The app is Hebrew, right to left. On iPhone/Android this is set in app.json (expo-localization forcesRTL);
// on the web the page direction is set here.
if (process.env.EXPO_OS === "web" && typeof document !== "undefined") {
  document.documentElement.lang = "he";
  document.documentElement.dir = "rtl";
}

export default function RootLayout() {
  const scheme = useColorScheme();
  return (
    <ThemeProvider value={scheme === "dark" ? DarkTheme : DefaultTheme}>
      {/* on the web, lang + dir tell react-native-web to lay out and align text right to left */}
      <View style={{ flex: 1 }} {...({ lang: "he", dir: "rtl" } as object)}>
        <AppTabs />
      </View>
    </ThemeProvider>
  );
}
