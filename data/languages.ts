// ─────────────────────────────────────────────────────────────
// data/languages.ts
// Supported languages with metadata for the language-select screen.
// ─────────────────────────────────────────────────────────────

import type { Language } from "@/types/learning";

export const languages: Language[] = [
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "https://flagcdn.com/w320/es.png",
    description:
      "The world's second most spoken language. Perfect for travel across Latin America and Spain.",
    learnerCount: "500M+",
    difficulty: "beginner-friendly",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "https://flagcdn.com/w320/fr.png",
    description:
      "The language of love, art, and diplomacy. Spoken in over 29 countries worldwide.",
    learnerCount: "280M+",
    difficulty: "beginner-friendly",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "https://flagcdn.com/w320/de.png",
    description:
      "The most spoken native language in Europe. Great for engineering, philosophy, and business.",
    learnerCount: "130M+",
    difficulty: "moderate",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "https://flagcdn.com/w320/ja.png",
    description:
      "A fascinating language with unique writing systems. Essential for anime, gaming, and Japanese culture.",
    learnerCount: "125M+",
    difficulty: "challenging",
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "https://flagcdn.com/w320/ar.png",
    description:
      "A beautiful Semitic language spoken across the Middle East and North Africa.",
    learnerCount: "310M+",
    difficulty: "challenging",
  },
];

/** Lookup a language by its code. Returns undefined if not found. */
export function getLanguageByCode(code: string): Language | undefined {
  return languages.find((l) => l.code === code);
}
