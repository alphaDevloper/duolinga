import { colors } from "@/constants/colors";
import { fontFamily } from "@/constants/fonts";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface VerificationModalProps {
  visible: boolean;
  email: string;
  onClose: () => void;
  /** Called with the 6-digit code once the user finishes entering it */
  onVerify: (code: string) => Promise<void>;
  /** Called when user taps "Resend code" */
  onResend: () => Promise<void>;
  /** Shows a loading/disabled state while Clerk is processing */
  isLoading?: boolean;
  /** Displays an inline error under the digit boxes */
  error?: string | null;
}

export function VerificationModal({
  visible,
  email,
  onClose,
  onVerify,
  onResend,
  isLoading = false,
  error = null,
}: VerificationModalProps) {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const inputRef = useRef<TextInput>(null);
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // Animate in when visible
  useEffect(() => {
    if (visible) {
      setCode(Array(6).fill(""));
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          damping: 18,
          stiffness: 200,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Auto-focus the hidden input
        inputRef.current?.focus();
      });
    } else {
      scaleAnim.setValue(0.9);
      opacityAnim.setValue(0);
    }
  }, [visible]);

  const handleChangeText = (text: string) => {
    // Only allow digits, max 6
    const digits = text.replace(/\D/g, "").slice(0, 6);
    const arr = digits.split("").concat(Array(6).fill("")).slice(0, 6);
    setCode(arr);

    if (digits.length === 6 && !isLoading) {
      // Delegate verification to the parent screen
      onVerify(digits);
    }
  };

  const filledCount = code.filter((d) => d !== "").length;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlay}
      >
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={onClose}
        />

        <Animated.View
          style={[
            styles.sheet,
            { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
          ]}
        >
          {/* Email icon */}
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>✉️</Text>
          </View>

          <Text style={styles.title}>Check your email</Text>
          <Text style={styles.subtitle}>
            We sent a 6-digit code to{"\n"}
            <Text style={styles.email}>{email || "your email"}</Text>
          </Text>

          {/* Hidden TextInput for native keyboard */}
          <TextInput
            ref={inputRef}
            style={styles.hiddenInput}
            value={code.join("")}
            onChangeText={handleChangeText}
            keyboardType="number-pad"
            maxLength={6}
            caretHidden
            autoComplete="one-time-code"
            editable={!isLoading}
          />

          {/* Visual digit boxes */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => inputRef.current?.focus()}
            style={styles.dotsRow}
          >
            {code.map((digit, i) => (
              <View
                key={i}
                style={[
                  styles.digitBox,
                  digit !== "" && styles.digitBoxFilled,
                  i === filledCount && styles.digitBoxActive,
                ]}
              >
                <Text style={styles.digitText}>{digit}</Text>
              </View>
            ))}
          </TouchableOpacity>

          {/* Inline error */}
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}

          <Text style={styles.resendText}>
            Didn't receive it?{" "}
            <Text
              style={[styles.resendLink, isLoading && { opacity: 0.4 }]}
              onPress={() => !isLoading && onResend()}
            >
              Resend code
            </Text>
          </Text>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "flex-end",
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  sheet: {
    backgroundColor: colors.background,
    borderRadius: 28,
    paddingTop: 32,
    paddingBottom: 36,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  iconText: {
    fontSize: 30,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 28,
  },
  email: {
    fontFamily: fontFamily.semiBold,
    color: colors.textPrimary,
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: 1,
    height: 1,
  },
  dotsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  digitBox: {
    width: 46,
    height: 54,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
  },
  digitBoxFilled: {
    borderColor: colors.primary,
    backgroundColor: "#EEF2FF",
  },
  digitBoxActive: {
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: colors.background,
  },
  digitText: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    color: colors.textPrimary,
  },
  errorText: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: "#E53E3E",
    textAlign: "center",
    marginBottom: 12,
  },
  resendText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 16,
  },
  resendLink: {
    fontFamily: fontFamily.semiBold,
    color: colors.primary,
  },
});

