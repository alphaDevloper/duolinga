import { colors } from "@/constants/colors";
import { fontFamily } from "@/constants/fonts";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Home screen — entry point of the app.
 * Links to the onboarding flow.
 */
export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoRow}>
          <Image source={images.mascotLogo} style={styles.logoImage} />
          <Text style={styles.appName}>Duolinga</Text>
        </View>

        <Text style={styles.tagline}>Learn languages with AI.</Text>

        {/* Go to Onboarding */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/onboarding")}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonLabel}>View Onboarding →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 20,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoImage: {
    width: 48,
    height: 48,
    resizeMode: "contain",
  },
  appName: {
    fontFamily: fontFamily.bold,
    fontSize: 30,
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  tagline: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
  },
  button: {
    marginTop: 12,
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
  buttonLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: "#FFFFFF",
  },
});
