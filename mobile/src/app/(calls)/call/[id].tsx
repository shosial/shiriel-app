import { Stack, useLocalSearchParams } from "expo-router";
import { CallDetail } from "@/screens/call-detail";
import { calls } from "@/data/demo";
export default function Route() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (<><Stack.Screen options={{ title: calls.find(c => c.id === id)?.label }} /><CallDetail id={id} /></>);
}
