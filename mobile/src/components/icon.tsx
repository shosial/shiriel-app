// SF Symbols on iPhone, Material Symbols on Android and the web.
import { SymbolView } from "expo-symbols";
import type { ComponentProps } from "react";

type Name = ComponentProps<typeof SymbolView>["name"];

export function Icon({ sf, md, size = 22, color, weight }: { sf: string; md: string; size?: number; color?: any; weight?: ComponentProps<typeof SymbolView>["weight"] }) {
  return (
    <SymbolView
      name={{ ios: sf, android: md, web: md } as Name}
      size={size}
      tintColor={color}
      weight={weight}
      resizeMode="scaleAspectFit"
    />
  );
}
