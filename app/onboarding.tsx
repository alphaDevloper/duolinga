import { colors } from "@/constants/colors";
import { fontFamily } from "@/constants/fonts";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* ── Header: Logo + App name — centered ── */}
      <View style={styles.header}>
        <Image source={images.mascotLogo} style={styles.logoImage} />
        <Text style={styles.appName}>Duolinga</Text>
      </View>

      {/* ── Headline ── */}
      <View style={styles.headlineSection}>
        {/* Inline text: "Your AI language teacher." with "teacher" in purple */}
        <Text style={styles.headlineBlack}>
          {"Your AI language "}
          <Text style={styles.headlinePurple}>{"teacher"}</Text>
          {"." }
        </Text>
        <Text style={styles.subtitle}>
          {"Real conversations, personalized\nlessons, anytime, anywhere."}
        </Text>
      </View>

      {/* ── Mascot + Speech Bubbles ── */}
      <View style={styles.mascotSection}>
        {/* Hello! bubble — left */}
        <View style={[styles.bubble, styles.bubbleLeft]}>
          <Text style={styles.bubbleTextDark}>Hello!</Text>
        </View>

        {/* ¡Hola! bubble — right top */}
        <View style={[styles.bubble, styles.bubbleRightTop]}>
          <Text style={styles.bubbleTextPurple}>¡Hola!</Text>
        </View>

        {/* 你好! bubble — right bottom */}
        <View style={[styles.bubble, styles.bubbleRightBottom]}>
          <Text style={styles.bubbleTextRed}>你好!</Text>
        </View>

        {/* Mascot image */}
        <Image
          source={images.mascotWelcome}
          style={styles.mascotImage}
          resizeMode="contain"
        />
      </View>

      {/* ── CTA Button ── */}
      <View style={styles.ctaWrapper}>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => router.replace("/(tabs)")}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaLabel}>Get Started</Text>
          <Text style={styles.ctaArrow}>›</Text>
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

  /* ── Header ── */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 24,
    paddingBottom: 8,
    gap: 8,
  },
  logoImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  appName: {
    fontFamily: fontFamily.bold,
    fontSize: 26,
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },

  /* ── Headline ── */
  headlineSection: {
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 16,
  },
  headlineBlack: {
    fontFamily: fontFamily.bold,
    fontSize: 34,
    lineHeight: 44,
    color: colors.textPrimary,
  },
  headlinePurple: {
    fontFamily: fontFamily.bold,
    fontSize: 34,
    lineHeight: 44,
    color: colors.primary,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    lineHeight: 24,
    color: colors.textSecondary,
    marginTop: 10,
  },

  /* ── Mascot section ── */
  mascotSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginHorizontal: 24,
  },
  mascotImage: {
    width: 260,
    height: 280,
  },

  /* ── Speech bubbles ── */
  bubble: {
    position: "absolute",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleLeft: {
    backgroundColor: "#EEF2FF",
    left: 0,
    top: "28%",
    borderBottomRightRadius: 4,
  },
  bubbleRightTop: {
    backgroundColor: "#EEF2FF",
    right: 0,
    top: "8%",
    borderBottomLeftRadius: 4,
  },
  bubbleRightBottom: {
    backgroundColor: "#FFF0F0",
    right: 0,
    top: "52%",
    borderBottomLeftRadius: 4,
  },
  bubbleTextDark: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.textPrimary,
  },
  bubbleTextPurple: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.primary,
  },
  bubbleTextRed: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: "#E53E3E",
  },

  /* ── CTA ── */
  ctaWrapper: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  ctaLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },
  ctaArrow: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    color: "#FFFFFF",
    lineHeight: 24,
  },
});
