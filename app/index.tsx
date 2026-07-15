import { useAuth, useClerk } from "@clerk/expo";
import { colors } from "@/constants/colors";
import { fontFamily } from "@/constants/fonts";
import { images } from "@/constants/images";
import { Redirect } from "expo-router";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Entry point — redirects based on Clerk auth state.
 *   Signed in  → home (tabs) — placeholder for now
 *   Signed out → /onboarding
 */
export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();
  const { signOut } = useClerk();

  // Wait for Clerk to finish loading session
  if (!isLoaded) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  // Redirect signed-out users to onboarding
  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  // Authenticated home placeholder (will be replaced by (tabs) later)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={images.mascotLogo} style={styles.logoImage} />
        <Text style={styles.title}>Welcome back! 🎉</Text>
        <Text style={styles.subtitle}>You're signed in. Home screen coming soon.</Text>

        {/* ── Logout button (for testing) ── */}
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
    gap: 16,
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
  },
  logoutBtn: {
    marginTop: 8,
    backgroundColor: "#FF4D4F",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 36,
  },
  logoutBtnLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: "#FFFFFF",
  },
});
