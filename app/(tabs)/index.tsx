/**
 * app/(tabs)/index.tsx
 *
 * Home screen — the main dashboard the user sees after login.
 *
 * Sections (matching the design):
 *  1. Header     – language flag + greeting, streak counter, bell icon
 *  2. Daily Goal – XP progress card with treasure chest
 *  3. Continue   – gradient card for current language / unit (palace image)
 *  4. Today's Plan – list of today's tasks with completion states
 *  5. Next Up    – AI Video Call promo card
 */

import { colors } from "@/constants/colors";
import { fontFamily } from "@/constants/fonts";
import { images } from "@/constants/images";
import { getLanguageByCode } from "@/data/languages";
import { getLessonsByLanguage } from "@/data/lessons";
import { getUnitsByLanguage } from "@/data/units";
import { useLanguageStore } from "@/store/languageStore";
import { useProgressStore } from "@/store/progressStore";
import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";

import { useRouter } from "expo-router";
import {
  Image as RNImage,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ── Types ──────────────────────────────────────────────────────────────────

type PlanItem = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  title: string;
  subtitle: string;
  completed: boolean;
};

// ── Helper ─────────────────────────────────────────────────────────────────

/** Map language code → flag emoji */
const FLAG_EMOJI: Record<string, string> = {
  es: "🇪🇸",
  fr: "🇫🇷",
  de: "🇩🇪",
  ja: "🇯🇵",
  ar: "🇸🇦",
};

/** First name from Clerk full name or username */
function getFirstName(
  fullName: string | null | undefined,
  username: string | null | undefined,
): string {
  if (fullName) return fullName.split(" ")[0];
  if (username) return username;
  return "Learner";
}

