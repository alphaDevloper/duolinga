// ─────────────────────────────────────────────────────────────
// data/units.ts
// Course units grouped by language.
// Each unit groups a set of related lessons.
// ─────────────────────────────────────────────────────────────

import type { Unit } from "@/types/learning";

export const units: Unit[] = [
  // ─────────── Spanish Units ────────────────────────────────
  {
    id: "es-unit-1",
    languageCode: "es",
    title: "Basics 1",
    description: "Learn your first Spanish words: greetings, numbers, and common nouns.",
    order: 1,
    color: "#58CC02",
    totalLessons: 3,
  },
  {
    id: "es-unit-2",
    languageCode: "es",
    title: "Greetings & Introductions",
    description: "Introduce yourself, ask someone's name, and say goodbye.",
    order: 2,
    color: "#1CB0F6",
    totalLessons: 3,
  },

  // ─────────── French Units ─────────────────────────────────
  {
    id: "fr-unit-1",
    languageCode: "fr",
    title: "Basics 1",
    description: "Discover your first French words: greetings, numbers, and everyday objects.",
    order: 1,
    color: "#FF9600",
    totalLessons: 3,
  },
  {
    id: "fr-unit-2",
    languageCode: "fr",
    title: "Greetings & Introductions",
    description: "Learn to greet people, exchange names, and start a simple conversation.",
    order: 2,
    color: "#FF4B4B",
    totalLessons: 3,
  },

  // ─────────── German Units ─────────────────────────────────
  {
    id: "de-unit-1",
    languageCode: "de",
    title: "Basics 1",
    description: "Start with essential German words: greetings, numbers, and basic phrases.",
    order: 1,
    color: "#CE82FF",
    totalLessons: 6,
  },

  // ─────────── Japanese Units ───────────────────────────────
  {
    id: "ja-unit-1",
    languageCode: "ja",
    title: "Hiragana & Basics",
    description: "Learn your first Japanese characters and core vocabulary.",
    order: 1,
    color: "#FF9600",
    totalLessons: 5,
  },

  // ─────────── Arabic Units ─────────────────────────────────
  {
    id: "ar-unit-1",
    languageCode: "ar",
    title: "Basics 1",
    description: "Discover your first Arabic words and the Arabic script.",
    order: 1,
    color: "#1CB0F6",
    totalLessons: 5,
  },
];

/** Get all units for a specific language, sorted by order. */
export function getUnitsByLanguage(languageCode: string): Unit[] {
  return units
    .filter((u) => u.languageCode === languageCode)
    .sort((a, b) => a.order - b.order);
}

/** Look up a single unit by ID. */
export function getUnitById(unitId: string): Unit | undefined {
  return units.find((u) => u.id === unitId);
}
