import { Stack, useLocalSearchParams } from "expo-router";
import { LeadDetail } from "@/screens/lead-detail";
import { leads } from "@/data/demo";
export default function Route() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (<><Stack.Screen options={{ title: leads.find(l => l.id === id)?.name }} /><LeadDetail id={id} /></>);
}
