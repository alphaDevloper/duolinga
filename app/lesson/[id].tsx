/**
 * app/lesson/[id].tsx
 *
 * AI Teacher Audio Lesson Screen
 *
 * Opened when the user taps a lesson card in the Learn screen.
 * Displays the lesson data (language, title, goal, phrases, AI context)
 * and provides an audio-only session UI:
 *   - Teacher mascot preview with room background
 *   - Teacher speech bubble with current phrase
 *   - Audio controls: Mic, Subtitles, End Call
 *   - Session feedback panel (Speaking, Pronunciation, Grammar)
 */

import { colors } from "@/constants/colors";
import { fontFamily } from "@/constants/fonts";
import { images } from "@/constants/images";
import { getLessonById } from "@/data/lessons";
import { useProgressStore } from "@/store/progressStore";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ── Session states ─────────────────────────────────────────────────────────────
type SessionState = "connecting" | "listening" | "speaking" | "feedback";

// ── Feedback rating colours ────────────────────────────────────────────────────
const FEEDBACK_COLOR: Record<string, string> = {
  Excellent: "#21C16B",
  Great: "#4D8BFF",
  Good: "#6C4EF5",
  "Needs Work": "#FF8A00",
};

// ── Rotating teacher lines (simulated AI responses) ───────────────────────────
const TEACHER_LINES = [
  { target: "¡Muy bien!", translation: "That was great! 👏" },
  {
    target: "¡Excelente pronunciación!",
    translation: "Excellent pronunciation! 🌟",
  },
  { target: "Inténtalo de nuevo.", translation: "Try it one more time! 💪" },
  { target: "¡Perfecto!", translation: "Perfect! You nailed it! ✨" },
];

// ── Simulated session feedback ────────────────────────────────────────────────
const FEEDBACK_STATES = [
  { speaking: "Excellent", pronunciation: "Great", grammar: "Good" },
  { speaking: "Great", pronunciation: "Excellent", grammar: "Great" },
  { speaking: "Good", pronunciation: "Good", grammar: "Excellent" },
];

