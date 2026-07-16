/**
 * store/progressStore.ts
 *
 * Zustand store for the user's learning progress.
 * Tracks XP, streak, and completed lesson IDs.
 * Persisted to AsyncStorage.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ProgressState {
  /** XP earned today */
  todayXP: number;
  /** Daily XP goal */
  dailyGoal: number;
  /** Current streak in days */
  streak: number;
  /** Set of completed lesson IDs */
  completedLessonIds: string[];

  addXP: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  resetDailyXP: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      todayXP: 15,
      dailyGoal: 20,
      streak: 12,
      completedLessonIds: ["es-u1-l1"],

      addXP: (amount) =>
        set((s) => ({ todayXP: Math.min(s.todayXP + amount, s.dailyGoal) })),

      completeLesson: (lessonId) =>
        set((s) => ({
          completedLessonIds: s.completedLessonIds.includes(lessonId)
            ? s.completedLessonIds
            : [...s.completedLessonIds, lessonId],
        })),

      resetDailyXP: () => set({ todayXP: 0 }),
    }),
    {
      name: "lingua-progress-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
