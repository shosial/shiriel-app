import { Stack } from "expo-router";
import { Clients } from "@/screens/clients";
export default function Route() {
  return (<><Stack.Screen options={{ title: "ניהול הלקוחות שלי" }} /><Clients /></>);
}
