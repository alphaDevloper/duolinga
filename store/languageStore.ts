/**
 * store/languageStore.ts
 *
 * Zustand store for the user's selected learning language.
 * Persisted to AsyncStorage so the selection survives app restarts.
 *
 * NOTE: Hydration is checked via `useLanguageStore.persist.hasHydrated()`
 * and `useLanguageStore.persist.onFinishHydration()` — NOT via state.
 * Storing hasHydrated in Zustand state with onRehydrateStorage is unreliable
 * in React Native because the callback can silently fail, causing infinite spinners.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { LanguageCode } from "@/types/learning";

interface LanguageState {
  /** The language code the user is currently learning, or null if not chosen yet. */
  selectedLanguage: LanguageCode | null;

  /** Persist the chosen language. */
  setLanguage: (code: LanguageCode) => void;

  /** Clear the selection (used for testing). */
  clearLanguage: () => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selectedLanguage: null,
      setLanguage: (code) => set({ selectedLanguage: code }),
      clearLanguage: () => set({ selectedLanguage: null }),
    }),
    {
      name: "lingua-language-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
