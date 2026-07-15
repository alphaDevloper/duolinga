import { useAuth, useClerk } from "@clerk/expo";
import { colors } from "@/constants/colors";
import { fontFamily } from "@/constants/fonts";
import { images } from "@/constants/images";
import { getLanguageByCode } from "@/data/languages";
import { useLanguageStore } from "@/store/languageStore";
import { Redirect, router } from "expo-router";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Entry point — redirects based on Clerk auth state + language selection.
 *
 * The store is already rehydrated from AsyncStorage by _layout.tsx before
 * this screen ever renders, so no hydration guard is needed here.
 *
 *   Not signed in          → /onboarding
 *   Signed in, no language → /language-select
 *   Signed in + language   → home (this screen)
 */
export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();
  const { signOut } = useClerk();

  const selectedLanguage = useLanguageStore((s) => s.selectedLanguage);
  const clearLanguage = useLanguageStore((s) => s.clearLanguage);

  // 1. Wait for Clerk to finish loading session
  if (!isLoaded) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  // 2. Redirect signed-out users to onboarding
  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  // 3. No language selected → send to language selection
  if (!selectedLanguage) {
    return <Redirect href="/language-select" />;
  }

  // 4. Authenticated + language selected → show home
  const currentLanguage = getLanguageByCode(selectedLanguage);

  const difficultyColor: Record<string, string> = {
    "beginner-friendly": colors.success,
    moderate: colors.warning,
    challenging: colors.error,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={images.mascotLogo} style={styles.logoImage} />
        <Text style={styles.title}>Welcome back! 🎉</Text>
        <Text style={styles.subtitle}>You're signed in. Home screen coming soon.</Text>

        {/* ── Selected Language Card ── */}
        {currentLanguage && (
          <View style={styles.langCard}>
            {/* Flag */}
            <Image
              source={{ uri: currentLanguage.flag }}
              style={styles.langFlag}
              resizeMode="cover"
            />

            {/* Text info */}
            <View style={styles.langInfo}>
              <View style={styles.langNameRow}>
                <Text style={styles.langName}>{currentLanguage.name}</Text>
                <Text style={styles.langNative}>{currentLanguage.nativeName}</Text>
              </View>
              <Text style={styles.langLearners}>{currentLanguage.learnerCount} learners</Text>
            </View>

            {/* Difficulty chip */}
            <View
              style={[
                styles.diffChip,
                { backgroundColor: difficultyColor[currentLanguage.difficulty] + "22" },
              ]}
            >
              <Text
                style={[
                  styles.diffChipText,
                  { color: difficultyColor[currentLanguage.difficulty] },
                ]}
              >
                {currentLanguage.difficulty === "beginner-friendly"
                  ? "Beginner"
                  : currentLanguage.difficulty === "moderate"
                  ? "Moderate"
                  : "Advanced"}
              </Text>
            </View>
          </View>
        )}

        {/* ── Change Language ── */}
        <TouchableOpacity
          style={styles.langBtn}
          onPress={() => router.push("/language-select")}
          activeOpacity={0.85}
        >
          <Text style={styles.langBtnLabel}>🌍  Change Language</Text>
        </TouchableOpacity>

        {/* ── Clear language (for testing) ── */}
        <TouchableOpacity
          style={styles.clearBtn}
          onPress={clearLanguage}
          activeOpacity={0.85}
        >
          <Text style={styles.clearBtnLabel}>🗑  Clear Language (Test)</Text>
        </TouchableOpacity>

        {/* ── Sign Out ── */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => signOut()}
          activeOpacity={0.85}
        >
          <Text style={styles.logoutBtnLabel}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 14,
  },
  logoImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 26,
    color: colors.textPrimary,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 4,
  },

  // Language card
  langCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F6FF",
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.primary + "44",
    padding: 16,
    gap: 12,
  },
  langFlag: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.border,
  },
  langInfo: {
    flex: 1,
    gap: 3,
  },
  langNameRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
  },
  langName: {
    fontFamily: fontFamily.bold,
    fontSize: 17,
    color: colors.textPrimary,
  },
  langNative: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.textSecondary,
  },
  langLearners: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.textSecondary,
  },
  diffChip: {
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  diffChipText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
  },

  // Buttons
  langBtn: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    width: "100%",
    alignItems: "center",
  },
  langBtnLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: "#FFFFFF",
  },
  clearBtn: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: 14,
    width: "100%",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  clearBtnLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: colors.textSecondary,
  },
  logoutBtn: {
    backgroundColor: "#FF4D4F",
    borderRadius: 16,
    paddingVertical: 14,
    width: "100%",
    alignItems: "center",
  },
  logoutBtnLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: "#FFFFFF",
  },
});
