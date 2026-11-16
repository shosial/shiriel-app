import { Stack, useLocalSearchParams } from "expo-router";
import { ClientPart, partTitles } from "@/screens/client-parts";
export default function Route() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  return (<><Stack.Screen options={{ title: partTitles[slug] }} /><ClientPart slug={slug} /></>);
}
