// ─────────────────────────────────────────────────────────────
// types/learning.ts
// Core types for the Duolingo-clone learning content system.
// Keep types simple, readable, and easy to extend.
// ─────────────────────────────────────────────────────────────

// ──────────────────────── Language ────────────────────────────

export type LanguageCode = "es" | "fr" | "de" | "ja" | "ar";

export interface Language {
  /** ISO 639-1 code, used as the unique key. */
  code: LanguageCode;
  /** Full display name, e.g. "Spanish". */
  name: string;
  /** Native name shown to learners, e.g. "Español". */
  nativeName: string;
  /** Emoji flag for quick visual identification. */
  flag: string;
  /** Short marketing blurb shown on the language-select screen. */
  description: string;
  /** Total number of learners (display only). */
  learnerCount: string;
  /** Difficulty level from the learner's perspective (assuming English speaker). */
  difficulty: "beginner-friendly" | "moderate" | "challenging";
}

// ──────────────────────── Vocabulary ──────────────────────────

export interface VocabItem {
  /** Word or phrase in the target language. */
  word: string;
  /** Phonetic pronunciation hint (optional). */
  pronunciation?: string;
  /** English translation. */
  translation: string;
  /** Part of speech, e.g. "noun", "verb". */
  partOfSpeech: "noun" | "verb" | "adjective" | "adverb" | "phrase" | "number" | "pronoun";
  /** Example sentence in the target language. */
  exampleSentence?: string;
  /** Translation of the example sentence. */
  exampleTranslation?: string;
}

// ──────────────────────── Phrase ──────────────────────────────

export interface Phrase {
  /** The phrase in the target language. */
  phrase: string;
  /** English translation. */
  translation: string;
  /** Context or situation where this phrase is used. */
  context?: string;
}

// ──────────────────────── Activity ────────────────────────────

export type ActivityType =
  | "translate"        // Translate a sentence from target → English or vice-versa
  | "multiple-choice"  // Pick the correct answer from 4 options
  | "match-pairs"      // Match target-language words to their translations
  | "fill-blank"       // Fill in the missing word in a sentence
  | "listen-type"      // Listen to audio and type what you hear (future)
  | "speak"            // Record your voice and compare (future)
  | "ai-conversation"; // Chat with the AI teacher (future Vision Agent)

export interface ActivityOption {
  id: string;
  text: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  /** Instruction shown above the activity. */
  instruction: string;
  /** The prompt / sentence to work with. */
  prompt: string;
  /** Correct answer string (for types that need it). */
  correctAnswer?: string;
  /** Options for multiple-choice or match-pairs. */
  options?: ActivityOption[];
  /** Hint shown if the learner struggles (optional). */
  hint?: string;
  /** XP awarded on correct first attempt. */
  xpReward: number;
}

// ──────────────────────── Lesson ──────────────────────────────

export type LessonType = "vocabulary" | "grammar" | "conversation" | "review" | "ai-teacher";

export interface LessonGoal {
  /** Short description of what the learner will achieve. */
  description: string;
}

export interface AITeacherPrompt {
  /**
   * System prompt fed to the Vision Agent / LLM before the lesson.
   * Keep this concise and focused on the lesson topic.
   */
  systemPrompt: string;
  /**
   * Opening line the AI teacher says to kick off the lesson.
   */
  openingLine: string;
  /**
   * Key vocabulary or concepts the AI teacher should emphasise.
   */
  focusTopics: string[];
}

export interface Lesson {
  id: string;
  /** Parent unit this lesson belongs to. */
  unitId: string;
  /** Parent language code. */
  languageCode: LanguageCode;
  /** Display title. */
  title: string;
  /** Short description shown on the lesson card. */
  description: string;
  /** Type of lesson determines the primary activity style. */
  type: LessonType;
  /** Position inside the unit (1-indexed). */
  order: number;
  /** XP earned on completion. */
  totalXP: number;
  /** Estimated duration in minutes. */
  durationMinutes: number;
  /** Learning goals for this lesson. */
  goals: LessonGoal[];
  /** Vocabulary covered (optional – relevant for vocabulary-type lessons). */
  vocabulary?: VocabItem[];
  /** Phrases covered (optional). */
  phrases?: Phrase[];
  /** Ordered list of activities in the lesson. */
  activities: Activity[];
  /**
   * AI teacher config for future audio/video Vision Agent lessons.
   * Only required for "ai-teacher" lesson type.
   */
  aiTeacher?: AITeacherPrompt;
}

// ──────────────────────── Unit ────────────────────────────────

export interface Unit {
  id: string;
  /** Parent language code. */
  languageCode: LanguageCode;
  /** Display title. */
  title: string;
  /** Short description of what the unit covers. */
  description: string;
  /** Position in the course (1-indexed). */
  order: number;
  /** Colour used for the unit's progress bar / header (hex). */
  color: string;
  /** Total lessons in this unit. */
  totalLessons: number;
}
