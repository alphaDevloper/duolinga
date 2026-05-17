/**
 * Centralized image imports for the Lingua app.
 * Always import images from here — never require directly in screens/components.
 */

import mascotLogo from "@/assets/images/moscot-logo.png";
import mascotWelcome from "@/assets/images/mascot-welcome.png";
import mascotAuth from "@/assets/images/mascot-auth.png";
import earth from "@/assets/images/earth.png";
import palace from "@/assets/images/palace.png";
import treasure from "@/assets/images/treasure.png";
import streakFire from "@/assets/images/streak-fire.png";
import icon from "@/assets/images/icon.png";

export const images = {
  /** Fox logo used in the top-bar / onboarding header */
  mascotLogo,
  /** Full-body fox mascot used on the onboarding screen */
  mascotWelcome,
  /** Mascot variant used on auth screens */
  mascotAuth,
  earth,
  palace,
  treasure,
  streakFire,
  icon,
} as const;
