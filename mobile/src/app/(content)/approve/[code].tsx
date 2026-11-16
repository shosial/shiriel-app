import { Stack } from "expo-router";
import { Approve } from "@/screens/approve";
export default function Route() {
  return (<><Stack.Screen options={{ title: "אישור תוכן" }} /><Approve /></>);
}
