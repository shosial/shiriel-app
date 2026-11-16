import { Stack, useLocalSearchParams } from "expo-router";
import { ContractEdit } from "@/screens/contracts";
export default function Route() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (<><Stack.Screen options={{ title: "חוזה" }} /><ContractEdit id={id} /></>);
}
