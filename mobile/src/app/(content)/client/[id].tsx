import { Stack } from "expo-router";
import { Content } from "@/screens/content";
import { client } from "@/data/demo";
// demo: every client opens the same sample folder
export default function Route() {
  return (<><Stack.Screen options={{ title: client.name }} /><Content forClient /></>);
}
