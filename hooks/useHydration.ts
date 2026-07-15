/**
 * hooks/useHydration.ts
 *
 * Returns true once the given Zustand persisted store has finished reading
 * from AsyncStorage. Uses the store's own persist API, which is always
 * reliable — unlike storing hasHydrated inside the state.
 *
 * Usage:
 *   const hydrated = useHydration(useLanguageStore);
 */

import { useEffect, useState } from "react";
import type { StoreApi, UseBoundStore } from "zustand";

type WithPersist = {
  persist: {
    hasHydrated: () => boolean;
    onFinishHydration: (fn: () => void) => () => void;
  };
};

export function useHydration<T>(
  store: UseBoundStore<StoreApi<T>> & WithPersist
): boolean {
  // Initialise synchronously — if the store is already hydrated (e.g. a
  // second render or sync storage) we avoid an extra flicker.
  const [hydrated, setHydrated] = useState(() => store.persist.hasHydrated());

  useEffect(() => {
    // If already hydrated by the time the effect runs, no subscription needed.
    if (store.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }

    // Subscribe and unsubscribe on unmount.
    const unsubscribe = store.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    return unsubscribe;
  }, [store]);

  return hydrated;
}
