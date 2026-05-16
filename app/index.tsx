import { colors } from "@/constants/colors";
import { fontFamily } from "@/constants/fonts";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Placeholder index screen — replaced when real screens are built.
 * Demonstrates the Lingua design system: colors, typography, spacing.
 */
export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ padding: 24, gap: 24 }}>
        {/* Header */}
        <Text
          style={{
            fontFamily: fontFamily.bold,
            fontSize: 32,
            lineHeight: 32 * 1.2,
            color: colors.textPrimary,
          }}
        >
          Lingua 🦊
        </Text>

        <Text
          style={{
            fontFamily: fontFamily.regular,
            fontSize: 14,
            lineHeight: 14 * 1.6,
            color: colors.textSecondary,
          }}
        >
          Design system ready. Build features here.
        </Text>

        {/* Color swatches */}
        <View style={{ gap: 8 }}>
          {[
            { label: "Primary", color: colors.primary },
            { label: "Primary Deep", color: colors.primaryDeep },
            { label: "Lingua Blue", color: colors.linguaBlue },
            { label: "Lingua Green", color: colors.linguaGreen },
            { label: "Success", color: colors.success },
            { label: "Warning", color: colors.warning },
            { label: "Streak", color: colors.streak },
            { label: "Error", color: colors.error },
          ].map(({ label, color }) => (
            <View
              key={label}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: color,
                }}
              />
              <Text
                style={{
                  fontFamily: fontFamily.medium,
                  fontSize: 13,
                  color: colors.textPrimary,
                }}
              >
                {label} — {color}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
