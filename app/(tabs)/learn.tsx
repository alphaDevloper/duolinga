/**
 * app/(tabs)/learn.tsx
 *
 * Lessons screen — shows units and lessons for the selected language.
 * Design matches the "At the Café" reference with:
 *  - Header with back nav, unit title, bookmark
 *  - Full-width hero illustration
 *  - Lessons / Practice tab switcher
 *  - Lesson cards with completed / in-progress / locked states
 */

import { colors } from "@/constants/colors";
import { fontFamily } from "@/constants/fonts";
import { images } from "@/constants/images";
import { getLessonsByLanguage } from "@/data/lessons";
import { getUnitsByLanguage } from "@/data/units";
import { useLanguageStore } from "@/store/languageStore";
import { useProgressStore } from "@/store/progressStore";
import type { Lesson } from "@/types/learning";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ── Lesson type icon/emoji map ────────────────────────────────────────────────
const LESSON_TYPE_EMOJI: Record<string, string> = {
  vocabulary: "📚",
  grammar: "✏️",
  conversation: "💬",
  review: "🔄",
  "ai-teacher": "🤖",
};

// ── Status helpers ─────────────────────────────────────────────────────────────
type LessonStatus = "completed" | "inProgress" | "locked";

function getLessonStatus(
  lesson: Lesson,
  completedIds: string[],
  inProgressId: string | null,
): LessonStatus {
  if (completedIds.includes(lesson.id)) return "completed";
  if (lesson.id === inProgressId) return "inProgress";
  return "locked";
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function LearnScreen() {
  const router = useRouter();
  const { selectedLanguage } = useLanguageStore();
  const { completedLessonIds } = useProgressStore();
  const [activeTab, setActiveTab] = useState<"lessons" | "practice">("lessons");

  const langCode = selectedLanguage ?? "es";
  const units = getUnitsByLanguage(langCode);
  const allLessons = getLessonsByLanguage(langCode);

  // The current unit is the first one with incomplete lessons
  const currentUnit =
    units.find((u) =>
      allLessons
        .filter((l) => l.unitId === u.id)
        .some((l) => !completedLessonIds.includes(l.id)),
    ) ?? units[0];

  const unitLessons = allLessons.filter(
    (l) => l.unitId === (currentUnit?.id ?? ""),
  );

  // First incomplete lesson = "in progress"
  const inProgressLesson =
    unitLessons.find((l) => !completedLessonIds.includes(l.id)) ?? null;

  const completedCount = unitLessons.filter((l) =>
    completedLessonIds.includes(l.id),
  ).length;

  return (
    <SafeAreaView style={styles.safe}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {currentUnit?.title ?? "Lessons"}
          </Text>
          <Text style={styles.headerSub}>
            Unit {currentUnit?.order ?? 1} • {completedCount} /{" "}
            {unitLessons.length} lessons
          </Text>
        </View>

        <TouchableOpacity style={styles.bookmarkBtn} activeOpacity={0.7}>
          <Ionicons name="bookmark-outline" size={22} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Hero Image ── */}
        <View style={styles.heroWrapper}>
          <Image
            source={images.earth}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* ── Tab Switcher ── */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={styles.tabItem}
            activeOpacity={0.8}
            onPress={() => setActiveTab("lessons")}
          >
            <Text
              style={[
                styles.tabLabel,
                activeTab === "lessons" && styles.tabLabelActive,
              ]}
            >
              Lessons
            </Text>
            {activeTab === "lessons" && <View style={styles.tabUnderline} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            activeOpacity={0.8}
            onPress={() => setActiveTab("practice")}
          >
            <Text
              style={[
                styles.tabLabel,
                activeTab === "practice" && styles.tabLabelActive,
              ]}
            >
              Practice
            </Text>
            {activeTab === "practice" && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        </View>

        {/* ── Lesson List ── */}
        {activeTab === "lessons" && (
          <View style={styles.lessonList}>
            {unitLessons.map((lesson) => {
              const status = getLessonStatus(
                lesson,
                completedLessonIds,
                inProgressLesson?.id ?? null,
              );
              return (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  status={status}
                  onPress={() => {
                    // All lessons are openable (no locking logic)
                    console.log("Open lesson:", lesson.id);
                  }}
                />
              );
            })}
          </View>
        )}

        {/* ── Practice placeholder ── */}
        {activeTab === "practice" && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🎯</Text>
            <Text style={styles.emptyTitle}>Practice coming soon</Text>
            <Text style={styles.emptySub}>
              Review vocabulary and reinforce your skills here.
            </Text>
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ── LessonCard ────────────────────────────────────────────────────────────────

type LessonCardProps = {
  lesson: Lesson;
  status: LessonStatus;
  onPress: () => void;
};

function LessonCard({ lesson, status, onPress }: LessonCardProps) {
  const isCompleted = status === "completed";
  const isInProgress = status === "inProgress";
  const isLocked = status === "locked";

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isInProgress && styles.cardInProgress,
        isCompleted && styles.cardCompleted,
      ]}
      activeOpacity={0.75}
      onPress={onPress}
    >
      {/* Left text content */}
      <View style={styles.cardLeft}>
        <Text
          style={[styles.cardNumber, isInProgress && styles.cardNumberActive]}
        >
          Lesson {lesson.order}
        </Text>
        <Text
          style={[styles.cardTitle, isInProgress && styles.cardTitleActive]}
        >
          {lesson.title}
        </Text>
        {isInProgress && (
          <Text style={styles.cardInProgressLabel}>In progress</Text>
        )}
        {isLocked && (
          <Text style={styles.cardLockedLabel}>
            0 / {lesson.activities.length} lessons
          </Text>
        )}
      </View>

      {/* Right status indicator */}
      <View style={styles.cardRight}>
        {isCompleted && (
          <View style={styles.completedBadge}>
            <Ionicons name="checkmark" size={18} color="#fff" />
          </View>
        )}
        {isInProgress && (
          <Text style={styles.lessonTypeEmoji}>
            {LESSON_TYPE_EMOJI[lesson.type] ?? "📖"}
          </Text>
        )}
        {isLocked && (
          <View style={styles.lockBadge}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={colors.textSecondary}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 12,
    backgroundColor: colors.background,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCenter: {
    flex: 1,
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    color: colors.textPrimary,
  },
  headerSub: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 1,
  },
  bookmarkBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  // Hero
  heroWrapper: {
    width: "100%",
    height: 200,
    overflow: "hidden",
  },
  heroImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: 250,
  },

  // Tabs
  tabRow: {
    flexDirection: "row",
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    position: "relative",
  },
  tabLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: colors.textSecondary,
  },
  tabLabelActive: {
    color: colors.primary,
  },
  tabUnderline: {
    position: "absolute",
    bottom: 0,
    left: "15%",
    right: "15%",
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },

  // Scroll
  scrollContent: {
    paddingBottom: 24,
  },

  // Lesson list
  lessonList: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 10,
  },

  // Lesson card — base
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderWidth: 1.5,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardCompleted: {
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  cardInProgress: {
    borderColor: colors.primary,
    backgroundColor: "#F0ECFF",
  },

  // Card left
  cardLeft: {
    flex: 1,
    gap: 2,
  },
  cardNumber: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.textSecondary,
  },
  cardNumberActive: {
    color: colors.primary,
    fontFamily: fontFamily.semiBold,
  },
  cardTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.textPrimary,
  },
  cardTitleActive: {
    color: colors.textPrimary,
    fontFamily: fontFamily.bold,
  },
  cardInProgressLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.primary,
    marginTop: 2,
  },
  cardLockedLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },

  // Card right
  cardRight: {
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  completedBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.success,
    alignItems: "center",
    justifyContent: "center",
  },
  lockBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  lessonTypeEmoji: {
    fontSize: 30,
  },

  // Empty state
  emptyState: {
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 32,
    gap: 10,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 4,
  },
  emptyTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    color: colors.textPrimary,
    textAlign: "center",
  },
  emptySub: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },

  bottomSpacer: {
    height: 16,
  },
});
