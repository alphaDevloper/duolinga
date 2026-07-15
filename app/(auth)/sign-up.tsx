import { VerificationModal } from "@/components/VerificationModal";
import { colors } from "@/constants/colors";
import { fontFamily } from "@/constants/fonts";
import { images } from "@/constants/images";
import { useSignUp } from "@clerk/expo/legacy";
import { useSSO } from "@clerk/expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const { startSSOFlow } = useSSO();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signUpError, setSignUpError] = useState<string | null>(null);

  /** Step 1: Create the sign-up and trigger email verification */
  const handleSignUp = async () => {
    if (!isLoaded) return;
    setSignUpLoading(true);
    setSignUpError(null);

    try {
      await signUp.create({ emailAddress: email, password });
      // Send the verification email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setModalVisible(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Sign up failed. Please try again.";
      setSignUpError(msg);
    } finally {
      setSignUpLoading(false);
    }
  };

  /** Step 2: Verify the OTP code the user entered */
  const handleVerify = async (code: string) => {
    if (!isLoaded) return;
    setVerifyLoading(true);
    setVerifyError(null);

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });
      if (result.status === "complete") {
        // Activate the new session and navigate home
        await setActive({ session: result.createdSessionId });
        setModalVisible(false);
        router.replace("/");
      } else {
        setVerifyError("Verification incomplete. Please try again.");
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Invalid code. Please try again.";
      setVerifyError(msg);
    } finally {
      setVerifyLoading(false);
    }
  };

  /** Resend the verification email */
  const handleResend = async () => {
    if (!isLoaded) return;
    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerifyError(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Could not resend code.";
      setVerifyError(msg);
    }
  };

  /** OAuth social sign-up/in — opens a browser and redirects back to the app */
  const handleSocialAuth = async (strategy: string) => {
    try {
      const { createdSessionId, setActive: setSSOActive } = await startSSOFlow({
        strategy: strategy as import("@clerk/shared/types").OAuthStrategy,
        redirectUrl: "duolingoclone://",
      });
      if (createdSessionId && setSSOActive) {
        await setSSOActive({ session: createdSessionId });
        router.replace("/");
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Social sign-in failed. Please try again.";
      setSignUpError(msg);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Back button ── */}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>

          {/* ── Heading ── */}
          <View style={styles.headingSection}>
            <Text style={styles.title}>Create your account</Text>
            <Text style={styles.subtitle}>
              Start your language journey today ✨
            </Text>
          </View>

          {/* ── Mascot ── */}
          <View style={styles.mascotWrapper}>
            <Image
              source={images.mascotAuth}
              style={styles.mascotImage}
              resizeMode="contain"
            />
          </View>

          {/* ── Form ── */}
          <View style={styles.form}>
            {/* Email */}
            <View
              style={[
                styles.inputContainer,
                emailFocused && styles.inputContainerFocused,
              ]}
            >
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="alex@gmail.com"
                placeholderTextColor={colors.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
            </View>

            {/* Password */}
            <View
              style={[
                styles.inputContainer,
                passwordFocused && styles.inputContainerFocused,
              ]}
            >
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordRow}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor={colors.textSecondary}
                  secureTextEntry={!passwordVisible}
                  autoComplete="new-password"
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
                <TouchableOpacity
                  style={styles.eyeBtn}
                  onPress={() => setPasswordVisible((v) => !v)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text style={styles.eyeIcon}>
                    {passwordVisible ? "🙈" : "👁"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign Up error */}
            {signUpError ? (
              <Text style={styles.errorText}>{signUpError}</Text>
            ) : null}

            {/* Sign Up CTA */}
            <TouchableOpacity
              style={[styles.primaryBtn, signUpLoading && { opacity: 0.6 }]}
              onPress={handleSignUp}
              activeOpacity={0.85}
              disabled={signUpLoading || !email || !password}
            >
              <Text style={styles.primaryBtnLabel}>
                {signUpLoading ? "Creating account…" : "Sign Up"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* ── Divider ── */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* ── Social Buttons ── */}
          <View style={styles.socialGroup}>
            <SocialButton
              icon="G"
              label="Continue with Google"
              color="#4285F4"
              bg="#fff"
              onPress={() => handleSocialAuth("oauth_google")}
            />
            <SocialButton
              icon="f"
              label="Continue with Facebook"
              color="#1877F2"
              bg="#1877F2"
              textColor="#fff"
              onPress={() => handleSocialAuth("oauth_facebook")}
            />
            <SocialButton
              icon=""
              label="Continue with Apple"
              color="#000"
              bg="#fff"
              isApple
              onPress={() => handleSocialAuth("oauth_apple")}
            />
          </View>

          {/* ── Footer link ── */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
              <Text style={styles.footerLink}>Log in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <VerificationModal
        visible={modalVisible}
        email={email}
        onClose={() => setModalVisible(false)}
        onVerify={handleVerify}
        onResend={handleResend}
        isLoading={verifyLoading}
        error={verifyError}
      />
    </SafeAreaView>
  );
}


/* ── Social Button ── */
function SocialButton({
  icon,
  label,
  color,
  bg,
  textColor,
  isApple,
  onPress,
}: {
  icon: string;
  label: string;
  color: string;
  bg: string;
  textColor?: string;
  isApple?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.socialBtn, { backgroundColor: bg }]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      {isApple ? (
        <Text style={[styles.socialIconApple, { color }]}> </Text>
      ) : (
        <View
          style={[
            styles.socialIconCircle,
            icon === "f" && { backgroundColor: color },
          ]}
        >
          <Text
            style={[
              styles.socialIconText,
              { color: icon === "f" ? "#fff" : color },
            ]}
          >
            {icon}
          </Text>
        </View>
      )}
      <Text
        style={[
          styles.socialLabel,
          textColor ? { color: textColor } : undefined,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  /* Back */
  backBtn: {
    marginTop: 8,
    marginBottom: 4,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  backArrow: {
    fontSize: 32,
    color: colors.textPrimary,
    lineHeight: 36,
  },

  /* Heading */
  headingSection: {
    marginTop: 8,
    marginBottom: 4,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: 6,
  },

  /* Mascot */
  mascotWrapper: {
    alignItems: "center",
    marginVertical: 8,
  },
  mascotImage: {
    width: 160,
    height: 160,
  },

  /* Form */
  form: {
    gap: 14,
    marginBottom: 24,
  },
  inputContainer: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colors.background,
  },
  inputContainerFocused: {
    borderColor: colors.primary,
  },
  inputLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  input: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: colors.textPrimary,
    padding: 0,
    margin: 0,
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
  },
  eyeBtn: {
    paddingLeft: 8,
  },
  eyeIcon: {
    fontSize: 18,
  },

  /* Primary CTA */
  primaryBtn: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  primaryBtnLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 17,
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },

  /* Divider */
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.textSecondary,
  },

  /* Social */
  socialGroup: {
    gap: 12,
    marginBottom: 32,
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 14,
  },
  socialIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F4FF",
  },
  socialIconText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
  },
  socialIconApple: {
    fontSize: 22,
    lineHeight: 28,
  },
  socialLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: colors.textPrimary,
  },

  /* Footer */
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.textSecondary,
  },
  footerLink: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.primary,
  },
  errorText: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: "#E53E3E",
    marginTop: -6,
  },
});
