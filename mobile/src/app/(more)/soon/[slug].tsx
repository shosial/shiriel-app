import { Stack, useLocalSearchParams } from "expo-router";
import { Soon, soonTitles } from "@/screens/soon";
export default function Route() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  return (<><Stack.Screen options={{ title: soonTitles[slug] }} /><Soon slug={slug} /></>);
}
