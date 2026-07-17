/**
 * Centralized image imports for the Lingua app.
 * Always import images from here — never require directly in screens/components.
 */

import aiTeacherMascot from "@/assets/images/ai-teacher-mascot.png";
import aiTeacherRoomBg from "@/assets/images/ai-teacher-room-bg.png";
import earth from "@/assets/images/earth.png";
import icon from "@/assets/images/icon.png";
import mascotAuth from "@/assets/images/mascot-auth.png";
import mascotWelcome from "@/assets/images/mascot-welcome.png";
import mascotLogo from "@/assets/images/moscot-logo.png";
import palace from "@/assets/images/palace.png";
import streakFire from "@/assets/images/streak-fire.png";
import treasure from "@/assets/images/treasure.png";

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
  aiTeacherRoomBg,
  aiTeacherMascot,
} as const;
