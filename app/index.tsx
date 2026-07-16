import { useAuth } from "@clerk/expo";
import { colors } from "@/constants/colors";
import { useLanguageStore } from "@/store/languageStore";
import { Redirect } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

/**
 * Root gate screen — handles auth + language redirects.
 *
 * The store is already rehydrated by _layout.tsx before this screen
 * renders, so no extra hydration guard is needed here.
 *
 *   Not signed in          → /onboarding
 *   Signed in, no language → /language-select
 *   Signed in + language   → /(tabs)           ← tab shell
 */
export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();
  const selectedLanguage = useLanguageStore((s) => s.selectedLanguage);

  // 1. Wait for Clerk to finish loading
  if (!isLoaded) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  // 2. Not signed in → onboarding
  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  // 3. No language selected → language picker
  if (!selectedLanguage) {
    return <Redirect href="/language-select" />;
  }

  // 4. All good → tab shell
  return <Redirect href="/(tabs)" />;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
