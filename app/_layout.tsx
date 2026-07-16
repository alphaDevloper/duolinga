import "../global.css";

import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { appFonts } from "@/constants/fonts";
import { useLanguageStore } from "@/store/languageStore";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

// Keep splash visible while fonts AND the store load.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts(appFonts);
  const [storeReady, setStoreReady] = useState(false);

  // Explicitly rehydrate the Zustand store from AsyncStorage.
  // By doing this here, by the time any screen renders the store
  // already holds the persisted value — no per-screen hydration guard needed.
  useEffect(() => {
    const result = useLanguageStore.persist.rehydrate();
    if (result instanceof Promise) {
      result.finally(() => setStoreReady(true));
    } else {
      setStoreReady(true);
    }
  }, []);

  // Hide the splash only when both fonts AND the store are ready.
  useEffect(() => {
    if ((fontsLoaded || fontsError) && storeReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError, storeReady]);

  // Don't render anything until both are ready.
  if ((!fontsLoaded && !fontsError) || !storeReady) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="language-select" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ClerkProvider>
  );
}
