import { colors } from "@/constants/colors";
import { fontFamily } from "@/constants/fonts";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Chat Tab — placeholder screen.
 */
export default function ChatScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="chatbubble" size={36} color={colors.primary} />
        </View>
        <Text style={styles.title}>Chat</Text>
        <Text style={styles.subtitle}>AI chat tutor sessions coming soon.</Text>
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
    gap: 12,
    padding: 32,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary + "18",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
