import { Stack } from "expo-router";
import { Invoices } from "@/screens/invoices";
export default function Route() { return (<><Stack.Screen options={{ title: "חשבוניות" }} /><Invoices /></>); }