// ── Component ──────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useUser();
  const { selectedLanguage } = useLanguageStore();
  const { todayXP, dailyGoal, streak, completedLessonIds } = useProgressStore();

  // ── Data derivation ──────────────────────────────────────────────────────
  const langCode = selectedLanguage ?? "es";
  const language = getLanguageByCode(langCode);
  const units = getUnitsByLanguage(langCode);
  const lessons = getLessonsByLanguage(langCode);

  const currentUnit = units[0];
  const currentLesson =
    lessons.find((l) => !completedLessonIds.includes(l.id)) ?? lessons[0];

  const firstName = getFirstName(user?.fullName, user?.username);
  const flagEmoji = FLAG_EMOJI[langCode] ?? "🌐";
  const xpProgress = Math.min(todayXP / dailyGoal, 1);

  // ── Today's plan items ────────────────────────────────────────────────────
  const planItems: PlanItem[] = [
    {
      id: "lesson",
      icon: "book",
      iconBg: colors.primary,
      title: "Lesson",
      subtitle: currentLesson?.title ?? "At the café",
      completed: completedLessonIds.includes(currentLesson?.id ?? ""),
    },
    {
      id: "ai-conversation",
      icon: "headset",
      iconBg: "#5B3BF6",
      title: "AI Conversation",
      subtitle: "Talk about your day",
      completed: false,
    },
    {
      id: "new-words",
      icon: "chatbubble",
      iconBg: "#FF6B6B",
      title: "New words",
      subtitle: "10 words",
      completed: false,
    },
  ];

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── 1. Header ── */}
        <View style={styles.header}>
          {/* Left: flag + greeting */}
          <View style={styles.headerLeft}>
            <View style={styles.flagCircle}>
              <Text style={styles.flagEmoji}>{flagEmoji}</Text>
            </View>
            <Text style={styles.greeting}>{`Hola, ${firstName}! 👋`}</Text>
          </View>

          {/* Right: streak + bell */}
          <View style={styles.headerRight}>
            <View style={styles.streakBadge}>
              <RNImage source={images.streakFire} style={styles.streakIcon} />
              <Text style={styles.streakCount}>{streak}</Text>
            </View>
            <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color={colors.textPrimary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── 2. Daily Goal Card ── */}
        <View style={styles.goalCard}>
          <View style={styles.goalLeft}>
            <Text style={styles.goalLabel}>Daily goal</Text>
            <View style={styles.goalXPRow}>
              <Text style={styles.goalXPCurrent}>{todayXP}</Text>
              <Text style={styles.goalXPTotal}> / {dailyGoal} XP</Text>
            </View>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${Math.round(xpProgress * 100)}%` as `${number}%` },
                ]}
              />
            </View>
          </View>
          <RNImage
            source={images.treasure}
            style={styles.treasureImage}
            resizeMode="contain"
          />
        </View>

        {/* ── 3. Continue Learning Card ── */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.continueCard}
          onPress={() => router.push("/learn")}
        >
          <View style={styles.continueGradient}>
            {/* Text content */}
            <View style={styles.continueTextBlock}>
              <Text style={styles.continueSub}>Continue learning</Text>
              <Text style={styles.continueLang}>
                {language?.name ?? "Spanish"}
              </Text>
              <Text style={styles.continueUnit}>
                A1 • {currentUnit ? `Unit ${currentUnit.order}` : "Unit 1"}
              </Text>
              <TouchableOpacity
                style={styles.continueButton}
                activeOpacity={0.85}
                onPress={() => router.push("/learn")}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>

            {/* Palace illustration */}
            <Image
              source={images.palace}
              style={styles.palaceImage}
              contentFit="contain"
            />
          </View>
        </TouchableOpacity>

        {/* ── 4. Today's Plan ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{"Today's plan"}</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.planList}>
          {planItems.map((item, idx) => (
            <View key={item.id}>
              <TouchableOpacity style={styles.planItem} activeOpacity={0.75}>
                {/* Icon box */}
                <View
                  style={[styles.planIconBox, { backgroundColor: item.iconBg }]}
                >
                  <Ionicons name={item.icon} size={20} color="#FFFFFF" />
                </View>

                {/* Title & subtitle */}
                <View style={styles.planTextBlock}>
                  <Text style={styles.planTitle}>{item.title}</Text>
                  <Text style={styles.planSubtitle}>{item.subtitle}</Text>
                </View>

                {/* Completion indicator */}
                <View
                  style={[
                    styles.planCheck,
                    item.completed
                      ? styles.planCheckDone
                      : styles.planCheckEmpty,
                  ]}
                >
                  {item.completed && (
                    <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                  )}
                </View>
              </TouchableOpacity>

              {/* Divider between items */}
              {idx < planItems.length - 1 && (
                <View style={styles.planDivider} />
              )}
            </View>
          ))}
        </View>

        {/* ── 5. Next Up – AI Video Call ── */}
        <View style={styles.nextUpCard}>
          {/* Left text block */}
          <View style={styles.nextUpLeft}>
            <Text style={styles.nextUpLabel}>Next up</Text>
            <Text style={styles.nextUpTitle}>AI Video Call</Text>
            <Text style={styles.nextUpSub}>Practice speaking</Text>
          </View>

          {/* Avatar + video button */}
          <View style={styles.nextUpRight}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=47" }}
              style={styles.teacherAvatar}
              contentFit="cover"
            />
            <TouchableOpacity
              style={styles.videoButton}
              activeOpacity={0.85}
              onPress={() => router.push("/ai-teacher")}
            >
              <Ionicons name="videocam" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },

  // ── Header ──
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  flagCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.border,
  },
  flagEmoji: {
    fontSize: 22,
  },
  greeting: {
    fontFamily: fontFamily.semiBold,
    fontSize: 17,
    color: colors.textPrimary,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  streakIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  streakCount: {
    fontFamily: fontFamily.bold,
    fontSize: 17,
    color: colors.textPrimary,
  },
  bellButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Daily Goal Card ──
  goalCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8F0",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  goalLeft: {
    flex: 1,
    gap: 6,
  },
  goalLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.textSecondary,
  },
  goalXPRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  goalXPCurrent: {
    fontFamily: fontFamily.extraBold,
    fontSize: 36,
    color: colors.textPrimary,
    lineHeight: 42,
  },
  goalXPTotal: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    color: colors.textSecondary,
  },
  progressTrack: {
    height: 10,
    borderRadius: 9999,
    backgroundColor: "#FFE4C4",
    marginRight: 16,
    marginTop: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: 10,
    borderRadius: 9999,
    backgroundColor: colors.streak,
  },
  treasureImage: {
    width: 88,
    height: 88,
  },

  // ── Continue Learning Card ──
  continueCard: {
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 24,
    // Shadow
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 8,
  },
  continueGradient: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 24,
    minHeight: 180,
    position: "relative",
    backgroundColor: "#6C4EF5",
  },
  continueTextBlock: {
    flex: 1,
    gap: 4,
    zIndex: 1,
  },
  continueSub: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 2,
  },
  continueLang: {
    fontFamily: fontFamily.extraBold,
    fontSize: 30,
    color: "#FFFFFF",
    lineHeight: 36,
  },
  continueUnit: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: "rgba(255,255,255,0.75)",
    marginBottom: 16,
  },
  continueButton: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  continueButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: colors.primary,
  },
  palaceImage: {
    position: "absolute",
    right: -4,
    bottom: 0,
    width: 160,
    height: 170,
  },

  // ── Section Header ──
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    color: colors.textPrimary,
  },
  viewAll: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.primary,
  },

  // ── Today's Plan List ──
  planList: {
    backgroundColor: colors.background,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
    overflow: "hidden",
  },
  planItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
  },
  planIconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  planTextBlock: {
    flex: 1,
    gap: 2,
  },
  planTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: colors.textPrimary,
  },
  planSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.textSecondary,
  },
  planCheck: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  planCheckDone: {
    backgroundColor: colors.primary,
  },
  planCheckEmpty: {
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: "transparent",
  },
  planDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 76,
  },

  // ── Next Up Card ──
  nextUpCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F4FF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 8,
  },
  nextUpLeft: {
    flex: 1,
    gap: 2,
  },
  nextUpLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  nextUpTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    color: colors.textPrimary,
  },
  nextUpSub: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.textSecondary,
  },
  nextUpRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  teacherAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#C7D2FE",
  },
  videoButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.linguaGreen,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.linguaGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },

  bottomSpacer: {
    height: 16,
  },
});
