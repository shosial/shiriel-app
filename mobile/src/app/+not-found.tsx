// Any unknown address opens the overview.
import { Redirect } from "expo-router";
export default function NotFound() { return <Redirect href="/" />; }