// ── Component ──────────────────────────────────────────────────────────────────
export default function AudioLessonScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { completeLesson, addXP } = useProgressStore();

  const lesson = id ? getLessonById(id) : undefined;

  // ── Session state ──────────────────────────────────────────────────────────
  const [sessionState, setSessionState] = useState<SessionState>("connecting");
  const [micActive, setMicActive] = useState(false);
  const [subtitlesOn, setSubtitlesOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(false);
  const [teacherLineIdx, setTeacherLineIdx] = useState(0);
  const [feedbackIdx, setFeedbackIdx] = useState(0);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [sessionSeconds, setSessionSeconds] = useState(0);

  // ── Animations ─────────────────────────────────────────────────────────────
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const speakingAnim = useRef(new Animated.Value(0)).current;
  const connectingOpacity = useRef(new Animated.Value(0)).current;

  // Pulse ring for mic
  useEffect(() => {
    if (micActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.25,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
    }
  }, [micActive, pulseAnim]);

  // Speaking dot animation
  useEffect(() => {
    if (sessionState === "speaking") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(speakingAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(speakingAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      speakingAnim.stopAnimation();
      speakingAnim.setValue(0);
    }
  }, [sessionState, speakingAnim]);

  // Connecting fade-in
  useEffect(() => {
    Animated.timing(connectingOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      // Auto-progress to "listening" after 1.5s
      setTimeout(() => setSessionState("listening"), 1500);
    });
  }, [connectingOpacity]);

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => setSessionSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // ── Simulate teacher speaking every 4 s ────────────────────────────────────
  useEffect(() => {
    if (sessionState === "connecting") return;
    const interval = setInterval(() => {
      setSessionState("speaking");
      setTeacherLineIdx((i) => (i + 1) % TEACHER_LINES.length);
      setTimeout(() => {
        setSessionState("feedback");
        setFeedbackIdx((i) => (i + 1) % FEEDBACK_STATES.length);
        setPhraseIdx((i) =>
          lesson?.phrases ? (i + 1) % lesson.phrases.length : 0,
        );
        setTimeout(() => setSessionState("listening"), 2000);
      }, 2500);
    }, 6000);
    return () => clearInterval(interval);
  }, [sessionState, lesson]);

  // ── Format timer ─────────────────────────────────────────────────────────────
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  // ── End session ────────────────────────────────────────────────────────────
  const handleEndCall = useCallback(() => {
    if (lesson) {
      completeLesson(lesson.id);
      addXP(lesson.totalXP);
    }
    router.back();
  }, [lesson, completeLesson, addXP, router]);

  // ── Guard: lesson not found ───────────────────────────────────────────────
  if (!lesson) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundEmoji}>😕</Text>
          <Text style={styles.notFoundTitle}>Lesson not found</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.goBackBtn}
          >
            <Text style={styles.goBackText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const currentLine = TEACHER_LINES[teacherLineIdx];
  const currentFeedback = FEEDBACK_STATES[feedbackIdx];
  const currentPhrase = lesson.phrases?.[phraseIdx];
  const openingLine = lesson.aiTeacher?.openingLine ?? currentLine.target;

  return (
    <SafeAreaView style={styles.safe}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>AI Teacher</Text>
          <View style={styles.onlineRow}>
            <View
              style={[
                styles.onlineDot,
                {
                  backgroundColor:
                    sessionState === "connecting"
                      ? colors.warning
                      : colors.success,
                },
              ]}
            />
            <Text style={styles.onlineLabel}>
              {sessionState === "connecting" ? "Connecting…" : "Online"}
            </Text>
          </View>
        </View>

        {/* Right action buttons */}
        <View style={styles.headerRight}>
          {/* Camera toggle */}
          <TouchableOpacity
            style={styles.headerActionBtn}
            activeOpacity={0.75}
            onPress={() => setCameraOn((v) => !v)}
          >
            <Ionicons
              name={cameraOn ? "videocam" : "videocam-off"}
              size={18}
              color={cameraOn ? colors.primary : colors.textPrimary}
            />
          </TouchableOpacity>

          {/* Session timer */}
          <View style={styles.timerPill}>
            <Text style={styles.timerText}>{formatTime(sessionSeconds)}</Text>
          </View>

          {/* Bell */}
          <TouchableOpacity style={styles.headerActionBtn} activeOpacity={0.75}>
            <Ionicons
              name="notifications-outline"
              size={18}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Teacher Preview Area ── */}
        <View style={styles.teacherContainer}>
          {/* Room background */}
          <Image
            source={images.aiTeacherRoomBg}
            style={styles.roomBg}
            resizeMode="cover"
          />

          {/* Gradient overlay at bottom */}
          <View style={styles.roomOverlay} />

          {/* Teacher mascot */}
          <Image
            source={images.aiTeacherMascot}
            style={styles.mascotImage}
            resizeMode="contain"
          />

          {/* User self-view (top-right) */}
          <View style={styles.selfView}>
            <View style={styles.selfViewInner}>
              <Ionicons name="person" size={32} color="#fff" />
            </View>
          </View>

          {/* Connecting overlay */}
          {sessionState === "connecting" && (
            <Animated.View
              style={[styles.connectingOverlay, { opacity: connectingOpacity }]}
            >
              <Text style={styles.connectingText}>
                Connecting to AI Teacher…
              </Text>
            </Animated.View>
          )}

          {/* Speech bubble */}
          {sessionState !== "connecting" && subtitlesOn && (
            <View style={styles.speechBubble}>
              <View style={styles.speechContent}>
                <View style={styles.speechTextBlock}>
                  <Text style={styles.speechTarget}>
                    {sessionState === "speaking"
                      ? currentLine.target
                      : openingLine.split("!")[0] + "!"}
                  </Text>
                  <Text style={styles.speechTranslation}>
                    {sessionState === "speaking"
                      ? currentLine.translation
                      : (lesson.aiTeacher?.openingLine
                          ?.split(".")
                          .slice(1)
                          .join(".")
                          .trim() ?? "Say hello to start! 😊")}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.speechAudioBtn}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="volume-high"
                    size={22}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </View>
              {/* Bubble tail */}
              <View style={styles.speechTail} />
            </View>
          )}

          {/* Speaking indicator dots */}
          {sessionState === "speaking" && (
            <View style={styles.speakingDots}>
              {[0, 1, 2].map((i) => (
                <Animated.View
                  key={i}
                  style={[
                    styles.speakingDot,
                    {
                      opacity: speakingAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [i === 1 ? 0.4 : 0.7, i === 1 ? 1 : 0.4],
                      }),
                      transform: [
                        {
                          translateY: speakingAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [i === 1 ? 0 : 4, i === 1 ? -4 : 0],
                          }),
                        },
                      ],
                    },
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        {/* ── Session Info Strip ── */}
        {lesson.phrases &&
          lesson.phrases.length > 0 &&
          sessionState !== "connecting" && (
            <View style={styles.phraseStrip}>
              <Text style={styles.phraseStripLabel}>Current phrase</Text>
              <Text style={styles.phraseStripText} numberOfLines={1}>
                {currentPhrase?.phrase ?? lesson.phrases[0].phrase}
              </Text>
              <Text style={styles.phraseStripTranslation} numberOfLines={1}>
                {currentPhrase?.translation ?? lesson.phrases[0].translation}
              </Text>
            </View>
          )}

        {/* ── Controls Row ── */}
        <View style={styles.controlsRow}>
          {/* Camera */}
          <View style={styles.controlItem}>
            <TouchableOpacity
              style={[styles.controlBtn, cameraOn && styles.controlBtnActive]}
              activeOpacity={0.75}
              onPress={() => setCameraOn((v) => !v)}
            >
              <Ionicons
                name={cameraOn ? "videocam" : "videocam-outline"}
                size={26}
                color={cameraOn ? colors.primary : colors.textPrimary}
              />
            </TouchableOpacity>
            <Text style={styles.controlLabel}>Camera</Text>
          </View>

          {/* Mic */}
          <View style={styles.controlItem}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <TouchableOpacity
                style={[
                  styles.controlBtn,
                  micActive && styles.controlBtnActive,
                ]}
                activeOpacity={0.75}
                onPress={() => setMicActive((v) => !v)}
              >
                <Ionicons
                  name={micActive ? "mic" : "mic-outline"}
                  size={26}
                  color={micActive ? colors.primary : colors.textPrimary}
                />
              </TouchableOpacity>
            </Animated.View>
            <Text style={styles.controlLabel}>Mic</Text>
          </View>

          {/* Subtitles */}
          <View style={styles.controlItem}>
            <TouchableOpacity
              style={[
                styles.controlBtn,
                subtitlesOn && styles.controlBtnActive,
              ]}
              activeOpacity={0.75}
              onPress={() => setSubtitlesOn((v) => !v)}
            >
              <MaterialCommunityIcons
                name="translate"
                size={26}
                color={subtitlesOn ? colors.primary : colors.textPrimary}
              />
            </TouchableOpacity>
            <Text style={styles.controlLabel}>Subtitles</Text>
          </View>

          {/* End Call */}
          <View style={styles.controlItem}>
            <TouchableOpacity
              style={styles.endCallBtn}
              activeOpacity={0.8}
              onPress={handleEndCall}
            >
              <Ionicons
                name="call"
                size={26}
                color="#fff"
                style={styles.endCallIcon}
              />
            </TouchableOpacity>
            <Text style={styles.controlLabel}>End Call</Text>
          </View>
        </View>

        {/* ── Feedback Panel ── */}
        {sessionState !== "connecting" && (
          <View style={styles.feedbackCard}>
            {/* Speaking */}
            <View style={styles.feedbackItem}>
              <Text style={styles.feedbackCategoryLabel}>Speaking</Text>
              <Text
                style={[
                  styles.feedbackRating,
                  { color: FEEDBACK_COLOR[currentFeedback.speaking] },
                ]}
              >
                {currentFeedback.speaking}
              </Text>
            </View>

            {/* Divider */}
            <View style={styles.feedbackDivider} />

            {/* Pronunciation */}
            <View style={styles.feedbackItem}>
              <Text style={styles.feedbackCategoryLabel}>Pronunciation</Text>
              <Text
                style={[
                  styles.feedbackRating,
                  { color: FEEDBACK_COLOR[currentFeedback.pronunciation] },
                ]}
              >
                {currentFeedback.pronunciation}
              </Text>
            </View>

            {/* Divider */}
            <View style={styles.feedbackDivider} />

            {/* Grammar */}
            <View style={styles.feedbackItem}>
              <Text style={styles.feedbackCategoryLabel}>Grammar</Text>
              <Text
                style={[
                  styles.feedbackRating,
                  { color: FEEDBACK_COLOR[currentFeedback.grammar] },
                ]}
              >
                {currentFeedback.grammar}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // ── Header ──
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCenter: {
    flex: 1,
    paddingHorizontal: 12,
    gap: 2,
  },
  headerTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    color: colors.textPrimary,
  },
  onlineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  onlineLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.success,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerActionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  timerPill: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 7,
    minWidth: 48,
    alignItems: "center",
  },
  timerText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.textPrimary,
  },

  // ── Scroll ──
  scrollContent: {
    paddingBottom: 24,
  },

  // ── Teacher Preview ──
  teacherContainer: {
    width: "100%",
    height: 420,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    marginHorizontal: 0,
  },
  roomBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  roomOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    // Gradient simulation — lighter at bottom
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  mascotImage: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    width: "100%",
    height: 300,
    alignSelf: "center",
  },

  // Self-view (user's camera preview)
  selfView: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 90,
    height: 110,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  selfViewInner: {
    flex: 1,
    backgroundColor: "#4A7C5F",
    alignItems: "center",
    justifyContent: "center",
  },

  // Connecting overlay
  connectingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center",
    justifyContent: "center",
  },
  connectingText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: "#fff",
  },

  // Speech bubble
  speechBubble: {
    position: "absolute",
    bottom: 10,
    left: 12,
    right: 12,
  },
  speechContent: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  speechTextBlock: {
    flex: 1,
    gap: 3,
  },
  speechTarget: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    color: colors.textPrimary,
    lineHeight: 24,
  },
  speechTranslation: {
    fontFamily: fontFamily.medium,
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  speechAudioBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#F0ECFF",
    alignItems: "center",
    justifyContent: "center",
  },
  speechTail: {
    width: 18,
    height: 10,
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    marginLeft: 28,
    // Triangle via borderRadius trick — simplified
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },

  // Speaking dots
  speakingDots: {
    position: "absolute",
    bottom: 140,
    left: 20,
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  speakingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
  },

  // ── Phrase Strip ──
  phraseStrip: {
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: "#F0ECFF",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 2,
  },
  phraseStripLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: colors.primary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  phraseStripText: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: colors.textPrimary,
  },
  phraseStripTranslation: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.textSecondary,
  },

  // ── Controls ──
  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  controlItem: {
    alignItems: "center",
    gap: 8,
  },
  controlBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  controlBtnActive: {
    borderColor: colors.primary,
    backgroundColor: "#F0ECFF",
  },
  endCallBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.error,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  endCallIcon: {
    transform: [{ rotate: "135deg" }],
  },
  controlLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.textSecondary,
  },

  // ── Feedback Card ──
  feedbackCard: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "stretch",
    paddingVertical: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  feedbackItem: {
    flex: 1,
    alignItems: "center",
    gap: 6,
  },
  feedbackDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  feedbackCategoryLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.textPrimary,
  },
  feedbackRating: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
  },

  // ── Not Found ──
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  notFoundEmoji: {
    fontSize: 52,
  },
  notFoundTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    color: colors.textPrimary,
  },
  goBackBtn: {
    marginTop: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: colors.primary,
    borderRadius: 14,
  },
  goBackText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: "#fff",
  },

  bottomSpacer: {
    height: 20,
  },
});
