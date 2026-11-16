import { Stack, useLocalSearchParams } from "expo-router";
import { ContentItemScreen, findItem } from "@/screens/content-item";
export default function Route() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (<><Stack.Screen options={{ title: findItem(id).item.title }} /><ContentItemScreen id={id} /></>);
}
