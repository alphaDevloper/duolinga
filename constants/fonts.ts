/**
 * Centralized font map for the Lingua app.
 * All font references should flow through here.
 *
 * Poppins variants match the design system spec:
 *   Regular 400 — body text, captions
 *   Medium  500 — subheadings (H4)
 *   SemiBold 600 — H2, H3
 *   Bold    700 — H1
 *   ExtraBold 800 — display / hero text
 */

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";

export const appFonts = {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} as const;

/** Font family string consumed by StyleSheet / inline styles. */
export const fontFamily = {
  regular: "Poppins_400Regular",
  medium: "Poppins_500Medium",
  semiBold: "Poppins_600SemiBold",
  bold: "Poppins_700Bold",
  extraBold: "Poppins_800ExtraBold",
} as const;
