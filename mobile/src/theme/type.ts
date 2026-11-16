// Type, from the brand: Heebo for Hebrew (heavy for headlines, like TURGEMAN in the logo) and
// Poppins for numbers, dates and Latin labels (the logo's own typeface). Sizes follow Apple's text styles.
// Leads and clients add a soft handwriting (Playpen Sans Hebrew) for names and notes.
// The font files are in assets/fonts and load in app/_layout.tsx.
export const font = {
  regular: "Heebo-400",
  medium: "Heebo-500",
  bold: "Heebo-700",
  black: "Heebo-800",
  num: "Poppins-400",
  numLight: "Poppins-300",
  numMedium: "Poppins-500",
  // handwriting, for the personal side of leads and clients (names, notes): Playpen Sans Hebrew
  hand: "Hand-400",
  handMedium: "Hand-500",
} as const;

export const fontFiles = {
  "Heebo-400": require("../../assets/fonts/Heebo_400Regular.ttf"),
  "Heebo-500": require("../../assets/fonts/Heebo_500Medium.ttf"),
  "Heebo-700": require("../../assets/fonts/Heebo_700Bold.ttf"),
  "Heebo-800": require("../../assets/fonts/Heebo_800ExtraBold.ttf"),
  "Poppins-300": require("../../assets/fonts/Poppins_300Light.ttf"),
  "Poppins-400": require("../../assets/fonts/Poppins_400Regular.ttf"),
  "Poppins-500": require("../../assets/fonts/Poppins_500Medium.ttf"),
  "Hand-400": require("../../assets/fonts/PlaypenSansHebrew_400Regular.ttf"),
  "Hand-500": require("../../assets/fonts/PlaypenSansHebrew_500Medium.ttf"),
};

export const type = {
  largeTitle: { fontSize: 34, lineHeight: 40, fontFamily: font.black },
  title2: { fontSize: 22, lineHeight: 28, fontFamily: font.bold },
  title3: { fontSize: 20, lineHeight: 26, fontFamily: font.bold },
  headline: { fontSize: 17, lineHeight: 23, fontFamily: font.bold },
  body: { fontSize: 17, lineHeight: 23, fontFamily: font.regular },
  callout: { fontSize: 16, lineHeight: 22, fontFamily: font.regular },
  subhead: { fontSize: 15, lineHeight: 20, fontFamily: font.regular },
  footnote: { fontSize: 13, lineHeight: 18, fontFamily: font.regular },
  caption: { fontSize: 12, lineHeight: 16, fontFamily: font.regular },
  // small Latin label, spaced like the logo's "BUSINESS STRATEGY & MARKETING"
  eyebrow: { fontSize: 11, lineHeight: 14, fontFamily: font.numMedium, letterSpacing: 2 },
} as const;
